# coffee cherry — frontend

Интернет-магазин specialty-кофе. Стек: Nuxt 3, Vue 3, TypeScript, Pinia, Tailwind CSS, Sass.

## Запуск (Docker)

Сначала поднимите backend (порт `3001`), затем:

```bash
docker compose up -d --build
```

Сайт: http://localhost:3000

## Локальный запуск без Docker

Нужен запущенный backend и Node.js ≥ 20.

```bash
npm install
npm run dev
```

## Переменные окружения

Файл `.env` в корне проекта.

| Переменная   | Описание                                     |
| ------------ | -------------------------------------------- |
| `PORT`       | Порт приложения                              |
| `NODE_ENV`   | Режим работы: `development` или `production` |
| `API_URL`    | URL REST API для браузера и SSR              |
| `SOCKET_URL` | URL Socket.IO для чата поддержки             |

Для локального Docker `API_URL` может быть `http://host.docker.internal:3001/api`.
На production укажите публичный HTTPS URL API.

## Scripts

- `npm run dev` — разработка
- `npm run build` — production-сборка
- `npm run preview` — превью сборки
