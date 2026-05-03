import React, { useState, useEffect } from 'react';

export const LiveFeed = () => {
  const [data, setData] = useState({ subs: 102482, viral: '1:14' });
  const [status, setStatus] = useState('ACTIVE');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus('FETCHING...');
      setTimeout(() => {
        setData(prev => ({
          subs: prev.subs + Math.floor(Math.random() * 5),
          viral: `1:${11 + Math.floor(Math.random() * 8)}`
        }));
        setStatus('COMPLETE');
        setTimeout(() => setStatus('ACTIVE'), 1500);
      }, 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-10 left-10 z-[60] bg-[#111111] border border-zinc-900 p-4 font-mono select-none pointer-events-none hidden lg:block">
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-1.5 h-1.5 rounded-full ${status === 'FETCHING...' ? 'bg-amber animate-pulse' : 'bg-emerald-500'}`}></div>
        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.5em]">{status}</span>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">SUBS: <span className="text-white">{data.subs.toLocaleString()}</span></p>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">VIRAL_RATIO: <span className="text-white">{data.viral}</span></p>
      </div>
      <div className="absolute -top-[1px] -left-[1px] w-4 h-[1px] bg-amber/50"></div>
      <div className="absolute -top-[1px] -left-[1px] w-[1px] h-4 bg-amber/50"></div>
    </div>
  );
};
