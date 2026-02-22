import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <ShieldCheck size={20} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Terms of Service</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              By accessing or using AwareGuard (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Description of Service</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              AwareGuard is an AI-powered scam awareness and education platform that provides interactive learning modules, AI-driven scam analysis, community features, and cybersecurity education resources. The Platform is designed for informational and educational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. User Accounts</h2>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your credentials</li>
              <li>You must be at least 13 years old to create an account</li>
              <li>You are responsible for all activities that occur under your account</li>
              <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Acceptable Use</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
              <li>Use the Platform for any illegal or unauthorized purpose</li>
              <li>Submit false, misleading, or fraudulent scam reports</li>
              <li>Attempt to gain unauthorized access to platform systems</li>
              <li>Use the AI analyzer to generate harmful or malicious content</li>
              <li>Harass, abuse, or harm other community members</li>
              <li>Reverse engineer or attempt to extract the source code of our AI models</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. AI Analyzer Disclaimer</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              The AI Scam Analyzer is provided as an educational tool and should not be considered definitive security advice. While we strive for accuracy, AI analysis may not catch all threats. Always exercise your own judgment and consult cybersecurity professionals for critical security decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Intellectual Property</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              All content, features, and functionality of the Platform — including text, graphics, logos, icons, learning modules, and software — are owned by AwareGuard and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Premium Services</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Premium features may be available through paid subscriptions. Payment terms, refund policies, and subscription details are presented at the time of purchase. We reserve the right to modify pricing with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">8. Community Content</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Users may submit scam reports and community stories. By submitting content, you grant AwareGuard a non-exclusive license to use, display, and distribute that content for platform purposes. You retain ownership of your original content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">9. Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              AwareGuard is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any damages arising from your use of the Platform, including but not limited to financial losses from scams that the Platform failed to detect. Use the Platform as a supplementary tool alongside other security measures.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">10. Changes to Terms</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We may update these Terms of Service from time to time. We will notify users of significant changes via email or platform notification. Continued use of the Platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">11. Contact</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:contact@awareguard.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                contact@awareguard.com
              </a>{' '}
              or visit our <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
