# CRM API

NestJS + Prisma + PostgreSQL

## Local Dev

```bash
cp .env.example .env
npm install
npx prisma generate
npm run start:dev
```

## Docker

```bash
docker compose -f ../docker-compose.crm.yml up -d
```

## Seed database

```bash
npx tsx prisma/seed.ts
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/login | Login |
| POST | /api/auth/register | Register |
| GET | /api/auth/me | Current user |
| GET/POST/PATCH/DELETE | /api/clients | Clients CRUD |
| GET/POST/PATCH/DELETE | /api/deals | Deals CRUD |
| GET | /api/deals/pipeline | Pipeline stats |
| GET/POST/PATCH/DELETE | /api/tasks | Tasks CRUD |
| GET/POST/PATCH/DELETE | /api/companies | Companies CRUD |
| GET | /api/dashboard/stats | Dashboard |
