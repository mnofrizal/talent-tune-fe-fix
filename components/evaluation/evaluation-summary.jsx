"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CircularProgress } from "@/components/ui/circular-progress";

// Mock data - replace with actual data fetching
const mockAssessment = {
  participant: {
    name: "John Doe",
    position: "Software Engineer",
    avatar: "",
    projectedPosition: "Senior Software Engineer",
    education: "S1 Teknik Informatika",
    nip: "198501012010011001",
  },
  assessment: {
    title: "Leadership Assessment",
    date: "2024-03-25T10:00:00Z",
    type: "Technical Evaluation",
    status: "IN_PROGRESS",
  },
  scores: {
    overall: 75,
    categories: [
      { name: "Pemahaman Unit", score: 80 },
      { name: "Pemahaman Bidang Kerja", score: 70 },
      { name: "Sikap/Attitude", score: 85 },
      { name: "Keterampilan Komunikasi", score: 75 },
    ],
  },
};

export function EvaluationSummary({ id }) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Informasi Peserta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mockAssessment.participant.avatar} />
                <AvatarFallback>
                  {mockAssessment.participant.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{mockAssessment.participant.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {mockAssessment.participant.position}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <Label className="text-sm font-medium">NIP</Label>
                <p className="text-sm">{mockAssessment.participant.nip}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Pendidikan</Label>
                <p className="text-sm">{mockAssessment.participant.education}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Proyeksi Jabatan</Label>
                <p className="text-sm">{mockAssessment.participant.projectedPosition}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Assessment</Label>
                <p className="text-sm">{mockAssessment.assessment.title}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <Badge variant="outline" className="mt-1">
                  {mockAssessment.assessment.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Progress Penilaian</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <CircularProgress value={mockAssessment.scores.overall} />
            
            <div className="w-full space-y-4">
              {mockAssessment.scores.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{category.name}</span>
                    <span className="font-medium">{category.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${category.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}