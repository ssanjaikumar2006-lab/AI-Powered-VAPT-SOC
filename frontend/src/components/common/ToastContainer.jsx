import { AnimatePresence, motion } from "framer-motion";
import { LuCircleCheck, LuCircleAlert, LuInfo, LuCircleX } from "react-icons/lu";
import { useNotification } from "../../context/NotificationContext";

const ICONS = { success: LuCircleCheck, error: LuCircleX, warning: LuCircleAlert, info: LuInfo };
const COLORS = { success: "#22C55E", error: "#EF4444", warning: "#F59E0B", info: "#3B82F6" };

export default function ToastContainer() {
  const { toasts } = useNotification();
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-80">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.type] || LuInfo;
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              className="panel px-4 py-3 flex items-start gap-3 shadow-xl"
            >
              <Icon className="text-lg mt-0.5 shrink-0" style={{ color: COLORS[t.type] }} />
              <p className="text-sm text-white">{t.message}</p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
