import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LuPlay, LuPause, LuSquare, LuRotateCcw, LuSearch, LuFilter, LuDownload,
  LuGlobe, LuNetwork, LuCloud, LuBox, LuServer, LuArrowRightLeft,
} from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import SeverityBadge from "../components/common/SeverityBadge";
import StatusBadge from "../components/common/StatusBadge";
import ProgressBar from "../components/common/ProgressBar";
import SeverityPie from "../components/charts/SeverityPie";
import DataTable from "../components/common/DataTable";
import Modal from "../components/common/Modal";
import { useNotification } from "../context/NotificationContext";
import { scanEngines, vulnerabilities, vulnSeverityBreakdown } from "../utils/mockData";
import { SEVERITY } from "../utils/constants";

const SCAN_TYPES = [
  { id: "quick", label: "Quick Scan", icon: LuPlay },
  { id: "full", label: "Full Scan", icon: LuServer },
  { id: "web", label: "Web Scan", icon: LuGlobe },
  { id: "network", label: "Network Scan", icon: LuNetwork },
  { id: "api", label: "API Scan", icon: LuArrowRightLeft },
  { id: "cloud", label: "Cloud Scan", icon: LuCloud },
  { id: "container", label: "Container Scan", icon: LuBox },
  { id: "internal", label: "Internal Scan", icon: LuServer },
  { id: "external", label: "External Scan", icon: LuGlobe },
];

