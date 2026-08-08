export default function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{title}</h1>
        {description && <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 flex-wrap">{actions}</div>}
    </div>
  );
}
