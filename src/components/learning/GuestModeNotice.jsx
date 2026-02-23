/**
 * @file GuestModeNotice.jsx
 * @description Notification component encouraging guests to sign in for progress tracking
 * @version 1.0
 * @since 2025-12-23
 */

import React from "react";
import { UserCircle, BarChart3, Star, Trophy, Flame, GraduationCap, Rocket, Lock } from "lucide-react";

/**
 * GuestModeNotice Component
 * Shows a prominent notice to guest users about benefits of signing in
 * 
 * @param {Object} props
 * @param {Function} props.onSignIn - Callback when user clicks sign in
 * 
 * @returns {JSX.Element} Notice component with CTA
 */
export default function GuestModeNotice({ onSignIn }) {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 rounded-xl p-5 sm:p-8 text-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
        {/* Left Side: Message */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <UserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white/90" strokeWidth={1.5} />
            <h3 className="text-xl sm:text-2xl font-bold">Unlock Full Learning Experience</h3>
          </div>
          
          <p className="text-blue-100 mb-6 text-base sm:text-lg">
            Sign in to get the most out of your learning journey with AwareGuard.
          </p>

          {/* Benefits List */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 mt-0.5 text-blue-200 flex-shrink-0" />
              <div>
                <p className="font-semibold">Track Your Progress</p>
                <p className="text-sm text-blue-100">See all your completed modules and learning milestones</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 mt-0.5 text-amber-300 flex-shrink-0" />
              <div>
                <p className="font-semibold">Earn XP & Levels</p>
                <p className="text-sm text-blue-100">Complete modules and watch your level grow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Trophy className="w-5 h-5 mt-0.5 text-yellow-300 flex-shrink-0" />
              <div>
                <p className="font-semibold">Unlock Achievements</p>
                <p className="text-sm text-blue-100">Earn badges as you progress through learning paths</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Flame className="w-5 h-5 mt-0.5 text-orange-300 flex-shrink-0" />
              <div>
                <p className="font-semibold">Build Your Streak</p>
                <p className="text-sm text-blue-100">Stay consistent and maintain your daily learning streak</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 mt-0.5 text-blue-200 flex-shrink-0" />
              <div>
                <p className="font-semibold">Get Certificates</p>
                <p className="text-sm text-blue-100">Earn and download certificates upon completion (coming soon)</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onSignIn}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg hover:shadow-xl"
          >
            Sign In Now to Get Started →
          </button>
        </div>

        {/* Right Side: Visual Element */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full w-40 h-40 flex items-center justify-center mb-6 border border-white/20">
            <Rocket className="w-20 h-20 text-white/80" strokeWidth={1.5} />
          </div>
          <p className="text-center text-white font-semibold text-lg">
            Start your scam awareness journey today
          </p>
          <p className="text-center text-blue-100 text-sm mt-2">
            Join thousands learning digital safety
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 sm:mt-8 sm:pt-8 border-t border-white border-opacity-20">
        <p className="text-sm text-blue-100">
          <Lock className="w-4 h-4 inline-block mr-1" />
          <span className="font-semibold">Your data is secure:</span> We never sell your learning data. Your privacy is our priority.
        </p>
      </div>
    </div>
  );
}
