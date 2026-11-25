# Todo app (Vue + Express)

An early full-stack project (2021): a task manager with sign-up and login, drag-and-drop task lists, task status, and an admin view.

## Features
- Register, log in and forgot-password screens; JWT auth with bcrypt-hashed passwords on an Express API
- Add, edit and reorder tasks with vuedraggable; status board
- Admin registration and an admin page
- SQLite persistence

## Tech stack
Vue 2 · Vuex · Vue Router · Bootstrap · axios · Node/Express · JWT · bcrypt · SQLite

## Setup
```bash
npm install
cp .env.example .env   # then set JWT_SECRET to a long random string
npm run server         # Express API on :3000
npm run dev            # Vue SPA on :8080
npm run build          # production frontend bundle
```

The API reads `JWT_SECRET`, `DB_FILE`, and `PORT` from the environment. If a `.env` file is present, `npm run server` loads it without overriding variables that are already set.

`JWT_SECRET` is required when `NODE_ENV=production`. If it is missing, the API exits with an error and does not start. In development, an unset `JWT_SECRET` uses a fallback labeled `DEV_ONLY_JWT_SECRET` and prints a warning. Do not deploy with that fallback.

```bash
NODE_ENV=production JWT_SECRET=your-long-random-string npm run server
```

On first start the API creates the SQLite file (default `data/app.db`) and applies the user-table migration. Nothing is seeded; accounts are created through the register API. `data/`, `*.db`, `*.sqlite`, `*.sqlite3`, and the legacy `sqlitedb` filename are gitignored. Do not commit `.env` or database files.

> Archived: an early learning project, kept for reference.
