import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, Bot, ChevronRight, HelpCircle } from 'lucide-react';

const AwarenessHub = () => {
  const cards = [
    {
      title: "Common Scam Tactics",
      description: "Learn how fraudsters operate - from phishing emails to fake investment sites. Understand their playbook so you don't fall victim.",
      link: "/scams",
      linkText: "Explore scam types",
      icon: ShieldAlert,
      color: "red",
    },
    {
      title: "Real-Life Stories",
      description: "Read verified stories from real victims and survivors. Learn from their experiences and how they recovered or reported scams.",
      link: "/stories",
      linkText: "Read community stories",
      icon: BookOpen,
      color: "blue",
    },
    {
      title: "Ask Our AI Assistant",
      description: "Got a suspicious message or unsure about a website? Ask our AI assistant in seconds for immediate guidance and safety tips.",
      link: "/ask",
      linkText: "Ask AwareGuard",
      icon: Bot,
      color: "violet",
    },
  ];

  const faqs = [
    {
      q: "How do I know if a message is a scam?",
      a: "Look for signs like urgency, unknown senders, poor grammar, or requests for personal info. Ask our AI or check our Learn page for guidance.",
    },
    {
      q: "Is reporting scams safe and anonymous?",
      a: "Yes. You can submit scam reports anonymously or with your contact email so we can follow up. Your data is encrypted and kept secure.",
    },
    {
      q: "Can scammers impersonate real organizations?",
      a: "Absolutely. Scammers often copy logos, emails, and domains to trick users. Always verify sources and URLs carefully.",
    },
  ];

  const colorMap = {
    red: { bg: "bg-red-100 dark:bg-red-500/10", text: "text-red-600 dark:text-red-400" },
    blue: { bg: "bg-blue-100 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
    violet: { bg: "bg-violet-100 dark:bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Awareness Hub</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Your trusted space to learn, explore, and stay ahead of online scams. Empower yourself with verified knowledge.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Resource Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${colorMap[card.color].bg} flex items-center justify-center mb-5`}>
                <card.icon className={`w-6 h-6 ${colorMap[card.color].text}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{card.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{card.description}</p>
              <Link
                to={card.link}
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold group-hover:gap-2 transition-all"
              >
                {card.linkText}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 dark:border-slate-800 pb-6 last:border-0 last:pb-0">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AwarenessHub;
