import { motion } from "framer-motion";
import * as Icons from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import Sparkline from "../components/charts/Sparkline";
import SeverityPie from "../components/charts/SeverityPie";
import VulnTrendChart from "../components/charts/VulnTrendChart";
import RiskRadarChart from "../components/charts/RiskRadarChart";
import GaugeChart from "../components/charts/GaugeChart";
import SeverityBadge from "../components/common/SeverityBadge";
import { kpis, vulnSeverityBreakdown, vulnTrend, assetRiskRadar, socEvents, incidents } from "../utils/mockData";
import { useNavigate } from "react-router-dom";

const TONE_COLORS = { primary: "#3B82F6", danger: "#EF4444", warning: "#F59E0B", success: "#22C55E" };

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Security Overview"
        description="Real-time posture across your assets, vulnerabilities, and live threats."
        actions={
          <>
            <button className="btn-ghost text-sm" onClick={() => navigate("/reports")}>Export Report</button>
            <button className="btn-primary text-sm" onClick={() => navigate("/vapt")}>Start New Scan</button>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => {
          const Icon = Icons[k.icon] || Icons.LuCircle;
          const color = TONE_COLORS[k.tone];
          return (
            <motion.div
              key={k.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="panel panel-hover p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                  <Icon className="text-base" style={{ color }} />
                </div>
                <span className="text-xs font-semibold flex items-center gap-0.5" style={{ color: k.delta >= 0 ? "var(--color-success)" : "var(--color-danger)" }}>
                  {k.delta >= 0 ? <Icons.LuTrendingUp className="text-sm" /> : <Icons.LuTrendingDown className="text-sm" />}
                  {Math.abs(k.delta)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{k.value}{k.suffix || ""}</p>
              <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>{k.label}</p>
              <Sparkline data={k.trend} color={color} />
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white text-sm">Vulnerability Trend</h3>
              <p className="text-xs" style={{ color: "var(--color-muted)" }}>Last 6 months by severity</p>
            </div>
          </div>
          <VulnTrendChart data={vulnTrend} />
        </div>
        <div className="panel p-5">
          <h3 className="font-semibold text-white text-sm mb-1">Risk Breakdown</h3>
          <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>Current open findings</p>
          <SeverityPie data={vulnSeverityBreakdown} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="panel p-5">
          <h3 className="font-semibold text-white text-sm mb-1">Security Score</h3>
          <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>Composite risk rating</p>
          <div className="flex justify-center py-2">
            <GaugeChart value={78} />
          </div>
          <p className="text-xs text-center" style={{ color: "var(--color-muted)" }}>+1.8% vs last week</p>
        </div>
        <div className="panel p-5">
          <h3 className="font-semibold text-white text-sm mb-1">Attack Surface Risk</h3>
          <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>By asset category</p>
          <RiskRadarChart data={assetRiskRadar} />
        </div>
        <div className="panel p-5 flex flex-col">
          <h3 className="font-semibold text-white text-sm mb-3">Open Incidents</h3>
          <div className="space-y-3 flex-1">
            {incidents.slice(0, 4).map((inc) => (
              <div key={inc.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{inc.title}</p>
                  <p className="text-[11px] mono" style={{ color: "var(--color-muted)" }}>{inc.id} · {inc.assignee}</p>
                </div>
                <SeverityBadge level={inc.severity} />
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/incidents")} className="btn-ghost text-xs mt-4 w-full">View all incidents</button>
        </div>
      </div>

      {/* Recent SOC events */}
      <div className="panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white text-sm">Live SOC Events</h3>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>Most recent correlated events</p>
          </div>
          <button onClick={() => navigate("/soc")} className="btn-ghost text-xs">Open SOC</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                {["Time", "Source", "Event", "Src IP", "Severity"].map((h) => (
                  <th key={h} className="text-left py-2 px-3 text-xs font-medium uppercase" style={{ color: "var(--color-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {socEvents.slice(0, 5).map((e) => (
                <tr key={e.id} className="border-b last:border-0 hover:bg-white/[0.03]" style={{ borderColor: "var(--color-border)" }}>
                  <td className="py-2.5 px-3 mono text-xs" style={{ color: "var(--color-muted)" }}>{e.time}</td>
                  <td className="py-2.5 px-3 text-white text-xs">{e.source}</td>
                  <td className="py-2.5 px-3 text-white text-xs">{e.event}</td>
                  <td className="py-2.5 px-3 mono text-xs" style={{ color: "var(--color-muted)" }}>{e.srcIp}</td>
                  <td className="py-2.5 px-3"><SeverityBadge level={e.severity} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
