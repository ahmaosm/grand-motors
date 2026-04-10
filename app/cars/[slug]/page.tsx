"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import PhotoGallery from "@/components/PhotoGallery";
import SpecsTable from "@/components/SpecsTable";
import BookingForm from "@/components/BookingForm";
import SuccessMessage from "@/components/SuccessMessage";
import { BackButton, WhatsAppButton } from "@/components/client/CarButtons";
import { useTheme } from "@/components/ThemeProvider";
import { cars } from "@/constants/cars";

export default function CarPage() {
  const params = useParams();
  const { theme, lang, t } = useTheme();
  const [submitted, setSubmitted] = useState(false);

  const slug = params.slug as string;
  const car = cars.find((c) => c.slug === slug);

  if (!car) {
    notFound();
  }

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  const specsLabels = {
    power: t("car.power"),
    acceleration: t("car.acceleration"),
    engine: t("car.engine"),
    fuel: t("car.fuel"),
    maxSpeed: t("car.maxSpeed"),
    seats: t("car.seats"),
    drive: t("car.drive"),
    year: t("car.year"),
  };

  return (
    <div className="car-page" style={{ maxWidth: "900px", margin: "0 auto", padding: "112px 40px 100px" }}>
      <BackButton />

      <PhotoGallery images={car.images} name={car.name} />

      <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "36px", fontWeight: 700, color: textColor, marginTop: "32px", marginBottom: "8px" }}>
        {car.name}
      </h1>

      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "22px", color: "#D8A016", marginBottom: "32px" }}>
        {t("car.from")} {car.price.toLocaleString("ru-RU")} {t("car.perDay")}
      </p>

      <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "20px", fontWeight: 600, color: textColor, marginBottom: "16px" }}>
        {t("car.specs")}
      </h2>
      <SpecsTable car={car} theme={theme} labels={specsLabels} lang={lang} />

      <div style={{ borderTop: `1px solid ${isDark ? "#2A2A2A" : "#E0E0E0"}`, paddingTop: "32px", marginTop: "32px" }}>
        {submitted ? (
          <SuccessMessage />
        ) : (
          <BookingForm
            carName={car.name}
            carSlug={car.slug}
            pricePerDay={car.price}
            onSuccess={() => setSubmitted(true)}
          />
        )}
      </div>

      <div style={{ marginTop: "16px" }}>
        <WhatsAppButton carName={car.name} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .car-page { padding: 96px 20px 60px !important; }
          .car-page h1 { font-size: 28px !important; }
        }
      `}</style>
    </div>
  );
}
