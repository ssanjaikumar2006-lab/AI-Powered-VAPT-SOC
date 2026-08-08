import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "react-icons/lu";
import { NAV_SECTIONS } from "../../utils/constants";

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 248 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex flex-col shrink-0 h-screen sticky top-0 border-r overflow-hidden"
      style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-border)" }}
    >
      <div className="flex items-center gap-2.5 px-5 h-16 border-b shrink-0" style={{ borderColor: "var(--color-border)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>
          <Icons.LuShield className="text-white text-lg" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            SENTINEL
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-2" style={{ color: "var(--color-muted)" }}>
                {section.label}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = Icons[item.icon] || Icons.LuCircle;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${
                        isActive ? "text-white" : "hover:text-white"
                      }`
                    }
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "rgba(59,130,246,0.12)" : "transparent",
                      color: isActive ? "#fff" : "var(--color-muted)",
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="active-nav"
                            className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full"
                            style={{ backgroundColor: "var(--color-primary)" }}
                          />
                        )}
                        <Icon className="text-lg shrink-0" style={{ color: isActive ? "var(--color-primary)" : undefined }} />
                        {!collapsed && <span className="truncate">{item.name}</span>}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <button
        onClick={onToggle}
        className="flex items-center justify-center gap-2 h-12 border-t text-xs font-medium shrink-0 hover:bg-white/5 transition-colors"
        style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
      >
        {collapsed ? <Icons.LuChevronsRight /> : <><Icons.LuChevronsLeft /> Collapse</>}
      </button>
    </motion.aside>
  );
}
