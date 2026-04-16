import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Sparkles, Building2, ChevronRight } from 'lucide-react';
import { PREMIUM_FEATURES } from '../data/learningData';
import PremiumUpgrade from '../components/learning/PremiumUpgrade';
import CorporateTraining from '../components/learning/CorporateTraining';

const Pricing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [billingCycle, setBillingCycle] = useState('annual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paystackKey, setPaystackKey] = useState('');

  const pricing = { monthly: 5000, annual: 50000, currency: 'NGN' };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('https://awareguard-backend.onrender.com/api/config/paystack');
        const data = await response.json();
        setPaystackKey(data.publicKey);
      } catch (err) {
        console.error('Failed to fetch Paystack config:', err);
      }
    };
    fetchConfig();
  }, []);

  const handleUpgrade = async (plan) => {
    if (!user) { navigate('/signup?redirect=/pricing'); return; }
    if (!paystackKey) { setError('Payment system not ready. Please try again.'); return; }
    setLoading(true);
    setError('');
    try {
      const amount = plan === 'monthly' ? pricing.monthly * 100 : pricing.annual * 100;
      const handler = window.PaystackPop.setup({
        key: paystackKey, email: user.email, amount, currency: 'NGN',
        ref: `${user.id}_${Date.now()}`,
        metadata: { userId: user.id, plan, custom_fields: [{ display_name: "User Name", variable_name: "user_name", value: user.name }] },
        callback: (response) => { verifyPayment(response.reference); },
        onClose: () => { setLoading(false); setError('Payment cancelled'); }
      });
      handler.openIframe();
    } catch (err) {
      console.error('Paystack error:', err);
      setError('Failed to initialize payment. Please try again.');
      setLoading(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://awareguard-backend.onrender.com/api/payments/verify-payment/${reference}`, {
        method: 'GET', headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) { navigate('/learn?upgraded=true'); }
      else { setError(data.message || 'Payment verification failed'); }
    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify payment. Please contact support.');
    } finally { setLoading(false); }
  };

  const handleContactSales = () => { navigate('/contact?type=enterprise'); };

  const monthlyCost = pricing.monthly * 12;
  const savings = monthlyCost - pricing.annual;
  const savingsPercent = Math.round((savings / monthlyCost) * 100);

  const plans = [
    {
      name: "Free", price: "0", period: "/forever", highlight: false,
      description: "Get started with essential security knowledge",
      features: PREMIUM_FEATURES.free,
      cta: null, ctaText: "Already included - start learning now!",
    },
    {
      name: "Premium", highlight: true,
      price: billingCycle === 'annual' ? pricing.annual.toLocaleString() : pricing.monthly.toLocaleString(),
      period: billingCycle === 'annual' ? '/year' : '/month',
      description: "Full access to all advanced modules and features",
      features: PREMIUM_FEATURES.premium,
      cta: () => handleUpgrade(billingCycle), ctaText: loading ? 'Processing...' : 'Upgrade to Premium',
    },
    {
      name: "Enterprise", price: "Custom", period: "", highlight: false,
      description: "Tailored pricing for your organization",
      features: PREMIUM_FEATURES.enterprise,
      cta: handleContactSales, ctaText: "Contact Sales",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Choose Your Plan</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">Protect yourself and your team with AwareGuard</p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition text-sm ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >Monthly</button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2.5 rounded-lg font-semibold transition text-sm relative ${billingCycle === 'annual' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">Save {savingsPercent}%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-8 border-2 transition-all relative ${
                plan.highlight
                  ? 'border-blue-600 dark:border-blue-500 shadow-xl scale-[1.02]'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    <Sparkles className="w-3.5 h-3.5" /> Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price === 'Custom' ? '' : '\u20A6'}{plan.price}</span>
                <span className="text-slate-500 dark:text-slate-400">{plan.period}</span>
                {plan.highlight && billingCycle === 'annual' && (
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">Save {'\u20A6'}{savings.toLocaleString()}/year</p>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 dark:text-slate-400 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.cta ? (
                <button
                  onClick={plan.cta}
                  disabled={loading && plan.highlight}
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    plan.highlight
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 disabled:opacity-50'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                  }`}
                >
                  {plan.ctaText}
                </button>
              ) : (
                <div className="text-center text-sm text-slate-500 dark:text-slate-400 font-medium py-3">{plan.ctaText}</div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Premium Membership Section (moved from Learn) */}
        {!user?.isPremium && (
          <div className="mt-16">
            <PremiumUpgrade onUpgrade={() => navigate('/learn?upgraded=true')} />
          </div>
        )}

        {/* Enterprise Training Section (moved from Learn) */}
        <div className="mt-16">
          <CorporateTraining onContactSales={handleContactSales} />
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-6">
            {[
              { q: "Can I switch plans later?", a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately." },
              { q: "What payment methods do you accept?", a: "We accept all major payment methods via Paystack, including cards, bank transfers, and USSD." },
              { q: "Is there a free trial?", a: "Our Free plan gives you access to all beginner modules. Try it out before upgrading!" },
              { q: "Is my payment secure?", a: "Yes! All payments are processed securely through Paystack, Nigeria's leading payment gateway." },
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <script src="https://js.paystack.co/v1/inline.js"></script>
    </div>
  );
};

export default Pricing;
