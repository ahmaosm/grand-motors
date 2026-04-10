import { Car } from "../constants/cars";
import CarCard from "./CarCard";

interface CatalogGridProps {
  cars: Car[];
  emptyMessage?: string;
  emptyDescription?: string;
}

export default function CatalogGrid({ cars, emptyMessage, emptyDescription }: CatalogGridProps) {
  if (cars.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <p style={{ fontFamily: "Raleway, sans-serif", fontSize: "20px", color: "#888888", marginBottom: "8px" }}>
          {emptyMessage || "Автомобиль не найден"}
        </p>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#888888" }}>
          {emptyDescription || "Попробуйте изменить параметры поиска"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="catalog-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "24px",
      }}
    >
      {cars.map((car) => (
        <CarCard key={car.slug} car={car} />
      ))}

      <style>{`
        @media (max-width: 768px) {
          .catalog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
