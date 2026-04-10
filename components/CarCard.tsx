"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Car } from "../constants/cars";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { theme, lang, t } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isDark = theme === "dark";
  const cardBg = isDark ? "#1F1F1F" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";

  return (
    <Link href={`/cars/${car.slug}`} style={{ textDecoration: "none" }}>
      <div
        className="car-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: cardBg,
          borderRadius: "8px",
          overflow: "hidden",
          border: `1px solid ${hovered ? "#D8A016" : borderColor}`,
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          cursor: "pointer",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "220px", background: "#242424" }}>
          {!imgError ? (
            <Image
              src={car.images[0]}
              alt={car.name}
              fill
              style={{ objectFit: "cover" }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: isDark ? "#242424" : "#E8E8E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: grayColor,
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
              }}
            >
              {car.name}
            </div>
          )}
        </div>

        <div style={{ padding: "16px" }}>
          <h3 style={{ fontFamily: "Raleway, sans-serif", fontSize: "16px", fontWeight: 600, color: textColor, marginBottom: "8px", fontVariantNumeric: "lining-nums" }}>
            {car.name}
          </h3>

          <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
            <span style={{ color: grayColor, fontSize: "12px", fontFamily: "Inter, sans-serif" }}>
              {lang === "en" ? car.powerEn : car.power}
            </span>
            <span style={{ color: grayColor, fontSize: "12px", fontFamily: "Inter, sans-serif" }}>
              {lang === "en" ? car.accelerationEn : car.acceleration}
            </span>
            <span style={{ color: grayColor, fontSize: "12px", fontFamily: "Inter, sans-serif" }}>
              {lang === "en" ? car.maxSpeedEn : car.maxSpeed}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span style={{ color: "#D8A016", fontSize: "18px", fontWeight: 700, fontFamily: "Inter, sans-serif" }}>
              {t("catalog.from")} {car.price.toLocaleString("ru-RU")}
            </span>
            <span style={{ color: grayColor, fontSize: "13px", fontFamily: "Inter, sans-serif" }}>
              {t("catalog.perDay")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
