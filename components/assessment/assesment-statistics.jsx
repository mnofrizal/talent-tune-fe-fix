import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart, Calendar, Clock, CheckCircle } from "lucide-react";

const AssessmentStastics = () => {
  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm dark:border-gray-800">
      <CardContent className="px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Total Assessments */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Total Assessments
              </p>
              <BarChart className="ml-2 h-4 w-4 text-purple-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-semibold">1,081</span>
              <span className="text-sm font-medium text-purple-500">All</span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-16" />

          {/* Scheduled Assessments */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Scheduled Assessments
              </p>
              <Calendar className="ml-2 h-4 w-4 text-blue-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-semibold">42</span>
              <span className="text-sm font-medium text-blue-500">
                Upcoming
              </span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-16" />

          {/* In Progress Assessments */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                In Progress Assessments
              </p>
              <Clock className="ml-2 h-4 w-4 text-yellow-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-semibold">18</span>
              <span className="text-sm font-medium text-yellow-500">
                Active
              </span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-16" />

          {/* Completed Assessments */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                Completed Assessments
              </p>
              <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-semibold">1,021</span>
              <span className="text-sm font-medium text-green-500">+5%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentStastics;
