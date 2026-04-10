"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { CONTACTS } from "../constants/contacts";

export default function Footer() {
  const { theme, t } = useTheme();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const isDark = theme === "dark";
  const bg = isDark ? "#181818" : "#FAFAFA";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";

  const year = new Date().getFullYear();

  return (
    <footer
      className="footer"
      style={{
        borderTop: `1px solid ${borderColor}`,
        background: bg,
        padding: "60px 40px 30px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        className="footer-content"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "40px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ fontFamily: "Raleway, sans-serif", fontSize: "18px", fontWeight: 700, color: textColor, letterSpacing: "2px" }}>
              GRAND
            </span>
            <span style={{ color: "#D8A016", fontSize: "14px" }}>◆</span>
            <span style={{ fontFamily: "Raleway, sans-serif", fontSize: "18px", fontWeight: 700, color: textColor, letterSpacing: "2px" }}>
              MOTORS
            </span>
          </div>
          <p style={{ color: grayColor, fontSize: "13px", lineHeight: 1.6 }}>
            {t("footer.description")}
          </p>
        </div>

        <div>
          <h4 style={{ color: textColor, fontSize: "14px", fontWeight: 600, marginBottom: "16px", fontFamily: "Raleway, sans-serif" }}>
            {t("footer.navigation")}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { href: "/", label: t("nav.home") },
              { href: "/cars", label: t("nav.catalog") },
              { href: "/about", label: t("nav.about") },
              { href: "/privacy", label: t("footer.privacy") },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: hoveredLink === link.href ? "#D8A016" : grayColor,
                  fontSize: "13px",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: textColor, fontSize: "14px", fontWeight: 600, marginBottom: "16px", fontFamily: "Raleway, sans-serif" }}>
            {t("footer.contacts")}
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a
              href={`tel:${CONTACTS.phoneFull}`}
              style={{
                textDecoration: "none",
                color: hoveredLink === "phone" ? "#D8A016" : grayColor,
                fontSize: "13px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={() => setHoveredLink("phone")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {CONTACTS.phone}
            </a>
            <a
              href={`mailto:${CONTACTS.email}`}
              style={{
                textDecoration: "none",
                color: hoveredLink === "email" ? "#D8A016" : grayColor,
                fontSize: "13px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={() => setHoveredLink("email")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {CONTACTS.email}
            </a>
            <a
              href={CONTACTS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: hoveredLink === "whatsapp" ? "#D8A016" : grayColor,
                fontSize: "13px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={() => setHoveredLink("whatsapp")}
              onMouseLeave={() => setHoveredLink(null)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "40px auto 0",
          paddingTop: "20px",
          borderTop: `1px solid ${borderColor}`,
          textAlign: "center",
          color: grayColor,
          fontSize: "12px",
        }}
      >
        © {year} Grand Motors. {t("footer.rights")}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer { padding: 40px 20px 20px !important; }
          .footer-content { grid-template-columns: 1fr !important; gap: 30px !important; }
        }
      `}</style>
    </footer>
  );
}
