"use client";

import React, { useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import ReviewCard from "./ReviewCard";

export default function ReviewsLane() {
  const { theme, t } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const reviews: { name: string; car: string; text: string; rating: number }[] = (() => {
    try {
      const raw = t("about.reviewItems");
      if (Array.isArray(raw)) return raw;
    } catch { /* fallback */ }
    return [];
  })();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div
      ref={containerRef}
      className="reviews-lane"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        cursor: isDragging ? "grabbing" : "grab",
        paddingBottom: "8px",
        scrollbarWidth: "none",
        userSelect: "none",
      }}
    >
      {reviews.map((review, i) => (
        <ReviewCard key={i} {...review} theme={theme} />
      ))}

      <style>{`
        .reviews-lane::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
