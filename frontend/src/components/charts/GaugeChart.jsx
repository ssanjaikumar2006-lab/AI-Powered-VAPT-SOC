import { PieChart, Pie, Cell } from "recharts";

export default function GaugeChart({ value = 78, size = 180 }) {
  const data = [{ v: value }, { v: 100 - value }];
  const color = value > 70 ? "#22C55E" : value > 40 ? "#F59E0B" : "#EF4444";
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size / 1.6 }}>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          dataKey="v"
          startAngle={180}
          endAngle={0}
          innerRadius={size * 0.32}
          outerRadius={size * 0.42}
          stroke="none"
        >
          <Cell fill={color} />
          <Cell fill="#1F2937" />
        </Pie>
      </PieChart>
      <div className="absolute inset-x-0 top-1/2 -translate-y-2 text-center">
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="text-xs" style={{ color: "var(--color-muted)" }}>/ 100</div>
      </div>
    </div>
  );
}
