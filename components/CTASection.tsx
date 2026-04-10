"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { CONTACTS } from "../constants/contacts";

export default function CTASection() {
  const { theme, t } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  return (
    <div
      style={{
        border: "1px solid #D8A016",
        borderRadius: "8px",
        padding: "48px 32px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, marginBottom: "12px" }}>
        {t("about.cta")}
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: grayColor, marginBottom: "32px" }}>
        {t("about.ctaDesc")}
      </p>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
        <Link
          href="/cars"
          onMouseEnter={() => setHovered("cars")}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 32px",
            background: hovered === "cars" ? "#A07810" : "#D8A016",
            color: "#000000",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "6px",
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
        >
          {t("about.ctaButton")}
        </Link>
        <a
          href={CONTACTS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered("whatsapp")}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 32px",
            background: "transparent",
            color: hovered === "whatsapp" ? "#D8A016" : textColor,
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "6px",
            border: `1px solid ${hovered === "whatsapp" ? "#D8A016" : isDark ? "#FFFFFF" : "#111111"}`,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
