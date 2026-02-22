# 🚀 GIT WORKFLOW & DEPLOYMENT GUIDE

**Status:** Ready to deploy  
**Time:** 10 minutes  
**Process:** Copy → Commit → Push → Auto-Deploy  

---

## 📝 FILES TO UPDATE IN YOUR BACKEND

### File 1: `models/User.js`
**Location:** `awareguard-backend/models/User.js`

**What to do:**
1. Open your User.js file in your GitHub backend
2. Find the userSchema definition
3. Add the subscription fields (from BACKEND_USER_MODEL_UPDATE.js)
4. Make sure these fields are added:
   ```javascript
   isPremium: { type: Boolean, default: false, index: true },
   subscriptionPlan: { type: String, enum: ['monthly', 'annual', 'none'], default: 'none' },
   subscriptionExpiresAt: { type: Date, default: null, index: true },
   subscriptionStartedAt: { type: Date, default: null },
   paystackReference: { type: String, default: null, unique: true, sparse: true },
   lastPaymentAmount: { type: Number, default: 0 },
   paymentHistory: [{ reference: String, amount: Number, date: { type: Date, default: Date.now }, status: String, plan: String }]
   ```

### File 2: Create `routes/payments.js`
**Location:** `awareguard-backend/routes/payments.js` (NEW FILE)

**What to do:**
1. Create new file `routes/payments.js`
2. Copy entire content from BACKEND_PAYSTACK_ROUTES.js
3. This file contains all payment endpoints

### File 3: Update `server/index.js` or `server.js`
**Location:** `awareguard-backend/server/index.js` or `server.js`

**What to do:**
1. Add import at top:
   ```javascript
   const paymentRoutes = require('../routes/payments');
   ```
2. Register routes (after cors and json middleware):
   ```javascript
   app.use('/api/payments', paymentRoutes);
   ```

### File 4: Update `.env` (Local Only)
**Location:** `awareguard-backend/.env` (in your local machine)

**What to do (LOCAL ONLY - DO NOT COMMIT):**
```env
# Add to your existing .env
PAYSTACK_SECRET_KEY=sk_test_YOUR_TEST_KEY_HERE
PAYSTACK_PUBLIC_KEY=pk_test_YOUR_TEST_KEY_HERE
```

**DO NOT COMMIT .env TO GITHUB!** It's in .gitignore for security

---

## 🔄 STEP-BY-STEP DEPLOYMENT

### Step 1: Copy Files to Your Backend

Open your `awareguard-backend` folder on your computer:

**A. Update models/User.js**
```
1. Open: awareguard-backend/models/User.js
2. Find: const userSchema = new Schema({
3. Add: The subscription fields (copy from guide above)
4. Save file
```

**B. Create routes/payments.js**
```
1. Create new file: awareguard-backend/routes/payments.js
2. Copy entire content from BACKEND_PAYSTACK_ROUTES.js
3. Save file
```

**C. Update server/index.js**
```
1. Open: awareguard-backend/server/index.js (or server.js)
2. At top, add: const paymentRoutes = require('../routes/payments');
3. Find: where routes are registered (look for app.use('/api/...'))
4. Add: app.use('/api/payments', paymentRoutes);
5. Save file
```

### Step 2: Test Locally

Before pushing to GitHub:

```bash
# In your awareguard-backend folder
npm install  # If any new packages needed

npm start    # or npm run dev

# Check console for:
# ✅ "Server running on port 3000"
# ✅ "✅ Payment routes registered" (or similar)
```

### Step 3: Commit Changes

```bash
# In awareguard-backend folder
git status  # See what changed

git add models/User.js routes/payments.js server/index.js

git commit -m "feat: Add Paystack payment integration

- Add subscription fields to User model
- Create payment routes with verification
- Add webhook handler
- Add subscription status endpoint"

git push origin main  # or master, depending on your branch
```

### Step 4: Verify Deployment on Render

1. Go to Render Dashboard: https://dashboard.render.com
2. Open your **awareguard-backend** service
3. Go to **Deployments** tab
4. Watch for new deployment to start (should auto-trigger from GitHub push)
5. Wait for status to show **"Live"** (green check mark)
6. Check logs for success messages

### Step 5: Add Environment Variables on Render

1. On your Render service page, find **Environment** tab
2. Add two new variables:
   ```
   PAYSTACK_SECRET_KEY = sk_live_YOUR_ACTUAL_KEY_HERE
   PAYSTACK_PUBLIC_KEY = pk_live_YOUR_ACTUAL_KEY_HERE
   ```
3. Click Save
4. Render will redeploy automatically

### Step 6: Verify Deployment Success

Check the Render deployment logs:
```
Look for messages like:
✅ Server running on port 3000
✅ MongoDB connected
✅ Payment routes registered
```

---

## 📋 GITHUB WORKFLOW VISUAL

