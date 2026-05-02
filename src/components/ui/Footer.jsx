import React from 'react';
import { Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-900 py-16 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[1px] bg-gradient-to-r from-transparent via-amber/20 to-transparent"></div>
      
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 group text-left">
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-amber transition-colors">
              <div className="w-2.5 h-2.5 bg-zinc-600 group-hover:bg-black"></div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-sans font-black tracking-tighter text-xl uppercase leading-none italic text-zinc-400">
                100K<span className="text-zinc-800">PRO</span>
              </span>
              <span className="text-[7px] font-mono font-black text-zinc-800 uppercase tracking-[0.4em]">Automated_Growth_Protocol</span>
            </div>
          </div>
          <p className="text-[9px] font-mono font-black text-zinc-700 uppercase tracking-[0.2em] leading-loose max-w-xs text-left">
            // This system is designed for high-performance content creators. Unauthorized duplication is strictly prohibited.
          </p>
        </div>

        <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
          <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-[0.5em] italic">Get_In_Touch</span>
          <a 
            href="mailto:yadav962160@gmail.com"
            className="flex items-center gap-4 group px-6 md:px-10 py-5 bg-[#080808] border border-zinc-900 hover:border-amber/50 transition-all duration-500 active:scale-95"
          >
            <div className="flex flex-col items-start md:items-end -space-y-0.5">
              <span className="text-[8px] font-mono font-black text-amber uppercase tracking-[0.4em] mb-1">Technical_Support</span>
              <span className="text-sm md:text-lg font-black tracking-tight text-white group-hover:text-amber transition-colors">yadav962160@gmail.com</span>
            </div>
            <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center bg-black group-hover:bg-amber group-hover:text-black transition-all">
              <Mail size={18} className="text-zinc-400 group-hover:text-black" />
            </div>
          </a>
          <div className="text-[8px] font-mono font-black text-zinc-800 uppercase tracking-[0.3em]">
            © 2026 // SYSTEM_V3.0 // UPTIME: 99.9%
          </div>
        </div>
      </div>
    </footer>
  );
};
