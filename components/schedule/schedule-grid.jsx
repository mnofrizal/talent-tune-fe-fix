"use client";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon, CheckIcon, MapPin, Video } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const AvatarGroup = ({ evaluations }) => {
  return (
    <div className="flex -space-x-2">
      <TooltipProvider>
        {evaluations.map((evaluation) => (
          <Tooltip key={evaluation.id}>
            <TooltipTrigger asChild>
              <div className="relative">
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage
                    src={`/avatars/${evaluation.evaluator.nip}.jpg`}
                    alt={evaluation.evaluator.name}
                  />
                  <AvatarFallback>
                    {evaluation.evaluator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{evaluation.evaluator.name}</p>
              <p className="text-xs text-muted-foreground">
                {evaluation.evaluator.jabatan || "Evaluator"}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

const RequirementStatus = ({ assessment }) => {
  const isComplete =
    assessment?.presentationFile !== null &&
    assessment?.attendanceConfirmation === true &&
    assessment?.questionnaireResponses !== null;

  return (
    <span
      className={`flex items-center px-2 py-1 text-xs font-medium rounded-full ${
        isComplete ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
      }`}
    >
      {isComplete ? (
        <>
          <CheckIcon className="mr-1 h-4 w-4" />
          Ready to Assessment
        </>
      ) : (
        <>
          <AlertCircleIcon className="mr-1 h-4 w-4" />
          Lengkapi Persyaratan
        </>
      )}
    </span>
  );
};

const ScheduleCard = ({ assessment }) => {
  return (
    <Link href={`/dashboard/schedule/${assessment.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="cursor-pointer"
      >
        <Card className="rounded-3xl transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between">
                  <span
                    className={`flex items-center space-x-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800`}
                  >
                    {assessment.metodePelaksanaan.toLowerCase() === "online" ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <MapPin className="h-3 w-3" />
                    )}
                    <div>{assessment.metodePelaksanaan}</div>
                  </span>
                </div>
                <RequirementStatus assessment={assessment} />
              </div>

              <div>
                <h3 className="border-b pb-2 font-semibold text-slate-700">
                  {assessment.judul.toUpperCase()}
                </h3>
              </div>

              {assessment.schedule && (
                <div className="flex gap-2">
                  <div className="text-4xl font-bold text-primary">
                    {format(new Date(assessment.schedule), "d MMM")}
                  </div>
                  <div className="text-4xl text-slate-500">
                    / {format(new Date(assessment.schedule), "HH:mm")}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <AvatarGroup evaluations={assessment.evaluations} />
                  <div className="text-sm">
                    <p className="font-medium">{assessment.participant.name}</p>
                    <p className="text-muted-foreground">
                      {assessment.participant.jabatan}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {assessment.metodePelaksanaan.toLowerCase() === "online"
                    ? assessment.linkMeeting
                    : assessment.ruangan}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export function ScheduleGrid({ assessments = [], search }) {
  const filteredAssessments = assessments.filter(
    (assessment) =>
      search.toLowerCase() === "" ||
      assessment.judul.toLowerCase().includes(search.toLowerCase())
  );

  const upcoming = filteredAssessments.filter(
    (assessment) => assessment.status === "CREATED"
  );

  const past = filteredAssessments.filter(
    (assessment) => assessment.status === "COMPLETED"
  );

  const cancelled = filteredAssessments.filter(
    (assessment) => assessment.status === "CANCELLED"
  );

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>

      <TabsContent value="upcoming" className="mt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((assessment) => (
            <ScheduleCard key={assessment.id} assessment={assessment} />
          ))}
          {upcoming.length === 0 && (
            <div className="col-span-full py-8 text-center text-muted-foreground">
              No upcoming assessments
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
            <div className="col-span-full py-8 text-center text-muted-foreground">
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
            <div className="col-span-full py-8 text-center text-muted-foreground">
              No cancelled assessments
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
