# Paystack Integration - Implementation Checklist & Next Steps

**Status:** ✅ Phase 1 Complete - Frontend & Backend Code Ready  
**Current Date:** January 8, 2026  
**Next Phase:** Backend Setup & Testing  

---

## 📋 What's Been Completed

### ✅ Frontend Implementation (DONE)
- [x] Created `src/utils/paystack.js` - Payment initialization utilities
- [x] Updated `src/components/learning/PremiumUpgrade.jsx` - Full payment UI
- [x] Added Paystack script to `index.html`
- [x] Created `.env.local` template
- [x] Pricing updated to Nigerian Naira (₦9,999/month, ₦99,999/year)

**Files Created/Updated:**
- `src/utils/paystack.js` - New payment utilities
- `src/components/learning/PremiumUpgrade.jsx` - Updated with Paystack integration
- `index.html` - Added Paystack script tag

### ✅ Backend Code Templates (READY)
- [x] Created `backend-routes-payments.js` - Ready to copy to backend
- [x] Created `backend-models-User-payments.js` - Schema fields to add
- [x] Created `ENV_SETUP_GUIDE.js` - Environment variable setup

**Files Created:**
- `backend-routes-payments.js` - Payment API routes
- `backend-models-User-payments.js` - User model updates
- `ENV_SETUP_GUIDE.js` - Environment variable guide
- `.env.local` - Frontend environment template

---

## 🚀 Next Steps (In Order)

### STEP 1: Update Frontend Environment
**Time: 5 minutes**

1. Open `.env.local` in the project root
2. Add your Paystack keys:
   ```env
   VITE_PAYSTACK_PUBLIC_KEY=pk_live_YOUR_KEY_HERE
   VITE_PAYSTACK_MONTHLY_AMOUNT=9999
   VITE_PAYSTACK_ANNUAL_AMOUNT=99999
   ```
3. Replace `YOUR_KEY_HERE` with your actual Paystack public key
4. Restart development server: `npm run dev`

**Files to Edit:**
- `.env.local`

---

### STEP 2: Copy Backend Routes to Your Backend
**Time: 10 minutes**

1. Copy `backend-routes-payments.js` content
2. Create file in your backend: `routes/api/payments.js`
3. Replace the User import with your actual User model path
4. Update auth middleware import if different

**Code to Copy From:**
- `backend-routes-payments.js` (lines 1-450)

**Where to Paste:**
- `awareguard-backend/routes/api/payments.js` (NEW FILE)

**Register in Your Backend App:**
Add to main backend file (index.js / server.js):
```javascript
const paymentRoutes = require('./routes/api/payments');
app.use('/api', paymentRoutes);

// For webhook (before JSON middleware)
app.post('/api/paystack-webhook', express.raw({type: 'application/json'}), paymentRoutes);
```

---

### STEP 3: Update User Model
**Time: 15 minutes**

1. Open your `models/User.js`
2. Add these fields to your schema:
   ```javascript
   isPremium: {
     type: Boolean,
     default: false
   },
   subscriptionPlan: {
     type: String,
     enum: ['monthly', 'annual', null],
     default: null
   },
   subscriptionExpiresAt: Date,
   subscriptionStartedAt: Date,
   paystackReference: {
     type: String,
     unique: true,
     sparse: true
   },
   lastPaymentAmount: Number
   ```

3. Add this index:
   ```javascript
   userSchema.index({ isPremium: 1, subscriptionExpiresAt: 1 });
   ```

4. Optional: Add helper methods from `backend-models-User-payments.js`

**File to Update:**
- `awareguard-backend/models/User.js`

---

### STEP 4: Update Backend Environment Variables
**Time: 5 minutes**

1. Open your `.env` file (backend root)
2. Add Paystack keys:
   ```env
   PAYSTACK_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
   ```

3. Update FRONTEND_URL if needed:
   ```env
   FRONTEND_URL=http://localhost:5173
   BACKEND_URL=http://localhost:5000
   ```

**File to Update:**
- `awareguard-backend/.env`

---

### STEP 5: Verify Authentication Middleware
**Time: 5 minutes**

Backend payment routes use `auth` middleware to verify users. Make sure your backend has:

1. A working authentication middleware at: `middleware/auth.js` (or similar)
2. The middleware should:
   - Extract JWT token from Authorization header
   - Verify token
   - Add `req.user.id` to request

**Check:**
- Does your middleware exist? ✓ / ✗
- Does it set `req.user.id`? ✓ / ✗
- Is it used in other routes? ✓ / ✗

If not implemented, create one:
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

### STEP 6: Test Payment Flow (LOCAL)
**Time: 20 minutes**

**Using Test Mode:**

1. Get test keys from Paystack Dashboard (if using test mode)
2. Update `.env.local` with test keys
3. Start frontend: `npm run dev`
4. Navigate to Premium page
5. Click "Unlock Premium"
6. Use test card: `4084 0840 8408 4081`
7. Expiry: Any future date (05/25)
8. CVV: Any 3 digits (123)
9. Verify payment shows "success" notification

