# AgriVision – Phase 2 Scaffold

AI-Powered Smart Farming Assistant — MERN stack project scaffold covering
project setup, SCSS 7-1 architecture, MongoDB connection, Express server,
professional routing, centralized error handling, and JWT-based
role-authenticated (RBAC) authentication.

## Structure

```
AgriVision/
├── backend/     # Node.js + Express + MongoDB API
├── frontend/    # React + Vite + SCSS (7-1) client
└── docs/        # Architecture & phase documentation
```

## Backend Setup

```bash
cd backend
cp .env.example .env    # fill in MONGO_URI and JWT secrets
npm install
npm run dev              # requires nodemon (devDependency)
```

API runs on `http://localhost:5000`, health check at `GET /api/health`.

**Auth endpoints:**
- `POST /api/auth/register` — { name, email, password, phone?, location? }
- `POST /api/auth/login` — { email, password }
- `POST /api/auth/refresh` — reads httpOnly cookie, returns new access token
- `POST /api/auth/logout` — requires Bearer token
- `GET /api/auth/me` — requires Bearer token

**RBAC example:** `GET /api/admin/ping` — requires Bearer token + `role: admin`.

## Frontend Setup

```bash
cd frontend
cp .env.example .env    # set VITE_API_BASE_URL if backend isn't on :5000
npm install
npm run dev
```

App runs on `http://localhost:5173`. Visiting `/` redirects to `/login`.
Register a user, you'll land on `/dashboard` (protected route).

## Notes

- New registrations always get `role: "farmer"`. Admin accounts should be
  provisioned directly in the database (or via a future seed script) —
  never through public signup.
- Access tokens are kept in memory (`window.__agrivision_access_token`),
  never localStorage, to reduce XSS token-theft risk. Refresh tokens live
  in an httpOnly, sameSite=strict cookie.
- All future feature modules (Farms, Weather, Disease Detection, etc.)
  should follow the same layered pattern already established in `auth`:
  `route → validator → controller → service → model`.

## Next Phase

Phase 3: Farm & Field Management module (frontend + backend), following
this same architectural pattern.
