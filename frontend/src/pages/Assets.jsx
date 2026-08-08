import { useState, useMemo } from "react";
import { LuSearch, LuServer, LuMonitor, LuRouter, LuCloud, LuBox, LuDatabase, LuNetwork } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import DataTable from "../components/common/DataTable";
import Badge from "../components/common/Badge";
import { assets } from "../utils/mockData";

const TYPE_ICONS = {
  Server: LuServer, Workstation: LuMonitor, Router: LuRouter, Switch: LuNetwork,
  Cloud: LuCloud, Container: LuBox, Database: LuDatabase, Network: LuNetwork,
};

const RISK_COLORS = { Critical: "#EF4444", High: "#F97316", Medium: "#F59E0B", Low: "#22C55E" };

const TYPES = ["All", ...new Set(assets.map((a) => a.type))];

export default function Assets() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.ip.includes(search);
      const matchType = type === "All" || a.type === type;
      return matchSearch && matchType;
    });
  }, [search, type]);

  const counts = TYPES.slice(1).map((t) => ({ type: t, count: assets.filter((a) => a.type === t).length }));

  return (
    <div>
      <PageHeader title="Asset Management" description="Inventory of servers, endpoints, network devices, cloud, and applications." />

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        {counts.map(({ type: t, count }) => {
          const Icon = TYPE_ICONS[t] || LuServer;
          return (
            <button key={t} onClick={() => setType(t)} className="panel panel-hover p-4 text-left">
              <Icon className="text-lg mb-2" style={{ color: "var(--color-primary)" }} />
              <p className="text-lg font-bold text-white">{count}</p>
              <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>{t}</p>
            </button>
          );
        })}
      </div>

      <div className="panel p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-white text-sm">All Assets</h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "var(--color-muted)" }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets..." className="input-field pl-8 w-52 text-xs py-2" />
            </div>
            <select value={type} onChange={(e) => setType(e.target.value)} className="input-field text-xs py-2 w-36">
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <DataTable
          columns={["ID", "Name", "Type", "IP Address", "OS/Platform", "Owner", "Risk"]}
          data={filtered}
          renderRow={(a) => (
            <>
              <td className="py-3 px-4 mono text-xs" style={{ color: "var(--color-muted)" }}>{a.id}</td>
              <td className="py-3 px-4 text-white text-xs font-medium">{a.name}</td>
              <td className="py-3 px-4 text-xs" style={{ color: "var(--color-muted)" }}>{a.type}</td>
              <td className="py-3 px-4 mono text-xs" style={{ color: "var(--color-muted)" }}>{a.ip}</td>
              <td className="py-3 px-4 text-xs" style={{ color: "var(--color-muted)" }}>{a.os}</td>
              <td className="py-3 px-4 text-xs" style={{ color: "var(--color-muted)" }}>{a.owner}</td>
              <td className="py-3 px-4"><Badge color={RISK_COLORS[a.risk]}>{a.risk}</Badge></td>
            </>
          )}
        />
      </div>
    </div>
  );
}
