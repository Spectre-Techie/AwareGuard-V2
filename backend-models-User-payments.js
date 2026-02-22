/**
 * User Model Updates - Payment/Subscription Fields
 * 
 * File: awareguard-backend/models/User.js
 * 
 * Add these fields to your existing User schema to support Paystack payments
 * and subscription management.
 */

// Add these fields to your User schema:

const userSchemaUpdates = {
  // Subscription status
  isPremium: {
    type: Boolean,
    default: false,
    description: 'Whether user has active premium subscription'
  },

  // Subscription plan type
  subscriptionPlan: {
    type: String,
    enum: ['monthly', 'annual', null],
    default: null,
    description: 'Type of subscription: monthly or annual'
  },

  // When subscription expires
  subscriptionExpiresAt: {
    type: Date,
    default: null,
    description: 'Date when premium subscription expires'
  },

  // When subscription was activated
  subscriptionStartedAt: {
    type: Date,
    default: null,
    description: 'Date when subscription was first activated'
  },

  // Paystack reference for payment tracking
  paystackReference: {
    type: String,
    default: null,
    unique: true,
    sparse: true,
    description: 'Unique Paystack transaction reference'
  },

  // Last payment amount in Naira
  lastPaymentAmount: {
    type: Number,
    default: null,
    description: 'Amount of last payment in Naira (NGN)'
  }
};

// COMPLETE USER MODEL EXAMPLE:
/**
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Existing fields
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
    firstName: String,
    lastName: String,
    profileImage: String,
    
    // NEW SUBSCRIPTION FIELDS (Add these)
    isPremium: {
      type: Boolean,
      default: false
    },
    subscriptionPlan: {
      type: String,
      enum: ['monthly', 'annual', null],
      default: null
    },
    subscriptionExpiresAt: {
      type: Date,
      default: null
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
      default: null
    },

    // Existing fields continue...
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// HELPFUL INDEX: Create index for subscription expiry checks
userSchema.index({ isPremium: 1, subscriptionExpiresAt: 1 });

// HELPER METHOD: Check if subscription is active
userSchema.methods.isSubscriptionActive = function() {
  if (!this.isPremium) return false;
  if (!this.subscriptionExpiresAt) return false;
  return new Date() < this.subscriptionExpiresAt;
};

// HELPER METHOD: Get days remaining
userSchema.methods.getDaysRemaining = function() {
  if (!this.isPremium || !this.subscriptionExpiresAt) return 0;
  const daysLeft = Math.ceil(
    (this.subscriptionExpiresAt - new Date()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, daysLeft);
};

// HELPER METHOD: Check expiry and auto-downgrade
userSchema.methods.checkAndDowngradeIfExpired = async function() {
  if (this.isPremium && this.subscriptionExpiresAt) {
    if (new Date() > this.subscriptionExpiresAt) {
      this.isPremium = false;
      this.subscriptionPlan = null;
      await this.save();
      return true; // Was downgraded
    }
  }
  return false; // Still active
};

module.exports = mongoose.model('User', userSchema);
*/

module.exports = userSchemaUpdates;
