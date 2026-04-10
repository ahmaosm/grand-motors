"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "./ThemeProvider";

interface PhotoGalleryProps {
  images: string[];
  name: string;
}

export default function PhotoGallery({ images, name }: PhotoGalleryProps) {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const isDark = theme === "dark";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";

  const handleImgError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div>
      <div
        className="photo-gallery-main"
        style={{
          position: "relative",
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "12px",
          background: isDark ? "#242424" : "#E8E8E8",
        }}
      >
        {!imgErrors[activeIndex] ? (
          <Image
            src={images[activeIndex]}
            alt={`${name} ${activeIndex + 1}`}
            fill
            style={{ objectFit: "cover", transition: "opacity 0.3s ease" }}
            onError={() => handleImgError(activeIndex)}
            priority
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDark ? "#A0A0A0" : "#666666",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
            }}
          >
            {name}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              position: "relative",
              width: "80px",
              height: "60px",
              borderRadius: "6px",
              overflow: "hidden",
              border: i === activeIndex ? "2px solid #D8A016" : `1px solid ${borderColor}`,
              cursor: "pointer",
              padding: 0,
              background: isDark ? "#242424" : "#E8E8E8",
              opacity: i === activeIndex ? 1 : 0.45,
              transition: "opacity 0.2s ease",
            }}
          >
            {!imgErrors[i] ? (
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
                onError={() => handleImgError(i)}
              />
            ) : null}
          </button>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .photo-gallery-main { height: 250px !important; }
        }
      `}</style>
    </div>
  );
}
