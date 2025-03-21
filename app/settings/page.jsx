import React from "react";
import { AdminLayout } from "@/app/components/layout/admin-layout";
import SystemSettings from "./components/system-settings";
// import { SystemSettings } from "./components/system-settings";

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">System Settings</h2>
        <SystemSettings />
      </div>
    </AdminLayout>
  );
}
