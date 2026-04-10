interface WhyUsItemProps {
  title: string;
  desc: string;
  theme: "dark" | "light";
}

export default function WhyUsItem({ title, desc, theme }: WhyUsItemProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";
  const cardBg = isDark ? "#1F1F1F" : "#FFFFFF";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";

  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderTop: "3px solid #D8A016",
        borderRadius: "8px",
        padding: "24px",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ fontFamily: "Raleway, sans-serif", fontSize: "16px", fontWeight: 600, color: textColor, marginBottom: "8px" }}>
        {title}
      </h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor, lineHeight: 1.6 }}>
        {desc}
      </p>
    </div>
  );
}
