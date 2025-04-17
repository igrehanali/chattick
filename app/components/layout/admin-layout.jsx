import React, { Suspense } from "react";
import { Sidebar } from "./sidebar";
import "@/styles/admin-layout.css";
import Loader from "@/lib/loader";

export function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-layout__main">
        <header className="admin-layout__header">
          <div className="admin-layout__header-left">
            <span className="admin-layout__logo">Chattick AdminPanel</span>
          </div>
        </header>

        <main className="admin-layout__main-content">
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
