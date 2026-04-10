"use client";

import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { calculatePrice } from "../utils/calculatePrice";

interface BookingFormProps {
  carName: string;
  carSlug: string;
  pricePerDay: number;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  phone: string;
  dateStart: string;
  dateEnd: string;
  comment: string;
  agreed: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  dateStart?: string;
  dateEnd?: string;
  agreed?: string;
}

export default function BookingForm({ carName, carSlug, pricePerDay, onSuccess }: BookingFormProps) {
  const { theme, t } = useTheme();
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    dateStart: "",
    dateEnd: "",
    comment: "",
    agreed: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);

  const isDark = theme === "dark";
  const textColor = isDark ? "#FFFFFF" : "#111111";
  const grayColor = isDark ? "#A0A0A0" : "#666666";
  const borderColor = isDark ? "#2A2A2A" : "#E0E0E0";
  const inputBg = isDark ? "#1F1F1F" : "#FFFFFF";

  const today = new Date().toISOString().split("T")[0];
  const priceCalc = calculatePrice(pricePerDay, form.dateStart, form.dateEnd);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = t("booking.errors.name");
    if (!/^[\d\s\+\-\(\)]{7,}$/.test(form.phone)) errs.phone = t("booking.errors.phone");
    if (!form.dateStart) errs.dateStart = t("booking.errors.dateStart");
    if (!form.dateEnd) errs.dateEnd = t("booking.errors.dateEnd");
    if (!form.agreed) errs.agreed = t("booking.errors.agree");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carName,
          carSlug,
          name: form.name,
          phone: form.phone,
          dateStart: form.dateStart,
          dateEnd: form.dateEnd,
          comment: form.comment,
          totalPrice: priceCalc?.total,
          totalDays: priceCalc?.days,
        }),
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert("Ошибка отправки. Попробуйте позже.");
      }
    } catch {
      alert("Ошибка сети. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    background: inputBg,
    border: `1px solid ${hasError ? "#E24B4A" : borderColor}`,
    borderRadius: "6px",
    color: textColor,
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  });

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ fontFamily: "Raleway, sans-serif", fontSize: "20px", fontWeight: 600, color: textColor, marginBottom: "24px" }}>
        {t("booking.title")}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <input
            type="text"
            placeholder={t("booking.name")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle(!!errors.name)}
          />
          {errors.name && <span style={{ color: "#E24B4A", fontSize: "12px", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>{errors.name}</span>}
        </div>

        <div>
          <input
            type="tel"
            placeholder={t("booking.phone")}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={inputStyle(!!errors.phone)}
          />
          {errors.phone && <span style={{ color: "#E24B4A", fontSize: "12px", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>{errors.phone}</span>}
        </div>

        <div className="booking-dates" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: grayColor, fontFamily: "Inter, sans-serif", marginBottom: "4px", lineHeight: 1.4 }}>
              {t("booking.dateStart")}
            </label>
            <input
              type="date"
              min={today}
              value={form.dateStart}
              onChange={(e) => setForm({ ...form, dateStart: e.target.value })}
              style={inputStyle(!!errors.dateStart)}
            />
            {errors.dateStart && <span style={{ color: "#E24B4A", fontSize: "12px", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>{errors.dateStart}</span>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", color: grayColor, fontFamily: "Inter, sans-serif", marginBottom: "4px", lineHeight: 1.4 }}>
              {t("booking.dateEnd")}
            </label>
            <input
              type="date"
              min={form.dateStart || today}
              value={form.dateEnd}
              onChange={(e) => setForm({ ...form, dateEnd: e.target.value })}
              style={inputStyle(!!errors.dateEnd)}
            />
            {errors.dateEnd && <span style={{ color: "#E24B4A", fontSize: "12px", fontFamily: "Inter, sans-serif", marginTop: "4px", display: "block" }}>{errors.dateEnd}</span>}
          </div>
        </div>

        <textarea
          placeholder={t("booking.comment")}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          rows={3}
          style={{ ...inputStyle(false), resize: "vertical" }}
        />

        {priceCalc && (
          <div style={{ background: isDark ? "#242424" : "#F0F0F0", borderRadius: "6px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor }}>
                {priceCalc.days} {t("booking.days")}
              </span>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 700, color: "#D8A016" }}>
                {t("booking.total")}: {priceCalc.total.toLocaleString("ru-RU")} ₽
              </span>
            </div>
          </div>
        )}

        <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={form.agreed}
            onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
            style={{ marginTop: "2px", accentColor: "#D8A016" }}
          />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: grayColor }}>
            {t("booking.agree")}{" "}
            <a href="/privacy" style={{ color: "#D8A016", textDecoration: "none" }}>
              {t("booking.privacy")}
            </a>
          </span>
        </label>
        {errors.agreed && <span style={{ color: "#E24B4A", fontSize: "12px", fontFamily: "Inter, sans-serif" }}>{errors.agreed}</span>}

        <button
          type="submit"
          disabled={sending || !form.agreed}
          style={{
            width: "100%",
            padding: "14px",
            background: sending || !form.agreed ? "#555555" : "#D8A016",
            color: sending || !form.agreed ? "#999999" : "#000000",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "6px",
            border: "none",
            cursor: sending || !form.agreed ? "not-allowed" : "pointer",
            transition: "background 0.2s ease",
          }}
        >
          {sending ? t("booking.sending") : t("booking.submit")}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-dates { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
