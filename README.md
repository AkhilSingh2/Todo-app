# Todo app (Vue + Express)

An early full-stack project (2021): a task manager with sign-up and login, drag-and-drop task lists, task status, and an admin view.

## Features
- Register, log in and forgot-password screens; JWT auth with bcrypt-hashed passwords on an Express API
- Add, edit and reorder tasks with vuedraggable; status board
- Admin registration and an admin page
- SQLite persistence

## Tech stack
Vue 2 · Vuex · Vue Router · Bootstrap · axios · Node/Express · JWT · bcrypt · SQLite

## Run
```bash
npm install
cp .env.example .env    # set JWT_SECRET
set -a; . ./.env; set +a
npm run server          # Express API on :3000 (creates the SQLite file on first run)
npm run dev             # Vue SPA on :8080
```

> Archived: an early learning project, kept for reference.
