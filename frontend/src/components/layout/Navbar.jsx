import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSearch, LuBell, LuSun, LuMoon, LuChevronDown, LuLogOut, LuUser, LuSettings, LuPlus, LuMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const notifications = [
  { id: 1, text: "Critical vulnerability detected on api.corp-app.com", time: "2m ago", severity: "critical" },
  { id: 2, text: "Scan 'Full Scan — Web-03' completed", time: "18m ago", severity: "info" },
  { id: 3, text: "New incident INC-2291 opened", time: "1h ago", severity: "high" },
];

export default function Navbar({ onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header
      className="h-16 sticky top-0 z-30 flex items-center gap-4 px-4 md:px-6 border-b backdrop-blur-md"
      style={{ backgroundColor: "rgba(11,18,32,0.85)", borderColor: "var(--color-border)" }}
    >
      <button className="md:hidden p-2 -ml-2" onClick={onMenuClick}>
        <LuMenu className="text-xl text-white" />
      </button>

      <div className="flex-1 max-w-md relative hidden sm:block">
        <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base" style={{ color: "var(--color-muted)" }} />
        <input
          className="input-field pl-9"
          placeholder="Search assets, CVEs, incidents..."
        />
      </div>

      <div className="flex-1 sm:hidden" />

      <button className="btn-primary hidden sm:flex items-center gap-1.5 text-xs" onClick={() => navigate("/vapt")}>
        <LuPlus /> New Scan
      </button>

      <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/5 transition-colors">
        {theme === "dark" ? <LuSun className="text-lg" style={{ color: "var(--color-muted)" }} /> : <LuMoon className="text-lg" style={{ color: "var(--color-muted)" }} />}
      </button>

      <div className="relative">
        <button onClick={() => setNotifOpen((o) => !o)} className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
          <LuBell className="text-lg" style={{ color: "var(--color-muted)" }} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full pulse-ring" style={{ backgroundColor: "var(--color-danger)" }} />
        </button>
        <AnimatePresence>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="panel absolute right-0 mt-2 w-80 p-2 shadow-2xl z-40"
            >
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>Notifications</p>
              {notifications.map((n) => (
                <div key={n.id} className="px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <p className="text-sm text-white leading-snug">{n.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>{n.time}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative">
        <button onClick={() => setProfileOpen((o) => !o)} className="flex items-center gap-2 p-1 pr-2 rounded-lg hover:bg-white/5 transition-colors">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
            {(user?.name || "AN").slice(0, 2).toUpperCase()}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-medium text-white leading-tight">{user?.name || "Analyst"}</p>
            <p className="text-[10px] leading-tight" style={{ color: "var(--color-muted)" }}>{user?.role || "Security Analyst"}</p>
          </div>
          <LuChevronDown className="text-xs hidden lg:block" style={{ color: "var(--color-muted)" }} />
        </button>
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="panel absolute right-0 mt-2 w-52 p-1.5 shadow-2xl z-40"
            >
              <button onClick={() => navigate("/profile")} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white">
                <LuUser /> Profile
              </button>
              <button onClick={() => navigate("/settings")} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-white">
                <LuSettings /> Settings
              </button>
              <div className="h-px my-1" style={{ backgroundColor: "var(--color-border)" }} />
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/5 text-sm"
                style={{ color: "var(--color-danger)" }}
              >
                <LuLogOut /> Log out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
