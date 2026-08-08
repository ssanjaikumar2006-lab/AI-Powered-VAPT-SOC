export default function Badge({ color, bg, children, dot = true }) {
  return (
    <span className="badge" style={{ color, backgroundColor: bg || `${color}20` }}>
      {dot && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
      {children}
    </span>
  );
}
