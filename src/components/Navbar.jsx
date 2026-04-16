// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShieldCheck, Menu, X, LogOut, Settings, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ui/ThemeToggle";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/learn", label: "Learn" },
  { path: "/ask", label: "Ask AI" },
  { path: "/stories", label: "Community" },
  { path: "/hub", label: "Awareness Hub" },
  { path: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isLoggingOut, logoutProgress } = useAuth();

  // Track scroll for glass morphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setUserMenuOpen(false);
    setIsOpen(false);
    await logout();
  };

  return (
    <>
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[80] pointer-events-none"
          >
            <div className="h-1 bg-slate-200/40 dark:bg-slate-700/40">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: `${logoutProgress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-700/50"
            : "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 group-hover:bg-blue-700 transition-colors">
                <ShieldCheck size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                AwareGuard
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  <span
                    className={
                      isActive(link.path)
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }
                  >
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section: Theme + Auth */}
            <div className="flex items-center gap-2">
              <ThemeToggle />

              {/* Desktop Auth */}
              <div className="hidden lg:flex items-center gap-2 ml-2">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                        {(user.name || "U")[0]}
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 max-w-[100px] truncate">
                        {user.name || "User"}
                      </span>
                      <ChevronDown
                        size={14}
                        className={`text-slate-400 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50"
                          >
                            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                {user.name || "User"}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {user.email || ""}
                              </p>
                            </div>
                            {user.role === "admin" && (
                              <Link
                                to="/admin"
                                className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                onClick={() => setUserMenuOpen(false)}
                              >
                                <Settings size={15} />
                                Admin Panel
                              </Link>
                            )}
                            <Link
                              to="/report"
                              className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <User size={15} />
                              Report Scam
                            </Link>
                            <button
                              onClick={handleLogout}
                              disabled={isLoggingOut}
                              className={`relative flex items-center gap-2.5 w-full px-4 py-2 text-sm transition-colors ${
                                isLoggingOut
                                  ? "text-red-500 dark:text-red-300 bg-red-50/70 dark:bg-red-900/20 cursor-wait"
                                  : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              }`}
                            >
                              <LogOut size={15} className={isLoggingOut ? "animate-pulse" : ""} />
                              {isLoggingOut ? `Signing Out... ${logoutProgress}%` : "Sign Out"}
                              {isLoggingOut && (
                                <span className="absolute left-4 right-4 bottom-1 h-0.5 bg-red-100 dark:bg-red-900/40 rounded-full overflow-hidden">
                                  <span
                                    className="block h-full bg-red-500 dark:bg-red-400 transition-all duration-150"
                                    style={{ width: `${logoutProgress}%` }}
                                  />
                                </span>
                              )}
                            </button>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white dark:bg-slate-900 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <ShieldCheck size={18} className="text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">AwareGuard</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive(link.path)
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                  >
                    <Link
                      to="/report"
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive("/report")
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      Report Scam
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Mobile Auth Footer */}
              <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2 mb-2">
                      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold uppercase">
                        {(user.name || "U")[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{user.name || "User"}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.email || ""}</p>
                      </div>
                    </div>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Settings size={16} />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`relative flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isLoggingOut
                          ? "text-red-500 dark:text-red-300 bg-red-50/70 dark:bg-red-900/20 cursor-wait"
                          : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                    >
                      <LogOut size={16} className={isLoggingOut ? "animate-pulse" : ""} />
                      <span>{isLoggingOut ? `Signing Out... ${logoutProgress}%` : "Sign Out"}</span>
                      {isLoggingOut && (
                        <span className="absolute left-4 right-4 bottom-1 h-0.5 bg-red-100 dark:bg-red-900/40 rounded-full overflow-hidden">
                          <span
                            className="block h-full bg-red-500 dark:bg-red-400 transition-all duration-150"
                            style={{ width: `${logoutProgress}%` }}
                          />
                        </span>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      to="/signin"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
