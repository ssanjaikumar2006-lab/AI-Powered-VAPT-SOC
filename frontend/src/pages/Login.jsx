import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LuEye, LuEyeOff, LuMail, LuLock, LuLoaderCircle } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulated auth — replace with authService.login(form)
    await new Promise((r) => setTimeout(r, 900));
    login({ name: form.email.split("@")[0] || "Analyst", email: form.email, role: "Security Analyst" });
    notify("Welcome back — you're logged in.", "success");
    setLoading(false);
    navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Welcome back</h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>Log in to your Sentinel command center.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--color-muted)" }}>Email address</label>
          <div className="relative">
            <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--color-muted)" }} />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field pl-9"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>Password</label>
            <Link to="/forgot-password" className="text-xs font-medium" style={{ color: "var(--color-primary)" }}>Forgot password?</Link>
          </div>
          <div className="relative">
            <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--color-muted)" }} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field pl-9 pr-9"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPassword ? <LuEyeOff className="text-base" style={{ color: "var(--color-muted)" }} /> : <LuEye className="text-base" style={{ color: "var(--color-muted)" }} />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--color-muted)" }}>
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="rounded" />
          Remember me for 30 days
        </label>

        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60">
          {loading ? <><LuLoaderCircle className="animate-spin" /> Logging in...</> : "Log in"}
        </button>
      </form>

      <p className="text-sm text-center mt-8" style={{ color: "var(--color-muted)" }}>
        Don't have an account? <Link to="/signup" className="font-medium" style={{ color: "var(--color-primary)" }}>Create one</Link>
      </p>
    </motion.div>
  );
}
