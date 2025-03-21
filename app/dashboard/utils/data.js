export const generateRevenueData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    revenue: Math.floor(Math.random() * 50000) + 10000,
    users: Math.floor(Math.random() * 1000) + 200,
  }));
};

export const generateDailyData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toLocaleDateString("default", { weekday: "short" }),
      sessions: Math.floor(Math.random() * 1000) + 500,
      duration: Math.floor(Math.random() * 10) + 2,
    };
  }).reverse();
};

export const generateSubscriptionData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    renewals: Math.floor(Math.random() * 300) + 100,
    newSubs: Math.floor(Math.random() * 200) + 50,
    churn: Math.floor(Math.random() * 50) + 10,
  }));
};

export const generateUsageData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toLocaleDateString("default", { weekday: "short" }),
      calls: Math.floor(Math.random() * 500) + 200,
      messages: Math.floor(Math.random() * 1000) + 300,
    };
  }).reverse();
};

export const generateContestData = () => {
  return Array.from({ length: 6 }, (_, i) => ({
    contest: `Contest ${i + 1}`,
    participants: Math.floor(Math.random() * 200) + 50,
    engagement: Math.floor(Math.random() * 100),
  }));
};