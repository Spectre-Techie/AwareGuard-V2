# 🚀 RENDER ENVIRONMENT SETUP - PAYSTACK KEYS

**Status:** Ready to add keys  
**Time:** 5 minutes  
**Required Keys:** 2  

---

## 📋 KEYS TO ADD ON RENDER

### 1. PAYSTACK_SECRET_KEY
```
Key: PAYSTACK_SECRET_KEY
Value: sk_live_YOUR_SECRET_KEY_HERE
```

### 2. PAYSTACK_PUBLIC_KEY
```
Key: PAYSTACK_PUBLIC_KEY
Value: pk_live_YOUR_PUBLIC_KEY_HERE
```

---

## 🔧 STEP-BY-STEP SETUP

### Step 1: Go to Render Dashboard
1. Open: https://dashboard.render.com
2. Find your **awareguard-backend** service
3. Click on it to open service settings

### Step 2: Open Environment Variables
1. On the service page, find the **Environment** tab
2. Look for **Environment Variables** section
3. You should see your existing variables (GOOGLE_CLIENT_ID, JWT_SECRET, etc.)

### Step 3: Add PAYSTACK_SECRET_KEY
1. Click **"Add Environment Variable"** button
2. Fill in:
   - **Key:** `PAYSTACK_SECRET_KEY`
   - **Value:** `sk_live_YOUR_SECRET_KEY_HERE`
3. Click **Save** or **Add Variable**

### Step 4: Add PAYSTACK_PUBLIC_KEY
1. Click **"Add Environment Variable"** button again
2. Fill in:
   - **Key:** `PAYSTACK_PUBLIC_KEY`
   - **Value:** `pk_live_YOUR_PUBLIC_KEY_HERE`
3. Click **Save** or **Add Variable**

### Step 5: Deploy
After adding the keys:
1. Go to **Deployments** tab
2. Look for the latest deployment
3. If it's not automatically deploying:
   - Go to GitHub and make a small commit (like updating README)
   - This will trigger Render to redeploy with new environment variables
   - Or use the manual **"Deploy latest commit"** button on Render

---

## ✅ VERIFICATION CHECKLIST

After setting up environment variables:

- [ ] Both keys added to Render
- [ ] Service is redeploying (check Deployments tab)
- [ ] New deployment shows "Live" status
- [ ] Check logs for "✅ Payment routes registered"

---

## 📝 WHAT EACH KEY IS FOR

### PAYSTACK_SECRET_KEY (sk_live_...)
- Used by **BACKEND** only
- For verifying payments
- For webhook signature validation
- **NEVER expose to frontend**
- **NEVER commit to GitHub**

### PAYSTACK_PUBLIC_KEY (pk_live_...)
- Used by **FRONTEND**
- For opening payment modal
- **Can be exposed** (it's public)
- **Already added to frontend** `.env.local`

---

## 🔒 SECURITY NOTES

✅ **DO:**
- Keep secret key SECRET
- Use live keys only on production (Render)
- Use test keys for local development
- Never share your keys
- Rotate keys regularly

❌ **DON'T:**
- Commit .env files to GitHub
- Share keys in messages/emails
- Use test keys in production
- Post keys in public forums

---

## 🧪 TESTING AFTER SETUP

Once deployed, test if variables are loaded:

1. **Check deployment logs** on Render
2. **Look for:** Message like "✅ Payment routes registered"
3. **Test endpoint** (will need auth token):
   ```
   GET https://your-render-url.onrender.com/api/payments/subscription-status
   Headers: Authorization: Bearer YOUR_JWT_TOKEN
   ```
4. **Expected response:** 
   - ✅ If you get `"User not found"` or subscription data → Keys are loaded!
   - ❌ If you get 401/403 → Check auth token
   - ❌ If you get 500 with error about PAYSTACK_SECRET_KEY → Keys not loaded

---

## 🚀 QUICK REFERENCE

Your Render service environment should now have:

```
┌─────────────────────────────────────────┐
│         RENDER ENVIRONMENT VARS         │
├─────────────────────────────────────────┤
│ GOOGLE_CLIENT_ID    = [existing]        │
│ JWT_SECRET          = [existing]        │
│ MONGO_URI           = [existing]        │
│ PORT                = [existing]        │
│ PAYSTACK_SECRET_KEY = sk_live_...      │ ✅ NEW
│ PAYSTACK_PUBLIC_KEY = pk_live_...      │ ✅ NEW
└─────────────────────────────────────────┘
```

---

## 💡 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Keys not loading | Manually deploy or commit to GitHub |
| Payment fails | Check keys are correct format (sk_live_...) |
| Webhook doesn't work | Verify PAYSTACK_SECRET_KEY is set |
| Backend can't reach Paystack | Check PAYSTACK_SECRET_KEY exists |

---

## 📍 NEXT STEPS

After adding keys to Render:

1. **Wait for redeployment** (watch Deployments tab)
2. **Check deployment logs** for success
3. **Test payment endpoints** with Postman
4. **Verify webhook** can be called

**See:** BACKEND_PAYSTACK_TESTING_POSTMAN.md for testing guide

---

**Status:** Ready to add keys  
**Next:** Add keys above, wait for deployment, then test endpoints
