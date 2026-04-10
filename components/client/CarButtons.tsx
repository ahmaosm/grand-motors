"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "../ThemeProvider";
import { CONTACTS } from "../../constants/contacts";

export function BackButton() {
  const { theme, t } = useTheme();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const isDark = theme === "dark";
  const color = hovered ? "#D8A016" : isDark ? "#A0A0A0" : "#666666";

  return (
    <button
      onClick={() => router.back()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        color,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        marginBottom: "24px",
        transition: "color 0.2s ease",
      }}
    >
      {t("car.back")}
    </button>
  );
}

export function WhatsAppButton({ carName }: { carName: string }) {
  const { theme, t } = useTheme();
  const [hovered, setHovered] = useState(false);
  const isDark = theme === "dark";

  const message = encodeURIComponent(`${t("car.whatsappMessage")} ${carName}`);
  const url = `${CONTACTS.whatsapp}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        width: "100%",
        padding: "14px",
        background: "transparent",
        border: `1px solid ${hovered ? "#25D366" : isDark ? "#2A2A2A" : "#E0E0E0"}`,
        color: hovered ? "#25D366" : isDark ? "#FFFFFF" : "#111111",
        fontFamily: "Inter, sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        borderRadius: "6px",
        textDecoration: "none",
        textAlign: "center",
        transition: "all 0.2s ease",
        boxSizing: "border-box",
      }}
    >
      {t("car.whatsapp")}
    </a>
  );
}
