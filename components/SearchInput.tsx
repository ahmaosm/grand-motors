"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const { theme, t } = useTheme();
  const isDark = theme === "dark";

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t("catalog.search")}
      style={{
        width: "100%",
        padding: "12px 16px",
        background: isDark ? "#1F1F1F" : "#FFFFFF",
        border: `1px solid ${isDark ? "#2A2A2A" : "#E0E0E0"}`,
        borderRadius: "6px",
        color: isDark ? "#FFFFFF" : "#111111",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        outline: "none",
      }}
    />
  );
}
