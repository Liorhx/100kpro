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
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { apiFetch } from "../../lib/api";

export const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const newErrors = {};
    if (form.name && (form.name.length < 3 || !/^[a-zA-Z\s]+$/.test(form.name)))
      newErrors.name = "INVALID_ID_FORMAT";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "EMAIL_SYNTAX_ERROR";
    if (form.password && form.password.length < 8)
      newErrors.password = "INSUFFICIENT_SECURITY";
    if (form.confirmPassword && form.password !== form.confirmPassword)
      newErrors.confirmPassword = "PARITY_CHECK_FAILED";
    setErrors(newErrors);
  }, [form]);

  const isFormValid =
    form.name.length >= 3 &&
    /^[a-zA-Z\s]+$/.test(form.name) &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.password.length >= 8 &&
    form.password === form.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setErrorHeader("");
    try {
      const { data } = await apiFetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ ...form, age: parseInt(form.age) || 0 }),
      });
      setSuccess(true);
    } catch (err) {
      setErrorHeader(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#0A0A0A]">
        <div className="max-w-md w-full bg-[#111111] p-12 border border-[#1A1A1A] text-center active-glow">
          <div className="w-16 h-16 bg-[#0A0A0A] text-amber flex items-center justify-center mx-auto mb-8 border border-zinc-800">
            <div className="w-16 h-16 bg-[#0A0A0A] text-amber flex items-center justify-center mx-auto border border-zinc-800">
              <Mail size={24} />
            </div>
          </div>
          <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter text-white">
            Welcome Email Sent
          </h2>
          <p className="text-zinc-500 mb-10 font-mono text-[10px] uppercase tracking-widest leading-relaxed">
            // Check your inbox to finish signing up.
          </p>
          <Link to="/login" className="block w-full">
            <Button variant="outline" className="w-full py-4">
              Return to Login
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
            label="Your Age"
            icon={Calendar}
            type="number"
            placeholder="25"
            required
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
          <Input
            label="Password"
            icon={Lock}
            type="password"
            placeholder="••••••••"
            required
            success={form.password && !errors.password}
            error={errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Input
            label="Confirm Password"
            icon={Lock}
            type="password"
            placeholder="••••••••"
            required
            success={form.confirmPassword && !errors.confirmPassword}
            error={errors.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          <Button
            type="submit"
            loading={loading}
            variant="accent"
            disabled={!isFormValid}
            className="w-full mt-4"
          >
            Create Account
          </Button>
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
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorHeader, setErrorHeader] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const isEmailValid = /\S+@\S+\.\S+/.test(form.email);
  const isFormValid = isEmailValid && form.password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setErrorHeader("");
    try {
      const { data } = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
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
            icon={Mail}
            type="email"
            placeholder="your@email.com"
            required
            error={form.email && !isEmailValid ? "INVALID_EMAIL" : null}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Password"
            icon={Lock}
            type="password"
            placeholder="••••••••"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-[9px] font-mono font-black text-zinc-700 hover:text-amber uppercase tracking-widest italic transition-colors"
            >
              // Forgot Password?
            </Link>
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
        <p className="mt-10 text-center text-[9px] font-mono font-black uppercase tracking-widest italic text-zinc-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-white hover:text-amber transition-colors underline underline-offset-8"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export const Verify = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your account...");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      const token = params.get("token");
      if (!token) {
        setStatus("error");
        setMessage("ACCESS_DENIED: Login_Required");
        return;
      }
      try {
        const { data } = await apiFetch(`/api/auth/verify?token=${token}`);
        setStatus("success");
        setMessage(data.message || "Verification Successful");
        setTimeout(() => {
          if (data.user) {
            login(data.user);
            navigate("/dashboard");
          }
        }, 2000);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Link Invalid or Expired");
      }
    };
    verifyToken();
  }, [params, navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0A0A0A]">
      <div className="max-w-md w-full bg-[#111111] p-12 border border-[#1A1A1A] text-center shadow-2xl relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-[1px] ${status === "success" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"}`}
        />
        <div
          className={`w-16 h-16 rounded-none flex items-center justify-center mx-auto mb-8 border ${
            status === "loading"
              ? "bg-zinc-900 text-zinc-600 border-zinc-800 animate-pulse"
              : status === "success"
                ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20 active-glow"
                : "bg-red-500/5 text-red-500 border-red-500/20"
          }`}
        >
          {status === "loading" ? (
            <Loader2 className="animate-spin" size={24} />
          ) : status === "success" ? (
            <CheckCircle size={24} />
          ) : (
            <ShieldCheck size={24} className="rotate-180" />
          )}
        </div>
        <h2 className="text-2xl font-black uppercase mb-6 tracking-tighter text-white">
          {status === "loading"
            ? "Verifying"
            : status === "success"
              ? "Verified"
              : "Access Denied"}
        </h2>
        <p className="text-zinc-500 mb-10 font-mono text-[10px] uppercase tracking-widest leading-relaxed italic">
          // {message}
          {status === "success" && (
            <span className="block mt-4 text-emerald-500/50 animate-pulse">
              [ REDIRECTING IN 2S ]
            </span>
          )}
        </p>
        {status !== "loading" && (
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/login")}
              variant={status === "success" ? "accent" : "outline"}
              className="w-full"
            >
              {status === "success" ? "Go to Dashboard" : "Try Again"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const { data } = await apiFetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage(data.message);
    } catch (err) {
      setError("Reset request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0A0A0A]">
      <div className="max-w-md w-full bg-[#111111] p-12 border border-[#1A1A1A] shadow-2xl relative overflow-hidden text-left">
        <div className="absolute top-0 left-0 w-1 h-full bg-amber/20"></div>
        <div className="mb-12">
          <h2 className="text-2xl font-black uppercase tracking-tighter mb-1 text-white">
            Reset Token
          </h2>
          <p className="text-[8px] font-mono font-black text-zinc-700 uppercase tracking-[0.5em] italic text-left">
            // PASSWORD_RECOVERY
          </p>
        </div>

        {message ? (
          <div className="bg-emerald-500/5 text-emerald-500 p-6 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-widest leading-relaxed">
            // {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="text-red-500 text-[9px] font-mono uppercase tracking-widest">
                {error}
              </div>
            )}
            <Input
              label="Registered Email"
              icon={Mail}
              type="email"
              placeholder="your@email.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              loading={loading}
              variant="accent"
              className="w-full"
            >
              Initialize Reset
            </Button>
          </form>
        )}

        <p className="mt-10 text-center text-[9px] font-mono font-black uppercase tracking-widest italic text-zinc-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-white hover:text-amber transition-colors underline underline-offset-8"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export const ResetPassword = () => {
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = params.get("token");
      const { data } = await apiFetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      setMessage(data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
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
            Update Key
          </h2>
          <p className="text-[8px] font-mono font-black text-zinc-700 uppercase tracking-[0.5em] italic text-left">
            // SET_NEW_PASSWORD
          </p>
        </div>

        {message ? (
          <div className="bg-emerald-500/5 text-emerald-500 p-6 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-widest leading-relaxed">
            // {message} [ REDIRECTING... ]
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-500 text-[9px] font-mono uppercase tracking-widest">
                Error: {error}
              </div>
            )}
            <Input
              label="New Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm New Password"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              loading={loading}
              variant="accent"
              className="w-full"
            >
              Secure Account
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
