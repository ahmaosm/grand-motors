"use client";

import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: Record<string, number>;
}

export default function FilterTabs({ activeTab, onTabChange, counts }: FilterTabsProps) {
  const { theme, t } = useTheme();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  const tabs = [
    { key: "all", label: t("catalog.all") },
    { key: "supercar", label: t("catalog.supercar") },
    { key: "sedan", label: t("catalog.sedan") },
    { key: "suv", label: t("catalog.suv") },
  ];

  return (
    <div className="filter-tabs" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const isHovered = hoveredTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            onMouseEnter={() => setHoveredTab(tab.key)}
            onMouseLeave={() => setHoveredTab(null)}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: isActive ? "1px solid #D8A016" : `1px solid ${isDark ? "#2A2A2A" : "#E0E0E0"}`,
              background: isActive ? "#D8A016" : "transparent",
              color: isActive ? "#000000" : isHovered ? "#D8A016" : textColor,
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
            <span style={{ marginLeft: "6px", color: isActive ? "#000000" : grayColor, fontSize: "12px" }}>
              {counts[tab.key] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
