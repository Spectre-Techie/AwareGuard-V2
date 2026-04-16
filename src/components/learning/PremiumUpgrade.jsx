/**
 * @file PremiumUpgrade.jsx
 * @description Premium upgrade section with pricing and value proposition
 * Shows clear benefits, pricing, and CTA for monetization strategy
 * Supports monthly and annual billing options
 * @version 1.0
 * @since 2025-12-23
 */

import React, { useState, useEffect } from "react";
import { GraduationCap, Target, BarChart3, Award, Zap, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { initializePaystack, verifyPayment, loadPaystackScript } from "../../utils/paystack";

/**
 * PremiumUpgrade Component
 * Displays premium features, pricing, and upgrade call-to-action
 * Integrates with Paystack for payment processing
 * 
 * @param {Object} props
 * @param {Function} props.onUpgrade - Callback when upgrade button clicked
 * @returns {JSX.Element} Premium upgrade section UI
 */
const PremiumUpgrade = ({ onUpgrade = () => { } }) => {
  const { user, token } = useAuth();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pricing, setPricing] = useState({
    monthly: {
      price: 5000,
      amountInNGN: "₦5,000",
      period: "month",
      discount: "0%",
      saving: "Pay monthly, cancel anytime",
    },
    annual: {
      price: 50000,
      amountInNGN: "₦50,000",
      period: "year",
      discount: "17%",
      saving: "Save ₦10,000/year",
    },
  });

  // Load Paystack script and fetch pricing on component mount
  useEffect(() => {
    const init = async () => {
      try {
        // Load Paystack script
        await loadPaystackScript();

        // Fetch pricing from backend
        const baseURL = "https://awareguard-backend.onrender.com";
        const response = await fetch(`${baseURL}/api/config/paystack`);
        if (response.ok) {
          const config = await response.json();

          // Update pricing with backend values
          const monthlyAmount = config.monthlyAmount;
          const annualAmount = config.annualAmount;
          const annualSaving = (monthlyAmount * 12) - annualAmount;
          const discountPercent = Math.round((annualSaving / (monthlyAmount * 12)) * 100);

          setPricing({
            monthly: {
              price: monthlyAmount,
              amountInNGN: `₦${monthlyAmount.toLocaleString()}`,
              period: "month",
              discount: "0%",
              saving: "Pay monthly, cancel anytime",
            },
            annual: {
              price: annualAmount,
              amountInNGN: `₦${annualAmount.toLocaleString()}`,
              period: "year",
              discount: `${discountPercent}%`,
              saving: `Save ₦${annualSaving.toLocaleString()}/year`,
            },
          });
        }
      } catch (err) {
        console.error('Failed to load payment config:', err);
        setToast({
          message: "Payment system unavailable. Please try again later.",
          type: "error"
        });
      }
    };

    init();
  }, []);

  const handleUpgrade = async () => {
    if (!user?.email) {
      setToast({
        message: "Please sign in to upgrade",
        type: "error"
      });
      return;
    }

    setLoading(true);

    try {
      // Step 1: Initialize Paystack payment
      const paymentResult = await initializePaystack(
        user.email,
        pricing[billingCycle].price,
        billingCycle,
        user.id
      );

      // Step 2: Verify payment with backend
      const verificationResult = await verifyPayment(paymentResult.reference, token);

      if (verificationResult.success) {
        setToast({
          message: "Premium activated! Welcome to the elite club!",
          type: "success"
        });

        // Update parent component
        onUpgrade({
          isPremium: true,
          plan: billingCycle,
          reference: paymentResult.reference
        });

        // Redirect to learn page after 2 seconds
        setTimeout(() => {
          window.location.href = '/learn';
        }, 2000);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setToast({
        message: error.message || "Payment failed. Please try again.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const premiumFeatures = [
    { icon: <GraduationCap className="w-7 h-7 text-blue-600" />, title: "All Advanced Modules", desc: "Social engineering, identity theft, financial fraud" },
    { icon: <Target className="w-7 h-7 text-indigo-600" />, title: "Interactive Scenarios", desc: "Real-world simulations and decision-making exercises" },
    { icon: <BarChart3 className="w-7 h-7 text-violet-600" />, title: "Personal Analytics", desc: "Track progress, identify weak areas, measure improvement" },
    { icon: <Award className="w-7 h-7 text-amber-600" />, title: "Certificates", desc: "Printable proof of completion for professional use" },
    { icon: <Zap className="w-7 h-7 text-orange-600" />, title: "Priority Support", desc: "Get answers from our security experts quickly" },
    { icon: <EyeOff className="w-7 h-7 text-slate-600" />, title: "Ad-Free", desc: "Clean, distraction-free learning experience" },
  ];

  const current = pricing[billingCycle];
  const monthlyEquivalent = billingCycle === "annual" ? (pricing.annual.price / 12).toFixed(0) : pricing.monthly.price;

  return (
    <section className="bg-white dark:bg-slate-900">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg text-white font-semibold z-50 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-amber-900 dark:text-amber-300">PREMIUM MEMBERSHIP</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Advanced Threat Mastery
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Unlock advanced modules, real-world simulations, and verifiable certificates to become a recognized security expert.
          </p>
        </div>

        {/* Features Grid - Professional */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {premiumFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-lg hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing Card - Professional */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-10 shadow-lg">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1.5">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${billingCycle === "monthly"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 rounded-md font-semibold transition-all relative ${billingCycle === "annual"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Annual
                {billingCycle !== "annual" && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    Save 17%
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Pricing Display */}
          <div className="text-center mb-10">
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">
                {current.amountInNGN}
              </span>
              <span className="text-xl text-slate-600 dark:text-slate-400">per {current.period}</span>
            </div>

            {billingCycle === "annual" && (
              <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg p-4 mb-4 inline-block">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 inline-block mr-1 -mt-0.5" /> {current.saving}
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                  Just ₦{monthlyEquivalent}/month
                </p>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleUpgrade}
            disabled={loading || !user}
            className={`w-full font-bold py-3 px-6 rounded-lg transition-colors duration-200 mb-4 flex items-center justify-center gap-2 ${loading || !user
              ? 'bg-gray-400 text-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : !user ? (
              "Sign In to Upgrade"
            ) : (
              <>
                Unlock Premium
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>

          <div className="text-center text-sm text-slate-600 dark:text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 inline-block mr-0.5 -mt-0.5" /> Cancel anytime &bull; <CheckCircle2 className="w-3.5 h-3.5 inline-block mr-0.5 -mt-0.5" /> No setup fees &bull; <CheckCircle2 className="w-3.5 h-3.5 inline-block mr-0.5 -mt-0.5" /> 7-day free trial
          </div>
        </div>

        {/* Why Upgrade Info - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {/* Why Upgrade */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Why Upgrade?
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">Learn from real attack scenarios & threat analysis</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">Get personalized recommendations based on your progress</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">Earn verifiable certificates for professional credibility</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 dark:text-slate-300">Priority support from security experts</span>
              </li>
            </ul>
          </div>

          {/* Perfect For */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Perfect For
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-slate-700 dark:text-slate-300">Security professionals & IT teams</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-slate-700 dark:text-slate-300">High-value individuals & executives</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-slate-700 dark:text-slate-300">Organizations training employees</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-600 font-bold">•</span>
                <span className="text-slate-700 dark:text-slate-300">Anyone serious about cybersecurity mastery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumUpgrade;
