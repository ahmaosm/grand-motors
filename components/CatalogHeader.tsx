"use client";

import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";

interface CatalogHeaderProps {
  count: number;
  sort: string;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export default function CatalogHeader({ count, sort, onSortChange, onReset }: CatalogHeaderProps) {
  const { theme, t } = useTheme();
  const [hoveredReset, setHoveredReset] = useState(false);

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  return (
    <div
      className="catalog-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "12px",
      }}
    >
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: grayColor }}>
        {t("catalog.found")}: <strong style={{ color: textColor }}>{count}</strong> {t("catalog.cars")}
      </span>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          style={{
            padding: "8px 12px",
            background: isDark ? "#1F1F1F" : "#FFFFFF",
            border: `1px solid ${isDark ? "#2A2A2A" : "#E0E0E0"}`,
            borderRadius: "6px",
            color: textColor,
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <option value="priceAsc">{t("catalog.priceAsc")}</option>
          <option value="priceDesc">{t("catalog.priceDesc")}</option>
          <option value="nameAsc">{t("catalog.nameAsc")}</option>
        </select>

        <button
          onClick={onReset}
          onMouseEnter={() => setHoveredReset(true)}
          onMouseLeave={() => setHoveredReset(false)}
          style={{
            padding: "8px 16px",
            background: "transparent",
            border: `1px solid ${isDark ? "#2A2A2A" : "#E0E0E0"}`,
            borderRadius: "6px",
            color: hoveredReset ? "#D8A016" : grayColor,
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            cursor: "pointer",
            transition: "color 0.2s ease",
          }}
        >
          {t("catalog.reset")}
        </button>
      </div>
    </div>
  );
}
