import { useState } from "react";
import { LuUserPlus, LuClipboardList, LuClock, LuFileText, LuShieldCheck } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import SeverityBadge from "../components/common/SeverityBadge";
import Modal from "../components/common/Modal";
import { incidents } from "../utils/mockData";
import { useNotification } from "../context/NotificationContext";

const STATUSES = ["New", "Investigating", "Containment", "Resolved"];

export default function Incidents() {
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState("");
  const { notify } = useNotification();

  return (
    <div>
      <PageHeader title="Incident Response" description="Track, assign, and resolve active security incidents." />

      <div className="grid lg:grid-cols-4 gap-4 mb-6">
        {STATUSES.map((status) => {
          const items = incidents.filter((i) => i.status === status);
          return (
            <div key={status} className="panel p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--color-muted)" }}>{status}</p>
                <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-surface-2)", color: "var(--color-muted)" }}>{items.length}</span>
              </div>
              <div className="space-y-2.5">
                {items.map((inc) => (
                  <button
                    key={inc.id}
                    onClick={() => setSelected(inc)}
                    className="w-full text-left p-3 rounded-lg border hover:border-[var(--color-primary)] transition-colors"
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface-2)" }}
                  >
                    <p className="text-xs font-medium text-white mb-1.5 leading-snug">{inc.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] mono" style={{ color: "var(--color-muted)" }}>{inc.id}</span>
                      <SeverityBadge level={inc.severity} />
                    </div>
                  </button>
                ))}
                {items.length === 0 && <p className="text-xs text-center py-4" style={{ color: "var(--color-muted)" }}>No incidents</p>}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.id}
        footer={
          <>
            <button onClick={() => setSelected(null)} className="btn-ghost">Close</button>
            <button onClick={() => { notify("Incident updated.", "success"); setSelected(null); }} className="btn-primary">Save Changes</button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4 text-left">
            <p className="text-sm text-white font-medium">{selected.title}</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><p style={{ color: "var(--color-muted)" }}>Asset</p><p className="text-white mono mt-0.5">{selected.asset}</p></div>
              <div><p style={{ color: "var(--color-muted)" }}>Opened</p><p className="text-white mt-0.5">{selected.opened}</p></div>
            </div>

            <div>
              <label className="text-xs flex items-center gap-1.5 mb-1.5" style={{ color: "var(--color-muted)" }}><LuUserPlus /> Assign to</label>
              <select className="input-field text-xs" defaultValue={selected.assignee}>
                {["Unassigned", "A. Rao", "S. Iyer", "R. Verma"].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs flex items-center gap-1.5 mb-1.5" style={{ color: "var(--color-muted)" }}><LuClipboardList /> Status</label>
              <select className="input-field text-xs" defaultValue={selected.status}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs flex items-center gap-1.5 mb-1.5" style={{ color: "var(--color-muted)" }}><LuFileText /> Analyst notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="input-field text-xs" placeholder="Document containment steps, evidence, and findings..." />
            </div>

            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-muted)" }}>
              <LuClock /> Timeline: Detected → Triaged → {selected.status} → Lessons Learned
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-success)" }}>
              <LuShieldCheck /> Evidence chain intact — 4 artifacts collected
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
