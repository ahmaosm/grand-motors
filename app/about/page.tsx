"use client";

import React from "react";
import SectionDivider from "@/components/SectionDivider";
import StatsSection from "@/components/StatsSection";
import TeamCard from "@/components/TeamCard";
import ReviewsLane from "@/components/ReviewsLane";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import { useTheme } from "@/components/ThemeProvider";

export default function AboutPage() {
  const { theme, t } = useTheme();

  const team: { name: string; role: string; description: string }[] = (() => {
    try {
      const raw = t("about.teamMembers");
      if (Array.isArray(raw)) return raw;
    } catch { /* fallback */ }
    return [];
  })();

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";

  return (
    <div className="about-page" style={{ maxWidth: "1280px", margin: "0 auto", padding: "132px 40px 100px" }}>
      <ScrollReveal>
        <section style={{ maxWidth: "800px", margin: "0 auto 40px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, marginBottom: "16px" }}>
            {t("about.title")}
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: grayColor, lineHeight: 1.7, marginBottom: "12px" }}>
            {t("about.description")}
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: grayColor, lineHeight: 1.7 }}>
            {t("about.description2")}
          </p>
        </section>
      </ScrollReveal>

      <SectionDivider />

      <ScrollReveal delay={100}>
        <section style={{ padding: "40px 0" }}>
          <StatsSection theme={theme} />
        </section>
      </ScrollReveal>

      <SectionDivider />

      <ScrollReveal delay={200}>
        <section style={{ padding: "60px 0" }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, textAlign: "center", marginBottom: "40px" }}>
            {t("about.team")}
          </h2>
          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {team.map((member, i) => (
              <TeamCard key={i} {...member} theme={theme} />
            ))}
          </div>
        </section>
      </ScrollReveal>

      <SectionDivider />

      <ScrollReveal delay={100}>
        <section style={{ padding: "20px 0 60px" }}>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, textAlign: "center", marginBottom: "32px" }}>
            {t("about.reviews")}
          </h2>
          <ReviewsLane />
        </section>
      </ScrollReveal>

      <SectionDivider />

      <ScrollReveal delay={200}>
        <section style={{ padding: "60px 0" }}>
          <CTASection />
        </section>
      </ScrollReveal>

      <style>{`
        @media (max-width: 768px) {
          .about-page { padding: 96px 20px 60px !important; }
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
