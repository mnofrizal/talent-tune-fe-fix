"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import Link from "next/link";

const upcomingVacancies = [
  {
    title: "Senior Software Engineer",
    department: "IT Department",
    location: "Jakarta",
    type: "Internal",
   deadline: "2024-04-25",
  },
  {
    title: "Project Manager",
    department: "PMO",
    location: "Surabaya",
    type: "Internal",
    deadline: "2024-04-20",
  },
  {
    title: "Business Analyst",
    department: "Business Development",
    location: "Bandung",
    type: "Internal",
    deadline: "2024-04-25",
  },
];

export function JobVacancyCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Upcoming Job Vacancy</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link href="#">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingVacancies.map((vacancy, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{vacancy.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{vacancy.department}</span>
                    
                  
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline">{vacancy.type}</Badge>
                <span className="text-xs text-muted-foreground">
                  Deadline: {new Date(vacancy.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}