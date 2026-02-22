# Code Changes Required - Before & After



















































































































































































































































































































































































































































































































































































































































































































































**Ready to build? Start with Phase 1 (Setup) and work through each phase. 🚀**---7. **Customer Support** - Have Paystack support ready for payment issues6. **Analytics** - Track conversion rates, failed payments, refunds5. **PCI Compliance** - Never handle raw card data (Paystack does it)4. **Webhook Redundancy** - Don't rely on webhooks alone; always verify3. **Retry Logic** - If verification fails, user can retry2. **Handle Errors** - User-friendly error messages for failed payments1. **Test Mode First** - Always test with test API keys before going live## 💡 Tips & Best Practices---- [ ] Team trained on payment process- [ ] Documentation updated- [ ] Success/failure pages created- [ ] Confirmation emails setup (optional)- [ ] Premium content verification logic working- [ ] All endpoints tested with test cards- [ ] Webhook configured in Paystack dashboard- [ ] User model updated with subscription fields- [ ] Backend payment routes created- [ ] PremiumUpgrade component updated- [ ] Payment utility created (`src/utils/paystack.js`)- [ ] Frontend Paystack script loaded in `index.html`- [ ] API keys added to `.env` file- [ ] Paystack account created and verifiedBefore launching premium:## 🚀 Go Live Checklist---**Status Page:** [https://paystack-status.com/](https://paystack-status.com/)**Support Email:** support@paystack.com**API Reference:** [https://paystack.com/docs/api/](https://paystack.com/docs/api/)**Documentation:** [https://paystack.com/docs](https://paystack.com/docs)## 📞 Paystack Support---- ✅ Rate limit payment endpoints- ✅ Log all payment transactions- ✅ Never expose secret keys in frontend- ✅ Use HTTPS for all payment endpoints- ✅ Check subscription expiry on each access- ✅ Verify webhook signature before processing- ✅ Verify user ID matches in metadata- ✅ Verify amount matches before updating user## 🔒 Security Checklist---**Total potential annual revenue:** ₦2,534,922.20 (at 50 monthly + 20 annual subscribers)```└─ Annual Revenue (at 20 subscribers): ₦1,949,980.40├─ Savings over monthly: ₦19,998 (2 months free)├─ Your Revenue: ₦97,499.02├─ Paystack Fee: ₦2,499.98 (2.5%)├─ Price: ₦99,999Annual Plan:└─ Annual Revenue (at 50 subscribers): ₦584,941.80├─ Your Revenue: ₦9,749.03├─ Paystack Fee: ₦249.97 (2.5%)├─ Price: ₦9,999Monthly Plan:```## 📊 Paystack Pricing Breakdown---3. Verify premium features available2. Verify premium modules unlocked1. As premium user, access Learn page### Test 4: Premium Content Access3. Check your backend logs for webhook receipt2. Click "Send test event"1. Dashboard → Settings → API Keys & WebhooksUse Paystack webhook tester:### Test 3: Webhook Testing   - `paystackReference: [transaction ref]`   - `subscriptionExpiresAt: [future date]`   - `subscriptionPlan: "monthly"`   - `isPremium: true`1. Check database user record updated with:### Test 2: Backend Verification6. Check user premium status updated5. Verify payment success notification   - CVV: Any 3 digits (e.g., `123`)   - Expiry: Any future date (e.g., `05/25`)   - Card: `4084084084084081`4. Use Paystack test card:3. Click "Upgrade Now"2. Select monthly plan1. Go to Premium page### Test 1: Frontend Payment Flow## 🧪 Phase 4: Testing (30 minutes)---```PAYSTACK_PUBLIC_KEY=pk_live_YOUR_PUBLIC_KEY_HEREPAYSTACK_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE```envAdd to `.env`:### Step 5: Update Environment Variables```app.post('/api/paystack-webhook', express.raw({type: 'application/json'}), paymentRoutes);// Also handle webhook without JSON parsingapp.use('/api', paymentRoutes);const paymentRoutes = require('./routes/payments');```javascriptIn `index.js` or `app.js`:### Step 4: Register Routes in Main App```});  }    default: null    type: Number,  lastPaymentAmount: {  },    default: null    type: String,  paystackReference: {  },    default: null    type: Date,  subscriptionStartedAt: {  },    default: null    type: Date,  subscriptionExpiresAt: {  },    default: null    enum: ['monthly', 'annual'],    type: String,  subscriptionPlan: {  },    default: false    type: Boolean,  isPremium: {  // Subscription fields  // ... existing fields ...const userSchema = new Schema({```javascriptAdd to `models/User.js`:### Step 3: Update User Model```module.exports = router;});  }    res.status(500).json({ error: error.message });  } catch (error) {    });        : 0        ? Math.ceil((user.subscriptionExpiresAt - new Date()) / (1000 * 60 * 60 * 24))      daysRemaining: user.isPremium && user.subscriptionExpiresAt      subscriptionExpiresAt: user.subscriptionExpiresAt,      subscriptionPlan: user.subscriptionPlan,      isPremium: user.isPremium,    res.json({    }      }        await user.save();        user.isPremium = false;        // Subscription expired, downgrade user      if (new Date() > user.subscriptionExpiresAt) {    if (user.isPremium && user.subscriptionExpiresAt) {    // Check if subscription has expired    const user = req.user;  try {router.get('/subscription-status', authenticateUser, async (req, res) => { */ * Get current user subscription status * GET /api/subscription-status/**});  }    res.status(500).json({ error: error.message });    console.error('Webhook error:', error);  } catch (error) {    res.json({ status: 'success' });    }      console.log(`❌ Payment failed - Reference: ${event.data.reference}`);    if (event.event === 'charge.failed') {    // Handle charge.failed event    }      console.log(`✅ Payment successful for user ${userId} - Reference: ${transaction.reference}`);      // Log successful payment      });        subscriptionExpiresAt: expiryDate        subscriptionPlan: plan,        paystackReference: transaction.reference,        isPremium: true,      await User.findByIdAndUpdate(userId, {      // Update user      }        expiryDate.setFullYear(expiryDate.getFullYear() + 1);      } else {        expiryDate.setMonth(expiryDate.getMonth() + 1);      if (plan === 'monthly') {      let expiryDate = new Date();      // Calculate expiry      const plan = transaction.metadata.plan;      const userId = transaction.metadata.userId;      const transaction = event.data;    if (event.event === 'charge.success') {    // Handle charge.success event    const event = req.body;    }      return res.status(400).send('Invalid signature');    if (hash !== signature) {      .digest('hex');      .update(body)      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)    const hash = crypto    // Verify webhook signature    const body = JSON.stringify(req.body);    const signature = req.headers['x-paystack-signature'];  try {router.post('/paystack-webhook', async (req, res) => { */ * Receive webhook events from Paystack * POST /api/paystack-webhook/**});  }    });      error: error.message      success: false,    res.status(500).json({    console.error('Payment verification error:', error);  } catch (error) {    });      }        subscriptionExpiresAt: updatedUser.subscriptionExpiresAt        subscriptionPlan: updatedUser.subscriptionPlan,        isPremium: updatedUser.isPremium,        id: updatedUser._id,      user: {      message: 'Premium subscription activated!',      success: true,    res.json({    // await sendPremiumActivationEmail(updatedUser);    // Send confirmation email (optional)    );      { new: true }      },        lastPaymentAmount: transaction.amount / 100 // Store in Naira        subscriptionStartedAt: new Date(),        subscriptionExpiresAt: subscriptionExpiresAt,        subscriptionPlan: plan,        paystackReference: reference,        isPremium: true,      {      user.id,    const updatedUser = await User.findByIdAndUpdate(    // Update user with premium status    }      subscriptionExpiresAt.setFullYear(subscriptionExpiresAt.getFullYear() + 1);    } else {      subscriptionExpiresAt.setMonth(subscriptionExpiresAt.getMonth() + 1);    if (plan === 'monthly') {    let subscriptionExpiresAt = new Date();    const plan = transaction.metadata.plan;    // Calculate expiry date    }      });        message: 'User mismatch'        success: false,      return res.status(400).json({    if (transaction.metadata.userId !== user.id) {    // Verify user    }      });        message: 'Payment amount mismatch'        success: false,      return res.status(400).json({    if (transaction.amount !== expectedAmount) {    const expectedAmount = transaction.metadata.plan === 'monthly' ? 999900 : 9999900;    // Verify amount matches    }      });        message: 'Payment was not successful'        success: false,      return res.status(400).json({    if (transaction.status !== 'success') {    // Verify transaction status    const transaction = paystackResponse.data;    }      });        message: 'Payment verification failed'        success: false,      return res.status(400).json({    if (!paystackResponse.status) {    ).then(res => res.json());      }        }          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`        headers: {        method: 'GET',      {      `https://api.paystack.co/transaction/verify/${reference}`,    const paystackResponse = await fetch(    // Verify payment with Paystack API    const user = req.user;    const { reference } = req.params;  try {router.get('/verify-payment/:reference', authenticateUser, async (req, res) => { */ * Verify Paystack payment and activate premium * POST /api/verify-payment/:reference/**const crypto = require('crypto');const User = require('../models/User');const authenticateUser = require('../middleware/authenticateUser');const router = express.Router();const express = require('express');```javascriptCreate `routes/payments.js`:### Step 2: Create Paystack Routes```npm install axios dotenv```bash### Step 1: Install Dependencies## 🔧 Phase 3: Backend Setup (90 minutes)---```REACT_APP_PAYSTACK_ANNUAL_AMOUNT=99999REACT_APP_PAYSTACK_MONTHLY_AMOUNT=9999REACT_APP_PAYSTACK_PUBLIC_KEY=pk_live_YOUR_PUBLIC_KEY_HERE```envCreate `.env.local`:### Step 4: Update Environment Variables```export default PremiumUpgrade;};  );    </div>      </div>        </div>          </div>            ))}              </div>                <p className="text-gray-300">{item.a}</p>                <h4 className="font-bold text-white mb-2">{item.q}</h4>              <div key={idx} className="bg-slate-800 rounded-lg p-4">            ].map((item, idx) => (              }                a: "Cards (Visa, Mastercard), bank transfers, and mobile money in Nigeria."                q: "What payment methods do you accept?",              {              },                a: "Yes, cancel your subscription from your account settings at any time."                q: "Can I cancel anytime?",              {              },                a: "Yes! Paystack uses industry-standard encryption and PCI compliance."                q: "Is it secure?",              {            {[          <div className="space-y-4">          <h3 className="text-2xl font-bold text-white mb-8">FAQ</h3>        <div className="mt-16 max-w-2xl mx-auto">        {/* FAQ */}        </div>          </div>            </p>              Powered by Paystack • Secure payment            <p className="text-center text-sm text-gray-400 mt-4">            </button>              {loading ? "Processing..." : "Upgrade Now"}            >              }`}                  : "bg-green-600 hover:bg-green-700 text-white"                  ? "bg-gray-500 text-gray-300 cursor-not-allowed"                loading              className={`w-full py-4 rounded-lg font-bold text-lg transition ${              disabled={loading}              onClick={handleUpgrade}            <button            </div>              per {PRICING[billingCycle].period}            <div className="text-gray-300 mb-8">            </div>              ₦{PRICING[billingCycle].amount.toLocaleString()}            <div className="text-5xl font-bold text-white mb-2">          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-8 border border-purple-700">          {/* Price & Button */}          </div>            </ul>              ))}                </li>                  {feature}                  <span className="text-green-500">✓</span>                <li key={idx} className="flex gap-3 text-gray-300">              ].map((feature, idx) => (                "Exclusive content"                "Priority support",                "Advanced quiz analytics",                "Ad-free experience",                "Certificate of completion",                "Unlimited course access",              {[            <ul className="space-y-4">            <h3 className="text-xl font-bold text-white mb-6">What's Included</h3>          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">          {/* Features */}        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">        {/* Pricing Cards */}        </div>          </button>            )}              </span>                {PRICING.annual.savings}              <span className="ml-2 text-sm bg-green-600 px-2 py-1 rounded">            Annual {PRICING.annual.savings && (          >            }`}                : "bg-slate-700 text-gray-300"                ? "bg-purple-600 text-white"              billingCycle === "annual"            className={`px-8 py-3 rounded-lg font-semibold transition ${            onClick={() => setBillingCycle("annual")}          <button          </button>            Monthly          >            }`}                : "bg-slate-700 text-gray-300"                ? "bg-purple-600 text-white"              billingCycle === "monthly"            className={`px-8 py-3 rounded-lg font-semibold transition ${            onClick={() => setBillingCycle("monthly")}          <button        <div className="flex justify-center gap-4 mb-12">        {/* Billing Toggle */}        </div>          </p>            Get unlimited access to all courses, certificates, and more          <p className="text-xl text-gray-400">          </h1>            Unlock Premium Learning          <h1 className="text-5xl font-bold text-white mb-4">        <div className="text-center mb-12">        {/* Header */}      <div className="max-w-6xl mx-auto px-4">      {toast && <Toast message={toast.message} type={toast.type} />}    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12">  return (  };    }      setLoading(false);    } finally {      });        type: "error"        message: error.message || "Payment failed. Please try again.",      setToast({      console.error("Payment error:", error);    } catch (error) {      }        }, 2000);          window.location.href = '/learn';        setTimeout(() => {        // Redirect to learn page        });          reference: paymentResult.reference          plan: billingCycle,          isPremium: true,        onUpgrade({        // Update local state        });          type: "success"          message: "🎉 Premium activated! Welcome to the elite club!",        setToast({      if (verificationResult.success) {      const verificationResult = await verifyPayment(paymentResult.reference);      // Step 2: Verify payment with backend      );        user.id        billingCycle,        PRICING[billingCycle].amount,        user.email,      const paymentResult = await initializePaystack(      // Step 1: Initialize Paystack payment    try {    setLoading(true);    }      return;      });        type: "error"        message: "Please sign in to upgrade",      setToast({    if (!user?.email) {  const handleUpgrade = async () => {  };    }      savings: "2 months free!"      period: "year",      amount: 99999, // ₦99,999 (saves 2 months!)    annual: {    },      savings: null      period: "month",      amount: 9999, // ₦9,999    monthly: {  const PRICING = {  const [toast, setToast] = useState(null);  const [loading, setLoading] = useState(false);  const [billingCycle, setBillingCycle] = useState("monthly");  const { user } = useAuth();const PremiumUpgrade = ({ onUpgrade = () => {} }) => {import Toast from "../Toast"; // Assuming you have this componentimport { useAuth } from "../../context/AuthContext";import { initializePaystack, verifyPayment } from "../../utils/paystack";import { useState } from "react";```javascriptFind `src/components/learning/PremiumUpgrade.jsx` and update:### Step 3: Update PremiumUpgrade Component```};  return response.json();  }    throw new Error('Payment verification failed');  if (!response.ok) {  });    }      'Authorization': `Bearer ${localStorage.getItem('token')}`      'Content-Type': 'application/json',    headers: {    method: 'GET',  const response = await fetch(`/api/verify-payment/${reference}`, {export const verifyPayment = async (reference) => { */ * @returns {Promise} * @param {string} reference - Paystack reference * Verify payment with backend/**};  });    handler.openIframe();    });      }        });          plan: plan          status: response.status,          reference: response.reference,        resolve({        // Payment successful, verify on backend      callback: function(response) {      },        reject(new Error('Payment cancelled by user'));        // User cancelled payment      onClose: function() {      },        timestamp: new Date().toISOString()        plan: plan,        userId: userId,      metadata: {      ref: `premium_${plan}_${userId}_${Date.now()}`, // Unique reference      currency: 'NGN',      amount: amount * 100, // Paystack expects amount in kobo      email: email,      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,    const handler = window.PaystackPop.setup({    }      return;      reject(new Error('Paystack not loaded'));    if (!window.PaystackPop) {  return new Promise((resolve, reject) => {export const initializePaystack = (email, amount, plan, userId) => { */ * @returns {Promise} * @param {string} userId - User ID for metadata * @param {string} plan - 'monthly' or 'annual' * @param {number} amount - Amount in NGN * @param {string} email - User email * Initialize Paystack payment/**```javascriptCreate `src/utils/paystack.js`:### Step 2: Create Paystack Utility File```<script src="https://js.paystack.co/v1/inline.js"></script>```htmlAdd to `index.html` in `<head>`:### Step 1: Install Paystack JavaScript## 🛠️ Phase 2: Frontend Setup (90 minutes)---2. Or hardcode amounts in code (we'll do this)   - Annual Plan: ₦99,999   - Monthly Plan: ₦9,9991. **Products** → **Create Product**### Step 4: Create Products (Optional but Recommended)4. Save webhook   - ✅ charge.dispute.create   - ✅ charge.failed   - ✅ charge.success3. Select events:2. Add webhook URL: `https://yourapi.com/api/paystack-webhook`1. In Paystack Dashboard: **Settings** → **API Keys & Webhooks**### Step 3: Setup Webhook Endpoint4. Copy **Webhook Secret** for verifying webhook signatures   - **Secret Key** (starts with `sk_`)   - **Public Key** (starts with `pk_`)3. Copy:2. Go to **Settings** → **API Keys & Webhooks**1. Log into [Paystack Dashboard](https://dashboard.paystack.co)### Step 2: Get API Keys4. Complete KYC (Know Your Customer) verification3. Verify your email2. Sign up with your business email1. Go to [https://dashboard.paystack.co/signup](https://dashboard.paystack.co/signup)### Step 1: Create Account## ✅ Phase 1: Setup Paystack Account (30 minutes)---- **Annual Plan:** ₦99,999/year (2 months free!)- **Monthly Plan:** ₦9,999/monthA complete Paystack payment integration that allows users to subscribe to premium features using:## 🎯 What We're Building---**Estimated Revenue:** ₦9,999/month (₦119,988/year) for premium subscribers**Timeline:** 3-4 hours  **Priority:** 🔴 CRITICAL (Blocks monetization)  **Status:** 🚀 Ready to implement  ## 1. PREMIUM UPGRADE - Paystack Integration

### BEFORE (Current - Fake)
```javascript
// In PremiumUpgrade.jsx, line 113-120
const handleUpgrade = () => {
  // TODO: Integrate with payment system (Stripe)
  alert("Premium upgrade - redirect to checkout");
};
```

### AFTER (With Paystack)
```javascript
// In PremiumUpgrade.jsx
import { initializePaystack } from "../utils/paystack";

const PremiumUpgrade = ({ onUpgrade = () => {} }) => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const handleUpgrade = async () => {
    try {
      const amount = billingCycle === "monthly"
        ? process.env.REACT_APP_PAYSTACK_MONTHLY_AMOUNT
        : process.env.REACT_APP_PAYSTACK_ANNUAL_AMOUNT;

      const plan = billingCycle === "monthly" ? "monthly" : "annual";

      await initializePaystack(amount, plan);
    } catch (err) {
      console.error("Upgrade failed:", err);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  // Rest of component...
};
```

### NEW FILE: src/utils/paystack.js
```javascript
export const initializePaystack = (amount, plan) => {
  return new Promise((resolve, reject) => {
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email: user?.email || '',
      amount: amount * 100, // Paystack expects amount in kobo (multiply by 100)
      currency: 'NGN', // or USD, EUR, etc.
      ref: `premium_${plan}_${Date.now()}`,
      metadata: {
        plan: plan,
        userId: user?.id
      },
      callback: function(response) {
        // Payment successful
        console.log('Payment successful:', response);
        resolve(response);
        // Redirect to success page or update UI
        window.location.href = '/success?reference=' + response.reference;
      },
      onClose: function() {
        // Payment cancelled
        console.log('Payment cancelled');
        reject(new Error('Payment cancelled'));
      }
    });
  });
};
```

### Backend Endpoint: POST /api/initialize-paystack
```javascript
// Node.js / Express example
const Paystack = require('paystack-node')(process.env.PAYSTACK_SECRET_KEY);

app.post("/api/initialize-paystack", authenticateUser, async (req, res) => {
  try {
    const { amount, plan } = req.body;
    const user = req.user;

    // Initialize Paystack transaction
    const paystackResponse = await Paystack.transaction.initialize({
      amount: amount * 100, // Paystack expects amount in kobo
      email: user.email,
      currency: 'NGN', // or USD, EUR, etc.
      reference: `premium_${plan}_${Date.now()}`,
      callback_url: `${process.env.FRONTEND_URL}/success`,
      metadata: {
        userId: user.id,
        plan: plan
      }
    });

    res.json({
      authorization_url: paystackResponse.data.authorization_url,
      access_code: paystackResponse.data.access_code,
      reference: paystackResponse.data.reference
    });
  } catch (err) {
    console.error('Paystack initialization error:', err);
    res.status(500).json({ error: err.message });
  }
});
```

### Backend Callback: POST /api/paystack-webhook
```javascript
const crypto = require('crypto');

app.post("/api/paystack-webhook", async (req, res) => {
  try {
    // Verify webhook signature
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      return res.status(400).send('Invalid signature');
    }

    const event = req.body;

    if (event.event === 'charge.success') {
      const { reference, metadata } = event.data;
      const userId = metadata.userId;
      const plan = metadata.plan;

      // Update user's premium status
      const subscriptionExpiresAt = plan === 'monthly'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 365 days

      await User.findByIdAndUpdate(userId, {
        isPremium: true,
        paystackReference: reference,
        subscriptionExpiresAt: subscriptionExpiresAt,
        subscriptionPlan: plan
      });

      // Send confirmation email
      // await sendEmail(user.email, 'Premium Subscription Activated', ...);
    }

    res.json({ status: 'success' });
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).json({ error: err.message });
  }
});
```

### Backend Verification: GET /api/verify-payment/:reference
```javascript
app.get("/api/verify-payment/:reference", authenticateUser, async (req, res) => {
  try {
    const { reference } = req.params;

    const paystackResponse = await Paystack.transaction.verify(reference);

    if (paystackResponse.data.status === 'success') {
      const userId = paystackResponse.data.metadata.userId;
      const plan = paystackResponse.data.metadata.plan;

      // Update user subscription
      const subscriptionExpiresAt = plan === 'monthly'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

      await User.findByIdAndUpdate(userId, {
        isPremium: true,
        paystackReference: reference,
        subscriptionExpiresAt: subscriptionExpiresAt,
        subscriptionPlan: plan
      });

      res.json({ success: true, message: 'Payment verified and subscription activated' });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ error: err.message });
  }
});
```

---

## 2. QUIZ SUBMISSION - Backend Persistence

### BEFORE (Current - Not Saved)
```javascript
// In ModuleViewer.jsx, line 162-174
const handleSubmitQuiz = () => {
  let correctCount = 0;
  module.quiz.questions.forEach(question => {
    if (quizAnswers[question.id] === question.correctAnswer) {
      correctCount++;
    }
  });
  const scorePercentage = Math.round((correctCount / module.quiz.questions.length) * 100);
  setQuizScore(scorePercentage);
  setQuizSubmitted(true);
  
  // Show toast but DON'T SAVE
  const passingScore = module.quiz.passingScore || 70;
  if (scorePercentage >= passingScore) {
    onQuizSubmit(`🎉 Quiz Passed! You scored ${scorePercentage}%`, "success");
  } else {
    onQuizSubmit(`Quiz Failed. You scored ${scorePercentage}%. Try again!`, "error");
  }
};
```

### AFTER (With Backend Save)
```javascript
// In ModuleViewer.jsx
const handleSubmitQuiz = async () => {
  let correctCount = 0;
  module.quiz.questions.forEach(question => {
    if (quizAnswers[question.id] === question.correctAnswer) {
      correctCount++;
    }
  });
  const scorePercentage = Math.round((correctCount / module.quiz.questions.length) * 100);
  setQuizScore(scorePercentage);
  setQuizSubmitted(true);
  
  // Save to backend
  try {
    const response = await fetch("/api/learning/quiz-submit", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        moduleId: module.id,
        quizId: module.quiz.id,
        score: scorePercentage,
        answers: quizAnswers,
        timestamp: new Date()
      })
    });
    
    if (!response.ok) {
      throw new Error("Failed to save quiz");
    }
    
    const result = await response.json();
    
    // Show toast with bonus info
    const passingScore = module.quiz.passingScore || 70;
    const bonusXp = result.bonusXp || 0;
    
    if (scorePercentage >= passingScore) {
      onQuizSubmit(
        `🎉 Quiz Passed! ${scorePercentage}%${bonusXp > 0 ? ` +${bonusXp} Bonus XP` : ""}`,
        "success"
      );
    } else {
      onQuizSubmit(
        `Quiz Failed. ${scorePercentage}%. Try again!`,
        "error"
      );
    }
  } catch (err) {
    console.error("Quiz submission failed:", err);
    onQuizSubmit("Failed to save quiz. Try again.", "error");
  }
};
```

### Backend Endpoint: POST /api/learning/quiz-submit
```javascript
app.post("/api/learning/quiz-submit", authenticateUser, async (req, res) => {
  try {
    const { moduleId, quizId, score, answers } = req.body;
    const userId = req.user.id;
    
    // Validate module exists
    const module = await Module.findById(moduleId);
    if (!module || !module.quiz) {
      return res.status(404).json({ error: "Module not found" });
    }
    
    // Validate score (re-calculate from answers)
    let correctCount = 0;
    module.quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = Math.round(
      (correctCount / module.quiz.questions.length) * 100
    );
    
    // Verify submitted score matches calculation
    if (Math.abs(calculatedScore - score) > 5) {
      return res.status(400).json({ error: "Score mismatch" });
    }
    
    // Save quiz attempt
    const passingScore = module.quiz.passingScore || 70;
    const passed = calculatedScore >= passingScore;
    let bonusXp = 0;

    if (passed) {
      // Award bonus XP for passing (10-50 based on score)
      bonusXp = Math.floor((calculatedScore - passingScore) / 10) * 10;
      bonusXp = Math.max(10, Math.min(50, bonusXp));
    }
    
    // Save to database
    await QuizAttempt.create({
      userId,
      moduleId,
      quizId,
      score: calculatedScore,
      passed,
      bonusXp,
      timestamp: new Date()
    });
    
    // Update user XP if passed
    if (passed && bonusXp > 0) {
      await User.findByIdAndUpdate(userId, {
        $inc: { totalXP: bonusXp }
      });
    }
    
    res.json({
      passed,
      score: calculatedScore,
      bonusXp,
      message: passed 
        ? `Quiz passed! +${bonusXp} XP` 
        : "Quiz failed. Try again!"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## 3. CONTACT SALES - Form Integration

### BEFORE (Current - Fake)
```javascript
// In Learn.jsx, line 118-121
const handleContactSales = () => {
  // TODO: Open Calendly or contact form
  alert("Redirecting to sales form...");
};

// In CorporateTraining.jsx line 209
onClick={onContactSales}
className="..."
```

### AFTER (With Form)

#### Option A: Calendly (Simplest)
```javascript
// In Learn.jsx
const handleContactSales = () => {
  window.open(
    "https://calendly.com/your-company/demo",
    "_blank",
    "width=1000,height=700"
  );
};
```

#### Option B: Custom Form (Full Control)
```javascript
// New file: src/components/ContactSalesModal.jsx
import React, { useState } from "react";

const ContactSalesModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    employeeCount: "50",
    phone: "",
    interest: "general"
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch("/api/sales/contact-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date(),
          source: "learn_page"
        })
      });
      
      if (!res.ok) throw new Error("Submission failed");
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        {submitted ? (
          <div className="text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Thanks for reaching out!
            </h3>
            <p className="text-slate-600">
              Our sales team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Schedule a Demo
              </h2>
              <button
                onClick={onClose}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-1">
                  Employees
                </label>
                <select
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="10">5-10</option>
                  <option value="50">11-50</option>
                  <option value="100">51-100</option>
                  <option value="500">101-500</option>
                  <option value="1000">500+</option>
                </select>
              </div>
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Request Demo"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactSalesModal;
```

### In Learn.jsx
```javascript
import ContactSalesModal from "../components/ContactSalesModal";

const Learn = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  const handleContactSales = () => {
    setContactModalOpen(true);
  };
  
  return (
    <div>
      {/* ... rest of page ... */}
      
      <ContactSalesModal 
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
};
```

### Backend Endpoint: POST /api/sales/contact-inquiry
```javascript
const nodemailer = require("nodemailer");

app.post("/api/sales/contact-inquiry", async (req, res) => {
  try {
    const { email, company, employeeCount, phone, source } = req.body;
    
    // Validate input
    if (!email || !company) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    // Save to database
    const inquiry = await SalesInquiry.create({
      email,
      company,
      employeeCount,
      phone,
      source,
      timestamp: new Date(),
      status: "new"
    });
    
    // Send email to sales team
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "sales@awareguard.com",
      subject: `New Demo Request: ${company}`,
      html: `
        <h2>New Sales Inquiry</h2>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Employees:</strong> ${employeeCount}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><a href="https://yourapp.com/admin/inquiries/${inquiry.id}">View in Admin</a></p>
      `
    });
    
    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Demo Request Received - AwareGuard",
      html: `
        <h2>Thanks for your interest!</h2>
        <p>We've received your demo request. Our team will contact you within 24 hours.</p>
        <p>In the meantime, check out our <a href="https://yourapp.com/resources">resources page</a>.</p>
      `
    });
    
    res.json({ success: true, inquiryId: inquiry.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## 4. PREMIUM STATUS CHECK - Backend Validation

### BEFORE (Current - Frontend Only)
```javascript
// In Learn.jsx line 25-26
const isPremium = user?.isPremium || false; // Just guesses
```

### AFTER (With Backend Validation)
```javascript
// In Learn.jsx
import { useEffect, useState } from "react";

const Learn = () => {
  const { user, token } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        const res = await fetch("/api/user/subscription-status", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setIsPremium(data.isPremium);
        }
      } catch (err) {
        console.error("Failed to check premium status:", err);
        // Fall back to user object if API fails
        setIsPremium(user?.isPremium || false);
      } finally {
        setLoading(false);
      }
    };
    
    checkPremiumStatus();
  }, [token]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    // ... rest of component with premium status verified ...
  );
};
```

### Backend Endpoint: GET /api/user/subscription-status
```javascript
app.get("/api/user/subscription-status", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const now = new Date();
    const isPremium = user.isPremium && (!user.subscriptionExpiresAt || user.subscriptionExpiresAt > now);
    
    res.json({
      isPremium,
      plan: user.subscriptionPlan || "free",
      expiresAt: user.subscriptionExpiresAt || null,
      daysRemaining: isPremium && user.subscriptionExpiresAt
        ? Math.ceil((user.subscriptionExpiresAt - now) / (1000 * 60 * 60 * 24))
        : 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

---

## Summary of Changes

| Feature | Lines Changed | Priority | Effort |
|---------|---------------|----------|--------|
| Paystack Payment | 50-100 | Critical | 4 hours |
| Quiz Save | 30-50 | Critical | 2 hours |
| Contact Form | 80-120 | High | 3 hours |
| Premium Check | 20-30 | High | 1 hour |
| **Total** | **~250-300** | **CRITICAL** | **~10 hours** |

---

## Environment Variables Needed

```env
# Paystack
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_live_XXX
REACT_APP_PAYSTACK_MONTHLY_AMOUNT=9999  # Amount in NGN (9999 = ₦9,999)
REACT_APP_PAYSTACK_ANNUAL_AMOUNT=99999 # Amount in NGN (99999 = ₦99,999)

# Backend
PAYSTACK_SECRET_KEY=sk_live_XXX

# Email
EMAIL_USER=noreply@awareguard.com
EMAIL_PASSWORD=app_password_from_gmail

# URLs
FRONTEND_URL=https://awareguard.com
```

These are the main functional gaps. Ready to implement?
