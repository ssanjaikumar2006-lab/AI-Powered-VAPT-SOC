import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SeverityPie({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} stroke="var(--color-surface)" strokeWidth={2} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 10, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#94A3B8" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
