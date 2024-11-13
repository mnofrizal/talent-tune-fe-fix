"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useAssessmentStore } from "@/stores/assessment-store";

export function AssessmentInfo() {
  const { assessment, status } = useAssessmentStore();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Assessment Details</CardTitle>
            <CardDescription>Information about your upcoming assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>Date: {new Date(assessment?.schedule).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Time: {assessment?.startTime} - {assessment?.endTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>
                Location: {assessment?.metodePelaksanaan === "offline" 
                  ? assessment?.ruangan 
                  : assessment?.linkOnline}
              </span>
            </div>
            <Badge variant={status === "Canceled" ? "destructive" : "default"}>
              Status: {status}
            </Badge>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Evaluators</CardTitle>
            <CardDescription>Meet your assessment team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assessment?.evaluators.map((evaluator, index) => (
                <div key={index} className="flex items-center space-x-4 rounded-lg border p-2">
                  <Avatar>
                    <AvatarImage src={evaluator.avatar} />
                    <AvatarFallback>{evaluator.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{evaluator.name}</p>
                    <p className="text-sm text-muted-foreground">{evaluator.jabatan}</p>
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