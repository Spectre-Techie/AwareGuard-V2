import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MailWarning, ShoppingCart, Heart, Gift, Briefcase, ShieldAlert, AlertTriangle, CheckCircle2, Bot } from 'lucide-react';

const scamCategories = [
  {
    title: 'Phishing Emails',
    icon: MailWarning,
    description: 'Phishing emails are designed to trick you into revealing personal or financial information. These messages often look legitimate and may pretend to be from banks, service providers, or even government agencies.',
    warningSigns: ['Unexpected emails requesting login or payment info', 'Suspicious links or attachments', 'Spelling or grammar errors'],
    tips: ['Never click on suspicious links.', 'Always verify sender addresses.', 'Use spam filters and two-factor authentication.'],
  },
  {
    title: 'Online Shopping Scams',
    icon: ShoppingCart,
    description: 'These scams involve fake e-commerce websites or social media ads that trick users into paying for products that never arrive.',
    warningSigns: ['Too-good-to-be-true deals', 'No customer service contact or reviews', 'Requests for payment via crypto or wire transfer'],
    tips: ['Shop from trusted websites.', 'Use secure payment methods like credit cards.', 'Check reviews before purchasing.'],
  },
  {
    title: 'Romance Scams',
    icon: Heart,
    description: 'Scammers pretend to be romantically interested in you, often on dating sites or social platforms, to eventually ask for money.',
    warningSigns: ['Love bombing early in a conversation', 'Excuses to avoid video calls or meeting in person', 'Requests for financial help due to emergencies'],
    tips: ['Never send money to someone you have never met.', 'Be cautious with online relationships.', 'Talk to someone you trust if you feel unsure.'],
  },
  {
    title: 'Lottery & Prize Scams',
    icon: Gift,
    description: 'These scams claim you have won a prize, but ask for personal info or payment before you can claim it.',
    warningSigns: ['Being asked to pay processing or delivery fees', 'Unsolicited messages saying you have won', 'Pressure to respond quickly'],
    tips: ['You cannot win a contest you did not enter.', 'Never pay to receive a prize.', 'Report suspicious messages to authorities.'],
  },
  {
    title: 'Job Offer Scams',
    icon: Briefcase,
    description: 'Fake job offers that ask for personal information or upfront payment for training or equipment.',
    warningSigns: ['Promises of high pay for little work', 'Requests for money to secure the job', 'No interview or vague job details'],
    tips: ['Research the company and job offer.', 'Never pay to get hired.', 'Verify the job posting from the official site.'],
  },
  {
    title: 'Identity Theft',
    icon: ShieldAlert,
    description: 'Scammers steal your personal information to commit fraud, open accounts, or make purchases in your name.',
    warningSigns: ['Unfamiliar charges on your account', 'Missing bills or denied applications', 'Debt collectors calling for unknown accounts'],
    tips: ['Monitor your bank and credit reports regularly.', 'Use strong, unique passwords.', 'Report suspected theft immediately to authorities.'],
  },
];

const Scams = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Common Types of Scams</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Each scam has its own red flags and tactics. Learn how to identify and protect yourself from them.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {scamCategories.map((scam, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                  <scam.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{scam.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{scam.description}</p>

              <div className="mb-4">
                <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 mb-2 text-sm">
                  <AlertTriangle className="w-4 h-4" /> Warning Signs
                </h3>
                <ul className="space-y-1 pl-6 text-sm text-slate-600 dark:text-slate-400 list-disc">
                  {scam.warningSigns.map((sign, i) => (<li key={i}>{sign}</li>))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 mb-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> How to Stay Safe
                </h3>
                <ul className="space-y-1 pl-6 text-sm text-slate-600 dark:text-slate-400 list-disc">
                  {scam.tips.map((tip, i) => (<li key={i}>{tip}</li>))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-10">
          <Bot className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">Need more help understanding scams?</p>
          <Link
            to="/ask"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/20"
          >
            Chat with AwareGuard AI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Scams;
