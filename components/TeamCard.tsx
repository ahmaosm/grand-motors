interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  theme: "dark" | "light";
}

export default function TeamCard({ name, role, description, theme }: TeamCardProps) {
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
        padding: "24px",
        border: `1px solid ${borderColor}`,
        borderTop: "3px solid #D8A016",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: isDark ? "#242424" : "#E8E8E8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          fontSize: "24px",
          color: "#D8A016",
          fontFamily: "Raleway, sans-serif",
          fontWeight: 700,
        }}
      >
        {name.charAt(0)}
      </div>
      <h3 style={{ fontFamily: "Raleway, sans-serif", fontSize: "16px", fontWeight: 600, color: textColor, marginBottom: "4px" }}>
        {name}
      </h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#D8A016", marginBottom: "12px" }}>
        {role}
      </p>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor, lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}
