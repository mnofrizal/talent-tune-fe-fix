"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { year: 2021, assessments: 76 },
  { year: 2022, assessments: 87 },
  { year: 2023, assessments: 87 },
  { year: 2024, assessments: 77 },
  { year: 2025, assessments: 0 },
];

export default function AssessmentHistoryChart() {
  return (
    <Card className="w-full rounded-2xl border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Assessment History (5 Years)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
              cursor={{ fill: "#f4f6fa", radius: [8, 8, 0, 0] }}
            />
            <Bar
              dataKey="assessments"
              fill="#102c8e"
              name="Total Assessments"
              barSize={60}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

