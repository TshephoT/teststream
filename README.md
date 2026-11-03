# TestStream

A practical software testing learning platform. This repository contains the TestStream platform foundation.

## Technology

- Frontend: React, TypeScript and Vite
- Backend: Node.js, Express and TypeScript
- Database: MongoDB (Docker)
- Package manager: pnpm workspaces

## Prerequisites (Windows)

1. Install Git for Windows.
2. Install Node.js 22 LTS.
3. Enable Corepack and pnpm.
4. Install Docker Desktop and enable the WSL 2 backend.
5. Install Visual Studio Code.

Verify installations in PowerShell:

```powershell
node --version
corepack --version
git --version
docker --version
docker compose version
```

Enable pnpm:

```powershell
corepack enable
corepack prepare pnpm@9.15.4 --activate
pnpm --version
```

## First-time setup

Run these commands from the repository root:

```powershell
pnpm install
Copy-Item .env.example apps/api/.env
docker compose up -d mongo
pnpm dev
```

The frontend runs at http://localhost:5173.

The backend health endpoint is http://localhost:4000/api/v1/health.

## Useful commands

```powershell
pnpm dev
pnpm build
pnpm typecheck
pnpm db:up
pnpm db:down
pnpm db:logs
```

## Repository layout

```text
apps/
  api/             Express API
  web/             React frontend
packages/
  shared-types/    Types shared by frontend and backend
```

## Development rules

- Keep business logic out of route handlers; introduce service modules as domains are implemented.
- Validate incoming API data at the boundary.
- Keep secrets in local `.env` files, never in Git.
- Add tests with each meaningful feature.
- Keep API contracts documented.
- Use stable database IDs and separate human-readable identifiers (for example, `US-001`).
