interface MainReviewProps {
  theme: "dark" | "light";
}

export default function MainReview({ theme }: MainReviewProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  return (
    <div
      style={{
        border: "1px solid #D8A016",
        borderRadius: "8px",
        padding: "32px",
        textAlign: "center",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: "32px", color: "#D8A016", marginBottom: "16px" }}>&ldquo;</div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: textColor, lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>
        Grand Motors превзошли все ожидания. Я арендовал Ferrari SF90 на день рождения жены, и это стал лучший подарок в нашей жизни. Безупречный сервис, идеальное состояние автомобиля, и внимание к каждой детали. Однозначно рекомендую!
      </p>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: textColor }}>
        Михаил Ш.
      </p>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: grayColor }}>
        Ferrari SF90 Stradale
      </p>
    </div>
  );
}
