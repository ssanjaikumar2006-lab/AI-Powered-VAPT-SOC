import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function VulnTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="critGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
        <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 10, fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12, color: "#94A3B8" }} />
        <Area type="monotone" dataKey="critical" stroke="#EF4444" fill="url(#critGrad)" strokeWidth={2} />
        <Area type="monotone" dataKey="high" stroke="#F97316" fill="url(#highGrad)" strokeWidth={2} />
        <Area type="monotone" dataKey="medium" stroke="#F59E0B" fill="url(#medGrad)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
