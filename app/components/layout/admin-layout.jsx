import React from "react";
import { Sidebar } from "./sidebar";
import "@/styles/admin-layout.css";
import { Bell, Search, UserCircle } from "lucide-react";

export function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-layout__main">
        <header className="admin-layout__header">
          {/* Left Section: Logo & Search */}
          <div className="admin-layout__header-left">
            <span className="admin-layout__logo">Chattick AdminPanel</span>
          </div>
        </header>

        <main className="admin-layout__main-content">{children}</main>
      </div>
    </div>
  );
}
