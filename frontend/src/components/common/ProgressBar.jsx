import { motion } from "framer-motion";

export default function ProgressBar({ value = 0, color = "var(--color-primary)", height = 6 }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, backgroundColor: "var(--color-border)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
