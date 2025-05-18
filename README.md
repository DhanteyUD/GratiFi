
<img width="40" alt="GratiFi - Landing page" src="https://github.com/user-attachments/assets/3df9955f-2b19-4907-b1e4-e1c1f6bc6ff9" /> 

# GratiFi


A fusion of **gratitude** and **DeFi** — appreciation powered by decentralized finance.

![GitHub repo size](https://img.shields.io/github/repo-size/DhanteyUD/GratiFi)
![GitHub last commit](https://img.shields.io/github/last-commit/DhanteyUD/GratiFi)
![Vercel](https://img.shields.io/badge/frontend-vercel-blue)
![Railway](https://img.shields.io/badge/backend-railway-green)

> [ Live Site ](https://grati-fi.vercel.app/login) &nbsp;|&nbsp; [ Demo Video ](https://www.loom.com/share/7e7534b2b43d4a06be6009b53e5bd521?sid=33ea91a5-ec6a-46e4-9e2c-3c840c68dc25)

---

## 🧠 Overview

**GratiFi** is a decentralized web app that allows users, creators, and artisans to receive appreciation via crypto tips on the Solana blockchain. Built with a modern tech stack, GratiFi leverages Web3, seamless UX, and media sharing capabilities to make gratitude borderless and impactful.

---

## 📸 Screenshots

### Landing Page
<img width="1440" alt="GratiFi - Landing page" src="https://github.com/user-attachments/assets/c9f95680-2c34-4632-bf30-72d6eb2549df" />

### Home Feed
<img width="1440" alt="GratiFi - Home" src="https://github.com/user-attachments/assets/1000e8b3-6a26-410f-b22c-2df76d44f2a4" />

### Wallet 
<img width="1440" alt="GratiFi - Wallet" src="https://github.com/user-attachments/assets/c1d82b31-1596-43c4-9670-6d6845aff62a" />

---

## ⚙️ Tech Stack

### Frontend
- **React 18 + TypeScript**
- **Vite** — Blazing-fast build tool
- **TailwindCSS** — Utility-first styling
- **Framer Motion** & **Lottie** — Animations
- **Civic Auth** — Web3 authentication
- **Solana / Web3.js** — Blockchain interaction
- **TanStack Query** — Data fetching + caching
- **Resend** - Emailing service
- **Cloudinary** — Media storage (images/videos)

### Backend
- **Node.js + Express**
- **TypeScript**
- **PostgreSQL** with **Prisma ORM**

---

## 🗂 Project Structure


```
GratiFi/
├── backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── middlewares/      # Express middlewares (auth, error handling, etc.)
│   │   ├── models/           # Prisma schema/models
│   │   ├── routes/           # API route definitions
│   │   ├── services/         # Business logic
│   │   ├── utils/            # Helpers/utilities
│   │   └── app.ts            # Express app initialization
│   ├── prisma/
│   │   └── schema.prisma     # Prisma DB schema
│   ├── .env                  # Backend environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── assets/           # Images, videos, Lottie files
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature-based folders (e.g., auth, posts, wallet)
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Route-level pages
│   │   ├── services/         # API logic (e.g., React Query hooks)
│   │   ├── types/            # TypeScript types/interfaces
│   │   ├── utils/            # Utility functions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/               # Public assets
│   ├── .env                  # Frontend environment variables
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── README.md
├── .gitignore
└── LICENSE
```
---

## 🚀 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/DhanteyUD/GratiFi.git
cd GratiFi

```

### 2. Install dependencies

Frontend:

```bash
cd frontend
npm install
```

Backend:

```bash
cd ../backend
npm install
```

### 3. Environment Variables

Create `.env` files in both `frontend/` and `backend/`.

Backend `.env`:

```
PORT=4000
NODE_ENV=development
RESEND_API_KEY=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=
DATABASE_URL=
```

Frontend `.env`:

```
VITE_API_URL=http://localhost:4000/api/v1
VITE_RAPIDAPI=
VITE_CLIENT_ID=
VITE_RAPID_SECTION_ID=
```

### 4. Start development servers

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd ../frontend
npm run dev
```

---

## 🖥  App is now running locally at:

* Frontend: `http://localhost:5173`

* Backend: `http://localhost:4000`

  
---


## ⚒️ Build for Production

Frontend:

```bash
cd frontend
npm run build
```

Backend:

```bash
cd backend
npm run build
```

---

## 📦 Deployment

* Frontend: `Vercel`

* Backend: `Railway`

---

## 📖 Usage Guide

* Connect wallet via Civic Auth

* Browse GratiStars on the feed

* View GratiStars profiles

* Send micro-tips (SOL) to appreciate the content

* View wallet balance and transaction history

* Share your creative work

---

| Name             | Role                 | GitHub Handle                              |
| ---------------- | -------------------- | ------------------------------------------ |
| Clinton Otse     | Full Stack Developer | [@DhanteyUD](https://github.com/DhanteyUD) |




