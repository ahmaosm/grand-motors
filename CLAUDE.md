# Grand Motors

Сайт аренды премиальных автомобилей в Дубае.

## Стек

- Next.js 14 (App Router)
- React 18
- TypeScript
- Sharp (оптимизация изображений)

## Команды

- `npm run dev` — запуск dev-сервера
- `npm run build` — сборка проекта
- `npm run start` — запуск production-сервера
- `npm run lint` — линтинг кода

## Структура проекта

- `app/` — страницы и маршруты (Next.js App Router)
- `components/` — React-компоненты (~27 шт.)
- `constants/` — данные автомобилей и контакты
- `locales/` — переводы (ru.json, en.json)
- `utils/` — утилиты (расчёт цены, scroll-анимации)
- `public/images/` — изображения в формате WebP

## Переменные окружения

- `TELEGRAM_BOT_TOKEN` — токен Telegram-бота
- `TELEGRAM_CHAT_ID` — ID чата для уведомлений о бронировании

## Важные правила

- Не вносить изменения без согласования с автором
- Стили написаны через inline CSS (React style objects)
- Сайт двуязычный (RU / EN) — при изменении текстов обновлять оба файла в `locales/`
- Изображения только в формате WebP
- Деплой на Vercel, репозиторий на GitHub
