"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELED: "bg-red-100 text-red-800",
  };

  return (
    <Badge
      className={`${statusStyles[status]} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`}
    >
      {status}
    </Badge>
  );
};

const AssessmentCard = ({ assessment }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}
    whileHover={{ scale: 1.02 }}
  >
    <Card className="rounded-2xl transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {assessment.participant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{assessment.participant.name}</h3>
              <p className="text-sm text-muted-foreground">
                {assessment.participant.jabatan} -{" "}
                {assessment.participant.bidang}
              </p>
            </div>
          </div>
          <StatusBadge status={assessment.status} />
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <h4 className="text-sm font-medium">Assessment</h4>
            <p className="text-sm text-muted-foreground">{assessment.judul}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Date</h4>
            <p className="text-sm text-muted-foreground">
              {format(new Date(assessment.schedule), "PPP p")}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Method</h4>
            <p className="text-sm text-muted-foreground">
              {assessment.metodePelaksanaan}{" "}
              {assessment.ruangan && `- ${assessment.ruangan}`}
            </p>
          </div>
          {assessment.evaluations && assessment.evaluations[0]?.scores && (
            <div>
              <h4 className="text-sm font-medium">Score</h4>
              <p className="text-sm font-semibold text-primary">
                {assessment.evaluations[0].scores}/100
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Button
            className="w-full"
            variant={assessment.status === "COMPLETED" ? "outline" : "default"}
            asChild
          >
            <Link href={`/dashboard/penilaian/${assessment.id}`}>
              {assessment.status === "COMPLETED"
                ? "View Evaluation"
                : "Evaluate"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function PenilaianGrid({ search, status, assessments }) {
  const filteredAssessments = assessments.filter((item) => {
    const matchesSearch =
      search.toLowerCase() === "" ||
      item.participant.name.toLowerCase().includes(search.toLowerCase()) ||
      item.judul.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = item.status === "EVALUATING";

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredAssessments.map((item) => (
        <AssessmentCard key={item.id} assessment={item} />
      ))}
      {filteredAssessments.length === 0 && (
        <div className="col-span-full py-8 text-center text-muted-foreground">
          No assessments found
        </div>
      )}
    </div>
  );
}
