import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { Loader2 } from 'lucide-react';

// Lazy loading components for performance
const Landing = lazy(() => import('./components/Landing/Landing'));
const Signup = lazy(() => import('./components/Auth/AuthComponents').then(m => ({ default: m.Signup })));
const Login = lazy(() => import('./components/Auth/AuthComponents').then(m => ({ default: m.Login })));
const Verify = lazy(() => import('./components/Auth/AuthComponents').then(m => ({ default: m.Verify })));
const ForgotPassword = lazy(() => import('./components/Auth/AuthComponents').then(m => ({ default: m.ForgotPassword })));
const ResetPassword = lazy(() => import('./components/Auth/AuthComponents').then(m => ({ default: m.ResetPassword })));
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));

// Loading dynamic fallback
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#0A0A0A]">
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Loader2 className="animate-spin text-amber" size={32} />
        <div className="absolute inset-0 blur-xl bg-amber/20"></div>
      </div>
      <span className="text-[10px] font-mono font-black text-zinc-700 uppercase tracking-[0.5em] animate-pulse">Initializing_Sync...</span>
    </div>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const LandingLayout = ({ children }) => (
  <div className="flex flex-col h-screen overflow-hidden">
    <Header />
    <div className="flex-1 overflow-y-auto">
      {children}
      <Footer />
    </div>
  </div>
);

const HomeRoute = () => {
  const { user } = useAuth();
  if (user?.has_access) return <Navigate to="/dashboard" replace />;
  return (
    <LandingLayout>
      <Suspense fallback={<PageLoader />}>
        <Landing />
      </Suspense>
    </LandingLayout>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/signup" element={
                <LandingLayout>
                  <Signup />
                </LandingLayout>
              } />
              <Route path="/login" element={
                <LandingLayout>
                  <Login />
                </LandingLayout>
              } />
              <Route path="/verify" element={<Verify />} />
              <Route path="/forgot-password" element={
                <LandingLayout>
                  <ForgotPassword />
                </LandingLayout>
              } />
              <Route path="/reset-password" element={
                <LandingLayout>
                  <ResetPassword />
                </LandingLayout>
              } />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
