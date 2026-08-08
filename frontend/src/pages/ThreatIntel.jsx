import { LuGlobe, LuHash, LuLink, LuServer, LuTriangleAlert } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import { iocs, cveFeed, mitreTechniques } from "../utils/mockData";

function IocList({ title, icon: Icon, items }) {
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="text-lg" style={{ color: "var(--color-primary)" }} />
        <h3 className="font-semibold text-white text-sm">{title}</h3>
      </div>
      <div className="space-y-2.5">
        {items.map((it) => (
          <div key={it.value} className="p-3 rounded-lg" style={{ backgroundColor: "var(--color-surface-2)" }}>
            <p className="mono text-xs text-white truncate">{it.value}</p>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px]" style={{ color: "var(--color-muted)" }}>{it.tag}</span>
              <span className="text-[11px] font-semibold" style={{ color: it.confidence > 90 ? "var(--color-danger)" : "var(--color-warning)" }}>{it.confidence}% conf.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ThreatIntel() {
  return (
    <div>
      <PageHeader title="Threat Intelligence" description="Live indicators of compromise, CVE tracking, and adversary technique mapping." />

      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <IocList title="Malicious IPs" icon={LuServer} items={iocs.ips} />
        <IocList title="Malicious Domains" icon={LuGlobe} items={iocs.domains} />
        <IocList title="File Hashes" icon={LuHash} items={iocs.hashes} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <LuTriangleAlert className="text-lg" style={{ color: "var(--color-danger)" }} />
            <h3 className="font-semibold text-white text-sm">CVE Feed</h3>
          </div>
          <div className="space-y-3">
            {cveFeed.map((c) => (
              <div key={c.id} className="p-3.5 rounded-lg border" style={{ borderColor: "var(--color-border)" }}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="mono text-xs font-semibold text-white">{c.id}</p>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "var(--color-danger)" }}>{c.cvss}</span>
                </div>
                <p className="text-xs font-medium text-white mb-1">{c.product}</p>
                <p className="text-xs mb-1.5" style={{ color: "var(--color-muted)" }}>{c.summary}</p>
                <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>Published {c.published}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <LuLink className="text-lg" style={{ color: "var(--color-cyan)" }} />
            <h3 className="font-semibold text-white text-sm">MITRE ATT&CK Techniques Observed</h3>
          </div>
          <div className="space-y-3">
            {mitreTechniques.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: "var(--color-surface-2)" }}>
                <div>
                  <p className="text-xs font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] mono" style={{ color: "var(--color-muted)" }}>{t.id} · {t.tactic}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: "var(--color-primary)" }}>{t.hits}</p>
                  <p className="text-[10px]" style={{ color: "var(--color-muted)" }}>hits (7d)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
