export const SEVERITY = {
  critical: { label: "Critical", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  high: { label: "High", color: "#F97316", bg: "rgba(249,115,22,0.12)" },
  medium: { label: "Medium", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  low: { label: "Low", color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  info: { label: "Info", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
};

export const STATUS = {
  queued: { label: "Queued", color: "#94A3B8" },
  running: { label: "Running", color: "#3B82F6" },
  completed: { label: "Completed", color: "#22C55E" },
  failed: { label: "Failed", color: "#EF4444" },
  pending: { label: "Pending", color: "#F59E0B" },
  executing: { label: "Executing", color: "#3B82F6" },
};

export const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [{ name: "Dashboard", path: "/dashboard", icon: "LuLayoutDashboard" }],
  },
  {
    label: "Offense & Defense",
    items: [
      { name: "VAPT", path: "/vapt", icon: "LuBug" },
      { name: "SOC", path: "/soc", icon: "LuRadar" },
      { name: "AI Analysis", path: "/ai-analysis", icon: "LuBrainCircuit" },
      { name: "Threat Intel", path: "/threat-intel", icon: "LuGlobe" },
      { name: "Incidents", path: "/incidents", icon: "LuSiren" },
      { name: "Response Center", path: "/response-center", icon: "LuZap" },
    ],
  },
  {
    label: "Assets & Reports",
    items: [
      { name: "Assets", path: "/assets", icon: "LuServer" },
      { name: "Reports", path: "/reports", icon: "LuFileText" },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Settings", path: "/settings", icon: "LuSettings" },
      { name: "Profile", path: "/profile", icon: "LuUserCircle" },
    ],
  },
];
