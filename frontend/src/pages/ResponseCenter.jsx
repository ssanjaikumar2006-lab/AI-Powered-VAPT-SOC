import { useState } from "react";
import * as Icons from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import StatusBadge from "../components/common/StatusBadge";
import Modal from "../components/common/Modal";
import { responseActions as initialActions } from "../utils/mockData";
import { useNotification } from "../context/NotificationContext";

export default function ResponseCenter() {
  const [actions, setActions] = useState(initialActions);
  const [confirmAction, setConfirmAction] = useState(null);
  const { notify } = useNotification();

  const runAction = (id) => {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status: "executing" } : a)));
    setTimeout(() => {
      setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status: "completed" } : a)));
      notify("Response action completed successfully.", "success");
    }, 1600);
  };

  const handleConfirm = () => {
    if (confirmAction) runAction(confirmAction.id);
    setConfirmAction(null);
  };

  return (
    <div>
      <PageHeader
        title="Response Center"
        description="Review and trigger automated containment actions. Every action is logged and requires confirmation."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = Icons[action.icon] || Icons.LuZap;
          const disabled = action.status === "executing" || action.status === "completed";
          return (
            <div key={action.id} className="panel panel-hover p-5 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(59,130,246,0.1)" }}>
                  <Icon className="text-lg" style={{ color: "var(--color-primary)" }} />
                </div>
                <StatusBadge status={action.status} />
              </div>
              <p className="text-sm font-semibold text-white mb-1">{action.name}</p>
              <p className="text-xs mono mb-4 flex-1" style={{ color: "var(--color-muted)" }}>{action.target}</p>
              <button
                onClick={() => setConfirmAction(action)}
                disabled={disabled}
                className="btn-primary text-xs w-full disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {action.status === "executing" ? "Executing..." : action.status === "completed" ? "Completed" : action.status === "failed" ? "Retry" : "Execute Action"}
              </button>
            </div>
          );
        })}
      </div>

      <Modal
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        title="Confirm response action"
        footer={
          <>
            <button onClick={() => setConfirmAction(null)} className="btn-ghost">Cancel</button>
            <button onClick={handleConfirm} className="btn-primary" style={{ backgroundColor: "var(--color-danger)" }}>Execute</button>
          </>
        }
      >
        {confirmAction && (
          <>
            You are about to run <span className="text-white font-medium">{confirmAction.name}</span> on{" "}
            <span className="text-white font-medium mono">{confirmAction.target}</span>. This action will be logged and may be irreversible. Proceed?
          </>
        )}
      </Modal>
    </div>
  );
}