export default function VAPT() {
  const [target, setTarget] = useState("");
  const [scanType, setScanType] = useState("full");
  const [scanState, setScanState] = useState("idle"); // idle | running | paused
  const [progress, setProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { notify } = useNotification();

  const startScan = () => {
    if (!target) {
      notify("Enter a target URL or IP before starting a scan.", "warning");
      return;
    }
    setConfirmOpen(true);
  };

  const confirmStart = () => {
    setConfirmOpen(false);
    setScanState("running");
    setProgress(0);
    notify(`${SCAN_TYPES.find((s) => s.id === scanType)?.label} started on ${target}`, "success");
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setScanState("idle");
          notify("Scan completed successfully.", "success");
          return 100;
        }
        return p + 4;
      });
    }, 300);
  };

  const filtered = useMemo(() => {
    return vulnerabilities.filter((v) => {
      const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) || v.asset.toLowerCase().includes(search.toLowerCase());
      const matchesSeverity = severityFilter === "all" || v.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  }, [search, severityFilter]);

  return (
    <div>
      <PageHeader title="VAPT — Vulnerability Assessment & Penetration Testing" description="Configure targets, monitor scan engines, and triage findings." />

      {/* Scan target */}
      <div className="panel p-5 mb-6">
        <h3 className="font-semibold text-white text-sm mb-4">Scan Target</h3>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Target URL or IP address (e.g. https://app.corp.com or 10.20.4.12)"
            className="input-field flex-1"
          />
          <select value={scanType} onChange={(e) => setScanType(e.target.value)} className="input-field md:w-52">
            {SCAN_TYPES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-5">
          {SCAN_TYPES.map((s) => (
            <button
              key={s.id}
              onClick={() => setScanType(s.id)}
              className="p-2.5 rounded-lg border text-center transition-colors"
              style={{
                borderColor: scanType === s.id ? "var(--color-primary)" : "var(--color-border)",
                backgroundColor: scanType === s.id ? "rgba(59,130,246,0.08)" : "transparent",
              }}
            >
              <s.icon className="mx-auto mb-1 text-base" style={{ color: scanType === s.id ? "var(--color-primary)" : "var(--color-muted)" }} />
              <p className="text-[10px] font-medium text-white leading-tight">{s.label}</p>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button onClick={startScan} disabled={scanState === "running"} className="btn-primary flex items-center gap-2 disabled:opacity-50">
            <LuPlay /> Start Scan
          </button>
          <button onClick={() => scanState === "running" && setScanState("paused")} disabled={scanState !== "running"} className="btn-ghost flex items-center gap-2 disabled:opacity-40">
            <LuPause /> Pause
          </button>
          <button onClick={() => scanState === "paused" && setScanState("running")} disabled={scanState !== "paused"} className="btn-ghost flex items-center gap-2 disabled:opacity-40">
            <LuPlay /> Resume
          </button>
          <button onClick={() => { setScanState("idle"); setProgress(0); notify("Scan cancelled.", "warning"); }} disabled={scanState === "idle"} className="btn-ghost flex items-center gap-2 disabled:opacity-40">
            <LuSquare /> Cancel
          </button>
          <button onClick={() => { setProgress(0); setScanState("idle"); }} className="btn-ghost flex items-center gap-2">
            <LuRotateCcw /> Reset
          </button>
        </div>

        {scanState !== "idle" && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: "var(--color-muted)" }}>
              <span>{scanState === "paused" ? "Paused" : "Scanning"} {target}</span>
              <span>{progress}%</span>
            </div>
            <ProgressBar value={progress} color={scanState === "paused" ? "#F59E0B" : "#3B82F6"} />
          </div>
        )}
      </div>

      {/* Scan engines */}
      <div className="panel p-5 mb-6">
        <h3 className="font-semibold text-white text-sm mb-4">Scan Engines</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {scanEngines.map((eng) => (
            <div key={eng.name} className="p-3.5 rounded-xl border" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">{eng.name}</p>
                <StatusBadge status={eng.status} />
              </div>
              <p className="text-xs mb-2.5" style={{ color: "var(--color-muted)" }}>{eng.type}</p>
              <ProgressBar value={eng.progress} color={eng.status === "failed" ? "#EF4444" : eng.status === "completed" ? "#22C55E" : "#3B82F6"} />
            </div>
          ))}
        </div>
      </div>

      {/* Risk overview + findings */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="panel p-5">
          <h3 className="font-semibold text-white text-sm mb-1">Risk Overview</h3>
          <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>By severity</p>
          <SeverityPie data={vulnSeverityBreakdown} />
        </div>
        <div className="panel p-5 lg:col-span-2">
          <h3 className="font-semibold text-white text-sm mb-4">Severity Distribution</h3>
          <div className="space-y-3">
            {vulnSeverityBreakdown.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white font-medium">{s.name}</span>
                  <span style={{ color: "var(--color-muted)" }}>{s.value} findings</span>
                </div>
                <ProgressBar value={(s.value / 214) * 100} color={s.color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vulnerabilities table */}
      <div className="panel p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-white text-sm">Top Vulnerabilities</h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--color-muted)" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search findings..." className="input-field pl-8 w-48 text-xs py-2" />
            </div>
            <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="input-field text-xs py-2 w-36">
              <option value="all">All severities</option>
              {Object.keys(SEVERITY).map((k) => <option key={k} value={k}>{SEVERITY[k].label}</option>)}
            </select>
            <button onClick={() => notify("Exporting findings as CSV...", "info")} className="btn-ghost text-xs flex items-center gap-1.5 py-2">
              <LuDownload /> Export
            </button>
          </div>
        </div>

        <DataTable
          columns={["ID", "Title", "CVSS", "CWE", "OWASP", "Asset", "Severity", "Patch"]}
          data={filtered}
          renderRow={(v) => (
            <>
              <td className="py-3 px-4 mono text-xs" style={{ color: "var(--color-muted)" }}>{v.id}</td>
              <td className="py-3 px-4 text-white text-xs max-w-[220px] truncate" title={v.title}>{v.title}</td>
              <td className="py-3 px-4 text-xs font-semibold" style={{ color: v.cvss >= 9 ? "#EF4444" : v.cvss >= 7 ? "#F97316" : "#F59E0B" }}>{v.cvss}</td>
              <td className="py-3 px-4 mono text-xs" style={{ color: "var(--color-muted)" }}>{v.cwe}</td>
              <td className="py-3 px-4 text-xs" style={{ color: "var(--color-muted)" }}>{v.owasp}</td>
              <td className="py-3 px-4 text-xs" style={{ color: "var(--color-muted)" }}>{v.asset}</td>
              <td className="py-3 px-4"><SeverityBadge level={v.severity} /></td>
              <td className="py-3 px-4 text-xs" style={{ color: "var(--color-muted)" }}>{v.patch}</td>
            </>
          )}
        />
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm scan start"
        footer={
          <>
            <button onClick={() => setConfirmOpen(false)} className="btn-ghost">Cancel</button>
            <button onClick={confirmStart} className="btn-primary">Start scan</button>
          </>
        }
      >
        You're about to run a <span className="text-white font-medium">{SCAN_TYPES.find((s) => s.id === scanType)?.label}</span> against <span className="text-white font-medium mono">{target}</span>. This may generate traffic detectable by the target's own monitoring systems.
      </Modal>
    </div>
  );
}
