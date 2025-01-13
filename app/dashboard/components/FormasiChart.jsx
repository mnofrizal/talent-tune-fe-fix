"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const formasiData = [
  { name: "IP", value: 563, color: "#459ab0" },
  { name: "CDB", value: 226, color: "#f97316" },
];

export default function FormasiChart() {
  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm">
      <CardContent className="space-y-8 pt-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Formasi</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={formasiData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {formasiData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  layout="horizontal"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
                <Tooltip
                  formatter={(value) => `${value}`}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    zIndex: 1000,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ zIndex: 0 }}
            >
              <div className="text-2xl font-bold">
                {formasiData.reduce((sum, item) => sum + item.value, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
