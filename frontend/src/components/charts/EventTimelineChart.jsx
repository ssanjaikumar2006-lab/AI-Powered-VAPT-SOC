import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function EventTimelineChart({ data }) {
  const max = Math.max(...data.map((d) => d.events));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
        <XAxis dataKey="hour" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} interval={2} />
        <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 10, fontSize: 12 }} />
        <Bar dataKey="events" radius={[4, 4, 0, 0]}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.events === max ? "#EF4444" : "#3B82F6"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
