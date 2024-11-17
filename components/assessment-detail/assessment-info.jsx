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
import { BookOpen, Calendar, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AssessmentInfo({ assessment }) {
  if (!assessment) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="border-gray-100 shadow-sm">
        {/* Participant Info Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-purple-500">
                <AvatarImage
                  src={`/avatars/${assessment?.participant?.nip}.jpg`}
                  alt={assessment?.participant?.name}
                />
                <AvatarFallback className="text-lg">
                  {assessment?.participant?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm text-muted-foreground">
                  Participant name
                </div>
                <div className="text-lg font-semibold">
                  {assessment?.participant?.name}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge variant="outline">{assessment?.status}</Badge>
            </div>
          </div>
        </div>

        <Separator />

        <CardHeader className="pb-4">
          <div className="mb-2 flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              {assessment?.judul}
            </CardTitle>
            <Badge
              variant={assessment?.status === "CREATED" ? "default" : "outline"}
              className="text-sm font-medium"
            >
              {assessment?.status}
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
                  {assessment?.schedule
                    ? new Date(assessment?.schedule).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Not scheduled"}
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
                  {assessment?.metodePelaksanaan?.toLowerCase() === "online"
                    ? assessment?.linkMeeting
                    : assessment?.ruangan || "No location set"}
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <BookOpen className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Materi
                </div>
                <div className="text-base">
                  {assessment?.materi || "No material set"}
                </div>
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
            {assessment?.evaluations?.length > 0 ? (
              assessment?.evaluations?.map((evaluation) => (
                <div
                  key={evaluation.id}
                  className="flex items-center space-x-4 rounded-lg border bg-muted/50 p-3"
                >
                  <Avatar>
                    <AvatarImage
                      src={`/avatars/${evaluation?.evaluator?.nip}.jpg`}
                      alt={evaluation.evaluator.name}
                    />
                    <AvatarFallback>
                      {evaluation.evaluator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {evaluation.evaluator.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {evaluation.evaluator.jabatan || "Evaluator"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                No evaluators assigned
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AssessmentInfo;
