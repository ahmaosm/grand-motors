"use client";

import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  theme: "dark" | "light";
}

export default function FAQItem({ question, answer, theme }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";

  return (
    <div
      style={{
        borderBottom: `1px solid ${borderColor}`,
        padding: "16px 0",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: textColor }}>
          {question}
        </span>
        <span style={{ color: "#D8A016", fontSize: "18px", transition: "transform 0.3s ease", transform: open ? "rotate(45deg)" : "rotate(0)" }}>
          +
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor, lineHeight: 1.6, paddingTop: "12px" }}>
          {answer}
        </p>
      </div>
    </div>
  );
}
