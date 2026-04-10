"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

interface PriceSliderProps {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChangeMin: (value: number) => void;
  onChangeMax: (value: number) => void;
}

export default function PriceSlider({ min, max, valueMin, valueMax, onChangeMin, onChangeMax }: PriceSliderProps) {
  const { theme, t } = useTheme();
  const isDark = theme === "dark";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor }}>
          {t("catalog.priceRange")}
        </span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#D8A016" }}>
          {valueMin.toLocaleString("ru-RU")} — {valueMax.toLocaleString("ru-RU")} ₽
        </span>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={valueMin}
          onChange={(e) => onChangeMin(Math.min(Number(e.target.value), valueMax))}
          style={{ flex: 1, accentColor: "#D8A016" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={valueMax}
          onChange={(e) => onChangeMax(Math.max(Number(e.target.value), valueMin))}
          style={{ flex: 1, accentColor: "#D8A016" }}
        />
      </div>
    </div>
  );
}
