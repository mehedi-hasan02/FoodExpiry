# 🍎 FoodExpiry — Home Food Manager

**Know what you have before it expires.**

FoodExpiry is a full-stack MERN application that helps individuals and families manage their household food inventory, track expiry dates, receive automated email reminders, and reduce food waste.

🔗 **Live App:** [https://foodexpiry.vercel.app](https://foodexpiry.vercel.app/)

---

## 📌 Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [Authentication](#authentication)
- [Expiry Tracking Logic](#expiry-tracking-logic)
- [Email Reminder System](#email-reminder-system)
- [Dashboard](#dashboard)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Security Practices](#security-practices)
- [Coding Principles](#coding-principles)
- [Project Status](#project-status)
- [Future Improvements](#future-improvements)
- [Author](#author)
- [License](#license)

---

<a id="overview"></a>
## 📖 Overview

People often forget what food they have at home and when it will expire, leading to food waste, duplicate grocery purchases, and unnecessary spending. FoodExpiry solves this by giving users a centralized digital inventory of their household food, automatic expiry status tracking, and timely email reminders — with the ability to share the entire inventory across family members.

**Main goals:**

- Manage household food inventory
- Track food expiry dates
- Send automated expiry reminder emails
- Share food inventory with family members
- Visualize inventory statistics on a dashboard
- Reduce food waste through better visibility

---

<a id="core-features"></a>
## ✨ Core Features

### 🔐 Authentication
- Register, login, and logout
- JWT-based authentication stored in HTTP-only cookies
- Password hashing with bcrypt
- Protected API routes with auth middleware
- Persistent sessions across page reloads

### 🥫 Food Management
- Add, view, update, and delete food items
- View personal foods or shared family foods
- Track quantity, unit, category, storage location, and notes
- Upload food images
- Backend-calculated expiry status (never trusts the frontend)
- Search, filter, and paginate the inventory

### 👨‍👩‍👧‍👦 Family Management
- Create a family and become its Owner
- Add or remove members by email
- Each user belongs to at most one family
- Two roles: **Owner** (full management) and **Member** (view + shared access)
- Shared visibility into the family's combined food inventory

### ⏰ Expiry Tracking
Every food item is automatically classified as:

| Status | Meaning |
|---|---|
| 🟢 Fresh | More than 3 days remain before expiry |
| 🟡 Expiring Soon | 3 days or fewer remain before expiry |
| 🔴 Expired | Expiry date has passed |

Status is always calculated on the backend from the stored expiry date, so it stays accurate and can't be spoofed by the client.

### 📧 Automated Expiry Reminders
A scheduled job scans for food expiring within the next few days, groups the results by user, and emails each user a single consolidated reminder rather than one email per item.

### 📊 Dashboard
A household overview showing total foods, expiring/expired/fresh counts, category and expiry breakdown charts, recently added items, and family member list.

---

<a id="tech-stack"></a>
## 🧰 Tech Stack

**Frontend**
React 19 · Vite · React Router DOM · Tailwind CSS v4 · DaisyUI · Axios · React Hook Form · React Toastify · React Icons · Framer Motion · Recharts · SweetAlert2

**Backend**
Node.js · Express.js · MongoDB Atlas · Mongoose · JWT · bcryptjs · Cookie Parser · CORS · Multer · Cloudinary · Nodemailer · Node Cron · dotenv

---

<a id="architecture"></a>
## 🏗️ Architecture

FoodExpiry follows a layered backend architecture, keeping responsibilities cleanly separated:

**Frontend → Express Routes → Middleware → Controller → Service → Mongoose Model → MongoDB**

- **Controllers** handle HTTP requests/responses and stay thin — no business logic lives here.
- **Services** contain the actual business logic (e.g. calculating family food inventory).
- **Models** define the MongoDB/Mongoose schemas.
- **Middleware** handles authentication, validation, file uploads, and centralized error handling.
- **Utils** hold reusable helpers such as expiry calculations and token utilities.
- **Jobs** contain scheduled background tasks like the expiry reminder cron job.

---

<a id="project-structure"></a>
## 📁 Project Structure

```
FoodExpiry/
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/    → food/, family/, dashboard/, common/
│       ├── pages/
│       ├── routes/
│       ├── context/
│       ├── hooks/
│       ├── services/
│       ├── utils/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
└── backend/
    ├── config/            → db.js, cloudinary.js, mail.js, cron.js, logger.js
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── services/          → mail.service.js
    ├── utils/
    ├── validators/
    ├── jobs/              → expiryReminder.job.js
    └── server.js
```

**Frontend pages:** Login, Register, Dashboard, Home / My Foods, Add Food, Family, Profile

**Reusable components:** FoodCard, FoodTable, FoodForm, FoodSearch, FoodFilter, ExpiryBadge, FoodDetails, UpdateFoodModal, FamilyCard, CreateFamilyModal, AddMemberModal, Navbar, Footer, Loading

---

<a id="data-models"></a>
## 🗄️ Data Models

**User** — name, email, password, profileImage, family reference, timestamps. A user's `family` field is `null` until they create or join a family.

**Food** — user reference, name, category, quantity, unit, expiryDate, location, status, notes, image, timestamps.

**Family** — familyName, familyImage, owner reference, members array (each with a user reference, role, and joinedAt date), inviteCode, timestamps. The owner is also listed inside the `members` array with the role `Owner`.

Family and food data is retrieved using Mongoose population, so member and owner references resolve into readable name/email/profileImage objects rather than raw IDs.

---

<a id="authentication"></a>
## 🔐 Authentication

Authentication uses **JWT stored inside an HTTP-only cookie**, so the token is never directly accessible to frontend JavaScript.

- The JWT payload contains the user's `id` and `email`.
- Tokens expire after **7 days**.
- An authentication middleware reads and verifies the cookie on protected routes, decoding the user info into `req.user`.
- The frontend fetches the currently authenticated user via a `withCredentials` request rather than reading the token itself.
- Frontend auth state is managed through a React `AuthContext` / `AuthProvider`.

---

<a id="expiry-tracking-logic"></a>
## ⏰ Expiry Tracking Logic

The backend computes the number of days remaining until expiry by comparing today's date (time-zeroed) against the food's expiry date, then classifies the item as Fresh, Expiring Soon (≤ 3 days), or Expired (negative days remaining). This calculation happens server-side only — the frontend is never trusted to determine status, and the displayed date is formatted contextually (e.g. "Expires tomorrow," "Expired 2 days ago").

---

<a id="email-reminder-system"></a>
## 📧 Email Reminder System

Built with **Nodemailer** (via Gmail SMTP) and **Node Cron**.

1. A daily cron job (scheduled for 8:00 AM) queries for foods expiring within the configured window (today through 3 days ahead).
2. Matching foods are grouped by user so each person receives **one** consolidated email rather than a separate email per food item.
3. The mail service builds a reminder email listing the user's expiring foods and sends it via the Gmail SMTP transporter.
4. For local testing, the schedule can temporarily run every minute before being switched back to the daily production schedule.

Gmail authentication requires a **Gmail App Password** (with 2-Step Verification enabled on the account) — never the account's regular password.

---

<a id="dashboard"></a>
## 📊 Dashboard

The dashboard gives an at-a-glance view of the household inventory:

- **Summary cards:** Total Foods, Expiring Soon, Expired, Fresh
- **Expiring Soon** and **Expired Foods** lists (first 3 items shown, with a "View All" link)
- **Food by Category** donut chart (via Recharts)
- **Expiry Overview** donut chart (Fresh / Expiring Soon / Expired, via Recharts)
- **Recently Added Foods** — the 3 most recently created items, sorted by creation date
- **My Family** — quick view of family members with a link to the full family page

All statistics are calculated dynamically from the current family-wide inventory, not hardcoded.

---

## 🔎 Search, Filtering & Pagination

- **Search** — matches food name (case-insensitive)
- **Category filter** — All, Fruits, Vegetables, Dairy, Meat, Seafood, Bakery, Beverages, Frozen, Snacks, Other
- **Status filter** — All, Fresh, Expiring Soon, Expired
- **Pagination** — 8 foods displayed per page

---

<a id="api-endpoints"></a>
## 🔗 API Endpoints

> The exact `/api` prefix depends on how routers are mounted in `server.js`.

**Authentication**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register` | Register a new user |
| POST | `/api/login` | Log in |
| POST | `/api/logout` | Log out |
| GET | `/api/me` | Get the currently authenticated user |

**Food**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/food` | Add a food item |
| GET | `/api/food` | Get the user's foods |
| GET | `/api/food/:id` | Get a single food item |
| PUT | `/api/food/:id` | Update a food item |
| DELETE | `/api/food/:id` | Delete a food item |
| GET | `/api/food/family` | Get the family's combined food inventory |

**Family**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/family` | Create a family |
| GET | `/api/family` | Get family info |
| POST | `/api/family/member` | Add a family member |
| DELETE | `/api/family/member/:memberId` | Remove a family member |

---

<a id="environment-variables"></a>
## 🔐 Environment Variables

**`frontend/.env`**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API (only `VITE_`-prefixed variables are frontend-safe) |

**`backend/.env`**

| Variable | Description |
|---|---|
| `PORT` | Port the Express server runs on |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used to sign JWTs |
| `CLIENT_URL` | Frontend origin, used for CORS |
| `MAIL_USER` | Gmail address used to send reminders |
| `MAIL_PASS` | Gmail App Password (not the account password) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

> ⚠️ Never commit `.env` files. `JWT_SECRET`, `MONGODB_URI`, `MAIL_PASS`, and `CLOUDINARY_API_SECRET` must never be exposed publicly.

---

<a id="getting-started"></a>
## 🛠️ Getting Started

### 1. Clone the repository
Clone the repo and move into the project directory.

### 2. Install the frontend
Navigate to the `frontend/` folder and install dependencies with `npm install`.

### 3. Install the backend
In a separate terminal, navigate to the `backend/` folder and install dependencies with `npm install`.

### 4. Configure environment variables
Create `frontend/.env` and `backend/.env` as described in the [Environment Variables](#environment-variables) section.

### 5. Run both apps locally
Start the backend with `npm run dev` inside `backend/` (runs on port 5000 by default), then start the frontend with `npm run dev` inside `frontend/` (Vite serves it on `localhost:5173`). Both must run simultaneously for the app to work.

**Local architecture:**
Browser → React + Vite (`localhost:5173`) → Axios → Express API (`localhost:5000`) → MongoDB Atlas

---

<a id="deployment"></a>
## 🌍 Deployment

| Layer | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Vercel / Render / Railway / VPS |
| Database | MongoDB Atlas |
| Images | Cloudinary |
| Email | Gmail SMTP |

**Frontend:** Deploy the `frontend/` directory to Vercel and set `VITE_API_URL` to the production backend URL in the Vercel project settings.

**Backend:** Requires a Node.js runtime, a MongoDB connection, all production environment variables, and CORS configured to allow the production `CLIENT_URL` with credentials enabled. Because authentication relies on cookies, all frontend requests must be sent with `withCredentials: true`, and CORS on the backend must explicitly allow the frontend origin with credentials support.

---

<a id="security-practices"></a>
## 🔒 Security Practices

- Passwords hashed with **bcryptjs** — never stored in plain text
- JWTs stored in **HTTP-only cookies**, inaccessible to client-side scripts
- All protected routes verify the authenticated user via middleware
- Sensitive configuration isolated in `.env` files, excluded from version control
- All incoming data validated on the **backend** — frontend validation (via React Hook Form) is for UX only and is never treated as a security boundary
- Expiry status is always computed server-side, never trusted from client input

---

<a id="coding-principles"></a>
## 🧠 Coding Principles

- Async/await throughout
- Thin controllers; business logic lives in services
- Reusable utility functions
- Strict backend input validation — never trust frontend values
- Expiry status always calculated on the backend
- Meaningful HTTP status codes
- Mongoose `populate()` used where relational data is needed, and `.lean()` preferred for read-only queries
- Reusable, decoupled frontend components
- Clear separation between frontend and backend responsibilities
- ES Modules and RESTful API design throughout

---

<a id="project-status"></a>
## 📌 Project Status

**Completed**
- Full authentication flow (register, login, logout, JWT, HTTP-only cookies, password hashing, session persistence)
- Food CRUD with search, filtering, and pagination
- Backend-calculated expiry status
- Family creation, member add/remove, and populated family data
- Cloudinary-based image upload for foods and profiles
- Automated expiry reminder emails via Nodemailer + Node Cron
- Full dashboard with statistics, category/expiry charts, and recent activity

---

<a id="future-improvements"></a>
## 🚧 Future Improvements

- 🍳 **Recipe suggestions** based on current inventory
- 🛒 **Shopping list** management with family sharing
- ♻️ **Waste analytics** (total expired/wasted quantity, most-wasted categories, monthly/yearly trends)
- 📈 **Advanced analytics** — consumption patterns, expiry trends, purchase frequency
- 🔔 **In-app notifications** for expiring food, new members, and invitations
- 📱 **Progressive Web App** support — installable, offline-capable, push notifications
- 📷 **Barcode scanning** for faster food entry
- 🤖 **AI features** — smart recipe suggestions, consumption prediction, personalized reminders
- 🧪 **Automated testing** — Jest/Supertest on the backend, Vitest/React Testing Library on the frontend

---

<a id="author"></a>
## 👨‍💻 Author

**Mehedi Hasan**
Full-Stack Web Developer

Technologies: JavaScript · React · Node.js · Express.js · MongoDB · FastAPI · Next.js · Tailwind CSS

---

<a id="license"></a>
## 📄 License

This project is created for educational and portfolio purposes. You may modify and extend it according to your needs.

---

⭐ If you find this project useful, consider giving the repository a star on GitHub.

**FoodExpiry — Manage Your Food. Reduce Waste. Live Smarter.**
