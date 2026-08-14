# Octofit Tracker Frontend

This React presentation tier connects to the backend API for users, teams, activities, leaderboard, and workouts.

## Environment setup

Before starting the app, define `VITE_CODESPACE_NAME` in a local environment file such as `.env.local`:

```bash
VITE_CODESPACE_NAME=my-codespace
```

The app uses this value to build the Codespaces API URL:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the app falls back to `http://localhost:8000` instead of generating `https://undefined-8000...` URLs.

## Development

```bash
npm install
npm run dev
```

The frontend expects the backend to be running on port `8000`.
