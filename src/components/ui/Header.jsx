import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="h-20 bg-[#0A0A0A]/95 backdrop-blur-md flex items-center justify-between px-5 md:px-12 shrink-0 z-50 border-b border-zinc-900/50 sticky top-0">
      <Link to="/" className="flex items-center gap-3 md:gap-4 group">
        <div className="relative">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-amber flex items-center justify-center group-hover:bg-white transition-all duration-300 transform group-hover:rotate-45">
            <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-black"></div>
          </div>
          <div className="absolute -inset-1 bg-amber/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="font-sans font-black tracking-tighter text-xl md:text-2xl uppercase leading-none italic text-white">
            100K<span className="text-zinc-600 group-hover:text-amber transition-colors">PRO</span>
          </span>
          <span className="text-[6px] md:text-[7px] font-mono font-black tracking-[0.4em] md:tracking-[0.5em] text-zinc-700 uppercase">Automate_Growth</span>
        </div>
      </Link>

      <div className="flex items-center gap-4 md:gap-10">
        {user ? (
          <div className="flex items-center gap-3 md:gap-8">
            <Link to="/dashboard" className="hidden xs:block text-[10px] font-mono font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-500 hover:text-amber transition-all border-b border-transparent hover:border-amber pb-0.5">
              Panel
            </Link>
            <button 
              onClick={logout} 
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center gap-2"
            >
              Terminate
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 md:gap-10">
            <Link to="/login" className="text-[10px] font-mono font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-zinc-600 hover:text-white transition-all">
              Login
            </Link>
            <Link to="/signup" className="relative group overflow-hidden bg-amber text-black px-4 md:px-8 py-2.5 md:py-3 transition-all duration-300 hover:scale-105 active-glow">
              <span className="relative z-10 text-[10px] md:text-[11px] font-sans font-black uppercase tracking-[0.1em] md:tracking-[0.2em]">Start</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
