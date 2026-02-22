import React, { useState, useEffect } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import {
  Settings,
  CheckCircle,
  XCircle,
  AlertCircle,
  Server,
  Globe,
  Key,
  Mail,
  CreditCard,
  Shield,
  RefreshCw,
} from 'lucide-react';

export default function AdminSettings() {
  const { fetchSettings } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const result = await fetchSettings();
      setSettings(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3">
        <AlertCircle className="w-5 h-5" />
        <p>{error}</p>
        <button onClick={loadSettings} className="ml-auto text-sm font-medium underline">Retry</button>
      </div>
    );
  }

  const system = settings?.system || {};
  const features = settings?.features || {};

  const systemItems = [
    {
      icon: Server,
      label: 'Environment',
      value: system.environment || 'Unknown',
      color: system.environment === 'production' ? 'text-green-600' : 'text-amber-600',
    },
    {
      icon: Globe,
      label: 'Frontend URL',
      value: system.frontendUrl || 'Not configured',
      color: system.frontendUrl ? 'text-slate-700' : 'text-red-600',
    },
    {
      icon: Server,
      label: 'MongoDB',
      value: system.mongoConnected ? 'Connected' : 'Disconnected',
      color: system.mongoConnected ? 'text-green-600' : 'text-red-600',
      status: system.mongoConnected,
    },
  ];

  const featureItems = [
    {
      icon: CreditCard,
      label: 'Paystack Payments',
      enabled: features.paymentsEnabled,
      description: 'Process premium subscription payments',
    },
    {
      icon: Mail,
      label: 'Email Service (Resend)',
      enabled: features.emailEnabled,
      description: 'Password reset & welcome emails',
    },
    {
      icon: Shield,
      label: 'Google OAuth',
      enabled: features.oauthEnabled,
      description: 'Sign in with Google authentication',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Server configuration and feature status</p>
        </div>
        <button
          onClick={loadSettings}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-500" />
            System Information
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {systemItems.map((item, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-slate-500" />
                </div>
                <span className="text-sm font-medium text-slate-600">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.status !== undefined && (
                  item.status ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )
                )}
                <span className={`text-sm font-medium ${item.color}`}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Status */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <Key className="w-4 h-4 text-slate-500" />
            Feature Status
          </h3>
          <p className="text-xs text-slate-400 mt-1">Features are enabled based on environment variables</p>
        </div>
        <div className="divide-y divide-slate-100">
          {featureItems.map((item, i) => (
            <div key={i} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  item.enabled ? 'bg-green-50' : 'bg-slate-100'
                }`}>
                  <item.icon className={`w-4 h-4 ${item.enabled ? 'text-green-600' : 'text-slate-400'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                item.enabled
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-500'
              }`}>
                {item.enabled ? (
                  <>
                    <CheckCircle className="w-3 h-3" /> Active
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3" /> Inactive
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-500" />
            Security Configuration
          </h3>
        </div>
        <div className="px-5 py-5 space-y-3">
          <SecurityItem label="CORS" description="Locked to FRONTEND_URL + localhost only" active />
          <SecurityItem label="JWT Auth" description="7-day access tokens + 30-day refresh tokens with rotation" active />
          <SecurityItem label="Webhook Verification" description="Paystack signatures verified with timingSafeEqual" active />
          <SecurityItem label="Rate Limiting" description="Password reset: 3 attempts/hour, Contact form: 5/hour" active />
          <SecurityItem label="Error Sanitization" description="Stack traces never sent to clients" active />
          <SecurityItem label="Structured Logging" description="JSON-formatted logs in production (no console.log)" active />
        </div>
      </div>

      {/* Environment Variables Checklist */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
          <Key className="w-4 h-4" />
          Required Environment Variables
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            'MONGO_URI', 'JWT_SECRET', 'FRONTEND_URL', 'PAYSTACK_SECRET_KEY',
            'PAYSTACK_PUBLIC_KEY', 'RESEND_API_KEY', 'GOOGLE_CLIENT_ID',
            'GOOGLE_CLIENT_SECRET', 'OPENROUTER_API_KEY',
          ].map((envVar) => (
            <div key={envVar} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <code className="text-blue-700 font-mono text-xs">{envVar}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SecurityItem({ label, description, active }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 flex-shrink-0 ${active ? 'text-green-500' : 'text-slate-300'}`}>
        <CheckCircle className="w-4 h-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}
