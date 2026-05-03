import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Calendar,
  Loader2,
  CheckCircle,
  ShieldCheck,
  Phone,
  Copy,
  ClipboardCheck,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { apiFetch } from "../../lib/api";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState("");
  const [receivedToken, setReceivedToken] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newErrors = {};
    if (form.name && (form.name.length < 3 || !/^[a-zA-Z\s]+$/.test(form.name)))
      newErrors.name = "INVALID_ID_FORMAT";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "EMAIL_SYNTAX_ERROR";
    if (form.phone && form.phone.length < 10)
      newErrors.phone = "PHONE_MIN_LENGTH";
    setErrors(newErrors);
  }, [form]);

  const isFormValid =
    form.name.length >= 3 &&
    /^[a-zA-Z\s]+$/.test(form.name) &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setErrorHeader("");
    console.log("API URL:", API_URL); // debug

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 important if backend uses cookies anywhere
        body: JSON.stringify({
          ...form,
          age: parseInt(form.age) || 0,
        }),
      });

      // 👇 Safe parsing (prevents JSON crash)
      const text = await response.text();
      console.log("RAW RESPONSE:", text); // debug

      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.token) {
        setReceivedToken(data.token);
      }
    } catch (err) {
      setErrorHeader(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(receivedToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (receivedToken) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#0A0A0A]">
        <div className="max-w-md w-full bg-[#111111] p-12 border border-[#1A1A1A] text-left active-glow relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber animate-pulse"></div>
          <div className="mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white">
              Save Your Token
            </h2>
            <p className="text-[10px] font-mono font-black text-amber uppercase tracking-widest italic">
              // CRITICAL: ACCESS_KEY_GENERATED
            </p>
          </div>

          <div className="bg-amber/5 border border-amber/20 p-6 mb-8 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest leading-relaxed">
                Your Unique Token:
              </span>
              <button
                onClick={copyToClipboard}
                className="text-amber hover:text-white transition-colors flex items-center gap-2 text-[10px] font-mono font-black uppercase"
              >
                {copied ? <ClipboardCheck size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="bg-black p-4 border border-zinc-900 break-all font-mono text-amber text-xs leading-relaxed tracking-wider">
              {receivedToken}
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-red-500/5 border border-red-500/20 mb-10">
            <AlertCircle className="text-red-500 shrink-0" size={20} />
            <div className="space-y-1">
              <p className="text-[10px] font-mono font-black text-red-500 uppercase tracking-widest italic">
                WARNING_SECURITY_NOTICE
              </p>
              <p className="text-[11px] font-mono font-bold text-zinc-500 leading-relaxed uppercase tracking-tight italic">
                Save this token. It will be required for login. If you lose this
                token, recovery is manual and may take time.
              </p>
            </div>
          </div>

          <Link to="/login" className="block w-full">
            <Button
              variant="accent"
              className="w-full py-4 text-xs font-black uppercase tracking-widest underline-offset-8"
            >
              Proceed to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#0A0A0A]">
      <div className="max-w-md w-full bg-[#111111] p-12 border border-[#1A1A1A] shadow-2xl relative overflow-hidden text-left">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber/20"></div>
        <div className="mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-1 text-white">
            Create Account
          </h2>
          <p className="text-[8px] font-mono font-black text-zinc-700 uppercase tracking-[0.5em] italic text-left">
            // ACCOUNT_REGISTRATION
          </p>
        </div>
        {errorHeader && (
          <div className="bg-red-500/5 text-red-500 p-4 border border-red-500/20 text-[9px] font-mono font-black uppercase tracking-widest mb-8 italic text-left">
            Error: {errorHeader}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Your Name"
            icon={User}
            type="text"
            placeholder="John Doe"
            required
            success={form.name && !errors.name}
            error={errors.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            label="Email Address"
            icon={Mail}
            type="email"
            placeholder="your@email.com"
            required
            success={form.email && !errors.email}
            error={errors.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Phone Number"
            icon={Phone}
            type="tel"
            placeholder="+91 00000 00000"
            required
            success={form.phone && !errors.phone}
            error={errors.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <Input
            label="Your Age"
            icon={Calendar}
            type="number"
            placeholder="25"
            required
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <div className="pt-4">
            <Button
              type="submit"
              loading={loading}
              variant="accent"
              disabled={!isFormValid}
              className="w-full mt-4"
            >
              Create Account
            </Button>
            <p className="mt-4 text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest text-center italic">
              // A secure token will be generated upon registration.
            </p>
          </div>
        </form>
        <p className="mt-10 text-center text-[9px] text-zinc-600 font-mono font-black uppercase tracking-widest italic">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:text-amber transition-colors underline underline-offset-8"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export const Login = () => {
  const [form, setForm] = useState({ email: "", token: "" });
  const [loading, setLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState("");
  const [showForgotToken, setShowForgotToken] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const isFormValid = form.email.length > 0 && form.token.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setErrorHeader("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 REQUIRED FOR COOKIES
        body: JSON.stringify(form),
      });

      const text = await response.text();
      console.log("RAW RESPONSE:", text); // debug

      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.user);
      navigate("/dashboard");
    } catch (err) {
      setErrorHeader(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0A0A0A]">
      <div className="max-w-md w-full bg-[#111111] p-12 border border-[#1A1A1A] shadow-2xl relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-1 h-full bg-amber/20"></div>
        <div className="mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-1 text-white">
            Sign In
          </h2>
          <p className="text-[8px] font-mono font-black text-zinc-700 uppercase tracking-[0.5em] italic text-left">
            // USER_AUTHENTICATION
          </p>
        </div>
        {errorHeader && (
          <div className="bg-red-500/5 text-red-500 p-4 border border-red-500/20 text-[9px] font-mono font-black uppercase tracking-widest mb-8 italic text-left">
            Login Error: {errorHeader}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            label="Email Address"
            icon={User}
            type="email"
            placeholder="your@email.com"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Access Token"
            icon={Lock}
            type="password"
            placeholder="Paste your token here"
            required
            onChange={(e) => setForm({ ...form, token: e.target.value })}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowForgotToken(true)}
              className="text-[9px] font-mono font-black text-zinc-700 hover:text-amber uppercase tracking-widest italic transition-colors"
            >
              // Forgot Token?
            </button>
          </div>
          <Button
            type="submit"
            loading={loading}
            variant="accent"
            disabled={!isFormValid}
            className="w-full mt-4"
          >
            Sign In
          </Button>
        </form>
        <p className="mt-10 text-center text-[9px]  font-mono font-black uppercase tracking-widest italic text-zinc-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-white hover:text-amber transition-colors underline underline-offset-8"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Manual Recovery Popup */}
      {showForgotToken && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
          <div className="max-w-md w-full bg-[#111111] border border-zinc-800 p-10 active-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={() => setShowForgotToken(false)}
                className="text-zinc-700 hover:text-white font-mono text-[10px] font-black uppercase tracking-widest"
              >
                [ Close ]
              </button>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-2">
                Token Recovery
              </h3>
              <p className="text-[10px] font-mono font-black text-zinc-700 uppercase tracking-widest italic">
                // MANUAL_VERIFICATION_REQUIRED
              </p>
            </div>

            <div className="space-y-6 text-zinc-500 font-mono text-[11px] leading-relaxed uppercase tracking-tight">
              <p className="font-bold">
                // Due to security protocols, token recovery is handled manually
                by administrators.
              </p>
              <div className="p-4 bg-zinc-900 border border-zinc-800">
                <p className="text-white font-black mb-2 tracking-widest">
                  SUBMISSION DETAILS:
                </p>
                <p>
                  Send your registered: <br /> 1. Full Name <br /> 2. Email
                  Address <br /> 3. Phone Number
                </p>
                <hr className="my-3 border-zinc-800" />
                <p className="text-amber font-black select-all">
                  yadav962160@gmail.com
                </p>
              </div>
              <p className="text-zinc-600 italic">
                // Verification may take 24-48 hours. DO NOT send multiple
                requests.
              </p>
            </div>

            <Button
              onClick={() => setShowForgotToken(false)}
              variant="outline"
              className="w-full mt-10 uppercase tracking-[0.2em] font-black text-[10px]"
            >
              Acknowledged
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
