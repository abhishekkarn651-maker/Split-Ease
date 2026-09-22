import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

/**
 * Login — Sign-in page.
 * Premium two-panel layout with hero illustration + glassmorphism form card.
 * All authentication logic (login call, error handling, navigation) is preserved.
 */
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page-bg min-h-screen relative overflow-hidden">
      {/* Floating decorative particles */}
      <div className="login-particle w-3 h-3 top-[15%] left-[10%]" style={{ animation: 'login-float 6s ease-in-out infinite' }} />
      <div className="login-particle w-2 h-2 top-[70%] left-[5%]" style={{ animation: 'login-float-reverse 8s ease-in-out infinite 1s' }} />
      <div className="login-particle w-4 h-4 top-[25%] right-[8%]" style={{ animation: 'login-float 7s ease-in-out infinite 2s' }} />
      <div className="login-particle w-2.5 h-2.5 top-[80%] right-[12%]" style={{ animation: 'login-float-reverse 9s ease-in-out infinite 0.5s' }} />
      <div className="login-particle w-1.5 h-1.5 top-[50%] left-[50%]" style={{ animation: 'login-float 10s ease-in-out infinite 3s' }} />

      {/* Top Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
            S
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Split<span className="text-primary-400">Ease</span>
          </span>
        </Link>
        <Link
          to="/signup"
          className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/80 hover:text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
        >
          Create Account
        </Link>
      </nav>

      {/* Main Content — Two Panel Layout */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-80px)] px-4 sm:px-8 lg:px-16 gap-8 lg:gap-16 pb-8">

        {/* Left Panel — Hero & Features */}
        <div className="hidden lg:flex flex-col flex-1 max-w-xl animate-fade-in">
          {/* Hero Image Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 aspect-[4/3]">
            <img
              src="/images/login-hero.jpg"
              alt="Friends splitting travel expenses together"
              className="w-full h-full object-cover"
            />
            <div className="login-hero-overlay absolute inset-0" />
            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h2 className="text-3xl font-extrabold text-white leading-tight mb-2">
                Travel together,<br />split effortlessly
              </h2>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                The smartest way to share expenses with friends, roommates, and travel companions.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="login-feature-card rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-xs font-semibold text-white/80">Instant Splits</p>
              <p className="text-[11px] text-white/40 mt-0.5">Real-time balance tracking</p>
            </div>
            <div className="login-feature-card rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">👥</div>
              <p className="text-xs font-semibold text-white/80">Group Expenses</p>
              <p className="text-[11px] text-white/40 mt-0.5">Unlimited trip groups</p>
            </div>
            <div className="login-feature-card rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">🌍</div>
              <p className="text-xs font-semibold text-white/80">Community</p>
              <p className="text-[11px] text-white/40 mt-0.5">Share travel tips</p>
            </div>
          </div>
        </div>

        {/* Right Panel — Login Form */}
        <div className="w-full max-w-md lg:max-w-[420px] animate-slide-up">
          {/* Glass Card */}
          <div className="login-glass-card rounded-3xl p-8 sm:p-10 shadow-2xl">
            {/* Heading */}
            <div className="text-center mb-8">
              {/* Mobile-only logo */}
              <div className="lg:hidden inline-flex items-center justify-center w-12 h-12 bg-primary-500 rounded-2xl text-white font-bold text-lg mb-4 shadow-lg shadow-primary-500/20">
                S
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-white/50 mt-2 text-sm">
                Sign in to continue splitting with SplitEase
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-300 text-sm px-4 py-3.5 rounded-2xl animate-scale-in flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-wide uppercase text-white/50">
                  Email Address
                </label>
                <div className="relative">
                  <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="login-input w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-wide uppercase text-white/50">
                  Password
                </label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="login-input w-full pl-12 pr-12 py-3.5 rounded-2xl text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <HiOutlineEyeSlash className="w-5 h-5" />
                    ) : (
                      <HiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="login-submit"
                type="submit"
                disabled={submitting}
                className="login-cta-btn w-full py-3.5 text-white rounded-2xl font-semibold text-sm cursor-pointer flex items-center justify-center mt-2"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                      <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-white/30 font-medium">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Signup Link */}
              <p className="text-center text-sm text-white/40">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary-400 font-bold hover:text-primary-300 transition-colors"
                >
                  Create free account
                </Link>
              </p>
            </form>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-6 text-white/25 text-xs">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
              </svg>
              SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Privacy First
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
