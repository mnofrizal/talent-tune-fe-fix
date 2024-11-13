"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, ClipboardList, Users } from "lucide-react";
import { motion } from "framer-motion";

const statusCards = [
  {
    title: "Pending",
    count: 12,
    subtitle: "Assessments awaiting review",
    icon: <ClipboardList className="h-5 w-5 text-amber-600" />,
    bgColor: "bg-amber-50",
  },
  {
    title: "Ongoing",
    count: 8,
    subtitle: "Active assessments",
    icon: <Users className="h-5 w-5 text-blue-600" />,
    bgColor: "bg-blue-50",
  },
  {
    title: "Completed",
    count: 24,
    subtitle: "Total completed assessments",
    icon: <BarChart2 className="h-5 w-5 text-green-600" />,
    bgColor: "bg-green-50",
  },
];

export function StatusCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid gap-4 md:grid-cols-3"
    >
      {statusCards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-semibold">
              {card.title}
            </CardTitle>
            <div className={`rounded-full p-3 ${card.bgColor}`}>
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{card.count}</div>
            <p className="text-sm text-muted-foreground">{card.subtitle}</p>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}