# coffee cherry — frontend

Интернет-магазин specialty-кофе. Стек: Nuxt 3, Vue 3, TypeScript, Pinia, Tailwind CSS, Sass.

## Запуск (Docker)

Сначала поднимите backend (порт `3001`), затем:

```bash
docker compose up -d --build
```

Dev-режим с hot reload:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Сайт: http://localhost:3000

SSR ходит в API через `host.docker.internal:3001`.

## Локальный запуск без Docker

Нужен запущенный backend и Node.js ≥ 20.

```bash
cp .env.example .env
# для локального dev можно:
# NUXT_API_URL=http://localhost:3001/api
npm install
npm run dev
```

## Переменные окружения

| Переменная            | Описание                                          |
| --------------------- | ------------------------------------------------- |
| `NUXT_PUBLIC_API_URL` | URL API для браузера                              |
| `NUXT_API_URL`        | URL API для SSR (в Docker — host.docker.internal) |

## Scripts

- `npm run dev` — разработка
- `npm run build` — production-сборка
- `npm run preview` — превью сборки

## Страницы

- `/` — главная, коллекция
- `/coffee/[slug]` — карточка сорта
- `/cart`, `/checkout`, `/order-success` — корзина и заказ
- `/story`, `/contacts` — о проекте и контакты
