import { useState } from "react";
import { LuFileText, LuDownload, LuPrinter, LuPlus, LuBriefcase, LuCode, LuShieldCheck } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import Modal from "../components/common/Modal";
import { reports } from "../utils/mockData";
import { useNotification } from "../context/NotificationContext";

const TYPE_META = {
  Executive: { icon: LuBriefcase, color: "#3B82F6" },
  Technical: { icon: LuCode, color: "#A78BFA" },
  Compliance: { icon: LuShieldCheck, color: "#22C55E" },
};

export default function Reports() {
  const [generateOpen, setGenerateOpen] = useState(false);
  const { notify } = useNotification();

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate and export executive, technical, and compliance reports."
        actions={<button onClick={() => setGenerateOpen(true)} className="btn-primary flex items-center gap-2 text-sm"><LuPlus /> Generate Report</button>}
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {Object.entries(TYPE_META).map(([label, meta]) => (
          <div key={label} className="panel p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${meta.color}20` }}>
              <meta.icon className="text-lg" style={{ color: meta.color }} />
            </div>
            <p className="text-sm font-semibold text-white mb-1">{label} Report</p>
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {label === "Executive" && "High-level risk posture for leadership."}
              {label === "Technical" && "Detailed findings for engineering teams."}
              {label === "Compliance" && "Framework-mapped audit evidence."}
            </p>
          </div>
        ))}
      </div>

      <div className="panel p-5">
        <h3 className="font-semibold text-white text-sm mb-4">Recent Reports</h3>
        <div className="space-y-2.5">
          {reports.map((r) => {
            const meta = TYPE_META[r.type];
            return (
              <div key={r.id} className="flex items-center justify-between p-3.5 rounded-lg" style={{ backgroundColor: "var(--color-surface-2)" }}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${meta.color}20` }}>
                    <meta.icon className="text-base" style={{ color: meta.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{r.name}</p>
                    <p className="text-[11px]" style={{ color: "var(--color-muted)" }}>{r.type} · {r.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {r.format.map((f) => (
                    <button key={f} onClick={() => notify(`Downloading ${r.name} as ${f}...`, "info")} className="btn-ghost text-xs px-2.5 py-1.5 flex items-center gap-1">
                      <LuDownload className="text-xs" /> {f}
                    </button>
                  ))}
                  <button onClick={() => notify("Sending to printer...", "info")} className="btn-ghost text-xs px-2.5 py-1.5"><LuPrinter /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        open={generateOpen}
        onClose={() => setGenerateOpen(false)}
        title="Generate new report"
        footer={
          <>
            <button onClick={() => setGenerateOpen(false)} className="btn-ghost">Cancel</button>
            <button onClick={() => { notify("Report generation started.", "success"); setGenerateOpen(false); }} className="btn-primary">Generate</button>
          </>
        }
      >
        <div className="space-y-3 text-left">
          <div>
            <label className="text-xs block mb-1.5" style={{ color: "var(--color-muted)" }}>Report type</label>
            <select className="input-field text-xs"><option>Executive</option><option>Technical</option><option>Compliance</option></select>
          </div>
          <div>
            <label className="text-xs block mb-1.5" style={{ color: "var(--color-muted)" }}>Scope</label>
            <select className="input-field text-xs"><option>All assets</option><option>Web applications</option><option>Network</option><option>Cloud</option></select>
          </div>
          <div>
            <label className="text-xs block mb-1.5" style={{ color: "var(--color-muted)" }}>Format</label>
            <div className="flex gap-2">
              {["PDF", "CSV", "HTML"].map((f) => (
                <label key={f} className="flex items-center gap-1.5 text-xs text-white"><input type="checkbox" defaultChecked={f === "PDF"} /> {f}</label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
