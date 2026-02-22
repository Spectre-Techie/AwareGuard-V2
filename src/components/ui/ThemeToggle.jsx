import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const labels = {
  light: 'Light mode',
  dark: 'Dark mode',
  system: 'System theme',
};

export default function ThemeToggle({ className = '' }) {
  const { theme, cycleTheme } = useTheme();
  const Icon = icons[theme];

  return (
    <button
      onClick={cycleTheme}
      className={`relative p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
      aria-label={labels[theme]}
      title={labels[theme]}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Icon size={18} strokeWidth={2} />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
