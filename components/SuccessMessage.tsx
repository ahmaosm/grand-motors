"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function SuccessMessage() {
  const { theme, t } = useTheme();
  const [hovered, setHovered] = useState(false);

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";

  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
      <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, marginBottom: "12px" }}>
        {t("success.title")}
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: isDark ? "#A0A0A0" : "#666666", marginBottom: "32px" }}>
        {t("success.message")}
      </p>
      <Link
        href="/cars"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-block",
          padding: "14px 32px",
          background: hovered ? "#A07810" : "#D8A016",
          color: "#000000",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "6px",
          textDecoration: "none",
          transition: "background 0.2s ease",
        }}
      >
        {t("success.back")}
      </Link>
    </div>
  );
}
