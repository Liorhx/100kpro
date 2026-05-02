import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

export const Button = ({ children, variant = 'primary', loading, icon: Icon, className = '', ...props }) => {
  const variants = {
    primary: 'bg-zinc-100 text-black hover:bg-white disabled:opacity-50',
    outline: 'bg-transparent border border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white',
    accent: 'bg-amber text-black hover:bg-white active-glow',
    ghost: 'bg-transparent text-zinc-500 hover:text-white'
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${variants[variant]} px-8 py-3 rounded-none flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:cursor-not-allowed ${className}`}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : null}
      {children}
      {Icon && <Icon size={14} className="ml-1" />}
      {!Icon && variant === 'accent' && <ArrowRight size={14} className="ml-1" />}
    </button>
  );
};
