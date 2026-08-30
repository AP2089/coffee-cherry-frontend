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
npm install
npm run dev
```

## Переменные окружения

Файл `.env` в корне проекта.

| Переменная               | Описание                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------- |
| `NUXT_PUBLIC_API_URL`    | URL REST API для браузера (заказы, каталог, авторизация)                           |
| `NUXT_PUBLIC_SOCKET_URL` | URL Socket.IO для чата поддержки в реальном времени                                |
| `NUXT_PUBLIC_SITE_URL`   | Публичный URL сайта (canonical, OG-теги, ссылки в письмах)                         |
| `NUXT_API_URL`           | URL API для SSR на сервере Nuxt. В Docker — `http://host.docker.internal:3001/api` |

## Scripts

- `npm run dev` — разработка
- `npm run build` — production-сборка
- `npm run preview` — превью сборки
