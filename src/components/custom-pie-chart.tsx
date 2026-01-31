"use client";

import {
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieChart,
  ResponsiveContainer,
} from "recharts";

interface CustomPieChartProps {
  data: { name: string; value: number }[];
}

export default function CustomPieChart({ data }: CustomPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="55%"
          outerRadius="90%"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.name.toLowerCase() === "income"
                  ? "var(--income)"
                  : "var(--expense)"
              }
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

/**
can do className 

<Legend
  wrapperStyle={{
    fontSize: 12,
    lineHeight: "16px",
    paddingTop: 8,
  }}
  icnSize={10}
  height={32}
/>
 

<Legend
  content={({ payload }) => (
    <ul className="flex gap-4 text-xs">
      {payload?.map((entry, index) => (
        <li key={index} className="flex items-center gap-1">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  )}
/>

 */
