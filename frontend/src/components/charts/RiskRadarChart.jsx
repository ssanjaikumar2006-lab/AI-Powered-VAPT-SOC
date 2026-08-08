import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

export default function RiskRadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} outerRadius={95}>
        <PolarGrid stroke="#1F2937" />
        <PolarAngleAxis dataKey="category" stroke="#94A3B8" fontSize={12} />
        <PolarRadiusAxis stroke="#1F2937" tick={false} axisLine={false} />
        <Radar dataKey="risk" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.35} strokeWidth={2} />
        <Tooltip contentStyle={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 10, fontSize: 12 }} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
