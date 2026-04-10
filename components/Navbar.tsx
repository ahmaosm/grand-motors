"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang, t } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const isDark = theme === "dark";
  const bg = isDark ? "rgba(24,24,24,0.95)" : "rgba(250,250,250,0.95)";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/cars", label: t("nav.catalog") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          background: bg,
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${borderColor}`,
          zIndex: 1000,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div className="navbar-left" style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "Raleway, sans-serif", fontSize: "20px", fontWeight: 700, color: textColor, letterSpacing: "2px" }}>
              GRAND
            </span>
            <span style={{ color: "#D8A016", fontSize: "16px" }}>◆</span>
            <span style={{ fontFamily: "Raleway, sans-serif", fontSize: "20px", fontWeight: 700, color: textColor, letterSpacing: "2px" }}>
              MOTORS
            </span>
          </Link>
        </div>

        <div className="navbar-links" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                color: hoveredLink === link.href ? "#D8A016" : textColor,
                fontSize: "14px",
                fontWeight: 500,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-right" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "12px" }}>
          <button
            onClick={toggleLang}
            style={{
              background: "transparent",
              border: `1px solid ${borderColor}`,
              color: textColor,
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {lang === "ru" ? "RU" : "EN"}
          </button>

          <button
            onClick={toggleTheme}
            style={{
              background: "transparent",
              border: `1px solid ${borderColor}`,
              color: textColor,
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        <button
          className="navbar-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: textColor,
            fontSize: "24px",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div
          className="navbar-mobile-menu"
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            background: bg,
            backdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            zIndex: 999,
            animation: "fadeIn 0.3s ease",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: textColor,
                fontSize: "24px",
                fontFamily: "Raleway, sans-serif",
                fontWeight: 600,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
            <button
              onClick={toggleLang}
              style={{
                background: "transparent",
                border: `1px solid ${borderColor}`,
                color: textColor,
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              {lang === "ru" ? "RU" : "EN"}
            </button>
            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: `1px solid ${borderColor}`,
                color: textColor,
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (max-width: 768px) {
          .navbar { padding: 0 20px !important; }
          .navbar-links { display: none !important; }
          .navbar-right { display: none !important; }
          .navbar-burger { display: block !important; }
        }
      `}</style>
    </>
  );
}
