"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";

export default function PrivacyPage() {
  const { theme, t } = useTheme();

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  const sections: { title: string; text: string }[] = (() => {
    try {
      const raw = t("privacy.sections");
      if (Array.isArray(raw)) return raw;
    } catch { /* fallback */ }
    return [];
  })();

  return (
    <div className="privacy-page" style={{ maxWidth: "800px", margin: "0 auto", padding: "132px 40px 100px" }}>
      <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, marginBottom: "8px" }}>
        {t("privacy.title")}
      </h1>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor, marginBottom: "40px" }}>
        {t("privacy.lastUpdated")}
      </p>

      {sections.map((section, i) => (
        <div key={i} style={{ marginBottom: "32px" }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "18px", fontWeight: 600, color: textColor, marginBottom: "8px" }}>
            {section.title}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: grayColor, lineHeight: 1.7 }}>
            {section.text}
          </p>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .privacy-page { padding: 96px 20px 60px !important; }
        }
      `}</style>
    </div>
  );
}
