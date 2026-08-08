import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LuEye, LuEyeOff, LuMail, LuLock, LuUser, LuLoaderCircle, LuShieldCheck, LuShield } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const ROLES = [
  { id: "admin", label: "Admin", icon: LuShield, desc: "Full platform & user control" },
  { id: "analyst", label: "Security Analyst", icon: LuShieldCheck, desc: "Investigate & respond" },
  { id: "viewer", label: "Viewer", icon: LuEye, desc: "Read-only dashboards" },
];

function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH_LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["#EF4444", "#F97316", "#F59E0B", "#3B82F6", "#22C55E"];

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("analyst");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const strength = useMemo(() => getStrength(form.password), [form.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    login({ name: form.name || "Analyst", email: form.email, role: ROLES.find((r) => r.id === role)?.label });
    notify("Account created — welcome to Sentinel.", "success");
    setLoading(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Create your account</h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>Start protecting your attack surface in minutes.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--color-muted)" }}>Full name</label>
          <div className="relative">
            <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--color-muted)" }} />
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field pl-9" placeholder="Jane Cooper" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--color-muted)" }}>Work email</label>
          <div className="relative">
            <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--color-muted)" }} />
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field pl-9" placeholder="you@company.com" />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--color-muted)" }}>Password</label>
          <div className="relative">
            <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--color-muted)" }} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field pl-9 pr-9"
              placeholder="Create a strong password"
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPassword ? <LuEyeOff className="text-base" style={{ color: "var(--color-muted)" }} /> : <LuEye className="text-base" style={{ color: "var(--color-muted)" }} />}
            </button>
          </div>
          {form.password && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-1 flex-1 rounded-full" style={{ backgroundColor: i < strength ? STRENGTH_COLORS[strength] : "var(--color-border)" }} />
                ))}
              </div>
              <p className="text-xs mt-1" style={{ color: STRENGTH_COLORS[strength] }}>{STRENGTH_LABELS[strength]}</p>
            </div>
          )}
        </div>

        <div>
          <label className="text-xs font-medium mb-2 block" style={{ color: "var(--color-muted)" }}>Choose your role</label>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setRole(r.id)}
                className="p-3 rounded-xl border text-center transition-colors"
                style={{
                  borderColor: role === r.id ? "var(--color-primary)" : "var(--color-border)",
                  backgroundColor: role === r.id ? "rgba(59,130,246,0.08)" : "transparent",
                }}
              >
                <r.icon className="mx-auto mb-1.5 text-lg" style={{ color: role === r.id ? "var(--color-primary)" : "var(--color-muted)" }} />
                <p className="text-[11px] font-medium text-white">{r.label}</p>
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60">
          {loading ? <><LuLoaderCircle className="animate-spin" /> Creating account...</> : "Create account"}
        </button>
      </form>

      <p className="text-sm text-center mt-8" style={{ color: "var(--color-muted)" }}>
        Already have an account? <Link to="/login" className="font-medium" style={{ color: "var(--color-primary)" }}>Log in</Link>
      </p>
    </motion.div>
  );
}