```
Local Changes                GitHub                    Render
─────────────────         ──────────                 ──────────
│                         │                          │
├─ Edit User.js   ──────→ │                          │
├─ Create payments.js ──→ │ (on git push)            │
├─ Edit server.js ──────→ │                          │
│ (git commit)           │                          │
│                        ├─ Receives commit         │
(git push)   ──────────→ │                          │
│                        ├─ Triggers webhook ──────→ Auto Deploy
│                        │                          │
│                        │                          ├─ Install deps
│                        │                          ├─ Build
│                        │                          ├─ Start server
│                        │                          │
│                        │                          └─ LIVE ✅
│                        │
└──── Check Logs ←────────┴──── Check Logs ←─────────
```

---

## 🔒 ENVIRONMENT VARIABLES FLOW

```
Local Development:
├─ .env file (NOT in GitHub)
├─ Contains: sk_test_... (test keys)
└─ Used by: npm start

GitHub Repository:
├─ NO .env file (in .gitignore)
├─ Code only
└─ Safe to push

Render Production:
├─ Environment Variables (set in dashboard)
├─ Contains: sk_live_... (live keys)
└─ Auto-loaded on startup
```

---

## ✅ DEPLOYMENT CHECKLIST

### Before Committing:
- [ ] Updated `models/User.js` with subscription fields
- [ ] Created `routes/payments.js`
- [ ] Updated `server/index.js` to register payment routes
- [ ] Updated `.env` locally (test keys)
- [ ] Tested locally: `npm start` works without errors
- [ ] Checked: No `.env` being committed to GitHub

### Committing:
- [ ] `git status` shows only the files you changed
- [ ] `git add` only updated files (NOT .env or node_modules)
- [ ] `git commit` with clear message
- [ ] `git push` to origin

### After Pushing:
- [ ] Check Render: Deployment starts automatically
- [ ] Watch Render logs: Building...
- [ ] Check: Status shows "Live"
- [ ] Check: No errors in logs
- [ ] Check: Environment variables added (PAYSTACK_SECRET_KEY, PAYSTACK_PUBLIC_KEY)

### Testing:
- [ ] Render redeploys after env vars added
- [ ] Use Postman to test endpoints
- [ ] Test payment flow end-to-end

---

## 🆘 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Build fails on Render | Check npm install works locally |
| "Cannot find module" error | Make sure requires path is correct |
| Endpoints return 404 | Routes not registered in server.js |
| "PAYSTACK_SECRET_KEY undefined" | Add env var to Render dashboard |
| Localhost works but Render doesn't | Push code first, then add env vars |

---

## 📱 QUICK COMMANDS

```bash
# Navigate to backend
cd awareguard-backend

# Check status
git status

# Add files
git add models/User.js routes/payments.js server/index.js

# Commit
git commit -m "feat: Add Paystack payment integration"

# Push to GitHub
git push origin main

# View logs locally
npm start

# Check what will be pushed
git log --oneline -5
```

---

## 🚀 FULL DEPLOYMENT SEQUENCE

```
1. Copy code to backend folder
   └─ models/User.js (add fields)
   └─ routes/payments.js (new file)
   └─ server/index.js (register routes)

2. Test locally
   └─ npm start
   └─ Check for errors

3. Commit and push
   └─ git add [files]
   └─ git commit -m "message"
   └─ git push origin main

4. Watch Render deployment
   └─ Check Deployments tab
   └─ Wait for "Live" status

5. Add environment variables to Render
   └─ PAYSTACK_SECRET_KEY
   └─ PAYSTACK_PUBLIC_KEY

6. Render redeploys automatically

7. Test with Postman
   └─ GET /api/payments/subscription-status
   └─ POST /api/payments/initialize

DONE! ✅
```

---

## 📊 DEPLOYMENT STATUS REFERENCE

| Status | Meaning | Action |
|--------|---------|--------|
| Building | Code being deployed | Wait |
| Running | Server starting | Wait |
| Live | Ready to use | ✅ Test! |
| Failed | Something wrong | Check logs |
| Deploying | New version deploying | Wait |

---

## 🎓 WHAT HAPPENS WHEN YOU PUSH

```
You: git push
  ↓
GitHub: Receives code
  ↓
Render: Webhook triggered
  ↓
Render: Pulls latest code from GitHub
  ↓
Render: Runs "npm install"
  ↓
Render: Runs "npm start"
  ↓
Render: Loads environment variables
  ↓
Server: Starts listening on port 3000
  ↓
Status: Shows "Live" ✅
  ↓
You: Can test endpoints!
```

---

## 📞 SUPPORT

**If deployment fails:**
1. Check Render logs for error message
2. Compare your code with BACKEND_PAYSTACK_ROUTES.js
3. Verify server/index.js is registering routes correctly
4. Make sure all files are saved before pushing

**If endpoints don't work:**
1. Check environment variables are set on Render
2. Wait 5 minutes after adding env vars (might need time to propagate)
3. Try with test card to trigger actual payment
4. Check backend logs for errors

---

**Ready?** Follow the Step-by-Step Deployment above! 🚀

**Next:** BACKEND_PAYSTACK_TESTING_POSTMAN.md for testing guide
