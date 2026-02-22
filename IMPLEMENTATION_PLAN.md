# AwareGuard Project - Implementation Plan v2.0

**Date:** December 23, 2025  
**Owner:** Development Team  
**Status:** In Planning Phase

---

## 📋 Executive Summary

We are restructuring the AwareGuard platform to be **investor & educator credible**. Focus:
1. **Learn Page Rebuild** - Core engagement and monetization showcase
2. **API Migration** - Replace OpenRouter with Gemini API  
3. **Backend Improvements** - Auth middleware, validation, error handling
4. **Project-wide Polish** - Consistency across all pages

**Philosophy:** Function First → Polish Later

---

## 🎯 Phase 1: Foundation Work (Week 1)

### 1.1 API Key Migration (OpenRouter → Gemini)

**Files to Update:**
- Backend: `routes/sendMessages.js` - Replace OpenRouter API calls
- Backend: Config/environment handling
- Frontend: `src/utils/api.js` - Update API endpoints if needed
- Frontend: Any components calling AI features (AskAwareGuard)

**Current State:**
- Backend uses OPENROUTER_API_KEY environment variable
- Gemini API key available but not integrated

**Action Items:**
- [ ] Read sendMessages.js route completely
- [ ] Understand current OpenRouter integration
- [ ] Research Gemini API integration
- [ ] Create unified AI service module (reusable)
- [ ] Test with Gemini API
- [ ] Update error handling for new API

**Acceptance Criteria:**
- AskAwareGuard feature works with Gemini API
- No breaking changes to frontend
- Error messages clear and helpful

---

### 1.2 Backend Security & Validation Layer

**Current Issues:**
- No input validation middleware
- No auth middleware for protected routes
- Error handling is inconsistent
- No rate limiting

**Files to Create:**
- `middleware/authMiddleware.js` - JWT verification
- `middleware/validateMiddleware.js` - Input validation
- `middleware/errorHandler.js` - Centralized error handling
- `utils/validators.js` - Reusable validation functions

**Routes Needing Protection:**
- `/api/learning/*` - Require authentication for progress tracking
- `/api/stories/submit` - Require authentication to post
- `/api/leads/submit` - Optional: allow anonymous but track as guest

**Acceptance Criteria:**
- All protected routes return 401 if not authenticated
- Invalid input returns 400 with clear error message
- All errors logged and returned in consistent format
- No sensitive data exposed in error messages

---

## 🚀 Phase 2: Learn Page Rebuild (Week 2)

### 2.1 Architecture Design

**Data Structure (Frontend State):**
```javascript
// User Progress (stored in MongoDB + backend)
{
  userId: "user_id",
  currentPath: "beginner", // which learning path active
  completedModules: ["phishing-basics", "job-scam"],
  totalXP: 45,
  level: 1, // Calculated: floor(XP / 500) + 1
  badges: ["first-lesson", "5-modules"],
  streak: 3, // days
  joinedDate: timestamp,
  premiumAccess: false
}

// Learning Path Structure
{
  id: "beginner",
  title: "Online Safety Foundations",
  description: "...",
  estimatedHours: 4,
  difficulty: "Beginner",
  modules: [
    {
      id: "phishing-basics",
      title: "Phishing Awareness",
      description: "...",
      xp: 10,
      estimatedMinutes: 15,
      premium: false,
      lessons: [{title, content, quiz}],
      completion: 0 // 0-100%
    }
  ]
}
```

### 2.2 Component Architecture

**New Components:**
```
src/components/learning/
├── LearningHeader.jsx          # Progress bar, level, XP display
├── PathSelector.jsx             # Choose beginner/advanced/custom
├── ModuleCard.jsx               # Clickable module preview
├── ModuleViewer.jsx             # Full lesson + quiz view
├── ProgressTracker.jsx          # Visual progress bar
├── BadgeDisplay.jsx             # Earned badges
├── StreakCounter.jsx            # Daily streak display
├── PremiumBadge.jsx             # "Premium" label indicator
└── GuestModeNotice.jsx          # "Sign in to track progress"
```

**Updated Components:**
- `Learn.jsx` - Orchestrator, handles routing between selector/modules/progress
- Update `AuthContext.jsx` - Add learning-specific data

### 2.3 User Engagement Features

**1. Progression System:**
- ✅ Module completion tracking
- ✅ XP calculation (10-25 per module)
- ✅ Level system (every 500 XP = +1 level)
- ✅ Completion percentage per path
- ✅ Next recommended module

**2. Gamification:**
- ✅ Badges: first-lesson, 5-modules, 10-modules, pathway-complete, streak-7
- ✅ Daily streak counter
- ✅ Leaderboard positions (optional Phase 3)

**3. Credibility Indicators:**
- ✅ Completion badges (looks "real")
- ✅ Time estimates per module (realistic)
- ✅ Difficulty levels (structured)
- ✅ Corporate training path (separate premium track)
- ✅ Certificate generation (Phase 3, backend support needed)

