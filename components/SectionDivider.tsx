export default function SectionDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          height: "1px",
          width: "60px",
          background: "linear-gradient(90deg, transparent, #D8A016, transparent)",
        }}
      />
      <div
        style={{
          width: "8px",
          height: "8px",
          background: "#D8A016",
          transform: "rotate(45deg)",
          margin: "0 16px",
        }}
      />
      <div
        style={{
          height: "1px",
          width: "60px",
          background: "linear-gradient(90deg, transparent, #D8A016, transparent)",
        }}
      />
    </div>
  );
}
