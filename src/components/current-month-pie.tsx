"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface CurrentMonthPieChartProps {
  data: { name: string; value: number }[];
}

export default function CurrentMonthPieChart({
  data,
}: CurrentMonthPieChartProps) {
  return (
    <PieChart responsive className="h-full w-full">
      <Pie
        data={data}
        cx="50%" // X position of center
        cy="50%" // Y position of center
        innerRadius={50} // For a donut shape
        outerRadius={100} // Outer radius of the pie
        paddingAngle={5} // Space between slices
        dataKey="value" // Value to be used for slices
        label // Show labels on slices
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
      <Legend
        itemSorter={(item) => (item.payload as { index?: number })?.index ?? 0}
      />
    </PieChart>
  );
}