**4. Guest vs Authenticated:**
- Guests: View all content, cannot track progress, "Sign in to continue" prompt
- Authenticated: Full tracking, badges, level progression
- Premium: Clearly marked but not functional yet (UX shows it's coming)

---

### 2.4 Backend Learning Routes (to complete/fix)

**Current Routes (routes/learning.js):**
- `GET /api/learning` - Return all modules/paths
- `GET /api/learning/progress` - Get user progress
- `POST /api/learning/complete` - Mark module complete (needs auth)

**Issues to Fix:**
- [ ] No user authentication verification
- [ ] No XP validation (prevent cheating)
- [ ] No duplicate completion prevention
- [ ] Missing streak calculation logic

**Acceptance Criteria:**
- Authenticated users can complete modules
- XP only awarded once per module
- Streak resets after 24 hours of inactivity
- Progress syncs between backend and frontend

---

## 🛠️ Phase 3: Page Audits & Consistency (Week 3)

### 3.1 Pages to Review & Fix

| Page | Status | Priority | Issues |
|------|--------|----------|--------|
| Home | ✅ | Low | Update with Learn page link |
| SignIn/SignUp | ✅ | Low | Add Google OAuth test |
| Learn | 🔴 | Critical | Full rebuild (Phase 2) |
| AskAwareGuard | 🟡 | High | Gemini API integration |
| Report | 🟡 | High | Validation, UX polish |
| CommunityStories | 🟡 | Medium | Auth requirement, forms |
| Scams | ✅ | Low | Content review |
| Navbar/Footer | 🟡 | Medium | Navigation consistency |

### 3.2 Cross-Cutting Improvements

**Error Handling:**
- Consistent error messages (no technical jargon for users)
- Loading states for all API calls
- Fallback UI for offline/failed requests

**Performance:**
- Lazy load modules
- Cache learning data
- Image optimization
- Code splitting (each page separate bundle)

**Accessibility:**
- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

**Mobile Responsiveness:**
- Test all pages on mobile
- Touch-friendly buttons (48px minimum)
- Readable text (16px minimum)

---

## 📊 Phase 4: Monetization (Strategic)

### 4.1 UX Strategy (Non-functional, design-only)

**Free Tier:**
- ✅ Beginner path (all modules)
- ✅ Basic progress tracking
- ✅ 1 AskAwareGuard question per day
- ✅ Community stories

**Premium Tier:**
- 🔒 Advanced path
- 🔒 Unlimited AskAwareGuard
- 🔒 Certificate on completion
- 🔒 Progress analytics/download
- 🔒 Corporate training customization

**Corporate Training:**
- 🔒 Custom learning paths
- 🔒 Team management
- 🔒 Progress analytics
- 🔒 Branded certificates

**Visual Indicators (Phase 2):**
- Premium content shows lock icon
- "Premium Feature - Coming Soon" badge
- Clear upgrade CTA (not pushy)

---

## 🔧 Technical Debt & Improvements

### Current Code Smells
1. ❌ No JSDoc comments on most functions
2. ❌ No error boundary components
3. ❌ Magic strings everywhere (API endpoints)
4. ❌ No logging/monitoring
5. ❌ No TypeScript (consider future)
6. ❌ Inconsistent naming conventions

### Quick Wins
1. ✅ Create `.env.example` file
2. ✅ Add JSDoc to critical functions
3. ✅ Create constants file for all magic strings
4. ✅ Add error boundaries to pages
5. ✅ Create loading skeleton components

---

## 📅 Execution Timeline

```
Week 1 (Dec 23-29):
  ├─ API Migration (OpenRouter → Gemini)
  ├─ Backend validation & auth middleware
  └─ Environment setup & constants

Week 2 (Dec 30-Jan 5):
  ├─ Learn page functional core
  ├─ Engagement features (XP, badges, streaks)
  └─ Backend learning route fixes

Week 3 (Jan 6-12):
  ├─ Page audits (Home, Report, Stories, etc.)
  ├─ Cross-page consistency
  └─ Error handling & accessibility

Week 4+ (Polish & Deploy):
  ├─ UI Polish & animations
  ├─ Testing & bug fixes
  ├─ Documentation
  └─ Production deployment
```

---

## 🚦 Definition of Done (per task)

- [ ] Code written follows project style guide
- [ ] JSDoc comments added to functions
- [ ] No console.log spam (logging framework used)
- [ ] Error handling covers happy + sad paths
- [ ] Git commits are clear & descriptive
- [ ] Changes documented in relevant README/PLAN
- [ ] Manual testing completed
- [ ] No breaking changes to related features
- [ ] Performance verified (no new regressions)

---

## 📝 Documentation Standards

**All code must include:**
```javascript
/**
 * Brief description of what this does
 * @param {Type} paramName - Description
 * @returns {Type} Description
 * @throws {Error} When something bad happens
 * @example
 * functionName(param) // does X
 */
```

**All files should have a header:**
```javascript
/**
 * @file Brief description of file purpose
 * @module moduleName
 * @version 1.0
 * @since 2025-12-23
 */
```

**Commits should follow:**
```
<type>(<scope>): <subject>

<body>

<footer>

Examples:
- feat(learn): add XP system to module completion
- fix(auth): prevent JWT token expiration on refresh
- docs(README): update API documentation
```

---

## 🎬 Next Steps

1. **Review & Approve Plan** - Confirm priorities, timeline, architecture
2. **Set Up Git Workflow** - Branches, PR process, commit conventions
3. **Start Phase 1.1** - API migration (OpenRouter → Gemini)
4. **Create Subtasks** - Break each phase into smaller, trackable items
5. **Regular Checkpoints** - Weekly syncs to assess progress & adjust

---

## 👥 Collaboration Notes

- **Code Reviews:** All changes peer-reviewed before merge
- **Communication:** Async-first, sync weekly
- **Documentation:** Written as we go, not after
- **Testing:** Manual testing + future unit tests
- **Deployment:** Render backend, Netlify frontend (no changes to process)

---

**Document Version:** 1.0  
**Last Updated:** 2025-12-23  
**Next Review:** After Phase 1 completion
