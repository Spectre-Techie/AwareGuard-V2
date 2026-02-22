# Unimplemented Features - Quick Reference

## Summary Table

| Feature | Component | Current State | Issue | What's Needed |
|---------|-----------|---------------|----- -|-----|
| **Stripe Payment** | PremiumUpgrade.jsx | `alert("redirect")` | No actual checkout | Stripe API integration + webhook handling |
| **Quiz Save** | ModuleViewer.jsx | Shows score only | No backend persistence | `/api/learning/quiz-submit` endpoint |
| **Premium Check** | Learn.jsx | Frontend only | Can be bypassed | Backend validation on every access |
| **Contact Sales** | CorporateTraining.jsx | `alert("redirecting")` | No form or calendar | Calendly/Form + email to sales team |
| **Gamification** | Learn.jsx | Shows level/streak | Not validated | Backend level/streak calculation + achievements |
| **Analytics** | None | Not implemented | Can't measure engagement | Event tracking to Mixpanel/GA |
| **Corporate Plans** | CorporateTraining.jsx | Hardcoded prices | Can't update dynamically | Backend `/api/corporate/plans` |
| **Pricing** | PremiumUpgrade.jsx | Hardcoded ($9.99/$99.99) | Can't change without code | Backend `/api/pricing/plans` |
| **Email** | None | Not implemented | No confirmations/reminders | SendGrid/Mailgun integration |
| **Achievements** | None | Not implemented | No badges/rewards | Achievement unlock system |
| **Guest Mode** | Learn.jsx | Limited | Can't save progress | localStorage + migration endpoint |
| **Leaderboard** | None | Not implemented | No competition | `/api/leaderboard` endpoint |
| **Data Export** | None | Not implemented | GDPR violation | `/api/user/export-data` endpoint |
| **Account Delete** | None | Not implemented | GDPR violation | `/api/user/delete-account` endpoint |
| **Subscription Status** | Learn.jsx | Guessed from user | No verification | `/api/user/subscription-status` endpoint |
| **Module Access** | Learn.jsx | Frontend only | Can be bypassed | Backend enforcement on module access |

---

## Feature Groups

### 🔴 CRITICAL (Payment & Core)
1. **Stripe Integration** → Users can't pay
2. **Quiz Persistence** → Progress lost
3. **Premium Validation** → Security issue
4. **Module Access Control** → XP cheating possible

### 🟠 HIGH (UX & Engagement)
5. **Contact Sales Form** → Can't convert corporate deals
6. **Analytics** → Can't optimize
7. **Achievement System** → Can't retain users
8. **Email System** → Can't re-engage

### 🟡 MEDIUM (Features)
9. **Gamification Backend** → Leaderboards/streaks unreliable
10. **Corporate Plans** → Can't update pricing
11. **Guest Mode** → Limited trial experience

### 🟢 LOW (Compliance)
12. **GDPR Export** → Legal risk
13. **Account Delete** → Legal risk

---

## Code Locations

### Alert-Only Features (Fake Implementation)
```
Learn.jsx
├── handleUpgrade() line 113-116 ❌ Just alert
└── handleContactSales() line 118-121 ❌ Just alert

CorporateTraining.jsx
├── onContactSales button ❌ Just alert
└── Schedule Demo button ❌ Just alert
```

### Hardcoded Features (Need Backend)
```
PremiumUpgrade.jsx
├── premiumFeatures[] line 22-29 ❌ Hardcoded
└── pricing object line 35-45 ❌ Hardcoded

CorporateTraining.jsx
├── plans[] line 24-69 ❌ Hardcoded
├── benefits[] line 74-87 ❌ Hardcoded
└── useCases[] line 90-96 ❌ Hardcoded
```

### Frontend-Only Logic (Needs Backend Validation)
```
Learn.jsx
├── isPremium check line 25-26 ⚠️ Guessed
└── Module access line 85-92 ⚠️ Frontend only

ModuleViewer.jsx
├── Quiz submission line 162-174 ⚠️ Not saved
└── Completion line 97-111 ⚠️ Partial

useLearningEngine.js
├── Progress load ⚠️ Endpoint exists but untested
└── Completion save ⚠️ Endpoint exists but untested
```

---

## Backend Endpoints Needed

### Authentication & User
```
❌ GET /api/user/subscription-status
   Check if user is premium, plan type, expiry date

❌ POST /api/user/export-data (GDPR)
   Download all user data

❌ POST /api/user/delete-account (GDPR)
   Delete account and anonymize data
```

### Learning & Progress
```
✓ GET /api/learning/progress (Exists but untested)
⚠️ POST /api/learning/complete (Exists but untested)

❌ POST /api/learning/quiz-submit
   Save quiz attempt with answers and score

❌ GET /api/modules/:moduleId
   Return module with access control check
```

### Gamification
```
❌ GET /api/user/achievements
   List user's unlocked achievements

❌ GET /api/achievements/progress
   Check progress toward achievements

❌ GET /api/leaderboard
   Global leaderboard data
```

