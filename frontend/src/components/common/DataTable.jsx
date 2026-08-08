export default function DataTable({ columns, data, renderRow, emptyMessage = "No records found." }) {
  if (!data || data.length === 0) {
    return <div className="py-10 text-center text-sm" style={{ color: "var(--color-muted)" }}>{emptyMessage}</div>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
            {columns.map((col) => (
              <th key={col} className="text-left py-3 px-4 font-medium uppercase tracking-wide text-xs" style={{ color: "var(--color-muted)" }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.id || i}
              className="border-b last:border-0 hover:bg-white/[0.03] transition-colors"
              style={{ borderColor: "var(--color-border)" }}
            >
              {renderRow(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
