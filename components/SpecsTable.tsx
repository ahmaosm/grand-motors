import { Car } from "../constants/cars";

interface SpecsTableProps {
  car: Car;
  theme: "dark" | "light";
  lang?: "ru" | "en";
  labels: {
    power: string;
    acceleration: string;
    engine: string;
    fuel: string;
    maxSpeed: string;
    seats: string;
    drive: string;
    year: string;
  };
}

export default function SpecsTable({ car, theme, lang = "ru", labels }: SpecsTableProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";

  const isEn = lang === "en";

  const specs = [
    { label: labels.power, value: isEn ? car.powerEn : car.power },
    { label: labels.acceleration, value: isEn ? car.accelerationEn : car.acceleration },
    { label: labels.engine, value: isEn ? car.engineVolumeEn : car.engineVolume },
    { label: labels.fuel, value: isEn ? car.fuelConsumptionEn : car.fuelConsumption },
    { label: labels.maxSpeed, value: isEn ? car.maxSpeedEn : car.maxSpeed },
    { label: labels.seats, value: String(car.seats) },
    { label: labels.drive, value: isEn ? car.driveEn : car.drive },
    { label: labels.year, value: String(car.year) },
  ];

  return (
    <div
      className="specs-table"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
      }}
    >
      {specs.map((spec, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: grayColor }}>
            {spec.label}
          </span>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: textColor }}>
            {spec.value}
          </span>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .specs-table { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
