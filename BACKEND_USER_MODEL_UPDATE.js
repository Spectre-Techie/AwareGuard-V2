/**
 * User Model Updates - Subscription Fields
 * 
 * File Location: awareguard-backend/models/User.js
 * 
 * Instructions:
 * 1. Find the userSchema definition
 * 2. Add these fields before the final closing brace
 * 3. Add index at the bottom for performance
 * 4. Add helper method (optional but recommended)
 */

// ===================================================
// FIELDS TO ADD TO USER SCHEMA
// ===================================================

// Add these fields to your existing userSchema:

const subscriptionFields = {
  // Premium subscription status
  isPremium: {
    type: Boolean,
    default: false,
    index: true
  },

  // Type of subscription (monthly or annual)
  subscriptionPlan: {
    type: String,
    enum: ['monthly', 'annual', 'none'],
    default: 'none'
  },

  // When subscription expires
  subscriptionExpiresAt: {
    type: Date,
    default: null,
    index: true
  },

  // When subscription started
  subscriptionStartedAt: {
    type: Date,
    default: null
  },

  // Paystack transaction reference
  paystackReference: {
    type: String,
    default: null,
    unique: true,
    sparse: true
  },

  // Amount paid in last transaction (Naira)
  lastPaymentAmount: {
    type: Number,
    default: 0
  },

  // Payment history for tracking
  paymentHistory: [
    {
      reference: String,
      amount: Number,
      date: { type: Date, default: Date.now },
      status: { type: String, enum: ['success', 'failed', 'cancelled'] },
      plan: String
    }
  ]
};

// ===================================================
// COMPLETE USER MODEL EXAMPLE
// ===================================================

/**
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Existing fields...
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    fullName: String,
    profileImage: String,

    // NEW SUBSCRIPTION FIELDS (Add here)
    isPremium: {
      type: Boolean,
      default: false,
      index: true
    },
    subscriptionPlan: {
      type: String,
      enum: ['monthly', 'annual', 'none'],
      default: 'none'
    },
    subscriptionExpiresAt: {
      type: Date,
      default: null,
      index: true
    },
    subscriptionStartedAt: {
      type: Date,
      default: null
    },
    paystackReference: {
      type: String,
      default: null,
      unique: true,
      sparse: true
    },
    lastPaymentAmount: {
      type: Number,
      default: 0
    },
    paymentHistory: [
      {
        reference: String,
        amount: Number,
        date: { type: Date, default: Date.now },
        status: { type: String, enum: ['success', 'failed', 'cancelled'] },
        plan: String
      }
    ],

    // Continue with existing fields...
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// ===================================================
// INDEXES FOR PERFORMANCE
// ===================================================

// Create compound index for subscription checks
userSchema.index({ isPremium: 1, subscriptionExpiresAt: 1 });

// ===================================================
// HELPER METHODS (Optional)
// ===================================================

// Check if subscription is currently active
userSchema.methods.isSubscriptionActive = function() {
  if (!this.isPremium) return false;
  if (!this.subscriptionExpiresAt) return false;
  return new Date() < this.subscriptionExpiresAt;
};

// Get days remaining in subscription
userSchema.methods.getDaysRemaining = function() {
  if (!this.isPremium || !this.subscriptionExpiresAt) return 0;
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysLeft = Math.ceil(
    (this.subscriptionExpiresAt - new Date()) / msPerDay
  );
  return Math.max(0, daysLeft);
};

// Check expiry and auto-downgrade if needed
userSchema.methods.checkAndDowngradeIfExpired = async function() {
  if (this.isPremium && this.subscriptionExpiresAt) {
    if (new Date() > this.subscriptionExpiresAt) {
      this.isPremium = false;
      this.subscriptionPlan = 'none';
      await this.save();
      return true; // Was downgraded
    }
  }
  return false;
};

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
*/

module.exports = subscriptionFields;
