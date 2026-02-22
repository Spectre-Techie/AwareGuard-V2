# 🧪 POSTMAN TESTING GUIDE - PAYSTACK PAYMENT ENDPOINTS

**Status:** Ready to test  
**Test Duration:** 30 minutes  
**Required:** Postman, Backend deployed, Test JWT token  

---

## 📌 BASE URL

```
https://your-render-url.onrender.com
# Example: https://awareguard-backend.onrender.com
```

---

## 🔑 AUTHENTICATION

All endpoints except webhook require JWT token in Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**How to get test token:**
1. First, login via your frontend
2. Copy the JWT token from localStorage
3. Or call your auth endpoint to get a token

---

## ✅ TEST 1: Initialize Payment

**Endpoint:** `POST /api/payments/initialize`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "amount": 9999,
  "plan": "monthly"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "authorization_url": "https://checkout.paystack.com/...",
    "access_code": "dxr8hd0h3d",
    "reference": "premium_monthly_user123_1641234567890"
  }
}
```

**What to check:**
- ✅ `success` = true
- ✅ `authorization_url` is valid Paystack URL
- ✅ Reference saved (for verification later)
- ❌ 401 Unauthorized → Check JWT token
- ❌ 400 Bad Request → Check amount/plan are correct

---

## ✅ TEST 2: Get Subscription Status (Before Payment)

**Endpoint:** `GET /api/payments/subscription-status`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Body:** None

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "isPremium": false,
    "subscriptionPlan": "none",
    "subscriptionExpiresAt": null,
    "daysRemaining": 0
  }
}
```

**What to check:**
- ✅ `isPremium` = false (not subscribed yet)
- ✅ `subscriptionPlan` = "none"
- ✅ `daysRemaining` = 0

---

## ✅ TEST 3: Verify Payment (Simulate)

**This would normally be done by the frontend after Paystack success**

To test, you need:
1. A valid Paystack transaction reference
2. To use a test card to actually create a transaction

**Option A: Use Real Test Card**
1. Go to your frontend Premium page
2. Click "Unlock Premium"
3. Enter test card: `4084 0840 8408 4081`
4. Enter any future date (05/25)
5. Enter any 3-digit CVV (123)
6. Complete payment
7. Get the reference from Paystack
8. Use reference below

**Option B: Verify Any Reference**

**Endpoint:** `GET /api/payments/verify/:reference`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Example:**
```
GET https://your-backend.onrender.com/api/payments/verify/premium_monthly_user123_1641234567890
```

**Expected Response (If Valid):**
```json
{
  "success": true,
  "message": "Premium subscription activated successfully!",
  "data": {
    "user": {
      "email": "user@example.com",
      "isPremium": true,
      "subscriptionPlan": "monthly",
      "subscriptionExpiresAt": "2025-02-08T10:30:00.000Z"
    }
  }
}
```

**What to check:**
- ✅ `success` = true
- ✅ `isPremium` = true (now premium!)
- ✅ `subscriptionExpiresAt` is 1 month in future
- ✅ Database updated with user premium status

---

## ✅ TEST 4: Check Subscription Status (After Payment)

**Same as Test 2, but now after payment:**

**Endpoint:** `GET /api/payments/subscription-status`

**Expected Response (After Successful Payment):**
```json
{
  "success": true,
  "data": {
    "isPremium": true,
    "subscriptionPlan": "monthly",
    "subscriptionExpiresAt": "2025-02-08T10:30:00.000Z",
    "daysRemaining": 31
  }
}
```

**What to check:**
- ✅ `isPremium` = true (successfully upgraded!)
- ✅ `subscriptionPlan` = "monthly"
- ✅ `daysRemaining` = ~30 (month from now)

---

## ✅ TEST 5: Cancel Subscription

**Endpoint:** `POST /api/payments/cancel-subscription`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:** `{}` (empty)

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Subscription cancelled successfully",
  "data": {
    "user": {
      "email": "user@example.com",
      "isPremium": false,
      "subscriptionPlan": "none"
    }
  }
}
```

**What to check:**
- ✅ `success` = true
- ✅ `isPremium` = false (downgraded)
- ✅ `subscriptionPlan` = "none"

---

## 🪝 TEST 6: Webhook (Manual Test)

**Endpoint:** `POST /api/payments/webhook`

**Headers:**
```
Content-Type: application/json
x-paystack-signature: CALCULATED_SIGNATURE
```

**Body (Paystack charge.success event):**
```json
{
  "event": "charge.success",
  "data": {
    "id": 12345,
    "reference": "premium_monthly_user123_1641234567890",
    "amount": 999900,
    "status": "success",
    "metadata": {
      "userId": "user_mongodb_id_here",
      "plan": "monthly",
      "email": "user@example.com"
    }
  }
}
```

**Notes:**
- You need to calculate the correct x-paystack-signature
- Easiest: Use Paystack webhook tester in their dashboard
- Or trigger real payment from frontend

**Expected Response (200 OK):**
```json
{
  "status": "success"
}
```

---

## 📊 TESTING FLOW (STEP BY STEP)

### Phase 1: Setup (5 min)
1. ✅ Get JWT token from your auth system
2. ✅ Copy your Render backend URL
3. ✅ Have Postman open

### Phase 2: Pre-Payment Tests (5 min)
1. ✅ Test 1: Initialize Payment → Get reference
2. ✅ Test 2: Check Status (should be not premium)

### Phase 3: Process Payment (5 min)
1. ✅ Use test card via frontend Premium page
2. ✅ Save the reference from Paystack

### Phase 4: Post-Payment Tests (10 min)
1. ✅ Test 3: Verify Payment with reference
2. ✅ Test 4: Check Status (should be premium)
3. ✅ Test 5: Cancel Subscription
4. ✅ Test 4: Check Status again (should be not premium)

### Phase 5: Webhook Test (5 min)
1. ✅ Test 6: Webhook with sample event

---

## 🔄 FULL PAYMENT FLOW TEST

**Scenario: User upgrades to premium**

```
1. POST /api/payments/initialize
   ├─ User clicks "Unlock Premium"
   ├─ Frontend calls initialize
   └─ Gets Paystack URL

