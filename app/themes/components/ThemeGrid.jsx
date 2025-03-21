"use client";

import React from "react";
import ThemeCard from "./ThemeCard";

export default function ThemeGrid({
  themes,
  onSave,
  onPublish,
  onToggle,
  isDraft = false,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {themes.map((theme) => (
        <ThemeCard
          key={theme.id}
          theme={theme}
          onSave={onSave}
          onPublish={onPublish}
          onToggle={onToggle}
          isDraft={isDraft}
        />
      ))}
    </div>
  );
}
