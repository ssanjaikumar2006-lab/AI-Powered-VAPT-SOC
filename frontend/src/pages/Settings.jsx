import { useState } from "react";
import { LuSun, LuMoon, LuBell, LuKey, LuPlug, LuUsers, LuCopy, LuPlus, LuTrash2 } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import { useTheme } from "../context/ThemeContext";
import { useNotification } from "../context/NotificationContext";

const TABS = [
  { id: "general", label: "General", icon: LuSun },
  { id: "notifications", label: "Notifications", icon: LuBell },
  { id: "api", label: "API Keys", icon: LuKey },
  { id: "integrations", label: "Integrations", icon: LuPlug },
  { id: "users", label: "User Management", icon: LuUsers },
];

const apiKeys = [
  { id: "key_a1b2", label: "Production", created: "2026-05-12", lastUsed: "2h ago" },
  { id: "key_c3d4", label: "Staging", created: "2026-06-30", lastUsed: "3d ago" },
];

const integrations = [
  { name: "Slack", desc: "Send alerts to a Slack channel", connected: true },
  { name: "Jira", desc: "Auto-create tickets from incidents", connected: true },
  { name: "Splunk", desc: "Forward events to Splunk HEC", connected: false },
  { name: "PagerDuty", desc: "Trigger on-call escalations", connected: false },
];

const users = [
  { name: "Aditi Rao", email: "a.rao@corp.com", role: "Admin" },
  { name: "Sahil Iyer", email: "s.iyer@corp.com", role: "Security Analyst" },
  { name: "Riya Verma", email: "r.verma@corp.com", role: "Security Analyst" },
  { name: "Karan Mehta", email: "k.mehta@corp.com", role: "Viewer" },
];

export default function Settings() {
  const [tab, setTab] = useState("general");
  const { theme, toggleTheme } = useTheme();
  const { notify } = useNotification();
  const [notifPrefs, setNotifPrefs] = useState({ critical: true, high: true, medium: false, scanComplete: true, weeklyDigest: false });

  return (
    <div>
      <PageHeader title="Settings" description="Manage platform preferences, access, and integrations." />
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        <div className="panel p-2 h-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium mb-0.5"
              style={{ backgroundColor: tab === t.id ? "rgba(59,130,246,0.1)" : "transparent", color: tab === t.id ? "var(--color-primary)" : "var(--color-muted)" }}
            >
              <t.icon /> {t.label}
            </button>
          ))}
        </div>

        <div className="panel p-6">
          {tab === "general" && (
            <div className="space-y-6 max-w-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Theme</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>Switch between dark and light mode</p>
                </div>
                <button onClick={toggleTheme} className="btn-ghost flex items-center gap-2 text-xs">
                  {theme === "dark" ? <LuMoon /> : <LuSun />} {theme === "dark" ? "Dark" : "Light"}
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">Timezone</p>
                <select className="input-field text-xs max-w-xs"><option>UTC+05:30 (India Standard Time)</option><option>UTC (Coordinated Universal Time)</option></select>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">Default dashboard view</p>
                <select className="input-field text-xs max-w-xs"><option>Security Overview</option><option>VAPT</option><option>SOC</option></select>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div className="space-y-4 max-w-lg">
              {Object.entries(notifPrefs).map(([key, val]) => (
                <label key={key} className="flex items-center justify-between py-2 cursor-pointer">
                  <span className="text-sm text-white capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  <input type="checkbox" checked={val} onChange={(e) => setNotifPrefs({ ...notifPrefs, [key]: e.target.checked })} className="rounded" />
                </label>
              ))}
            </div>
          )}

          {tab === "api" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white">API Keys</p>
                <button onClick={() => notify("New API key generated.", "success")} className="btn-primary text-xs flex items-center gap-1.5"><LuPlus /> Generate Key</button>
              </div>
              <div className="space-y-2.5">
                {apiKeys.map((k) => (
                  <div key={k.id} className="flex items-center justify-between p-3.5 rounded-lg" style={{ backgroundColor: "var(--color-surface-2)" }}>
                    <div>
                      <p className="text-sm text-white font-medium">{k.label}</p>
                      <p className="text-xs mono" style={{ color: "var(--color-muted)" }}>{k.id}••••••••  · Created {k.created} · Last used {k.lastUsed}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => notify("Key copied to clipboard.", "success")} className="btn-ghost text-xs px-2.5 py-1.5"><LuCopy /></button>
                      <button onClick={() => notify("Key revoked.", "warning")} className="btn-ghost text-xs px-2.5 py-1.5" style={{ color: "var(--color-danger)" }}><LuTrash2 /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "integrations" && (
            <div className="grid sm:grid-cols-2 gap-3">
              {integrations.map((i) => (
                <div key={i.name} className="p-4 rounded-lg border" style={{ borderColor: "var(--color-border)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-white">{i.name}</p>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ backgroundColor: i.connected ? "rgba(34,197,94,0.12)" : "var(--color-surface-2)", color: i.connected ? "var(--color-success)" : "var(--color-muted)" }}>
                      {i.connected ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: "var(--color-muted)" }}>{i.desc}</p>
                  <button onClick={() => notify(`${i.name} ${i.connected ? "disconnected" : "connected"}.`, "info")} className="btn-ghost text-xs w-full">
                    {i.connected ? "Disconnect" : "Connect"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === "users" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-white">Team Members</p>
                <button onClick={() => notify("Invitation sent.", "success")} className="btn-primary text-xs flex items-center gap-1.5"><LuPlus /> Invite User</button>
              </div>
              <div className="space-y-2.5">
                {users.map((u) => (
                  <div key={u.email} className="flex items-center justify-between p-3.5 rounded-lg" style={{ backgroundColor: "var(--color-surface-2)" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "var(--color-primary)" }}>
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{u.name}</p>
                        <p className="text-xs" style={{ color: "var(--color-muted)" }}>{u.email}</p>
                      </div>
                    </div>
                    <select defaultValue={u.role} className="input-field text-xs w-40 py-1.5">
                      <option>Admin</option><option>Security Analyst</option><option>Viewer</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
