"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Mock data for assessments to be evaluated
const mockAssessments = [
  {
    id: "1",
    participant: {
      name: "John Doe",
      position: "Software Engineer",
      avatar: "",
    },
    assessment: {
      title: "Leadership Assessment",
      date: "2024-03-25T10:00:00Z",
      type: "Technical Evaluation",
    },
    status: "PENDING",
    score: null,
  },
  {
    id: "2",
    participant: {
      name: "Jane Smith",
      position: "Project Manager",
      avatar: "",
    },
    assessment: {
      title: "Management Skills",
      date: "2024-03-24T14:00:00Z",
      type: "Management Evaluation",
    },
    status: "IN_PROGRESS",
    score: 75,
  },
  {
    id: "3",
    participant: {
      name: "Bob Wilson",
      position: "Team Lead",
      avatar: "",
    },
    assessment: {
      title: "Technical Skills",
      date: "2024-03-23T09:00:00Z",
      type: "Technical Evaluation",
    },
    status: "COMPLETED",
    score: 92,
  },
];

const StatusBadge = ({ status }) => {
  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
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
    transition={{ duration: 0.5 }}
  >
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={assessment.participant.avatar} />
              <AvatarFallback>
                {assessment.participant.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{assessment.participant.name}</h3>
              <p className="text-sm text-muted-foreground">
                {assessment.participant.position}
              </p>
            </div>
          </div>
          <StatusBadge status={assessment.status} />
        </div>

        <div className="mt-4 space-y-2">
          <div>
            <h4 className="text-sm font-medium">Assessment</h4>
            <p className="text-sm text-muted-foreground">
              {assessment.assessment.title}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Date</h4>
            <p className="text-sm text-muted-foreground">
              {format(new Date(assessment.assessment.date), "PPP p")}
            </p>
          </div>
          {assessment.score !== null && (
            <div>
              <h4 className="text-sm font-medium">Score</h4>
              <p className="text-sm font-semibold text-primary">
                {assessment.score}/100
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
              {assessment.status === "COMPLETED" ? "View Evaluation" : "Evaluate"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export function PenilaianGrid({ search, status }) {
  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = search.toLowerCase() === "" || 
      assessment.participant.name.toLowerCase().includes(search.toLowerCase()) ||
      assessment.assessment.title.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = status === "All" || assessment.status === status;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredAssessments.map((assessment) => (
        <AssessmentCard key={assessment.id} assessment={assessment} />
      ))}
      {filteredAssessments.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground py-8">
          No assessments found
        </div>
      )}
    </div>
  );
}