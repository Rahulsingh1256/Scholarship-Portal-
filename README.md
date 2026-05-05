# Oratal – Scholarship Portal 🎓

A full-stack scholarship discovery platform built with React, Node.js, Express, and MongoDB.

---

## 🚀 Setup Instructions

### Prerequisites
- [Node.js v18+](https://nodejs.org) (Download and install first — not currently on your system)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) OR [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud, free tier)
- [Git](https://git-scm.com) (already installed)

---

### 1. Install Node.js
Download from: https://nodejs.org/en/download
Choose **LTS version**. After installing, restart your terminal and verify:
```bash
node --version    # Should show v18.x or higher
npm --version     # Should show 9.x or higher
```

---

### 2. Backend Setup

```bash
cd scholarship-portal/server

# Install dependencies
npm install

# The .env file is already created for you with defaults
# Edit it if needed (especially MONGO_URI if using Atlas)

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

Server will run at: **http://localhost:5000**

---

### 3. Frontend Setup

Open a NEW terminal:
```bash
cd scholarship-portal/client

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Frontend will run at: **http://localhost:5173**

---

## 🔐 Demo Accounts (after seeding)

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Admin   | admin@oratal.com       | admin123    |
| Student | student@oratal.com     | student123  |

---

## 📁 Project Structure

```
scholarship-portal/
├── client/                          ← React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── api/axios.js             ← Axios with JWT interceptor
│   │   ├── context/AuthContext.jsx  ← Global auth state
│   │   ├── components/
│   │   │   ├── Sidebar.jsx          ← Role-based navigation
│   │   │   ├── ScholarshipCard.jsx  ← Reusable card with bookmark
│   │   │   ├── ProtectedRoute.jsx   ← Route guard + layout
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── student/
│   │   │   │   ├── Dashboard.jsx         ← Stats + recent activity
│   │   │   │   ├── Scholarships.jsx      ← Browse with search/filter
│   │   │   │   ├── ScholarshipDetail.jsx ← Full details + apply
│   │   │   │   ├── Bookmarks.jsx         ← Saved scholarships
│   │   │   │   └── MyApplications.jsx    ← Track applications
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx    ← Stats + recent apps
│   │   │       ├── ManageScholarships.jsx← CRUD scholarships
│   │   │       ├── ManageUsers.jsx       ← User management
│   │   │       └── ManageApplications.jsx← Review applications
│   │   └── App.jsx                  ← Router with role-based redirects
│   └── ...config files
│
└── server/                          ← Node.js + Express API
    ├── models/
    │   ├── User.js                  ← name, email, password, role, bookmarks
    │   ├── Scholarship.js           ← title, description, eligibility, etc.
    │   └── Application.js           ← user, scholarship, status, notes
    ├── controllers/
    │   ├── authController.js        ← signup, login, profile
    │   ├── scholarshipController.js ← CRUD + search/filter/pagination
    │   ├── userController.js        ← bookmarks, apply, applications
    │   └── adminController.js       ← stats, users, application review
    ├── routes/
    │   ├── auth.js, scholarships.js, users.js, admin.js
    ├── middleware/
    │   ├── auth.js                  ← JWT protect + adminOnly
    │   └── errorHandler.js          ← Global error handling
    ├── utils/seeder.js              ← Seed 9 real Indian scholarships
    ├── .env                         ← Environment variables
    └── server.js                    ← Express entry point
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint               | Access   |
|--------|------------------------|----------|
| POST   | /api/auth/signup       | Public   |
| POST   | /api/auth/login        | Public   |
| GET    | /api/auth/me           | Private  |
| PUT    | /api/auth/profile      | Private  |
| PUT    | /api/auth/change-password | Private |

### Scholarships
| Method | Endpoint               | Access   |
|--------|------------------------|----------|
| GET    | /api/scholarships      | Public   |
| GET    | /api/scholarships/:id  | Public   |
| POST   | /api/scholarships      | Admin    |
| PUT    | /api/scholarships/:id  | Admin    |
| DELETE | /api/scholarships/:id  | Admin    |

### Student
| Method | Endpoint                        | Access  |
|--------|---------------------------------|---------|
| POST   | /api/users/bookmark/:id         | Student |
| GET    | /api/users/bookmarks            | Student |
| POST   | /api/users/apply/:id            | Student |
| GET    | /api/users/applications         | Student |
| DELETE | /api/users/applications/:id     | Student |

### Admin
| Method | Endpoint                             | Access |
|--------|--------------------------------------|--------|
| GET    | /api/admin/stats                     | Admin  |
| GET    | /api/admin/users                     | Admin  |
| PUT    | /api/admin/users/:id/toggle          | Admin  |
| DELETE | /api/admin/users/:id                 | Admin  |
| GET    | /api/admin/applications              | Admin  |
| PUT    | /api/admin/applications/:id/status   | Admin  |

---

## ✅ Features Implemented

- [x] JWT Authentication (signup/login/logout)
- [x] Role-based access (Student & Admin)
- [x] Browse scholarships with search + category filter + pagination
- [x] Scholarship details with eligibility, guidelines, documents
- [x] Bookmark/save scholarships (toggle)
- [x] Apply for scholarships with optional cover note
- [x] Track application status (Pending/Under Review/Approved/Rejected)
- [x] Withdraw pending applications
- [x] Admin: Full scholarship CRUD (create/edit/delete)
- [x] Admin: Review and update application status + admin notes
- [x] Admin: Manage users (search, activate/deactivate, delete)
- [x] Admin: Dashboard with stats
- [x] 9 real Indian scholarships pre-seeded
- [x] Password hashing with bcrypt
- [x] Protected routes (frontend + backend)
- [x] Input validation (express-validator)
- [x] Global error handling
- [x] Responsive design (mobile + desktop)
- [x] Dark mode UI with glassmorphism
- [x] Toast notifications
- [x] Loading states
- [x] Deadline countdown on cards

---

## 🔧 Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/oratal_scholarship
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace MONGO_URI with your connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/oratal_scholarship
```
