import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Activity, ShieldCheck, Star, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { LiveFeed } from '../ui/LiveFeed';
import { LESSONS } from '../../data/lessons';
import proofImg from '../../assets/images/million.png';
import { apiFetch } from '../../lib/api';

const ProcessSection = () => {
  const steps = [
    { title: "Find Unlimited High performing ideas", desc: "Identify content formats that are already getting massive views." },
    { title: "Easy Way To Write Your Script", desc: "Convert ideas into short, engaging scripts in minutes." },
    { title: "Enhance With Smart Tools", desc: "Refine your script for better hooks, clarity, and retention." },
    { title: "Generate Free Unlimited AI Voiceovers", desc: "Create high-quality audio without recording your own voice." },
    { title: "Edit for Engagement", desc: "Add subtitles, pacing, and visual flow to keep viewers watching." },
    { title: "Upload With Strategy", desc: "Use the right titles, sounds, and timing to boost reach." }
  ];

  return (
    <section className="py-10 md:py-24 border-b border-zinc-900 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10 text-left">
        <div className="mb-10 md:mb-20 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-[1px] bg-amber"></div>
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.5em] text-amber italic">The Plan</span>
          </div>
          <h2 className="heading-tactical text-4xl md:text-7xl leading-[0.85] text-white">
            THE SIMPLE SYSTEM <br />
            <span className="text-zinc-800">BEHIND VIRAL SHORTS.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="group relative bg-[#111111] border border-zinc-900 p-8 space-y-4 hover:border-amber/40 transition-all duration-500">
              <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center font-mono text-[10px] font-black text-zinc-700 bg-black">
                0{i + 1}
              </div>
              <h3 className="text-xl font-black text-white tracking-tighter uppercase">{step.title}</h3>
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                // {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ResultsSection = () => {
  return (
    <section className="py-10 md:py-20 border-b border-zinc-900 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <h2 className="heading-tactical text-3xl md:text-7xl text-center mb-8 md:mb-16 uppercase text-white">
          REAL <span className="text-zinc-800">RESULTS.</span>
        </h2>
        
        <div className="flex justify-center relative">
          <div className="absolute inset-0 ambient-glow scale-150 pointer-events-none opacity-20"></div>
          
          <div className="relative z-10 w-full max-w-[340px] md:max-w-4xl mx-auto px-6 md:px-0">
            <div className="relative group">
              <div className="absolute -inset-4 bg-amber/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-full"></div>
              
              <img 
                src={proofImg} 
                alt="Channel Growth Proof"
                className="w-full h-auto relative z-10 opacity-95 transition-opacity duration-700 seamless-blend mix-blend-lighten"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-zinc-800 font-mono font-black text-[8px] uppercase tracking-widest italic max-w-xl mx-auto px-4">
          // Notice: These figures represent real channel growth achieved using the simplified system.
        </p>
      </div>
    </section>
  );
};

