"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Page404() {
  const { theme, t } = useTheme();
  const [hovered, setHovered] = useState(false);

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", textAlign: "center", padding: "40px 20px" }}>
      <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "96px", fontWeight: 700, color: "#D8A016", marginBottom: "8px" }}>
        {t("notFound.title")}
      </h1>
      <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 600, color: textColor, marginBottom: "12px" }}>
        {t("notFound.subtitle")}
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: grayColor, marginBottom: "32px", maxWidth: "400px" }}>
        {t("notFound.description")}
      </p>
      <Link
        href="/"
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
        {t("notFound.back")}
      </Link>
    </div>
  );
}
