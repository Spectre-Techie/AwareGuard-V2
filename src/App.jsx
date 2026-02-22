// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Learn from "./pages/Learn";
import AskAwareGuard from "./pages/AskAwareGuard";
import Report from "./pages/Report";
import AwarenessHub from "./pages/AwarenessHub";
import CommunityStories from "./pages/CommunityStories";
import Scams from "./pages/scams";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GoogleCallback from "./pages/GoogleCallback";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminStories from "./pages/admin/AdminStories";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminRoute from "./components/AdminRoute";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper that conditionally shows Navbar/Footer
function AppLayout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    // Admin pages use their own full-screen layout
    return <>{children}</>;
  }

  const hideFooter = location.pathname === '/ask';

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}

const App = () => {
  return (
    <ThemeProvider>
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppLayout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/ask" element={<AskAwareGuard />} />
            <Route path="/hub" element={<AwarenessHub />} />
            <Route path="/stories" element={<CommunityStories />} />
            <Route path="/scams" element={<Scams />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Auth routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />

            {/* Protected routes */}
            <Route path="/learn" element={<Learn />} />

            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />

            {/* Admin Panel (own layout, no Navbar/Footer) */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="stories" element={<AdminStories />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center h-[60vh] text-center px-4">
                  <div>
                    <h1 className="text-6xl font-bold text-blue-600 mb-2">404</h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">Page not found</p>
                    <a href="/" className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition">Go Home</a>
                  </div>
                </div>
              }
            />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
