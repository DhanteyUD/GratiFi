# GratiFi

A fusion of gratitude and DeFi (appreciation via decentralized finance

<img width="1440" alt="GratiFi - Landing page" src="https://github.com/user-attachments/assets/c9f95680-2c34-4632-bf30-72d6eb2549df" />

[ [Website](https://grati-fi.vercel.app/login) ] [ [Demo Video](https://www.loom.com/share/7e7534b2b43d4a06be6009b53e5bd521?sid=33ea91a5-ec6a-46e4-9e2c-3c840c68dc25) ]

GratiFi is a decentralized web application built on `React + Solana`, which uses the power of Web3 to help users, content creators, and artisans showcase their talent.

## Example Screen

<img width="1440" alt="GratiFi - Home" src="https://github.com/user-attachments/assets/1000e8b3-6a26-410f-b22c-2df76d44f2a4" />



<img width="1440" alt="GratiFi - Wallet" src="https://github.com/user-attachments/assets/c1d82b31-1596-43c4-9670-6d6845aff62a" />

## Tech Stack

### Frontend

- React 18 + TypeScript
- Civic Auth - Authentication
- Vite - Build tool
- TailwindCSS - Styling
- Lottie and Framer - Animation
- Solana, Web3.js - blockchain integration
- Tanstack React Query - Data fetching and Caching
- Cloudinary - Media storage bucket

### Backend

- Node.js + Express
- TypeScript
- PostgreSQL with Prisma

## Project Structure

```
GratiFi/
├── backend/            # Node.js/Express backend server
├── frontend/           # Frontend React application
├─
```

## Prerequisites

- Node.js (v18 or higher)
- Prisma + PostgreSQL
- Solana CLI tools
- Npm package manager (or Yarn)

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/DhanteyUD/GratiFi.git
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
npm install
```

4. Set up environment variables:

   - Create `.env` file in the backend directory with:
     ```
     PORT=4000
     NODE_ENV=developement
     RESEND_API_KEY=
     CLOUDINARY_CLOUD_NAME=
     CLOUDINARY_API_KEY=
     CLOUDINARY_API_SECRET=
     CLOUDINARY_URL=
     DATABASE_URL=
     ```
   - Create `.env` file in the frontend directory with:
     ```
     VITE_API_URL=http://localhost:4000/api/v1
     VITE_RAPIDAPI=
     VITE_CLIENT_ID=
     VITE_RAPID_SECTION_ID=

     ```

5. Start the development servers:

   Backend:

   ```bash
   cd backend
   npm run dev
   ```

   Frontend:

   ```bash
   cd app
   npm run dev
   ```

The application should now be running at:

- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Building for Production

1. Build the frontend:

```bash
cd app
npm run build
```

2. Build the backend:

```bash
cd backend
npm run build
```

> Backend deployed with Railway app
> Frontend deployed with Vercel
