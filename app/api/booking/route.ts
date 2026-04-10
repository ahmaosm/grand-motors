import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { carName, carSlug, name, phone, dateStart, dateEnd, comment, totalPrice, totalDays } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || botToken === "your_bot_token_here" || chatId === "your_chat_id_here") {
      console.error("Telegram credentials not configured");
      return NextResponse.json({ success: true, message: "Заявка принята (Telegram не настроен)" });
    }

    const message = [
      `🚗 *Новая заявка на аренду*`,
      ``,
      `*Автомобиль:* ${carName}`,
      `*Клиент:* ${name}`,
      `*Телефон:* ${phone}`,
      `*Даты:* ${dateStart} — ${dateEnd}`,
      totalDays ? `*Дней:* ${totalDays}` : "",
      totalPrice ? `*Итого:* ${totalPrice.toLocaleString("ru-RU")} ₽` : "",
      comment ? `*Комментарий:* ${comment}` : "",
      ``,
      `🔗 /cars/${carSlug}`,
    ]
      .filter(Boolean)
      .join("\n");

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Telegram API error:", error);
      return NextResponse.json({ success: false, error: "Telegram error" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
