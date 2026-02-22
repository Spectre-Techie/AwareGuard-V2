# AwareGuard - Quick Reference Guide

## 📁 Project Structure

```
AwareGuard Version 2.0/
├── src/
│   ├── pages/              # Route pages (Home, Learn, Report, etc.)
│   ├── components/         # Reusable UI components
│   ├── context/            # React Context (Auth, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utilities (api.js, auth.js)
│   ├── data/               # Static learning data
│   ├── assets/             # Images, icons
│   └── index.css           # Global styles
├── public/                 # Static files
├── IMPLEMENTATION_PLAN.md  # This execution plan
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── netlify.toml            # Deployment config
```

## 🔗 Backend Repository

- **URL:** https://github.com/Spectre-Techie/awareguard-backend.git
- **Hosted:** Render (awareguard-backend.onrender.com)
- **Database:** MongoDB
- **Main File:** `index.js`

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/signup     - Register new user
POST   /api/auth/signin     - Login user
POST   /api/auth/google     - Google OAuth (TODO: implement)
```

### Learning
```
GET    /api/learning        - Get all modules/paths
GET    /api/learning/progress - Get user progress (auth required)
POST   /api/learning/complete - Mark module complete (auth required)
```

### AI / Questions
```
POST   /api/ask             - Ask AwareGuard question (Gemini API)
```

### Reporting & Community
```
POST   /api/report          - Submit scam report
POST   /api/stories         - Submit community story
POST   /api/leads           - Submit contact info
```

## 🔐 Environment Variables (Backend on Render)

```
GOOGLE_CLIENT_ID=...              # Google OAuth client ID
JWT_SECRET=...                    # JWT signing secret
MONGO_URI=...                     # MongoDB connection string
OPENROUTER_API_KEY=...            # TO BE REPLACED (see Phase 1.1)
GEMINI_API_KEY=...                # NEW: Gemini API key (to add)
PORT=8000                         # Server port
```

## 🛠️ Development Commands

```bash
# Frontend (Vite)
npm install                       # Install dependencies
npm run dev                       # Start dev server (localhost:5173)
npm run build                     # Build for production
npm run preview                   # Preview production build

# Backend (manual - on your machine)
npm install                       # Install dependencies
npm start                         # Start server (localhost:8000)
```

## 📌 Key Files to Know

| File | Purpose |
|------|---------|
| `src/pages/Learn.jsx` | Main learning page (being rebuilt) |
| `src/hooks/useLearningEngine.js` | Learning state logic |
| `src/context/AuthContext.jsx` | Authentication state management |
| `src/utils/api.js` | API fetch wrapper |
| `src/data/learningData.js` | Learning content structure |
| `IMPLEMENTATION_PLAN.md` | Execution strategy (this doc) |

## 🎯 Current Priorities

### Week 1
1. **API Migration** - OpenRouter → Gemini
2. **Backend Auth Middleware** - Protect routes
3. **Input Validation** - Prevent bad data

### Week 2
1. **Learn Page Core** - Functional first
2. **Engagement Features** - XP, badges, streaks
3. **Backend Learning Routes** - Fix & complete

### Week 3+
1. **Page Audits** - Consistency across app
2. **Polish & Refine** - UX improvements
3. **Testing & Deploy** - Manual testing

## 🔄 Workflow

**We will follow this process for EACH task:**

1. **Plan** - Discuss what needs to change, why, and how
2. **Explore** - Read relevant code, understand current state
3. **Design** - Sketch solution architecture
4. **Implement** - Write/modify code in frontend workspace
5. **Document** - Add comments, update this guide
6. **Commit** - Push to backend repo when ready (you handle via git)
7. **Test** - Manual testing to ensure no breakage

**Communication:**
- We discuss changes BEFORE implementing
- Code is peer-reviewed (we review each other's work)
- All changes are documented as we go
- Git commits are descriptive and meaningful

## 📊 Success Metrics

By end of project:
- ✅ Learn page is polished & production-ready
- ✅ Investor-credible (clear progression, rewards, structure)
- ✅ User engagement works (XP, badges, streaks)
- ✅ Monetization path visible (premium markers, corporate tier)
- ✅ Functional before polish (core features work)
- ✅ Well-documented (code comments, architecture clear)
- ✅ No breaking changes (all existing features still work)

## ⚠️ Important Notes

1. **Git Workflow:** Changes go to backend via git after we finish them here
2. **Environment:** Render hosts backend, Netlify hosts frontend - no changes needed there
3. **Testing:** Manual testing in browser (no automated tests yet)
4. **Branching:** Suggest feature branches on backend repo (feature/learn-rebuild, etc.)
5. **API Keys:** Already configured on Render - only code logic needs updating

## 🆘 When Stuck

1. Check this guide
2. Review IMPLEMENTATION_PLAN.md
3. Look at existing similar code
4. Ask clarifying questions
5. Break task into smaller steps

---

**Last Updated:** 2025-12-23  
**Version:** 1.0
