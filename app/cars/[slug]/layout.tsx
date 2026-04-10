import type { Metadata } from "next";
import { cars } from "@/constants/cars";

interface Props {
  params: { slug: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const car = cars.find((c) => c.slug === params.slug);

  if (!car) {
    return {
      title: "Car Not Found — Grand Motors",
    };
  }

  return {
    title: `${car.name} — Grand Motors`,
    description: `Аренда ${car.name}. ${car.power}, ${car.acceleration} до 100 км/ч, ${car.maxSpeed}. От ${car.price.toLocaleString("ru-RU")} ₽/день.`,
  };
}

export default function CarLayout({ children }: Props) {
  return <>{children}</>;
}
