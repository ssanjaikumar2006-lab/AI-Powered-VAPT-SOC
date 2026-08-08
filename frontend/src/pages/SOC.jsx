import { useState, useMemo } from "react";
import { LuSearch, LuRadar, LuCircle } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import SeverityBadge from "../components/common/SeverityBadge";
import DataTable from "../components/common/DataTable";
import EventTimelineChart from "../components/charts/EventTimelineChart";
import { socEvents, eventTimeline, mitreTechniques } from "../utils/mockData";
import { SEVERITY } from "../utils/constants";

const SOURCES = ["All", "Windows", "Linux", "Firewall", "Sysmon", "Wazuh", "DNS", "Proxy", "Email"];

export default function SOC() {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("All");
  const [severity, setSeverity] = useState("all");

  const filtered = useMemo(() => {
    return socEvents.filter((e) => {
      const matchSearch = e.event.toLowerCase().includes(search.toLowerCase()) || e.srcIp.includes(search);
      const matchSource = source === "All" || e.source === source;
      const matchSeverity = severity === "all" || e.severity === severity;
      return matchSearch && matchSource && matchSeverity;
    });
  }, [search, source, severity]);

  return (
    <div>
      <PageHeader
        title="SOC — Security Operations Center"
        description="Correlated telemetry from endpoints, network, and identity sources."
        actions={
          <span className="badge" style={{ color: "var(--color-success)", backgroundColor: "rgba(34,197,94,0.12)" }}>
            <LuCircle className="w-1.5 h-1.5 fill-current" /> Live
          </span>
        }
      />

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="panel p-5 lg:col-span-2">
          <h3 className="font-semibold text-white text-sm mb-1">Event Volume — 24h</h3>
          <p className="text-xs mb-2" style={{ color: "var(--color-muted)" }}>Peak hours highlighted</p>
          <EventTimelineChart data={eventTimeline} />
        </div>
        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <LuRadar className="text-lg" style={{ color: "var(--color-primary)" }} />
            <h3 className="font-semibold text-white text-sm">MITRE ATT&CK Mapping</h3>
          </div>
          <div className="space-y-3">
            {mitreTechniques.map((t) => (
              <div key={t.id} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-white">{t.name}</p>
                  <p className="text-[11px] mono" style={{ color: "var(--color-muted)" }}>{t.id} · {t.tactic}</p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: "rgba(59,130,246,0.12)", color: "var(--color-primary)" }}>{t.hits}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-white text-sm">Live Event Stream</h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--color-muted)" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events or IP..." className="input-field pl-8 w-52 text-xs py-2" />
            </div>
            <select value={source} onChange={(e) => setSource(e.target.value)} className="input-field text-xs py-2 w-32">
              {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="input-field text-xs py-2 w-36">
              <option value="all">All severities</option>
              {Object.keys(SEVERITY).map((k) => <option key={k} value={k}>{SEVERITY[k].label}</option>)}
            </select>
          </div>
        </div>

        <DataTable
          columns={["ID", "Time", "Source", "Event", "Src IP", "Dst IP", "MITRE", "Severity"]}
          data={filtered}
          renderRow={(e) => (
            <>
              <td className="py-3 px-4 mono text-xs" style={{ color: "var(--color-muted)" }}>{e.id}</td>
              <td className="py-3 px-4 mono text-xs" style={{ color: "var(--color-muted)" }}>{e.time}</td>
              <td className="py-3 px-4 text-white text-xs">{e.source}</td>
              <td className="py-3 px-4 text-white text-xs max-w-[220px] truncate" title={e.event}>{e.event}</td>
              <td className="py-3 px-4 mono text-xs" style={{ color: "var(--color-muted)" }}>{e.srcIp}</td>
              <td className="py-3 px-4 mono text-xs" style={{ color: "var(--color-muted)" }}>{e.dstIp}</td>
              <td className="py-3 px-4 text-xs" style={{ color: "var(--color-muted)" }}>{e.technique}</td>
              <td className="py-3 px-4"><SeverityBadge level={e.severity} /></td>
            </>
          )}
        />
      </div>
    </div>
  );
}
