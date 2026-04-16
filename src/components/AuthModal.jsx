// src/components/AuthModal.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { X, ShieldCheck, Check } from "lucide-react";

/**
 * AuthModal — Reusable authentication modal with dark mode support.
 * Supports Sign In and Sign Up (email/password).
 */
export default function AuthModal({ isOpen, onClose }) {
  const { signin, signup } = useAuth();

  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const passwordChecks = [
    { label: "At least 8 characters", valid: form.password.length >= 8 },
    { label: "At least 1 uppercase letter", valid: /[A-Z]/.test(form.password) },
    { label: "At least 1 number", valid: /[0-9]/.test(form.password) },
    { label: "At least 1 symbol", valid: /[^A-Za-z0-9\s]/.test(form.password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !passwordValid) {
      setError("Password must be at least 8 characters and include an uppercase letter, a number, and a symbol.");
      return;
    }

    try {
      if (mode === "signin") {
        await signin({ email: form.email, password: form.password });
      } else {
        await signup({ name: form.name, email: form.email, password: form.password });
      }
      onClose();
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };

  const inputClasses =
    "w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  const hasTypedPassword = form.password.length > 0;
  const passwordValid = passwordChecks.every((rule) => rule.valid);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-2xl dark:shadow-slate-950/50 p-6 relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Logo & Title */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck size={24} className="text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {mode === "signin" ? "Sign In to AwareGuard" : "Create an Account"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {mode === "signin"
              ? "Welcome back! Enter your credentials."
              : "Join thousands protecting themselves online."}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm mb-4 p-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Auth form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Full name"
              className={inputClasses}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email address"
            className={inputClasses}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className={inputClasses}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {mode === "signup" && (
            <div className="space-y-1">
              {passwordChecks.map((rule) => {
                const ruleClass = rule.valid
                  ? "text-green-600 dark:text-green-400"
                  : hasTypedPassword
                    ? "text-red-500 dark:text-red-400"
                    : "text-slate-500 dark:text-slate-400";

                return (
                  <p key={rule.label} className={`text-xs flex items-center gap-1 ${ruleClass}`}>
                    {rule.valid ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    {rule.label}
                  </p>
                );
              })}
            </div>
          )}

          {mode === "signin" && (
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={mode === "signup" && !passwordValid}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors shadow-md shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Mode switch */}
        <p className="text-sm text-center mt-5 text-slate-500 dark:text-slate-400">
          {mode === "signin" ? (
            <>
              {"Don't have an account? "}
              <button
                onClick={() => setMode("signup")}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("signin")}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
