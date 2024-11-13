"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Video } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Mock data for current user's assessments
const mockSchedule = [
  {
    id: "1",
    judul: "Leadership Assessment",
    materi: "Leadership Skills Evaluation",
    metodePelaksanaan: "online",
    linkOnline: "https://meet.google.com/abc-defg-hij",
    evaluators: [
      { id: 1, name: "Dr. John Smith", jabatan: "Senior Evaluator", avatar: "" },
      { id: 2, name: "Dr. Sarah Johnson", jabatan: "Lead Assessor", avatar: "" },
    ],
    schedule: "2024-03-25T10:00:00Z",
    status: "SCHEDULED",
    requirementStatus: "INCOMPLETE",
  },
  {
    id: "2",
    judul: "Technical Assessment",
    materi: "Technical Skills Evaluation",
    metodePelaksanaan: "offline",
    ruangan: "Room A-101",
    evaluators: [
      { id: 3, name: "Dr. Emily White", jabatan: "Technical Lead", avatar: "" },
      { id: 4, name: "Dr. David Lee", jabatan: "Senior Assessor", avatar: "" },
    ],
    schedule: "2024-03-24T14:00:00Z",
    status: "IN_PROGRESS",
    requirementStatus: "COMPLETE",
  },
  // Add more mock data for different statuses
  {
    id: "3",
    judul: "Past Assessment",
    materi: "Past Evaluation",
    metodePelaksanaan: "online",
    linkOnline: "https://zoom.us/past",
    evaluators: [
      { id: 5, name: "Dr. Past One", jabatan: "Evaluator", avatar: "" },
      { id: 6, name: "Dr. Past Two", jabatan: "Assessor", avatar: "" },
    ],
    schedule: "2024-02-24T14:00:00Z",
    status: "COMPLETED",
    requirementStatus: "COMPLETE",
  },
  {
    id: "4",
    judul: "Cancelled Assessment",
    materi: "Cancelled Evaluation",
    metodePelaksanaan: "offline",
    ruangan: "Room X-101",
    evaluators: [
      { id: 7, name: "Dr. Cancel One", jabatan: "Evaluator", avatar: "" },
      { id: 8, name: "Dr. Cancel Two", jabatan: "Assessor", avatar: "" },
    ],
    schedule: "2024-03-30T14:00:00Z",
    status: "CANCELLED",
    requirementStatus: "INCOMPLETE",
  },
];

const AvatarGroup = ({ evaluators }) => {
  return (
    <div className="flex -space-x-2">
      <TooltipProvider>
        {evaluators.map((evaluator) => (
          <Tooltip key={evaluator.id}>
            <TooltipTrigger asChild>
              <div className="relative">
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={evaluator.avatar} alt={evaluator.name} />
                  <AvatarFallback>
                    {evaluator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{evaluator.name}</p>
              <p className="text-xs text-muted-foreground">{evaluator.jabatan}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

const RequirementStatus = ({ status }) => {
  return (
    <span
      className={`text-sm ${
        status === "COMPLETE" 
          ? "text-green-600" 
          : "text-red-600"
      }`}
    >
      {status === "COMPLETE" ? "Ready to Assessment" : "Lengkapi Persyaratan"}
    </span>
  );
};

const ScheduleCard = ({ assessment }) => (
  <Link href={`/dashboard/schedule/${assessment.id}`}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="cursor-pointer"
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {assessment.metodePelaksanaan === "online" ? (
                <Video className="h-4 w-4 text-blue-500" />
              ) : (
                <MapPin className="h-4 w-4 text-green-500" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold tracking-tight">{assessment.judul}</h3>
              <p className="text-sm text-muted-foreground">
                {assessment.metodePelaksanaan === "online" ? assessment.linkOnline : assessment.ruangan}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-4xl font-bold text-primary">
                {format(new Date(assessment.schedule), "d MMM")}
              </div>
              <div className="text-xl">
                {format(new Date(assessment.schedule), "HH:mm")}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <AvatarGroup evaluators={assessment.evaluators} />
              <RequirementStatus status={assessment.requirementStatus} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </Link>
);

export function ScheduleGrid({ search }) {
  const filteredSchedule = mockSchedule.filter(assessment => 
    search.toLowerCase() === "" || 
    assessment.judul.toLowerCase().includes(search.toLowerCase())
  );

  const now = new Date();
  const upcoming = filteredSchedule.filter(a => 
    new Date(a.schedule) > now && a.status !== "CANCELLED"
  );
  const pending = filteredSchedule.filter(a => 
    a.requirementStatus === "INCOMPLETE" && a.status !== "CANCELLED"
  );
  const past = filteredSchedule.filter(a => 
    new Date(a.schedule) < now && a.status === "COMPLETED"
  );
  const cancelled = filteredSchedule.filter(a => 
    a.status === "CANCELLED"
  );

  return (
    <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((assessment) => (
            <ScheduleCard key={assessment.id} assessment={assessment} />
          ))}
          {upcoming.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No upcoming assessments
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="pending" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pending.map((assessment) => (
            <ScheduleCard key={assessment.id} assessment={assessment} />
          ))}
          {pending.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No pending assessments
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="past" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {past.map((assessment) => (
            <ScheduleCard key={assessment.id} assessment={assessment} />
          ))}
          {past.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No past assessments
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="cancelled" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cancelled.map((assessment) => (
            <ScheduleCard key={assessment.id} assessment={assessment} />
          ))}
          {cancelled.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No cancelled assessments
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}