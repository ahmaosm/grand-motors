"use client";

import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import CarCard from "@/components/CarCard";
import WhyUsItem from "@/components/WhyUsItem";
import FAQItem from "@/components/FAQItem";
import ScrollReveal from "@/components/ScrollReveal";
import HomeButtons from "@/components/client/HomeButtons";
import { useTheme } from "@/components/ThemeProvider";
import { cars } from "@/constants/cars";

export default function HomePage() {
  const { theme, t } = useTheme();

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";
  const featuredCars = cars.slice(0, 4);

  const whyUsItems: { title: string; desc: string }[] = (() => {
    try {
      const raw = t("whyUs");
      if (Array.isArray(raw)) return raw;
    } catch { /* fallback */ }
    return [];
  })();

  const faqItems: { q: string; a: string }[] = (() => {
    try {
      const raw = t("faq");
      if (Array.isArray(raw)) return raw;
    } catch { /* fallback */ }
    return [];
  })();

  return (
    <>
      <Hero />

      <SectionDivider />

      <ScrollReveal>
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px" }} className="home-section">
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, textAlign: "center", marginBottom: "8px" }}>
            {t("home.ourCars")}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: grayColor, textAlign: "center", marginBottom: "40px" }}>
            {t("home.ourCarsDesc")}
          </p>

          <div className="home-cars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
            {featuredCars.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>

          <HomeButtons />
        </section>
      </ScrollReveal>

      <SectionDivider />

      <ScrollReveal delay={200}>
        <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px" }} className="home-section">
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, textAlign: "center", marginBottom: "40px" }}>
            {t("home.whyUs")}
          </h2>

          <div className="whyus-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {whyUsItems.slice(0, 3).map((item, i) => (
              <WhyUsItem key={i} title={item.title} desc={item.desc} theme={theme} />
            ))}
          </div>
          <div className="whyus-grid-bottom" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "20px", maxWidth: "66.66%", margin: "20px auto 0" }}>
            {whyUsItems.slice(3, 5).map((item, i) => (
              <WhyUsItem key={i + 3} title={item.title} desc={item.desc} theme={theme} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider />

      <ScrollReveal delay={200}>
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 40px" }} className="home-section">
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, textAlign: "center", marginBottom: "40px" }}>
            {t("home.faq")}
          </h2>

          {faqItems.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} theme={theme} />
          ))}
        </section>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .home-section { padding: 60px 20px !important; }
          .home-cars-grid { grid-template-columns: 1fr !important; }
          .whyus-grid { grid-template-columns: 1fr !important; }
          .whyus-grid-bottom { grid-template-columns: 1fr !important; max-width: 100% !important; }
        }
      `}</style>
    </>
  );
}
