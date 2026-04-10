"use client";

import React, { useState, useMemo, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import FilterTabs from "@/components/FilterTabs";
import PriceSlider from "@/components/PriceSlider";
import CatalogHeader from "@/components/CatalogHeader";
import CatalogGrid from "@/components/CatalogGrid";
import { useTheme } from "@/components/ThemeProvider";
import { cars } from "@/constants/cars";

export default function CarsPage() {
  const { theme, t } = useTheme();

  const getInitial = (key: string, fallback: string) => {
    if (typeof window === "undefined") return fallback;
    return localStorage.getItem(`catalog_${key}`) || fallback;
  };

  const [search, setSearch] = useState(() => getInitial("search", ""));
  const [tab, setTab] = useState(() => getInitial("tab", "all"));
  const [sort, setSort] = useState(() => getInitial("sort", "priceAsc"));
  const [priceMin, setPriceMin] = useState(() => Number(getInitial("priceMin", "18000")));
  const [priceMax, setPriceMax] = useState(() => Number(getInitial("priceMax", "95000")));

  useEffect(() => {
    localStorage.setItem("catalog_search", search);
    localStorage.setItem("catalog_tab", tab);
    localStorage.setItem("catalog_sort", sort);
    localStorage.setItem("catalog_priceMin", String(priceMin));
    localStorage.setItem("catalog_priceMax", String(priceMax));
  }, [search, tab, sort, priceMin, priceMax]);

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";

  const counts = useMemo(() => ({
    all: cars.length,
    supercar: cars.filter((c) => c.category === "supercar").length,
    sedan: cars.filter((c) => c.category === "sedan").length,
    suv: cars.filter((c) => c.category === "suv").length,
  }), []);

  const filtered = useMemo(() => {
    let result = [...cars];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(s));
    }

    if (tab !== "all") {
      result = result.filter((c) => c.category === tab);
    }

    result = result.filter((c) => c.price >= priceMin && c.price <= priceMax);

    if (sort === "priceAsc") result.sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") result.sort((a, b) => b.price - a.price);
    else if (sort === "nameAsc") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, tab, sort, priceMin, priceMax]);

  const handleReset = () => {
    setSearch("");
    setTab("all");
    setSort("priceAsc");
    setPriceMin(18000);
    setPriceMax(95000);
    localStorage.removeItem("catalog_search");
    localStorage.removeItem("catalog_tab");
    localStorage.removeItem("catalog_sort");
    localStorage.removeItem("catalog_priceMin");
    localStorage.removeItem("catalog_priceMax");
  };

  return (
    <div className="cars-page" style={{ maxWidth: "1280px", margin: "0 auto", padding: "112px 40px 100px" }}>
      <h1 style={{ fontFamily: "Raleway, sans-serif", fontSize: "28px", fontWeight: 700, color: textColor, marginBottom: "32px" }}>
        {t("catalog.title")}
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
        <SearchInput value={search} onChange={setSearch} />
        <FilterTabs activeTab={tab} onTabChange={setTab} counts={counts} />
        <PriceSlider
          min={18000}
          max={95000}
          valueMin={priceMin}
          valueMax={priceMax}
          onChangeMin={setPriceMin}
          onChangeMax={setPriceMax}
        />
      </div>

      <CatalogHeader
        count={filtered.length}
        sort={sort}
        onSortChange={setSort}
        onReset={handleReset}
      />

      <CatalogGrid
        cars={filtered}
        emptyMessage={t("catalog.notFound")}
        emptyDescription={t("catalog.notFoundDesc")}
      />

      <style>{`
        @media (max-width: 768px) {
          .cars-page { padding: 96px 20px 60px !important; }
        }
      `}</style>
    </div>
  );
}