const FomoSection = ({ onAction }) => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins
  const [seatsLeft, setSeatsLeft] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    const seatTimer = setInterval(() => {
      setSeatsLeft(prev => (prev > 2 ? prev - (Math.random() > 0.9 ? 1 : 0) : 2));
    }, 15000);
    return () => { clearInterval(timer); clearInterval(seatTimer); };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-10 md:py-24 border-b border-zinc-900 bg-[#080808] relative overflow-hidden text-left">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-900/5 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-red-900/30 bg-red-950/10">
               <Activity size={10} className="text-red-500 animate-pulse" />
               <span className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-red-500">Offer Ending Soon</span>
            </div>
            
            <h2 className="heading-tactical text-3xl md:text-6xl leading-[0.9] text-white uppercase">
              DON’T STAY STUCK <br />
              WATCHING <span className="text-zinc-800">OTHERS GROW.</span>
            </h2>
            <div className="space-y-6 text-zinc-500 font-mono font-bold leading-relaxed italic text-sm">
               <p>// Every day, new creators are using simple systems to grow fast. The difference is not talent — it's having a clear process.</p>
               <p>// You can keep guessing what works… or follow a system that simplifies everything.</p>
            </div>
            <div className="pt-6">
               {!user?.has_access && <Button variant="accent" onClick={onAction}>Stop Guessing & Start</Button>}
            </div>
          </div>

          <div className="relative">
            <div className="bg-[#111111] border border-zinc-900 p-8 md:p-12 space-y-10 relative overflow-hidden active-glow">
               <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-zinc-800 font-black uppercase tracking-widest">Special_Offer</div>
               
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.4em] font-black">Time Remaining</span>
                     <div className="text-3xl font-black text-amber font-mono tracking-tighter">
                        {formatTime(timeLeft)}
                     </div>
                     <p className="text-[8px] font-mono text-zinc-800 uppercase tracking-widest font-black italic">Hurry_</p>
                  </div>
                  <div className="space-y-2">
                     <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-[0.4em] font-black">Spots Left</span>
                     <div className="text-3xl font-black text-red-500 font-mono tracking-tighter">
                        0{seatsLeft} SEATS
                     </div>
                     <p className="text-[8px] font-mono text-red-900 uppercase tracking-widest font-black italic animate-pulse">Almost Full_</p>
                  </div>
               </div>

               <div className="space-y-4 pt-6 border-t border-zinc-900/50">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-amber rounded-full animate-ping"></div>
                     <p className="text-[10px] font-mono font-black text-white uppercase tracking-widest leading-relaxed text-left">
                        OFFER EXPIRES IN NEXT 30 MINUTES
                     </p>
                  </div>
                  <p className="text-zinc-600 text-[10px] font-mono leading-relaxed font-bold italic uppercase tracking-wider text-left">
                    The market for faceless content is accelerating. Delay results in permanent loss of market share. This system is designed for immediate capture.
                  </p>
               </div>

               <div className="absolute bottom-2 right-2 opacity-10">
                  <ShieldCheck size={100} className="text-white" />
               </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center px-2">
               <span className="text-[7px] font-mono text-zinc-800 uppercase tracking-[0.5em] font-black italic">Ref: YT_MARKET_LOG_2026</span>
               <div className="flex gap-1">
                  <div className="w-1 h-1 bg-red-950"></div>
                  <div className="w-1 h-1 bg-red-900 animate-pulse"></div>
                  <div className="w-1 h-1 bg-red-800"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onAction }) => {
  const { user } = useAuth();
  return (
    <section className="py-12 md:py-24 border-b border-zinc-900 bg-black relative overflow-hidden text-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] bg-amber/5 rounded-full blur-[100px] animate-pulse"></div>
      </div>
      <div className="max-w-[1000px] mx-auto px-4 md:px-10 relative z-10 space-y-6 md:space-y-10">
        <div className="space-y-6">
          <h2 className="heading-tactical text-5xl md:text-8xl leading-[0.85] text-white uppercase">
            START BUILDING <br />
            <span className="text-amber">YOUR CHANNEL.</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-mono font-bold leading-relaxed italic uppercase tracking-tight">
            // Get access to the full system and start creating your first videos today.
          </p>
        </div>
        <div className="flex flex-col items-center gap-10">
          {!user?.has_access && (
            <button 
              onClick={onAction}
              className="group relative bg-amber text-black px-20 py-8 font-black text-xs uppercase tracking-[0.4em] active-glow overflow-hidden transition-all hover:scale-105 flex flex-col items-center justify-center gap-2"
            >
              <span className="text-[10px] opacity-50 line-through text-black/50">₹5,999</span>
              <div className="flex items-center gap-3">
                Only ₹499 Indian Rupees
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          )}
          <div className="flex items-center gap-8 text-zinc-700 font-mono text-[9px] font-black uppercase tracking-[0.3em]">
            <span className="flex items-center gap-2 text-amber">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={8} fill="currentColor" />
                ))}
              </div>
              <span className="text-zinc-500">4.9 (12,482+ Students)</span>
            </span>
            <span className="flex items-center gap-2 italic">Works with free tools</span>
            <span className="flex items-center gap-2 italic">Start today</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  const faqs = [
    {
      q: "DO I NEED EXPENSIVE SOFTWARE?",
      a: "No. The entire system is built around free apps and tools you likely already have. You don't need any paid software to make this work."
    },
    {
      q: "I HAVE 0 SUBSCRIBERS. WILL THIS WORK?",
      a: "Yes. In fact, starting from scratch is an advantage. You can immediately use what's working right now on YouTube without old habits holding you back."
    },
    {
      q: "DO I NEED TO SHOW MY FACE?",
      a: "Absolutely not. This system was specifically developed for faceless 'cash cow' channels where the content, not the creator, is the authority."
    },
    {
      q: "HOW MUCH TIME DOES THIS TAKE?",
      a: "The system is built for speed. Once you master the workflow, you can generate a high-performing short in under 30 minutes."
    }
  ];

  return (
    <section className="py-10 md:py-24 border-b border-zinc-900 bg-[#0A0A0A] text-left">
      <div className="max-w-[1000px] mx-auto px-4 md:px-10">
        <h2 className="heading-tactical text-3xl md:text-6xl text-center mb-8 md:mb-16 uppercase text-white">
          FREQUENTLY ASKED <span className="text-zinc-800">QUESTIONS.</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#111111] border border-zinc-900 p-8 space-y-4 hover:border-amber/20 transition-all">
              <h3 className="text-sm font-black uppercase tracking-widest text-amber flex items-center gap-3">
                <span className="text-zinc-800">0{i+1}</span> {faq.q}
              </h3>
              <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest leading-relaxed italic">
                // {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BonusSection = () => {
  const bonuses = [
    { 
      title: "VIP INSIDER TIPS", 
      label: "EXCLUSIVE",
      desc: "Hidden hacks used by top 0.1% creators to manipulate the algorithm for maximum reach.",
      icon: ShieldCheck
    },
    { 
      title: "UNLIMITED AI VOICE GEN", 
      label: "TOOLKIT",
      desc: "Access our proprietary list of free tools for high-quality, human-like voiceovers without limits.",
      icon: Zap
    },
    { 
      title: "0 VIEWS PROBLEM FIX", 
      label: "SOLUTION",
      desc: "Step-by-step blueprint to revive 'dead' channels and bypass the shadow-reach limit instantly.",
      icon: Activity
    }
  ];

  return (
    <section className="py-10 md:py-24 border-b border-zinc-900 bg-[#080808] relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber/5 blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-[1px] bg-amber"></div>
              <span className="text-[8px] font-mono font-black uppercase tracking-[0.5em] text-amber italic">Extended Value</span>
            </div>
            <h2 className="heading-tactical text-4xl md:text-7xl leading-[0.85] text-white">
              PREMIUM <br />
              <span className="text-zinc-800">BONUS PACKAGE.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest leading-relaxed italic text-zinc-600">
            // These specialized modules are included for free when you enroll in the full system today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {bonuses.map((bonus, i) => {
            const Icon = bonus.icon;
            return (
              <div key={i} className="group relative bg-[#111111] border border-zinc-900 p-10 space-y-6 overflow-hidden active-glow hover:border-amber/40 transition-all duration-700">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center text-amber bg-black group-hover:bg-amber group-hover:text-black transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="text-[9px] font-mono font-black text-zinc-700 uppercase tracking-[0.4em]">{bonus.label}</span>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tighter leading-tight uppercase text-white">{bonus.title}</h3>
                  <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                    // {bonus.desc}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                   <Icon size={80} className="text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const Landing = () => {
  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!user) {
      navigate('/signup');
      return;
    }

    if (user.has_access) {
      navigate('/dashboard');
      return;
    }

    setLoading(true);
    try {
      const { data } = await apiFetch('/api/payments/create-order', { 
        method: 'POST',
      });
      
      const order = data;
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error('Payment gateway not configured. Please check your credentials.');
      }

      const options = {
        key: razorpayKey, 
        amount: order.amount,
        currency: order.currency,
        name: "100KPRO",
        description: "Full Course Access",
        order_id: order.id,
        handler: async (response) => {
          try {
            const { data: verifyData } = await apiFetch('/api/payments/verify', {
              method: 'POST',
              body: JSON.stringify(response),
            });
            if (verifyData.success) {
              await checkAuth();
              navigate('/dashboard');
            } else {
              throw new Error(verifyData.message || 'Payment verification protocol failed.');
            }
          } catch (err) {
            console.error('Verification Error:', err);
            window.alert(`Security Breach: ${err.message}`);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email
        },
        theme: { color: "#FACC15" }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Payment Failed:', response.error);
        window.alert(`Payment Failed: ${response.error.description || 'Access denied by gateway.'}`);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      console.error('Purchase Initiation Error:', err);
      window.alert(`System Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-amber selection:text-black pt-16">
      <LiveFeed />
      <div className="max-w-[1600px] mx-auto px-4 md:px-16 py-6 md:py-16 grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-32 items-center border-b border-zinc-900 text-left">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#111111] border border-zinc-900 rounded-none">
            <Zap size={10} className="text-amber animate-pulse" />
            <span className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-zinc-500">Live for 2026</span>
          </div>

          <h1 className="heading-tactical text-5xl md:text-[5.5vw] leading-[0.9] text-white">
            CREATE VIRAL SHORTS <br />
            USING A <span className="text-amber">SIMPLE SYSTEM</span> — <br />
            NO CAMERA, NO EXP.
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 max-w-lg font-mono font-bold leading-relaxed italic">
            // FOLLOW A STEP-BY-STEP METHOD TO TURN IDEAS INTO HIGH-PERFORMING VIDEOS. NO COMPLEX EDITING. NO GUESSWORK.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-10">
            {!user?.has_access && (
              <button 
                onClick={handleAction}
                disabled={loading}
                className="bg-amber text-black px-12 py-5 rounded-none font-black text-xs hover:bg-white transition-all uppercase tracking-[0.3em] flex flex-col items-center justify-center min-w-[320px] disabled:opacity-50 active-glow group"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : (
                  <div className="flex flex-col items-center gap-1">
                  <h3 className="flex items-center gap-2">Enroll Now
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </h3>

                    <div className="flex items-center gap-3">
                      Only ₹499 
                    <span className="text-[10px] opacity-50 line-through">₹5,999</span>
                    </div>
                  </div>
                )}
              </button>
            )}
            <div className="flex items-center gap-4">
              <span className="text-[8px] font-mono font-black uppercase tracking-widest text-zinc-700 italic border-l border-zinc-800 pl-4">
                Join 1,200+ students today
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group"
        >
          <div className="bg-[#0A0A0A] border border-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-amber/20 shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-scan z-10"></div>
            
            <div className="h-10 bg-[#111111] flex items-center justify-between px-4 border-b border-zinc-900">
               <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-zinc-800"></div>
                  <div className="w-1.5 h-1.5 bg-zinc-800"></div>
                  <div className="w-1.5 h-1.5 bg-amber"></div>
               </div>
               <span className="text-[8px] font-mono font-black uppercase tracking-[0.5em] text-zinc-600 italic text-right">SECURE_DASHBOARD_V2.0</span>
            </div>

            <div className="aspect-video bg-black relative group">
               <iframe 
                src="https://rumble.com/embed/v770igw/?pub=4pcyb8"
                className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-700 border-0"
                allowFullScreen
                title="Course Intro"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent opacity-40"></div>
            </div>

            <div className="p-8 space-y-8 bg-[#111111] text-left">
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <div className="flex justify-between items-end">
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest font-black">Memory Link</span>
                        <span className="text-[10px] font-mono text-amber font-black tracking-tighter">65%</span>
                     </div>
                     <div className="h-0.5 bg-zinc-900 w-full">
                        <div className="h-full bg-amber w-[65%] active-glow"></div>
                     </div>
                  </div>
                  <div className="space-y-2 grayscale opacity-30">
                     <div className="flex justify-between items-end">
                        <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest font-black">Neural Lock</span>
                        <span className="text-[10px] font-mono text-zinc-500 font-black tracking-tighter">0%</span>
                     </div>
                     <div className="h-0.5 bg-zinc-900 w-full">
                        <div className="h-full bg-zinc-500 w-0"></div>
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  {LESSONS.slice(3, 6).map((lesson, idx) => (
                    <div key={lesson.id} className={`flex items-center gap-4 p-3 border border-zinc-900 bg-black/50 ${idx > 0 ? 'opacity-20' : ''}`}>
                       <span className="text-[9px] font-black font-mono text-zinc-700 italic">#{String(lesson.id).padStart(2, '0')}</span>
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{lesson.title}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 p-4 bg-amber border border-white text-black font-mono font-black text-[10px] uppercase tracking-widest active-glow">
             Engine Mode: Aggressive
          </div>
        </motion.div>
      </div>

      <ResultsSection />
      <ProcessSection />
      <BonusSection />
      <FomoSection onAction={handleAction} />
      <FaqSection />
      <FinalCTA onAction={handleAction} />
    </div>
  );
};

export default Landing;