### Payments
```
❌ POST /api/create-checkout-session
   Create Stripe checkout session

❌ POST /api/webhooks/stripe
   Handle Stripe events (webhook)

❌ GET /api/pricing/plans
   Get current pricing plans

❌ GET /api/pricing/validate-promo
   Validate promo codes
```

### Corporate
```
❌ GET /api/corporate/plans
   Get corporate training plans

❌ POST /api/corporate/request-quote
   Generate custom quote

❌ POST /api/sales/contact-inquiry
   Save sales inquiry + email team
```

### Analytics
```
❌ POST /api/events/track
   Track user engagement events

❌ POST /api/events/page-view
   Track page views
```

### Features (CMS)
```
❌ GET /api/features/premium-list
   Get premium features list (data-driven)
```

---

## UI Components Needed

### New Components
```
❌ src/components/ContactSalesForm.jsx
   - Email, company, employee count
   - Submit to backend
   - Show confirmation

❌ src/components/AchievementUnlocked.jsx
   - Show when achievement earned
   - Animation + toast

❌ src/components/Leaderboard.jsx
   - Display top users
   - Show user's rank

❌ src/components/PromoCodeInput.jsx
   - Apply discount code
   - Validate before purchase
```

### Modified Components
```
⚠️ PremiumUpgrade.jsx
   - Hook up to Stripe
   - Fetch pricing from backend
   - Add promo code field

⚠️ CorporateTraining.jsx
   - Link to contact form
   - Fetch plans from backend
   - Add quote request flow

⚠️ Learn.jsx
   - Add analytics tracking
   - Add achievement notifications
   - Add email preferences
```

---

## Implementation Timeline

### Week 1: Payment System (HIGH PRIORITY)
- [ ] Set up Stripe account & products
- [ ] Create `/api/create-checkout-session` endpoint
- [ ] Create `/api/webhooks/stripe` endpoint
- [ ] Update database User schema (subscription fields)
- [ ] Integrate Stripe in PremiumUpgrade component
- [ ] Test end-to-end payment flow

### Week 2: Core Learning Features
- [ ] Create `/api/learning/quiz-submit` endpoint
- [ ] Update ModuleViewer to save quiz results
- [ ] Create achievement system backend
- [ ] Test quiz persistence

### Week 3: Sales & Corporate
- [ ] Create contact form component
- [ ] Create `/api/sales/contact-inquiry` endpoint
- [ ] Set up email to sales team
- [ ] Test email delivery

### Week 4: Analytics & Polish
- [ ] Add event tracking
- [ ] Set up analytics dashboard
- [ ] Test all tracking
- [ ] Performance optimization

---

## Risks & Blockers

### 🔴 Critical Risks
1. **No Payment System** → Can't monetize
2. **No Quiz Save** → Users lose progress
3. **No Email** → Can't communicate with users
4. **No Analytics** → Flying blind

### 🟠 Blocking Issues
1. **Stripe Account** → Needed before week 1 can start
2. **Email Provider** → SendGrid/Mailgun account needed
3. **Backend Environment** → Need to add new endpoints
4. **Database Schema** → Need to add subscription fields

### 🟡 Design Questions
1. Should premium unlock immediately or after confirmation?
2. Should quiz bonus XP be automatic or need approval?
3. Should contact form send email or go to CRM?
4. Should leaderboard be public or private?

---

## Cost Estimates (Rough)

| Service | Monthly Cost | What For |
|---------|------|---------|
| Stripe | 2.9% + $0.30 per transaction | Payments |
| SendGrid | $10-$100 | Email (1k-100k emails/month) |
| Mixpanel | $150 | Analytics |
| AWS (extra) | $50 | Webhook processing |
| **Total** | **$200-$250** | **All services** |

---

## Questions to Answer Before Building

1. **Payment Model**
   - Should premium be monthly only? Annual only? Both?
   - What's the free trial period? (7 days? 14 days?)
   - Should free users see any modules at all?

2. **Corporate Sales**
   - Who closes deals? (Sales team, demos, self-serve?)
   - Should custom quotes go to CRM? Email?
   - What's minimum team size? (5? 10? 50?)

3. **Email**
   - What's the unsubscribe preference? (All, or per-type?)
   - How often should we email? (Daily? Weekly? On-demand?)
   - Should we have email templates?

4. **Analytics**
   - What KPIs matter most? (Conversion? Completion? Engagement?)
   - How detailed should tracking be?
   - What's the reporting cadence? (Daily? Weekly?)

5. **Features**
   - Should premium features be in UI? (Locked icons? Hidden sections?)
   - Should free users see corporate section?
   - Should we have feature flags for A/B testing?

---

## Next Action Items

**Choose ONE:**

A) **Build Payment System First** (Week 1)
   - Unblocks monetization
   - Highest revenue impact
   - Requires Stripe setup

B) **Build Quiz Persistence** (Days 1-2)
   - Quick win
   - Improves UX immediately
   - Fewer dependencies

C) **Build Contact Sales** (Days 1-2)
   - Gets corporate inquiries
   - Easy implementation
   - No payment needed

**Recommendation:** Do B + C this week, do A next week after Stripe setup.
