"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { CONTACTS } from "../constants/contacts";

export default function Hero() {
  const { t } = useTheme();
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        textAlign: "left",
        overflow: "hidden",
      }}
    >
      <div
        className="hero-bg"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/images/hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.45)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", padding: "0 40px", marginBottom: "80px" }}>
        <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "48px", fontWeight: 700, color: "#FFFFFF", marginBottom: "16px", letterSpacing: "1px", lineHeight: 1.2, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
          {t("hero.title")}
        </h1>

        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#A0A0A0", marginBottom: "40px", lineHeight: 1.6, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
          {t("hero.subtitle")}
        </p>

        <div className="hero-buttons" style={{ display: "flex", gap: "16px", justifyContent: "flex-start" }}>
          <Link
            href="/cars"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 32px",
              background: hoveredBtn === "catalog" ? "#A07810" : "#D8A016",
              color: "#000000",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "6px",
              textDecoration: "none",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={() => setHoveredBtn("catalog")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            {t("hero.catalog")}
          </Link>
          <a
            href={CONTACTS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 32px",
              background: "transparent",
              color: hoveredBtn === "booking" ? "#D8A016" : "#FFFFFF",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "6px",
              border: `1px solid ${hoveredBtn === "booking" ? "#D8A016" : "#FFFFFF"}`,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={() => setHoveredBtn("booking")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            {t("hero.booking")}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section { height: 80vh !important; }
          .hero-section h1 { font-size: 32px !important; }
          .hero-buttons { flex-direction: column !important; align-items: center !important; }
          .hero-bg { background-image: url(/images/hero-mobile.webp) !important; }
        }
      `}</style>
    </section>
  );
}
