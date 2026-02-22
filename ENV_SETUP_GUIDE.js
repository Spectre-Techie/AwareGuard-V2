/**
 * Environment Variables Setup Guide
 * 
 * Files to update:
 * 1. Frontend: .env.local (at project root)
 * 2. Backend: .env (at backend root)
 */

// ==========================================
// FRONTEND: .env.local
// ==========================================
// Location: AwareGuard Version 2.0/.env.local

VITE_PAYSTACK_PUBLIC_KEY=pk_live_YOUR_PUBLIC_KEY_HERE
VITE_PAYSTACK_MONTHLY_AMOUNT=9999
VITE_PAYSTACK_ANNUAL_AMOUNT=99999
VITE_API_URL=http://localhost:5000/api

// ==========================================
// BACKEND: .env
// ==========================================
// Location: awareguard-backend/.env

# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
PAYSTACK_PUBLIC_KEY=pk_live_YOUR_PUBLIC_KEY_HERE

# Database
MONGODB_URI=mongodb://localhost:27017/awareguard
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/awareguard?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_jwt_secret_key_here

# Email (Optional, for confirmations)
EMAIL_USER=noreply@awareguard.com
EMAIL_PASSWORD=your_app_password_here
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

# Node Environment
NODE_ENV=production

// ==========================================
// GETTING YOUR KEYS
// ==========================================

// 1. Create Paystack Account
//    - Go to: https://dashboard.paystack.co/signup
//    - Verify your email

// 2. Get API Keys
//    - Login to: https://dashboard.paystack.co
//    - Go to: Settings → API Keys & Webhooks
//    - Copy: Public Key (pk_live_...)
//    - Copy: Secret Key (sk_live_...)

// 3. Setup Webhook
//    - In Dashboard: Settings → API Keys & Webhooks
//    - Add Webhook URL: https://yourapi.com/api/paystack-webhook
//    - Select Events:
//      ✓ charge.success
//      ✓ charge.failed
//    - Save

// ==========================================
// TESTING MODE
// ==========================================

// Test Card Details:
Card Number: 4084 0840 8408 4081
Expiry: Any future date (05/25)
CVV: Any 3 digits (123)

// Test Mode Keys (for development):
VITE_PAYSTACK_PUBLIC_KEY=pk_test_YOUR_TEST_PUBLIC_KEY
PAYSTACK_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY

// Switch to test keys during development:
// 1. Create test keys in Paystack Dashboard
// 2. Use test cards provided
// 3. Test full payment flow
// 4. Switch to live keys for production

// ==========================================
// IMPORTANT SECURITY NOTES
// ==========================================

// ✅ DO:
// - Use .env and .env.local files (NOT in git)
// - Keep secret keys SECRET
// - Rotate keys regularly
// - Use HTTPS in production
// - Validate amounts server-side

// ❌ DON'T:
// - Commit .env files to git
// - Share secret keys
// - Put keys in frontend code
// - Use test keys in production
// - Trust client-side amounts

module.exports = {
  frontend: {
    VITE_PAYSTACK_PUBLIC_KEY: 'required',
    VITE_PAYSTACK_MONTHLY_AMOUNT: 9999,
    VITE_PAYSTACK_ANNUAL_AMOUNT: 99999,
    VITE_API_URL: 'required'
  },
  backend: {
    PAYSTACK_SECRET_KEY: 'required',
    PAYSTACK_PUBLIC_KEY: 'required',
    MONGODB_URI: 'required',
    JWT_SECRET: 'required',
    FRONTEND_URL: 'required',
    NODE_ENV: 'production'
  }
};
