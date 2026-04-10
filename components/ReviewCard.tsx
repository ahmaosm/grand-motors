interface ReviewCardProps {
  name: string;
  car: string;
  text: string;
  rating: number;
  theme: "dark" | "light";
}

export default function ReviewCard({ name, car, text, rating, theme }: ReviewCardProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";
  const cardBg = isDark ? "#1F1F1F" : "#FFFFFF";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";

  return (
    <div
      style={{
        background: cardBg,
        borderRadius: "8px",
        padding: "20px",
        border: `1px solid ${borderColor}`,
        minWidth: "280px",
        maxWidth: "320px",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ color: i < rating ? "#D8A016" : "#2A2A2A", fontSize: "14px" }}>
            ★
          </span>
        ))}
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor, lineHeight: 1.5, marginBottom: "12px" }}>
        &quot;{text}&quot;
      </p>
      <div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: textColor }}>
          {name}
        </p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#D8A016" }}>
          {car}
        </p>
      </div>
    </div>
  );
}
