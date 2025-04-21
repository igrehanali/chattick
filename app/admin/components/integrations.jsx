import { Button } from "@/app/components/ui/button";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const IntegrationManager = () => {
  const [integrations, setIntegrations] = useState([
    {
      type: "voice",
      title: "Twilio Voice",
      description: "Voice call integration using Twilio.",
      url: "https://api.twilio.com/voice",
      token: "twilio-voice-token-123",
      config: '{"region": "us-east-1"}',
    },
    {
      type: "payment",
      title: "Stripe",
      description: "Stripe payment processing.",
      url: "https://api.stripe.com",
      token: "stripe-secret-key",
      config: '{"currency": "USD"}',
    },
    {
      type: "storage",
      title: "AWS S3",
      description: "File storage with Amazon S3.",
      url: "https://s3.amazonaws.com",
      token: "aws-s3-token",
      config: '{"bucket": "my-app-storage"}',
    },
  ]);

  const [form, setForm] = useState({
    type: "",
    title: "",
    description: "",
    url: "",
    token: "",
    config: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedIntegration, setSelectedIntegration] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...integrations];
      updated[editIndex] = form;
      setIntegrations(updated);
      setEditIndex(null);
      toast.success("Integration updated successfully!");
    } else {
      setIntegrations([...integrations, form]);
      toast.success("Integration added successfully!");
    }

    setForm({
      type: "",
      title: "",
      description: "",
      url: "",
      token: "",
      config: "",
    });
  };

  const handleEdit = (index) => {
    setForm(integrations[index]);
    toast.success("Integration edited successfully!");
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = integrations.filter((_, i) => i !== index);
    setIntegrations(filtered);
    if (editIndex === index) setEditIndex(null);
    toast.success("Integration deleted successfully!");
  };

  const filteredIntegrations = integrations.filter(
    (i) => i.type === selectedType
  );

  return (
    <div style={styles.container}>
      <Toaster />
      <h2>Integration Management</h2>

      {/* List */}
      <div style={styles.list}>
        <h3>Added Integrations</h3>
        {integrations.length === 0 && (
          <p style={{ opacity: 0.6 }}>No integrations yet</p>
        )}
        {integrations.map((item, index) => (
          <div key={index} style={styles.card}>
            <h4>
              {item.title} <span style={styles.type}>({item.type})</span>
            </h4>
            <p>{item.description}</p>
            <p>
              <strong>URL:</strong> {item.url}
            </p>

            <div style={styles.actions}>
              <Button onClick={() => handleEdit(index)}>Edit</Button>
              <button style={styles.danger} onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="voice">Voice</option>
          <option value="video">Video</option>
          <option value="payment">Payment</option>
          <option value="storage">Storage</option>
          <option value="firebase">Firebase</option>
          <option value="server">Server</option>
        </select>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="url"
          placeholder="Endpoint URL"
          value={form.url}
          onChange={handleChange}
          required
        />
        <input
          name="token"
          placeholder="API Token"
          value={form.token}
          onChange={handleChange}
        />
        <textarea
          name="config"
          placeholder="Other Config (JSON)"
          value={form.config}
          onChange={handleChange}
        />

        <Button type="submit">
          {editIndex !== null ? "Update" : "Save"} Integration
        </Button>
      </form>
    </div>
  );
};

// Basic styles
const styles = {
  container: {
    maxWidth: 700,
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    marginBottom: "2rem",
  },
  list: {
    marginBottom: "2rem",
  },
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "6px",
    marginBottom: "1rem",
    background: "#f9f9f9",
  },
  type: {
    fontWeight: "normal",
    color: "#666",
    fontSize: "0.9rem",
  },
  actions: {
    marginTop: "0.5rem",
    display: "flex",
    gap: "0.5rem",
  },
  danger: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  settings: {
    borderTop: "1px solid #eee",
    paddingTop: "1rem",
  },
};

export default IntegrationManager;
