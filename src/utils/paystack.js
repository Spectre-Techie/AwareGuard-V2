/**
 * @file paystack.js
 * @description Paystack payment integration utilities
 * Handles payment initialization, verification, and subscription management
 */

const baseURL = "https://awareguard-backend.onrender.com";

/**
 * Initialize Paystack payment modal
 * @param {string} email - User email
 * @param {number} amount - Amount in NGN
 * @param {string} plan - 'monthly' or 'annual'
 * @param {string} userId - User ID for metadata
 * @returns {Promise<Object>} Payment result with reference
 */
export const initializePaystack = async (email, amount, plan, userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch Paystack config from backend
      const configResponse = await fetch(`${baseURL}/api/config/paystack`);
      if (!configResponse.ok) {
        throw new Error('Failed to fetch payment configuration');
      }
      const config = await configResponse.json();

      // Check if Paystack is loaded
      if (!window.PaystackPop) {
        reject(new Error('Paystack library not loaded'));
        return;
      }

      const handler = window.PaystackPop.setup({
        key: config.publicKey, // Get from backend
        email: email,
        amount: amount * 100, // Convert to kobo (multiply by 100)
        currency: 'NGN',
        ref: `premium_${plan}_${userId}_${Date.now()}`, // Unique reference
        metadata: {
          userId: userId,
          plan: plan,
          timestamp: new Date().toISOString()
        },
        onClose: function () {
          // User closed payment modal without completing
          reject(new Error('Payment cancelled by user'));
        },
        callback: function (response) {
          // Payment successful on Paystack end
          // Still need to verify on backend
          console.log('Paystack payment response:', response);
          resolve({
            reference: response.reference,
            status: response.status,
            plan: plan,
            email: email
          });
        }
      });

      handler.openIframe();
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Verify payment with backend
 * @param {string} reference - Paystack transaction reference
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Verification result
 */
export const verifyPayment = async (reference, token) => {
  try {
    const response = await fetch(`${baseURL}/api/payments/verify-payment/${reference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Payment verification failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};

/**
 * Get subscription status
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Subscription status
 */
export const getSubscriptionStatus = async (token) => {
  try {
    const response = await fetch(`${baseURL}/api/payments/subscription-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscription status');
    }

    return await response.json();
  } catch (error) {
    console.error('Subscription status error:', error);
    throw error;
  }
};

/**
 * Cancel subscription
 * @param {string} token - Auth token
 * @returns {Promise<Object>} Cancellation result
 */
export const cancelSubscription = async (token) => {
  try {
    const response = await fetch(`${baseURL}/api/payments/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to cancel subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Cancellation error:', error);
    throw error;
  }
};

/**
 * Load Paystack script dynamically if not already loaded
 * @returns {Promise<void>}
 */
export const loadPaystackScript = () => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.PaystackPop) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => {
      console.log('Paystack script loaded successfully');
      resolve();
    };
    script.onerror = () => {
      console.error('Failed to load Paystack script');
      reject(new Error('Failed to load Paystack script'));
    };
    document.head.appendChild(script);
  });
};
