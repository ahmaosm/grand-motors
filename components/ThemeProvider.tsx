"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import ruLocale from "../locales/ru.json";

type Theme = "dark" | "light";
type Lang = "ru" | "en";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  lang: Lang;
  toggleLang: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): any {
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return path;
    current = current[key];
  }
  return current !== undefined ? current : path;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("ru");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [translations, setTranslations] = useState<any>(ruLocale);

  useEffect(() => {
    if (lang === "ru") {
      setTranslations(ruLocale);
    } else {
      import(`../locales/${lang}.json`).then((mod) => {
        setTranslations(mod.default || mod);
      });
    }
  }, [lang]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#181818";
      document.body.style.color = "#FFFFFF";
    } else {
      document.body.style.backgroundColor = "#FAFAFA";
      document.body.style.color = "#111111";
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((prev) => (prev === "ru" ? "en" : "ru"));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (key: string): any => {
    if (!translations) return key;
    return getNestedValue(translations, key);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </ThemeContext.Provider>
  );
}
