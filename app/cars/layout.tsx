import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Catalog — Grand Motors",
  description: "Supercars, luxury sedans and SUVs for rent. 20 exclusive vehicles.",
};

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