**What to Check:**
- [ ] Paystack modal opens
- [ ] Can enter test card details
- [ ] Payment processes successfully
- [ ] Get success notification
- [ ] Backend logs show payment

---

### STEP 7: Verify Premium Access Works
**Time: 15 minutes**

1. After payment, check database:
   - User record should have `isPremium: true`
   - Should have `subscriptionExpiresAt` set to future date
   - Should have `paystackReference` saved

2. Check Learn page shows premium content unlocked
3. Premium modules should be accessible
4. Regular modules should still work

**Test Queries:**
```javascript
// Check user in MongoDB
db.users.findOne({ email: "test@example.com" })
// Should show:
{
  isPremium: true,
  subscriptionPlan: "monthly",
  subscriptionExpiresAt: ISODate("2026-02-08"),
  paystackReference: "premium_monthly_..."
}
```

---

### STEP 8: Setup Webhook (PRODUCTION)
**Time: 10 minutes**

When ready for production:

1. Get your production API URL (e.g., `https://api.awareguard.com`)
2. Login to Paystack Dashboard
3. Go to Settings → API Keys & Webhooks
4. Add webhook: `https://api.awareguard.com/api/paystack-webhook`
5. Select events:
   - ✓ charge.success
   - ✓ charge.failed
6. Save and test

**Webhook Events Handled:**
- `charge.success` - Updates user premium status
- `charge.failed` - Logs failed payment

---

## 📊 Implementation Verification Checklist

Use this to verify each step is complete:

### Frontend Setup
- [ ] Paystack script loads in browser (check Network tab)
- [ ] `src/utils/paystack.js` exists
- [ ] PremiumUpgrade component updated
- [ ] `.env.local` has Paystack public key
- [ ] Prices show in Naira (₦)

### Backend Setup
- [ ] `routes/api/payments.js` created with routes
- [ ] Payment routes registered in main app
- [ ] User model has subscription fields
- [ ] `.env` has PAYSTACK_SECRET_KEY
- [ ] Auth middleware exists and works

### Payment Flow
- [ ] Can navigate to Premium page
- [ ] Pricing displays correctly
- [ ] "Unlock Premium" button works
- [ ] Paystack modal opens
- [ ] Test card accepted
- [ ] Success notification shows
- [ ] Database updated with subscription

### Premium Access
- [ ] Premium modules show as unlocked
- [ ] Premium content accessible
- [ ] Regular content still works
- [ ] Subscription status endpoint works
- [ ] Cancel subscription endpoint works (optional)

---

## 🔧 Troubleshooting Guide

### Problem: "Paystack library not loaded"
**Solution:**
- Check if Paystack script loads in HTML
- Verify `index.html` has the script tag
- Check browser Network tab for script

### Problem: "Payment verification failed"
**Solution:**
- Check backend logs for error
- Verify amount matches (amount * 100 in kobo)
- Ensure token is valid and user exists
- Check Paystack secret key is correct

### Problem: "User not found after payment"
**Solution:**
- Verify JWT token decoding works
- Check `req.user.id` is set correctly
- Ensure User model ID field matches

### Problem: "Webhook not triggering"
**Solution:**
- Verify webhook URL is publicly accessible
- Check PAYSTACK_SECRET_KEY matches
- Verify webhook signature verification works
- Check backend logs for webhook calls

---

## 📞 Getting Help

**Paystack Support:**
- Docs: https://paystack.com/docs
- Status: https://paystack-status.com
- Email: support@paystack.com

**Your Keys:**
- Dashboard: https://dashboard.paystack.co
- Test Mode: Use test keys for development
- Live Mode: Use live keys for production

---

## 🎯 Success Criteria

Your implementation is complete when:

1. ✅ User can click "Unlock Premium" button
2. ✅ Paystack payment modal opens
3. ✅ Payment processes with test card
4. ✅ Database updates with premium status
5. ✅ Premium content becomes accessible
6. ✅ Can view subscription status
7. ✅ Webhooks trigger on production server
8. ✅ Real payments work with live keys

---

## 📝 Quick Reference

**Files Modified:**
```
Frontend:
├── .env.local (new)
├── src/utils/paystack.js (new)
├── src/components/learning/PremiumUpgrade.jsx (updated)
└── index.html (updated)

Backend (to be done):
├── routes/api/payments.js (new, from template)
├── models/User.js (update)
└── .env (update)
```

**Endpoints Created:**
- `GET /api/verify-payment/:reference` - Verify payment
- `POST /api/paystack-webhook` - Receive webhook
- `GET /api/subscription-status` - Get subscription
- `POST /api/cancel-subscription` - Cancel subscription

**Environment Variables:**
```env
# Frontend
VITE_PAYSTACK_PUBLIC_KEY=pk_live_...

# Backend
PAYSTACK_SECRET_KEY=sk_live_...
```

---

**🚀 Ready to go live? Follow the steps above and you'll have a working payment system in ~90 minutes!**
