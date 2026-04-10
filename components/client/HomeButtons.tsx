"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "../ThemeProvider";

export default function HomeButtons() {
  const { t } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "32px" }}>
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
        {t("home.more")}
      </Link>
    </div>
  );
}
