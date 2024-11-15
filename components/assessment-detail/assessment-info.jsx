"use client";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, BookOpen, Calendar, Clock, MapPin } from "lucide-react";
import { useAssessmentStore } from "@/stores/assessment-store";
import { Separator } from "../ui/separator";

export function AssessmentInfo() {
  const { assessment, status } = useAssessmentStore();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-gray-100 shadow-sm">
          {/* Patient Info Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 bg-purple-500">
                  <AvatarFallback className="text-lg">CS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Patient name
                  </div>
                  <div className="text-lg font-semibold">
                    Christopher Smallwood
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">Status</div>
                {/* Replaced Select component with Badges */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="">
                    Hadir
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <CardHeader className="pb-4">
            <div className="mb-2 flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Fit and Proper Test
              </CardTitle>
              <Badge
                variant={status === "Canceled" ? "destructive" : "default"}
                className="text-sm font-medium"
              >
                {status}
              </Badge>
            </div>
            <CardDescription className="text-base">
              Information about your upcoming assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="flex items-center space-x-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Date
                  </div>
                  <div className="text-base">
                    {new Date(assessment?.schedule).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Time
                  </div>
                  <div className="text-base">
                    {assessment?.startTime} - {assessment?.endTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Location
                  </div>
                  <div className="text-base">
                    {assessment?.metodePelaksanaan === "offline"
                      ? assessment?.ruangan
                      : assessment?.linkOnline}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BookOpen className="mt-0.5 h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Materi
                  </div>
                  <div className="text-base">{assessment?.materi}</div>
                </div>
              </div>
            </div>
          </CardContent>

          <Separator className="my-2" />

          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold">Evaluators</CardTitle>
            <CardDescription>Meet your assessment team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {assessment?.evaluators.map((evaluator, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-lg border bg-muted/50 p-3"
                >
                  <Avatar>
                    <AvatarImage src={evaluator.avatar} alt={evaluator.name} />
                    <AvatarFallback>
                      {evaluator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{evaluator.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {evaluator.jabatan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
