import { useState } from "react";
import { LuCamera, LuLock, LuShieldCheck, LuMonitor, LuSmartphone, LuLaptop } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const sessions = [
  { device: "MacBook Pro", icon: LuLaptop, location: "Kanpur, IN", current: true, lastActive: "Active now" },
  { device: "iPhone 16", icon: LuSmartphone, location: "Kanpur, IN", current: false, lastActive: "3h ago" },
  { device: "Windows Desktop", icon: LuMonitor, location: "Mumbai, IN", current: false, lastActive: "2d ago" },
];

export default function Profile() {
  const { user } = useAuth();
  const { notify } = useNotification();
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div>
      <PageHeader title="Profile" description="Manage your account, security, and active sessions." />

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="panel p-6 text-center h-fit">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
              {(user?.name || "AN").slice(0, 2).toUpperCase()}
            </div>
            <button onClick={() => notify("Avatar updated.", "success")} className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center border-4" style={{ backgroundColor: "var(--color-primary)", borderColor: "var(--color-surface)" }}>
              <LuCamera className="text-xs text-white" />
            </button>
          </div>
          <p className="text-base font-semibold text-white">{user?.name || "Security Analyst"}</p>
          <p className="text-xs mb-1" style={{ color: "var(--color-muted)" }}>{user?.email || "analyst@corp.com"}</p>
          <span className="badge mt-2" style={{ color: "var(--color-primary)", backgroundColor: "rgba(59,130,246,0.12)" }}>{user?.role || "Security Analyst"}</span>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="panel p-6">
            <div className="flex items-center gap-2 mb-4">
              <LuLock style={{ color: "var(--color-primary)" }} />
              <h3 className="font-semibold text-white text-sm">Change Password</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input type="password" placeholder="Current password" className="input-field text-xs sm:col-span-2" />
              <input type="password" placeholder="New password" className="input-field text-xs" />
              <input type="password" placeholder="Confirm new password" className="input-field text-xs" />
            </div>
            <button onClick={() => notify("Password updated.", "success")} className="btn-primary text-xs mt-4">Update Password</button>
          </div>

          <div className="panel p-6">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <LuShieldCheck style={{ color: "var(--color-success)" }} />
                <h3 className="font-semibold text-white text-sm">Two-Factor Authentication</h3>
              </div>
              <button
                onClick={() => { setTwoFA((v) => !v); notify(twoFA ? "2FA disabled." : "2FA enabled.", twoFA ? "warning" : "success"); }}
                className="relative w-11 h-6 rounded-full transition-colors"
                style={{ backgroundColor: twoFA ? "var(--color-primary)" : "var(--color-border)" }}
              >
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform" style={{ transform: twoFA ? "translateX(22px)" : "translateX(2px)" }} />
              </button>
            </div>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>Require an authenticator app code in addition to your password.</p>
          </div>

          <div className="panel p-6">
            <h3 className="font-semibold text-white text-sm mb-4">Active Sessions & Devices</h3>
            <div className="space-y-2.5">
              {sessions.map((s) => (
                <div key={s.device} className="flex items-center justify-between p-3.5 rounded-lg" style={{ backgroundColor: "var(--color-surface-2)" }}>
                  <div className="flex items-center gap-3">
                    <s.icon className="text-lg" style={{ color: "var(--color-muted)" }} />
                    <div>
                      <p className="text-sm text-white font-medium">{s.device} {s.current && <span className="text-[10px] font-bold ml-1.5 px-1.5 py-0.5 rounded" style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "var(--color-success)" }}>This device</span>}</p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>{s.location} · {s.lastActive}</p>
                    </div>
                  </div>
                  {!s.current && <button onClick={() => notify("Session revoked.", "warning")} className="btn-ghost text-xs" style={{ color: "var(--color-danger)" }}>Revoke</button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
