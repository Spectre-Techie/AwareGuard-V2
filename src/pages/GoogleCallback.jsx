import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Loader2 } from 'lucide-react';

export default function GoogleCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr));
        login(token, user);
        navigate(user.role === 'admin' ? '/admin' : '/learn');
      } catch (error) {
        console.error('Failed to parse user data:', error);
        navigate('/signin?error=invalid_callback');
      }
    } else {
      navigate('/signin?error=oauth_failed');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
          <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-pulse" />
        </div>
        <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
        <p className="text-slate-700 dark:text-slate-300 text-lg font-medium">Completing sign in...</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Please wait a moment</p>
      </div>
    </div>
  );
}
