import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, CheckCircle, Activity, ShieldCheck, Mail, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { LESSONS } from '../../data/lessons';

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeLessonIdx, setActiveLessonIdx] = useState(0);

  const lessons = LESSONS;

  useEffect(() => {
    if (user && !user.has_access) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (!user || !user.has_access) return null;

  const currentLesson = lessons[activeLessonIdx];

  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex flex-col overflow-hidden font-sans">
      {/* Top Navbar */}
      <nav className="h-20 border-b border-zinc-900/50 flex items-center justify-between px-5 md:px-12 bg-[#0A0A0A]/95 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <Link to="/" className="flex items-center gap-3 md:gap-4 group">
          <div className="relative">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-amber flex items-center justify-center group-hover:bg-white transition-all duration-300 transform group-hover:rotate-45">
              <div className="w-3.5 h-3.5 md:w-4 md:h-4 bg-black"></div>
            </div>
            <div className="absolute -inset-1 bg-amber/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="font-sans font-black tracking-tighter text-xl md:text-2xl uppercase leading-none italic text-white">
              100K<span className="text-zinc-600 group-hover:text-amber transition-colors">PRO</span>
            </span>
            <span className="text-[6px] md:text-[7px] font-mono font-black tracking-[0.4em] md:tracking-[0.5em] text-zinc-700 uppercase">Status_Active</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-10">
          <div className="hidden xs:flex flex-col items-end">
            <span className="text-[8px] uppercase tracking-[0.4em] text-amber font-black italic">Member_Online</span>
            <span className="text-[9px] text-zinc-600 font-mono font-bold uppercase truncate max-w-[120px] md:max-w-none">{user.email}</span>
          </div>
          <button 
            onClick={logout}
            className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center gap-2"
          >
            Terminate
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-80 border-r border-zinc-900 flex flex-col bg-[#0A0A0A] shrink-0 lg:flex hidden h-full overflow-hidden">
          <div className="p-8 border-b border-zinc-900 text-left">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8 flex items-center gap-3">
              <Layout size={12} className="text-amber" /> Course Lessons
            </h3>
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <span className="text-[9px] text-zinc-600 font-mono font-black uppercase tracking-[0.2em]">Learning Progress</span>
                <span className="text-[11px] text-amber font-mono font-black italic text-right">
                  {activeLessonIdx + 1} / {lessons.length}
                </span>
              </div>
              <div className="w-full h-[3px] bg-zinc-900 overflow-hidden rounded-full">
                <div 
                  className="h-full bg-amber active-glow transition-all duration-700 ease-out" 
                  style={{ width: `${((activeLessonIdx + 1) / lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0A0A0A] min-h-0">
            {lessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonIdx(idx)}
                className={`w-full p-6 flex items-center gap-5 transition-all border-b border-zinc-900/40 text-left relative group ${
                  idx === activeLessonIdx ? 'bg-[#111111]' : 'hover:bg-[#111111]/30'
                }`}
              >
                {idx === activeLessonIdx && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber shadow-[2px_0_10px_rgba(250,204,21,0.3)]"></div>
                )}
                
                <div className={`w-8 h-8 shrink-0 flex items-center justify-center text-[10px] font-black font-mono transition-all border ${
                  idx === activeLessonIdx 
                    ? 'bg-amber text-black border-amber active-glow' 
                    : 'bg-transparent text-zinc-800 border-zinc-900 group-hover:border-zinc-800 group-hover:text-zinc-600'
                }`}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                
                <div className="flex-1 space-y-1">
                  <p className={`text-[10px] font-black uppercase tracking-tight leading-tight transition-colors ${
                    idx === activeLessonIdx ? 'text-amber' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`}>
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-2 opacity-30 group-hover:opacity-50 transition-opacity">
                    <Activity size={10} className={idx === activeLessonIdx ? 'text-amber' : 'text-zinc-700'} />
                    <span className="text-[9px] font-black font-mono text-zinc-600">{lesson.duration}</span>
                  </div>
                </div>

                {idx < activeLessonIdx && (
                  <div className="bg-emerald-500/10 p-1 border border-emerald-500/20">
                    <CheckCircle size={10} className="text-emerald-500" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#080808] custom-scrollbar selection:bg-amber selection:text-black">
          {/* Mobile Selector */}
          <div className="lg:hidden p-4 border-b border-zinc-900 bg-[#0A0A0A]">
            <select 
              className="w-full bg-[#111111] text-white p-4 rounded-none text-[10px] font-black uppercase tracking-[0.2em] border border-zinc-900 focus:outline-none focus:border-amber transition-colors"
              value={activeLessonIdx}
              onChange={(e) => setActiveLessonIdx(Number(e.target.value))}
            >
              {lessons.map((lesson, idx) => (
                <option key={lesson.id} value={idx}>Lesson {idx + 1}: {lesson.title}</option>
              ))}
            </select>
          </div>

          <div className="max-w-[1200px] mx-auto p-4 md:p-12 lg:p-20 space-y-12">
            {/* Video Viewport */}
            <div className="aspect-video bg-black border border-zinc-900 relative group overflow-hidden">
               <div className="absolute inset-0 pointer-events-none z-10 border-[20px] border-transparent group-hover:border-amber/5 transition-all duration-500"></div>
               <div className="absolute top-4 left-4 z-10 bg-black/80 px-3 py-1 border border-zinc-800 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-red-500 animate-pulse"></div>
                  <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest">Streaming_Course</span>
               </div>

              <AnimatePresence mode="wait">
                <motion.iframe
                  key={activeLessonIdx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={currentLesson.embedUrl}
                  frameBorder="0"
                  title={currentLesson.title}
                  className="w-full h-full grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></motion.iframe>
              </AnimatePresence>
            </div>

            {/* Content Metadata */}
            <div className="grid lg:grid-cols-3 gap-12 items-start text-left">
               <div className="lg:col-span-2 space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="px-3 py-1.5 border border-zinc-800 bg-[#111111] flex items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber">Module {String(Math.floor(activeLessonIdx / 3) + 1).padStart(2, '0')}</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700 font-mono">Lesson #{String(activeLessonIdx + 1).padStart(3, '0')}</span>
                    </div>
                    <h2 className="heading-tactical text-5xl md:text-8xl leading-[0.85] text-white uppercase">
                      {currentLesson.title}
                    </h2>
                  </div>

                  <div className="p-10 bg-[#111111] border border-zinc-900 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-amber/10"></div>
                     <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-6 flex items-center gap-3">
                        <ShieldCheck size={12} className="text-amber" /> Lesson Details
                     </h4>
                     <p className="text-zinc-500 text-lg leading-relaxed font-mono font-bold italic">
                        // {currentLesson.description}
                     </p>
                  </div>
               </div>

               <div className="space-y-8">
                  <div className="bg-[#111111] border border-zinc-900 p-8 space-y-10">
                     <div className="space-y-6">
                        <p className="text-[10px] font-black uppercase text-zinc-700 tracking-[0.5em] italic font-mono text-center">Study Stats</p>
                        <div className="space-y-8 pt-2">
                           <div className="space-y-3">
                              <div className="flex justify-between text-[10px] font-mono font-black uppercase tracking-widest">
                                 <span className="text-zinc-600">Growth</span>
                                 <span className="text-amber text-right">Focused</span>
                              </div>
                              <div className="h-[2px] bg-zinc-900 w-full"><div className="h-full bg-amber w-full active-glow"></div></div>
                           </div>
                           <div className="space-y-3">
                              <div className="flex justify-between text-[10px] font-mono font-black uppercase tracking-widest">
                                 <span className="text-zinc-600">Security</span>
                                 <span className="text-zinc-400 text-right">Verified</span>
                              </div>
                              <div className="h-[2px] bg-zinc-900 w-full"><div className="h-full bg-zinc-700 w-3/4"></div></div>
                           </div>
                        </div>
                     </div>

                     <div className="pt-6">
                        <Button 
                           variant="accent" 
                           className="w-full py-5 text-[10px] group shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                           onClick={() => setActiveLessonIdx((prev) => Math.min(prev + 1, lessons.length - 1))}
                           disabled={activeLessonIdx === lessons.length - 1}
                        >
                           Next Lesson
                        </Button>
                     </div>
                  </div>

                  <div className="pt-4">
                     {/* Support information can go here or in footer */}
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
