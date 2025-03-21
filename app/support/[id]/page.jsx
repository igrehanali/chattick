"use client";

import React, { useState } from "react";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import { Button } from "@/app/components/ui/button";
import { ArrowLeft, MessageSquare, Clock, CheckCircle2, AlertCircle, Users } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

const mockTicket = {
  id: 1,
  title: "Cannot access my account",
  status: "Open",
  priority: "High",
  category: "Account Issues",
  subcategory: "Login Problems",
  assignedTo: "Support Team A",
  user: "John Doe",
  createdAt: "2024-01-15 09:30",
  lastUpdate: "2024-01-15 10:15",
  description: "I'm unable to log into my account since this morning. I've tried resetting my password but still no success.",
  messages: [
    {
      id: 1,
      sender: "John Doe",
      content: "I've tried clearing my browser cache as well, but it didn't help.",
      timestamp: "2024-01-15 09:45"
    },
    {
      id: 2,
      sender: "Support Team",
      content: "Thank you for reporting this. Could you please confirm if you're receiving any specific error message?",
      timestamp: "2024-01-15 10:15"
    }
  ]
};

const supportTeams = [
  "Support Team A",
  "Support Team B",
  "Support Team C",
  "Technical Support",
  "Account Support"
];

const getStatusIcon = (status) => {
  switch (status) {
    case "Open":
      return AlertCircle;
    case "In Progress":
      return Clock;
    case "Resolved":
      return CheckCircle2;
    default:
      return MessageSquare;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "Open":
      return styles.statusYellow;
    case "In Progress":
      return styles.statusPurple;
    case "Resolved":
      return styles.statusGreen;
    default:
      return styles.statusBlue;
  }
};

export default function TicketDetailPage({ params }) {
  const [ticket, setTicket] = useState(mockTicket);
  const [newMessage, setNewMessage] = useState("");
  const StatusIcon = getStatusIcon(ticket.status);

  const handleStatusChange = (newStatus) => {
    setTicket({ ...ticket, status: newStatus, lastUpdate: new Date().toLocaleString() });
  };

  const handleAssignmentChange = (newTeam) => {
    setTicket({ ...ticket, assignedTo: newTeam, lastUpdate: new Date().toLocaleString() });
  };

  const handleSendReply = () => {
    if (newMessage.trim()) {
      const newReply = {
        id: Date.now(),
        sender: "Support Team",
        content: newMessage.trim(),
        timestamp: new Date().toLocaleString()
      };
      setTicket({
        ...ticket,
        messages: [...ticket.messages, newReply],
        lastUpdate: new Date().toLocaleString()
      });
      setNewMessage("");
    }
  };

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/support" className={styles.backLink}>
            <Button variant="secondary" size="sm">
              <ArrowLeft className={styles.buttonIcon} />
              Back to Tickets
            </Button>
          </Link>
          <h2 className={styles.title}>Ticket #{ticket.id}</h2>
        </div>

        <div className={styles.ticketInfo}>
          <div className={styles.ticketHeader}>
            <h1 className={styles.ticketTitle}>{ticket.title}</h1>
            <div className={styles.ticketActions}>
              <select
                value={ticket.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className={styles.statusSelect}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <div className={`${styles.status} ${getStatusColor(ticket.status)}`}>
                <StatusIcon className={styles.statusIcon} />
                {ticket.status}
              </div>
            </div>
          </div>

          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Priority:</span>
              <span className={styles.metaValue}>{ticket.priority}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Category:</span>
              <span className={styles.metaValue}>{ticket.category} / {ticket.subcategory}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Assigned To:</span>
              <select
                value={ticket.assignedTo}
                onChange={(e) => handleAssignmentChange(e.target.value)}
                className={styles.assignSelect}
              >
                {supportTeams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Created by:</span>
              <span className={styles.metaValue}>{ticket.user}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Created at:</span>
              <span className={styles.metaValue}>{ticket.createdAt}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Last updated:</span>
              <span className={styles.metaValue}>{ticket.lastUpdate}</span>
            </div>
          </div>

          <div className={styles.description}>
            <h3 className={styles.sectionTitle}>Description</h3>
            <p className={styles.descriptionText}>{ticket.description}</p>
          </div>

          <div className={styles.messages}>
            <h3 className={styles.sectionTitle}>Communication History</h3>
            {ticket.messages.map((message) => (
              <div key={message.id} className={styles.message}>
                <div className={styles.messageHeader}>
                  <span className={styles.messageSender}>{message.sender}</span>
                  <span className={styles.messageTime}>{message.timestamp}</span>
                </div>
                <p className={styles.messageContent}>{message.content}</p>
              </div>
            ))}
          </div>

          <div className={styles.replySection}>
            <h3 className={styles.sectionTitle}>Add Reply</h3>
            <textarea
              className={styles.replyInput}
              placeholder="Type your message here..."
              rows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button className={styles.replyButton} onClick={handleSendReply}>
              <MessageSquare className={styles.buttonIcon} />
              Send Reply
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}