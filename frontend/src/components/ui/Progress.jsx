import React from 'react';

export function Progress({
  value = 0,
  max = 100,
  variant = 'blue',
  size = 'md',
  showLabel = false,
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const variants = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    purple: 'bg-purple-600',
    gradient: 'bg-gradient-to-r from-blue-600 to-indigo-500'
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden ${sizes[size] || sizes.md}`}>
        <div
          className={`${sizes[size] || sizes.md} rounded-full transition-all duration-500 ease-out ${variants[variant] || variants.blue}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