2. User submits payment
   ├─ Uses test card 4084 0840 8408 4081
   ├─ Paystack returns reference
   └─ Frontend calls verify

3. GET /api/payments/verify/:reference
   ├─ Backend verifies with Paystack API
   ├─ Updates user as premium
   └─ Returns success

4. POST /api/payments/webhook (optional)
   ├─ Paystack sends charge.success event
   ├─ Backend updates user again
   └─ Redundant but safe

5. GET /api/payments/subscription-status
   ├─ User checks status
   ├─ See they're premium
   └─ Access unlocked
```

---

## 🎯 SUCCESS CRITERIA

✅ **All Tests Pass When:**
1. Initialize returns valid Paystack URL
2. Subscription status shows not premium (before payment)
3. Payment with test card succeeds
4. Verify updates user to premium
5. Status shows premium (after payment)
6. Cancel downgrades user
7. Status shows not premium (after cancel)

❌ **Troubleshoot If:**
| Issue | Check |
|-------|-------|
| 401 Unauthorized | Valid JWT token? |
| 404 Not Found | Correct endpoint URL? |
| 500 Error | Check backend logs on Render |
| Payment fails | Test card format? Internet connection? |
| Webhook doesn't work | Signature verification? Secret key set? |

---

## 🚀 POSTMAN ENVIRONMENT SETUP

Create a Postman environment with these variables:

```
BACKEND_URL = https://your-backend.onrender.com
JWT_TOKEN = eyJhbGciOiJIUzI1NiIs...
USER_ID = your_mongodb_user_id
```

Then in requests, use:
```
{{BACKEND_URL}}/api/payments/subscription-status
Authorization: Bearer {{JWT_TOKEN}}
```

---

## 💾 POSTMAN COLLECTION

### Create Request 1: Initialize
```
POST {{BACKEND_URL}}/api/payments/initialize
Headers: Authorization: Bearer {{JWT_TOKEN}}
Body: { "amount": 9999, "plan": "monthly" }
```

### Create Request 2: Subscription Status
```
GET {{BACKEND_URL}}/api/payments/subscription-status
Headers: Authorization: Bearer {{JWT_TOKEN}}
```

### Create Request 3: Verify Payment
```
GET {{BACKEND_URL}}/api/payments/verify/:reference
Headers: Authorization: Bearer {{JWT_TOKEN}}
```

### Create Request 4: Cancel
```
POST {{BACKEND_URL}}/api/payments/cancel-subscription
Headers: Authorization: Bearer {{JWT_TOKEN}}
Body: {}
```

### Create Request 5: Webhook
```
POST {{BACKEND_URL}}/api/payments/webhook
Headers: x-paystack-signature: [calculated]
Body: [webhook payload]
```

---

## 📋 QUICK TEST CHECKLIST

```
Before Testing:
[ ] Backend deployed to Render
[ ] Paystack keys added to environment
[ ] JWT token obtained
[ ] Postman installed

Testing:
[ ] Test 1: Initialize Payment
[ ] Test 2: Check Status (not premium)
[ ] Test 3: Process real payment with test card
[ ] Test 3: Verify Payment
[ ] Test 4: Check Status (premium)
[ ] Test 5: Cancel Subscription
[ ] Test 4: Check Status (not premium again)
[ ] Test 6: Webhook event

Results:
[ ] All endpoints return 200 OK
[ ] User data updates correctly
[ ] Subscription status reflects reality
[ ] Database shows payment history
```

---

## 🔗 USEFUL LINKS

- **Paystack Test Cards:** https://paystack.com/docs/payments/test-authentication/
- **Postman:** https://www.postman.com/downloads/
- **Your Backend:** https://your-backend.onrender.com
- **Paystack Dashboard:** https://dashboard.paystack.co
- **API Reference:** https://paystack.com/docs/api/

---

**Status:** Ready to test  
**Next:** Setup Postman and run tests above
