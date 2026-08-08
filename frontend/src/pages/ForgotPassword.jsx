import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuMail, LuLoaderCircle, LuLock, LuEye, LuEyeOff, LuCircleCheck, LuArrowLeft } from "react-icons/lu";
import { useNotification } from "../context/NotificationContext";

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1 email, 2 otp, 3 reset, 4 done
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const inputsRef = useRef([]);
  const { notify } = useNotification();
  const navigate = useNavigate();

  const submitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setStep(2);
    notify(`OTP sent to ${email}`, "info");
  };

  const handleOtpChange = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setStep(3);
  };

  const submitReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setStep(4);
    notify("Password reset successfully.", "success");
  };

  return (
    <AnimatePresence mode="wait">
      {step === 1 && (
        <motion.div key="s1" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
          <Link to="/login" className="inline-flex items-center gap-1.5 text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            <LuArrowLeft /> Back to login
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Forgot password?</h1>
          <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>Enter your email and we'll send you a one-time code.</p>
          <form onSubmit={submitEmail} className="space-y-4">
            <div className="relative">
              <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--color-muted)" }} />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-9" placeholder="you@company.com" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60">
              {loading ? <><LuLoaderCircle className="animate-spin" /> Sending code...</> : "Send reset code"}
            </button>
          </form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div key="s2" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Verify your email</h1>
          <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>Enter the 6-digit code sent to <span className="text-white">{email}</span></p>
          <form onSubmit={submitOtp} className="space-y-6">
            <div className="flex gap-2 justify-between">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  maxLength={1}
                  className="input-field text-center text-lg font-semibold w-12 h-14 px-0"
                />
              ))}
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60">
              {loading ? <><LuLoaderCircle className="animate-spin" /> Verifying...</> : "Verify code"}
            </button>
            <p className="text-sm text-center" style={{ color: "var(--color-muted)" }}>
              Didn't get a code? <button type="button" onClick={() => notify("Code resent.", "info")} className="font-medium" style={{ color: "var(--color-primary)" }}>Resend</button>
            </p>
          </form>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div key="s3" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Set a new password</h1>
          <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>Choose a strong password you haven't used before.</p>
          <form onSubmit={submitReset} className="space-y-4">
            <div className="relative">
              <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--color-muted)" }} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-9 pr-9"
                placeholder="New password"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPassword ? <LuEyeOff className="text-base" style={{ color: "var(--color-muted)" }} /> : <LuEye className="text-base" style={{ color: "var(--color-muted)" }} />}
              </button>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3 disabled:opacity-60">
              {loading ? <><LuLoaderCircle className="animate-spin" /> Resetting...</> : "Reset password"}
            </button>
          </form>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div key="s4" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5" style={{ backgroundColor: "rgba(34,197,94,0.12)" }}>
            <LuCircleCheck className="text-3xl" style={{ color: "var(--color-success)" }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Password updated</h1>
          <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>You can now log in with your new password.</p>
          <button onClick={() => navigate("/login")} className="btn-primary w-full py-3">Back to login</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
