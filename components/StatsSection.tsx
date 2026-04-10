"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface StatsSectionProps {
  theme: "dark" | "light";
}

function AnimatedNumber({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const match = value.match(/^([\d,.\s]+)/);
          if (!match) {
            setDisplay(value);
            return;
          }

          const numStr = match[1].replace(/[\s,]/g, "");
          const target = parseFloat(numStr);
          const suffix = value.slice(match[1].length);
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * eased);
            setDisplay(current.toLocaleString("ru-RU") + suffix);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

export default function StatsSection({ theme }: StatsSectionProps) {
  const { t } = useTheme();
  const isDark = theme === "dark";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  const stats: { value: string; label: string }[] = (() => {
    try {
      const raw = t("about.statsItems");
      if (Array.isArray(raw)) return raw;
    } catch { /* fallback */ }
    return [];
  })();

  return (
    <div
      className="stats-section"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "24px",
        textAlign: "center",
        padding: "20px 0",
      }}
    >
      {stats.map((stat, i) => (
        <div key={i}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "36px", fontWeight: 700, color: "#D8A016", marginBottom: "8px", fontVariantNumeric: "lining-nums tabular-nums" }}>
            <AnimatedNumber value={stat.value} />
          </div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor }}>
            {stat.label}
          </div>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .stats-section { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
