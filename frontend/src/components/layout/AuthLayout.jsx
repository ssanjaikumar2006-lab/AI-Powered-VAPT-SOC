import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LuShield, LuActivity, LuLock, LuGlobe } from "react-icons/lu";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--color-primary)" }}>
              <LuShield className="text-white text-lg" />
            </div>
            <span className="font-semibold text-lg text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>SENTINEL</span>
          </Link>
          <Outlet />
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center" style={{ backgroundColor: "#0A0F1C" }}>
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1F2937 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute top-0 left-0 right-0 h-[2px] scan-line" style={{ background: "linear-gradient(90deg, transparent, #3B82F6, transparent)" }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md px-10 text-center"
        >
          <div className="relative mx-auto w-40 h-40 mb-8">
            <div className="absolute inset-0 rounded-full pulse-ring" style={{ border: "1px solid rgba(59,130,246,0.4)" }} />
            <div className="absolute inset-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.3)" }}>
              <LuShield className="text-6xl" style={{ color: "var(--color-primary)" }} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            Unified Offense & Defense
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
            AI-driven VAPT and SOC operations in a single command center — from vulnerability discovery to automated response.
          </p>
          <div className="grid grid-cols-3 gap-4 text-left">
            {[
              { icon: LuActivity, label: "Live Threat Detection" },
              { icon: LuLock, label: "Automated Response" },
              { icon: LuGlobe, label: "Global Intel Feeds" },
            ].map((f) => (
              <div key={f.label} className="panel p-3">
                <f.icon className="text-lg mb-2" style={{ color: "var(--color-primary)" }} />
                <p className="text-[11px] font-medium text-white leading-tight">{f.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
