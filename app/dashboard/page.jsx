"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { API_ENDPOINTS } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChartIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from "lucide-react";
import RecentAssessmentsTable from "./components/RecentAssessmentsTable";
import AssessmentHistoryChart from "./components/AssessmentHistoryChart";
import FormasiChart from "./components/FormasiChart";
import UpcomingAssessments from "./components/UpcomingAssessments";
import UpcomingJobVacancies from "./components/UpcomingJobVacancies";

export default function DashboardPage() {
  const { user, session } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!session?.accessToken) return;

      try {
        const response = await fetch(API_ENDPOINTS.ASSESSMENTS.LIST, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setAssessments(data.data);
        } else {
          setError(data.message || "Failed to fetch assessments");
        }
      } catch (error) {
        setError("Error fetching assessments");
        console.error("Error fetching assessments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [session?.accessToken]);

  const scheduledAssessments = useMemo(
    () => assessments.filter((a) => a.status === "SCHEDULED"),
    [assessments]
  );
  const inProgressAssessments = useMemo(
    () => assessments.filter((a) => a.status === "IN_PROGRESS"),
    [assessments]
  );
  const completedAssessments = useMemo(
    () => assessments.filter((a) => a.status === "COMPLETED"),
    [assessments]
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4 flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-medium tracking-tight">
              Welcome back, {user?.name}
            </h1>
            <p className="text-lg text-muted-foreground">
              Here's an overview of your assessment activities
            </p>
          </div>
          <Link href="/dashboard/assessments">
            <Button
              size="lg"
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Go to Assessments
            </Button>
          </Link>
        </div>

        <Card className="col-span-4 rounded-3xl">
          <CardContent className="flex space-x-6 pt-6">
            <MetricCard
              title="Total Assessments"
              value={
                loading ? <Skeleton className="h-8 w-12" /> : assessments.length
              }
              icon={<BarChartIcon className="h-4 w-4 text-purple-500" />}
              label="All"
              labelColor="text-purple-500"
            />
            <MetricCard
              title="Scheduled Assessments"
              value={
                loading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  scheduledAssessments.length
                )
              }
              icon={<CalendarIcon className="h-4 w-4 text-blue-500" />}
              label="Upcoming"
              labelColor="text-blue-500"
            />
            <MetricCard
              title="In Progress Assessments"
              value={
                loading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  inProgressAssessments.length
                )
              }
              icon={<ClockIcon className="h-4 w-4 text-yellow-500" />}
              label="Active"
              labelColor="text-yellow-500"
            />
            <MetricCard
              title="Completed Assessments"
              value={
                loading ? (
                  <Skeleton className="h-8 w-12" />
                ) : (
                  completedAssessments.length
                )
              }
              icon={<CheckCircleIcon className="h-4 w-4 text-green-500" />}
              label="+5%"
              labelColor="text-green-500"
            />
          </CardContent>
        </Card>

        <div className="col-span-3 space-y-6">
          <AssessmentHistoryChart />
          <RecentAssessmentsTable
            assessments={assessments.slice(0, 3)}
            loading={loading}
          />
        </div>

        <div className="col-span-1 space-y-6">
          <FormasiChart />
          <UpcomingAssessments
            assessments={scheduledAssessments.slice(0, 2)}
            loading={loading}
          />
          <UpcomingJobVacancies />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, label, labelColor }) {
  return (
    <Card className="flex-1 rounded-2xl shadow-none">
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {icon}
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-semibold">{value}</span>
            <span className={`text-sm font-medium ${labelColor}`}>{label}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
