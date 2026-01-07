# ACCP 2026 Conference Website

The 25th Asian Conference on Clinical Pharmacy

**Theme:** Borderless Pharmacy Practice: The Collaboration for sustainability and Cultural Integration

**Dates:** July 9-11, 2026  
**Venue:** Centara Grand & Bangkok Convention Centre at CentralWorld, Bangkok, Thailand

## Tech Stack

Based on the **Pharmacy Council's Standard Tech Stack (สภาเภสัชกรรม)**

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 + Tailwind CSS 4 + shadcn/ui |
| Backend | Fastify + Drizzle ORM |
| Database | PostgreSQL 16 |
| Language | TypeScript 5.x |
| Runtime | Node.js 22+ |

## Project Structure

```
├── frontend/          # Next.js 15 App (Port 3000)
├── backend/           # Fastify API (Port 8080)
└── docker-compose.yml # PostgreSQL for development
```

## Getting Started

### Prerequisites

- Node.js 22+
- Docker (for PostgreSQL)

### 1. Start Database

```bash
docker-compose up -d
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend will run on http://localhost:8080

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:3000

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `POST /api/auth/login` | User login |
| `POST /api/auth/register` | User registration |
| `GET /api/abstracts/categories` | Get 8 topic categories |
| `POST /api/abstracts/submit` | Submit abstract |
| `GET /api/registrations/fees` | Get registration fees |
| `POST /api/registrations/register` | Register for conference |

## Key Features

- 🏠 Landing page with conference info
- 📝 Abstract submission (8 topic tracks)
- 💳 Registration & payment
- 🔐 JWT authentication
- 📱 Responsive design

## Milestones

| Date | Milestone |
|------|-----------|
| Jan 15, 2026 | Submission OPEN |
| Mar 15, 2026 | Abstract CLOSES |
| Jul 9, 2026 | Workshops |
| Jul 10-11, 2026 | Conference |

## License

Private - Pharmacy Council of Thailand
