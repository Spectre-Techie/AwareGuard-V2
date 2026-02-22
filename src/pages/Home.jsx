import { Link } from "react-router-dom";
import {
  ShieldCheck, ShieldAlert, Bot, BookOpen, Users, TrendingUp, UserX,
  AlertTriangle, MessageSquare, UserPlus, GraduationCap, ArrowRight,
  CheckCircle, Sparkles, Globe, Lock, Eye, ChevronRight, Quote
} from "lucide-react";
import { motion } from "framer-motion";
import aiShield from '../assets/aiShield.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  }),
};
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-900">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40 mb-6">
                  <Sparkles size={12} /> AI-Powered Protection
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                Don't Become the Next Victim of{" "}<span className="gradient-text">Online Fraud</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4 max-w-lg">
                Online scams cost victims billions every year, and 1 in 3 people are targeted. AwareGuard uses AI to help you recognize, analyze, and avoid digital threats before they strike.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/learn" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-md shadow-blue-600/25">
                  Start Learning Free <ArrowRight size={16} />
                </Link>
                <Link to="/ask" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-xl transition-colors">
                  Try AI Analyzer <Bot size={16} />
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} custom={4}>
                <div className="flex flex-wrap gap-6 lg:gap-8">
                  {[
                    { icon: Users, value: "10,000+", label: "Users Protected" },
                    { icon: ShieldAlert, value: "50+", label: "Scam Types Covered" },
                    { icon: Bot, value: "AI", label: "Powered Analysis" },
                  ].map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">{value}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 dark:from-blue-600/10 dark:to-indigo-600/10 rounded-3xl blur-2xl" />
                <img src={aiShield} alt="AwareGuard AI Shield" className="relative w-full max-w-md animate-float drop-shadow-xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400 mb-3">The Growing Threat</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Online Scams Are Evolving Faster Than Ever</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Cybercriminals are becoming more sophisticated. Without proper awareness, anyone can fall victim.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: AlertTriangle, color: "text-red-500 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20", stat: "$55B+", label: "Lost to online scams worldwide every year" },
              { icon: TrendingUp, color: "text-amber-500 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20", stat: "300%", label: "Increase in phishing attacks since 2023" },
              { icon: UserX, color: "text-orange-500 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20", stat: "1 in 3", label: "People targeted by online scams every year" },
            ].map(({ icon: Icon, color, bg, stat, label }, i) => (
              <motion.div key={stat} variants={fadeUp} custom={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}><Icon size={26} className={color} /></div>
                <p className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">{stat}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Our Solution</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">How AwareGuard Protects You</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">A comprehensive platform combining AI technology, expert training, and community intelligence.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: BookOpen, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", title: "Expert-Led Learning", desc: "Interactive modules with quizzes, real-world scenarios, and progress tracking to build your scam detection skills.", link: "/learn", linkText: "Start learning" },
              { icon: Bot, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20", title: "AI Scam Analyzer", desc: "Paste suspicious messages, emails, or URLs. Our AI instantly analyzes them and explains exactly what to watch out for.", link: "/ask", linkText: "Try the analyzer" },
              { icon: ShieldCheck, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20", title: "Community Protection", desc: "Report scams, share experiences, and stay updated with real-time threat alerts from the AwareGuard community.", link: "/stories", linkText: "Join the community" },
            ].map(({ icon: Icon, color, bg, title, desc, link, linkText }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}>
                <Link to={link} className="group block bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 h-full hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5`}><Icon size={22} className={color} /></div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">{linkText}<ChevronRight size={14} /></span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Getting Started</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">How It Works</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">Get protected in four simple steps</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: UserPlus, title: "Sign Up Free", desc: "Create your account in seconds with email or Google." },
              { icon: GraduationCap, title: "Learn Scam Patterns", desc: "Complete interactive modules on real-world threats." },
              { icon: MessageSquare, title: "Ask AI About Threats", desc: "Paste suspicious messages for instant AI analysis." },
              { icon: ShieldCheck, title: "Stay Protected", desc: "Build lasting awareness and help protect others." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i} className="relative text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center mx-auto mb-5 shadow-md shadow-blue-600/25"><Icon size={22} strokeWidth={2} /></div>
                <span className="absolute top-0 right-1/2 translate-x-10 -translate-y-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 w-6 h-6 flex items-center justify-center rounded-full">{i + 1}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES HIGHLIGHT */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-14">
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Why AwareGuard</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Built for Real Protection</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Real-World Scenarios", desc: "Learn from actual scam cases reported by our community" },
              { icon: Lock, title: "Privacy First", desc: "Your data stays private. No tracking, no selling information" },
              { icon: Globe, title: "Always Accessible", desc: "Learn anytime, anywhere. Mobile-friendly platform" },
              { icon: GraduationCap, title: "Structured Curriculum", desc: "Progress from beginner to expert at your own pace" },
              { icon: Sparkles, title: "AI-Powered Insights", desc: "Get instant analysis of suspicious messages and links" },
              { icon: CheckCircle, title: "Proven Methods", desc: "Evidence-based training that actually builds awareness" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i} className="flex items-start gap-4 p-5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0"><Icon size={18} className="text-blue-600 dark:text-blue-400" /></div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* COMMUNITY STORIES */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="text-center mb-12">
            <motion.span variants={fadeUp} className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Community</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">Real Stories from Real People</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">See how AwareGuard has helped people avoid scams and protect their communities.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { quote: "I got an email that looked exactly like my bank's. AwareGuard's training helped me spot the subtle signs it was a phishing attempt.", name: "Muhammad G.", role: "Community Member" },
              { quote: "The AI analyzer instantly detected a fake job offer I received. It saved me from sharing my personal details with scammers.", name: "Sarah K.", role: "Premium User" },
              { quote: "After completing the beginner modules, I was able to educate my family about common online scams. Knowledge is truly power.", name: "David M.", role: "Learner" },
            ].map(({ quote, name, role }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-7">
                <Quote size={24} className="text-blue-200 dark:text-blue-800 mb-4" />
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5 italic">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm font-bold">{name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center">
            <Link to="/stories" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">Read more community stories <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-slate-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Yourself?</motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">Join thousands of informed users who are staying ahead of online fraud. Start your free training today.</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-600/30">Get Started Free <ArrowRight size={16} /></Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-slate-400 text-slate-300 hover:border-white hover:text-white font-semibold rounded-xl transition-colors">Contact for Teams</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
