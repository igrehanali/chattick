import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

const SURVEYS_COLLECTION = "surveys";
const RESPONSES_COLLECTION = "survey_responses";

export const surveyService = {
  // Survey Operations
  async getAllSurveys() {
    const querySnapshot = await getDocs(collection(db, SURVEYS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createSurvey(surveyData) {
    const dataWithTimestamp = {
      ...surveyData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, SURVEYS_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async updateSurvey(id, surveyData) {
    const dataWithTimestamp = {
      ...surveyData,
      updatedAt: serverTimestamp(),
    };
    const surveyRef = doc(db, SURVEYS_COLLECTION, id);
    await updateDoc(surveyRef, dataWithTimestamp);
    return {
      id,
      ...dataWithTimestamp,
    };
  },

  async deleteSurvey(id) {
    const surveyRef = doc(db, SURVEYS_COLLECTION, id);
    await deleteDoc(surveyRef);
    return id;
  },

  // Survey Response Operations
  async getSurveyResponses(surveyId) {
    const q = query(
      collection(db, RESPONSES_COLLECTION),
      where("surveyId", "==", surveyId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },

  async createSurveyResponse(responseData) {
    const dataWithTimestamp = {
      ...responseData,
      submittedAt: serverTimestamp(),
    };
    const docRef = await addDoc(
      collection(db, RESPONSES_COLLECTION),
      dataWithTimestamp
    );
    return {
      id: docRef.id,
      ...dataWithTimestamp,
    };
  },

  async getSurveyAnalytics(surveyId) {
    const responses = await this.getSurveyResponses(surveyId);

    // Process responses to generate analytics
    const analytics = {
      totalResponses: responses.length,
      responseOverTime: this._processResponseOverTime(responses),
      questionDistribution: this._processQuestionDistribution(responses),
      completionStats: this._processCompletionStats(responses),
    };

    return analytics;
  },

  // Helper methods for analytics
  _processResponseOverTime(responses) {
    const responsesByDate = {};
    responses.forEach((response) => {
      const date = response.submittedAt;
      const dateKey = date.seconds;
      responsesByDate[dateKey] = (responsesByDate[dateKey] || 0) + 1;
    });

    return Object.entries(responsesByDate).map(([seconds, count]) => ({
      date: { seconds: parseInt(seconds), nanoseconds: 0 },
      responses: count,
    }));
  },

  _processQuestionDistribution(responses) {
    const distribution = {};
    responses.forEach((response) => {
      response.answers.forEach((answer) => {
        distribution[answer.answer] = (distribution[answer.answer] || 0) + 1;
      });
    });

    return Object.entries(distribution).map(([answer, count]) => ({
      answer,
      count,
    }));
  },

  _processCompletionStats(responses) {
    const completed = responses.filter((r) => r.completed).length;
    const total = responses.length;

    return [
      { name: "Completed", value: completed },
      { name: "Abandoned", value: total - completed },
    ];
  },
};
