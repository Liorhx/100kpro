import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({ label, icon: Icon, error, success, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5 w-full text-left">
      <div className="flex justify-between items-end ml-1">
        <label className="text-[9px] uppercase tracking-[0.3em] font-mono font-black text-zinc-600">{label}</label>
        {error && <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-tighter">{error}</span>}
      </div>
      <div className="relative group">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : success ? 'text-emerald-500' : 'text-zinc-700 group-focus-within:text-amber'}`}>
          <Icon size={12} />
        </div>
        <input
          {...props}
          type={inputType}
          className={`w-full bg-[#111111] border py-4 pl-12 pr-12 rounded-none focus:outline-none transition-all text-xs font-mono font-bold text-white placeholder:text-zinc-800 ${
            error 
              ? 'border-red-500/30 focus:border-red-500' 
              : success 
                ? 'border-emerald-500/30 focus:border-emerald-500' 
                : 'border-zinc-800 focus:border-amber/50'
          }`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};
