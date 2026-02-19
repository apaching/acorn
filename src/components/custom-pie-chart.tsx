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
  data: { key: string; name: string; value: number }[];
}

const colors: Record<string, string> = {
  /**
   * Income vs Expenses
   */
  income: "var(--income)",
  expense: "var(--expense)",

  /**
   * Income by Category
   */
  salary: "var(--income-salary)",
  allowance: "var(--income-allowance)",
  side_income: "var(--income-side)",
  business: "var(--income-business)",
  income_others: "var(--income-others)",

  /**
   * Expense by Category
   */
  food: "var(--expense-food)",
  transport: "var(--expense-transport)",
  groceries: "var(--expense-groceries)",
  bills: "var(--expense-bills)",
  luxury: "var(--expense-luxury)",
  healthcare: "var(--expense-healthcare)",
  expense_others: "var(--expense-others)",
};

export default function CustomPieChart({ data }: CustomPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius="0%"
          outerRadius="75%"
          dataKey="value"
          stroke="var(--color-border)"
          label
          labelLine={{
            strokeWidth: 0.5,
            strokeDasharray: "3 3",
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[entry.key]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend
          wrapperStyle={{ marginTop: 16 }}
          content={({ payload }) => (
            <ul className="flex w-full flex-wrap items-center justify-center gap-2">
              {payload?.map((entry, index) => (
                <li key={index} className="flex items-center gap-1">
                  <span
                    className="h-2 w-2 rounded-full bg-white"
                    style={{ background: entry.color }}
                  />
                  <p className="text-sm font-semibold">{entry.value}</p>
                </li>
              ))}
            </ul>
          )}
        />
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
