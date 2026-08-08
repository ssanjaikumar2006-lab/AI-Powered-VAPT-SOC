import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import * as Icons from "react-icons/lu";
import { NAV_SECTIONS } from "../../utils/constants";

export default function MobileSidebar({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="absolute left-0 top-0 h-full w-64 flex flex-col border-r"
            style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
          >
            <div className="flex items-center gap-2.5 px-5 h-16 border-b" style={{ borderColor: "var(--color-border)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--color-primary)" }}>
                <Icons.LuShield className="text-white text-lg" />
              </div>
              <span className="font-semibold text-white">SENTINEL</span>
            </div>
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
              {NAV_SECTIONS.map((section) => (
                <div key={section.label}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: "var(--color-muted)" }}>
                    {section.label}
                  </p>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = Icons[item.icon] || Icons.LuCircle;
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? "text-white" : ""}`
                          }
                          style={({ isActive }) => ({
                            backgroundColor: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                            color: isActive ? "#fff" : "var(--color-muted)",
                          })}
                        >
                          <Icon className="text-lg" />
                          <span>{item.name}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
