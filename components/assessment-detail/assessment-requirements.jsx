"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequirementItem } from "./requirement-item";
import { AttendanceDialog } from "./attendance-dialog";
import { UploadDialog } from "./upload-dialog";
import { QuestionnaireDialog } from "./questionnaire-dialog";

export function AssessmentRequirements() {
  const [openDialog, setOpenDialog] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uploadedPPT, setUploadedPPT] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [confirmedAttendance, setConfirmedAttendance] = useState(null);
  const [isAttendanceConfirmed, setIsAttendanceConfirmed] = useState(false);

  const requirements = [
    {
      title: "Attendance Confirmation",
      icon: "CheckCircle2",
      buttonText: "Confirm",
      dialogTitle: "Confirm Attendance",
    },
    {
      title: "Questionnaire",
      icon: "ClipboardList",
      buttonText: "Start Questionnaire",
      dialogTitle: "Assessment Questionnaire",
    },
    {
      title: "Upload PPT",
      icon: "FileUp",
      buttonText: "Upload",
      dialogTitle: "Upload Presentation",
    },
  ];

  const completeTask = (title) => {
    setCompletedTasks((prev) => [...prev, title]);
  };

  const handleAttendanceSubmit = (value) => {
    setConfirmedAttendance(value);
    setIsAttendanceConfirmed(true);
    if (value === "Tidak Hadir") {
      setCompletedTasks(requirements.map((req) => req.title));
    } else {
      completeTask("Attendance Confirmation");
    }
    setOpenDialog(null);
  };

  const handlePPTUpload = (file) => {
    setUploadedPPT(file.name);
    completeTask("Upload PPT");
    setOpenDialog(null);
  };

  const progress =
    confirmedAttendance === "Tidak Hadir"
      ? 100
      : (completedTasks.length / requirements.length) * 100;

  return (
    <Card className="border-gray-100 shadow-sm">
      <CardHeader className="border-b pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-semibold">Requirements</CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-primary">
              {progress.toFixed(0)}%
            </span>
            <Progress value={progress} className="h-2 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ul>
          {requirements.map((req, index) => (
            <RequirementItem
              key={index}
              requirement={req}
              isCompleted={completedTasks.includes(req.title)}
              isDisabled={confirmedAttendance === "Tidak Hadir"}
              uploadedPPT={uploadedPPT}
              openDialog={() => setOpenDialog(req.title)}
              isAttendanceConfirmed={isAttendanceConfirmed}
            />
          ))}
        </ul>
      </CardContent>
      <AttendanceDialog
        open={openDialog === "Attendance Confirmation"}
        onOpenChange={(isOpen) =>
          setOpenDialog(isOpen ? "Attendance Confirmation" : null)
        }
        onSubmit={handleAttendanceSubmit}
      />
      <UploadDialog
        open={openDialog === "Upload PPT"}
        onOpenChange={(isOpen) => setOpenDialog(isOpen ? "Upload PPT" : null)}
        onUpload={handlePPTUpload}
        uploadedPPT={uploadedPPT}
      />
      <QuestionnaireDialog
        open={openDialog === "Questionnaire"}
        onOpenChange={(isOpen) =>
          setOpenDialog(isOpen ? "Questionnaire" : null)
        }
        onComplete={() => {
          completeTask("Questionnaire");
          setOpenDialog(null);
        }}
      />
    </Card>
  );
}
