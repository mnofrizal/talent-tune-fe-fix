"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

const upcomingAssessments = [
  {
    title: "Technical Assessment",
    candidate: "John Doe",
    role: "Frontend Developer",
    date: "Tomorrow",
  },
  {
    title: "Leadership Assessment",
    candidate: "Jane Smith",
    role: "Project Manager",
    date: "Next Week",
  },
];

export function UpcomingAssessments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAssessments.map((assessment) => (
            <div
              key={assessment.candidate}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{assessment.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {assessment.candidate} • {assessment.role}
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {assessment.date}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}