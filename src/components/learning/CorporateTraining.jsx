/**
 * @file CorporateTraining.jsx
 * @description Enterprise training section for organizational use
 * Showcases corporate/workshop capabilities for B2B monetization
 * Critical for investor pitch and enterprise sales strategy
 * @version 1.0
 * @since 2025-12-23
 */

import React, { useState } from "react";
import { Users, Building2, Globe, ShieldCheck, ClipboardCheck, BarChart3, Scaling, CheckCircle2, ArrowRight } from "lucide-react";

/**
 * CorporateTraining Component
 * Displays enterprise training options, features, and contact CTA
 * Key revenue stream for AwareGuard's business model
 * 
 * @param {Object} props
 * @param {Function} props.onContactSales - Callback for contact sales button
 * @returns {JSX.Element} Corporate training section UI
 */
const CorporateTraining = ({ onContactSales = () => {} }) => {
  const [selectedPlan, setSelectedPlan] = useState("team");

  const plans = [
    {
      id: "team",
      name: "Team Training",
      size: "5-50 people",
      startPrice: 499,
      priceFormat: "one-time",
      features: [
        "Customize training modules",
        "Team progress tracking",
        "Completion certificates",
        "Email support",
        "Interactive quizzes",
      ],
      use: "Small team security awareness",
      icon: <Users className="w-8 h-8 text-blue-600" />,
    },
    {
      id: "organization",
      name: "Organization Plan",
      size: "50-1000 people",
      startPrice: 1999,
      priceFormat: "annual",
      features: [
        "Everything in Team",
        "Dedicated account manager",
        "Advanced analytics",
        "Custom branding",
        "Compliance reporting (SOC2, GDPR)",
        "Priority support",
      ],
      use: "Large organization compliance",
      icon: <Building2 className="w-8 h-8 text-purple-600" />,
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      size: "1000+ people",
      startPrice: 9999,
      priceFormat: "annual",
      features: [
        "Everything in Organization",
        "Dedicated security consultant",
        "On-site training available",
        "Custom scenarios",
        "Real-time dashboards",
        "API access for integrations",
        "SLA guarantee",
      ],
      use: "Enterprise-wide security culture",
      icon: <Globe className="w-8 h-8 text-indigo-600" />,
    },
  ];

  const benefits = [
    {
      title: "Reduce Security Incidents",
      desc: "Trained employees are 95% less likely to click malicious links",
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    },
    {
      title: "Compliance Ready",
      desc: "Meet GDPR, SOC2, ISO 27001, and industry-specific requirements",
      icon: <ClipboardCheck className="w-8 h-8 text-blue-600" />,
    },
    {
      title: "Measurable Progress",
      desc: "Real-time dashboards show training completion and behavior change",
      icon: <BarChart3 className="w-8 h-8 text-violet-600" />,
    },
    {
      title: "Scalable Solution",
      desc: "Grows with your organization from 10 to 10,000+ employees",
      icon: <Scaling className="w-8 h-8 text-amber-600" />,
    },
  ];

  const useCases = [
    "Financial institutions protecting customer data",
    "Healthcare organizations securing patient records",
    "Tech companies building security culture",
    "Government agencies ensuring compliance",
    "Retailers defending against fraud",
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Enterprise Security Training
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Transform your organization's security culture with customized, scalable training programs. Reduce incidents, ensure compliance, and create a security-aware workforce.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-10">
            Choose Your Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-xl border-2 transition-all ${
                  selectedPlan === plan.id
                    ? "border-purple-600 shadow-xl bg-purple-50 dark:bg-purple-500/10"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg"
                } overflow-hidden`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.recommended && (
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 text-center text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl mb-2">{plan.icon}</div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        {plan.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{plan.size}</p>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="border-t border-b border-slate-200 dark:border-slate-700 py-6 mb-6">
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${plan.startPrice}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">
                        {plan.priceFormat === "annual" ? "/year" : " one-time"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {plan.priceFormat === "annual" && "+ $4.99 per additional user/year"}
                    </p>
                    <p className="text-xs text-purple-600 font-medium mt-2">
                      {plan.use}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={onContactSales}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                      selectedPlan === plan.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Contact Sales →" : "Learn More"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 rounded-xl p-12 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Trusted by Organizations Like:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="flex gap-4 items-start bg-white dark:bg-slate-800 p-6 rounded-lg"
              >
                <span className="text-2xl flex-shrink-0"><ArrowRight className="w-6 h-6 text-blue-600" /></span>
                <div>
                  <p className="text-slate-900 dark:text-white font-medium">{useCase}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
            <p className="text-slate-600 dark:text-slate-400">Reduction in successful phishing attacks</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <p className="text-slate-600 dark:text-slate-400">Employees trained across industries</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">30 days</div>
            <p className="text-slate-600 dark:text-slate-400">Average time to measurable behavior change</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Protect Your Organization?</h3>
          <p className="text-lg mb-8 text-purple-100">
            Schedule a demo with our security team to see how AwareGuard Enterprise can transform your organization's security culture.
          </p>
          <button
            onClick={onContactSales}
            className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Schedule Demo Call →
          </button>
          <p className="text-sm text-purple-200 mt-4">
            No credit card required • 30-minute consultation • Customized proposal
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                How long does deployment take?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Team plans can be deployed in 48 hours. Organization and Enterprise plans include a dedicated onboarding specialist for smooth integration.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                What compliance standards are covered?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Organization+ plans include coverage for GDPR, SOC2, ISO 27001, HIPAA, PCI-DSS, and industry-specific regulations.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                Can we customize the content?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Yes. Organization and Enterprise plans support custom scenarios based on your industry, threats, and organizational culture.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                Do you integrate with our current tools?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Enterprise plan includes API access and integrations with Slack, Microsoft Teams, LMS platforms, and SIEM systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateTraining;
