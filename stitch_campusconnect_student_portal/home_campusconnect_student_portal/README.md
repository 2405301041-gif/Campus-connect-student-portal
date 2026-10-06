# CampusConnect - Collegiate Student Portal

CampusConnect is a modern, high-performance, full-stack collegiate student portal built with **React**, **Vite**, **Tailwind CSS**, and **Node.js (Express)**.

---

## 🌟 Key Features

### 1. 🎓 Collegiate Experience & Discoverability
- **Dynamic Homepage**: Hero with atmospheric luminescence, Spring Semester live indicators, 4 metric strips, fast timeline filters, and quick action cards.
- **Campus Events Directory (`/events`)**: Real-time filtering by category (Tech, Cultural, Sports, Academic), format (In-Person, Hybrid, Virtual), search, sorting, and bookmarking.
- **HackCampus 2025 Flagship (`/events/hackcampus-2025`)**: 36-hour hackathon showcase with live countdown, 4 prize tracks ($10,000+ bounty pool), 36h sprint timeline, and instant pass registration.
- **Student Clubs & Chapters (`/clubs`)**: Directory of 60+ student organizations, categorical filters, instant join/membership management, and "Register New Club" charter wizard.
- **Official University Notices (`/announcements`)**: Verified circulars from Controller of Exams, Dean of Students, and Facilities with urgency highlights and downloadable attachments.

### 2. 👤 Personalized Student Dashboard (`/dashboard`)
- **Maya Lin Student Profile**: CS '26 Honors profile with graduation clearance activity credits meter (93% complete).
- **Holographic Digital Student ID**: Interactive modal with scannable barcode and university verification.
- **Quick QR Check-In**: Instant event attendance simulation.
- **Interactive Space Reservations**: Reserve study pods, media editing suites, and project labs with instant confirmation codes.
- **Today's Class Schedule**: Interactive timeline showing lecture, lab, and meeting statuses.

### 3. 🛠️ Utilities & Support
- **Spotlight Search (⌘K / Ctrl+K)**: Instant keyboard-driven navigation across events, clubs, circulars, and quick actions.
- **Notifications Hub**: Live university directives and registration confirmations with mark-as-read.
- **Host Campus Event**: Modal for student organizers to publish new activities directly to the portal.
- **Support & Helpdesk (`/contact`)**: Submit verified support tickets with automated ticket IDs and estimated turnaround times.

---

## 🚀 Getting Started

### Prerequisites
- Node.js LTS (v20+ or v24+)
- npm (v10+ or v11+)

### Installation
From the project folder, install dependencies for both frontend and backend:
```bash
npm run install:all
```
*(Or navigate to `/server` and `/client` individually and run `npm install`)*

---

## 💻 Running the Application

### Option A: Run Both Client & Server Concurrently (Recommended)
```bash
npm run dev
```
- **React Frontend**: [http://localhost:5173](http://localhost:5173)
- **Node.js Backend**: [http://localhost:5000](http://localhost:5000)

### Option B: Run Individually
```bash
# Terminal 1 - Backend Server
npm run dev:server

# Terminal 2 - React Vite Frontend
npm run dev:client
```

---

## 🏛️ Project Structure

```
├── client/                     # React + Vite Frontend
│   ├── public/
│   │   └── logo.svg            # CampusConnect Vector Logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Sticky header with notifications & ⌘K
│   │   │   ├── Footer.jsx              # Collegiate footer
│   │   │   ├── HostEventModal.jsx      # Publish new event
│   │   │   ├── RegisterModal.jsx       # Event pass registration + confetti
│   │   │   ├── CommandPaletteModal.jsx # ⌘K Spotlight palette
│   │   │   ├── DigitalIdModal.jsx      # Holographic student ID card
│   │   │   └── CheckInModal.jsx        # QR check-in scanner
│   │   ├── pages/
│   │   │   ├── HomePage.jsx            # Home portal view
│   │   │   ├── EventsPage.jsx          # Events directory
│   │   │   ├── EventDetailsPage.jsx    # HackCampus 2025 details & schedule
│   │   │   ├── ClubsPage.jsx           # Student societies & charter wizard
│   │   │   ├── AnnouncementsPage.jsx   # Official circulars & directives
│   │   │   ├── DashboardPage.jsx       # Maya Lin's student dashboard
│   │   │   ├── AboutPage.jsx           # Mission & student leadership council
│   │   │   └── ContactPage.jsx         # Support helpdesks & ticket submission
│   │   ├── services/
│   │   │   └── api.js                  # Frontend API service
│   │   ├── App.jsx                     # Route configuration
│   │   ├── index.css                   # Custom styles & Tailwind
│   │   └── main.jsx                    # React root entry
│   ├── index.html
│   ├── tailwind.config.js              # Campus Pulse design tokens
│   └── vite.config.js
│
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── data/
│   │   │   └── mockData.js     # Seeded mock data from Stitch prototypes
│   │   └── index.js            # Express REST API routes & server
│   └── package.json
│
├── run-all.js                  # Cross-platform concurrent runner
├── package.json                # Root scripts
└── README.md
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & service status |
| `GET` | `/api/pulse` | Live campus statistics |
| `GET` | `/api/events` | List events with filtering (category, search, format) |
| `GET` | `/api/events/:id` | Fetch single event details |
| `POST` | `/api/events` | Host & publish a new student event |
| `POST` | `/api/events/:id/register` | Register pass for event (with team & track) |
| `POST` | `/api/events/:id/bookmark` | Toggle event bookmark |
| `GET` | `/api/clubs` | List societies with filtering |
| `POST` | `/api/clubs/:id/join` | Toggle club membership |
| `POST` | `/api/clubs` | Charter a new student society |
| `GET` | `/api/announcements` | Official notices & circulars |
| `GET` | `/api/student/dashboard` | Student profile, schedule, passes, credits |
| `POST` | `/api/student/check-in` | QR attendance check-in verification |
| `POST` | `/api/student/reserve-room` | Reserve campus study pod or lab space |
| `POST` | `/api/support/ticket` | Submit verified support inquiry |
