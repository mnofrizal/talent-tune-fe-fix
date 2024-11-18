"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RequirementItem } from "./requirement-item";
import { AttendanceDialog } from "./attendance-dialog";
import { UploadDialog } from "./upload-dialog";
import { QuestionnaireDialog } from "./questionnaire-dialog";
import { API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/hooks/use-auth";

export function AssessmentRequirements({ assessment }) {
  const { session } = useAuth();
  const [openDialog, setOpenDialog] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [uploadedPPT, setUploadedPPT] = useState(assessment.presentationFile);
  const [confirmedAttendance, setConfirmedAttendance] = useState(
    assessment.attendanceConfirmation
  );
  const [questionnaireResponses, setQuestionnaireResponses] = useState(
    assessment.questionnaireResponses
  );
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(
    !!assessment.questionnaireResponses
  );

  // Function to update assessment on the server
  const updateAssessment = async (data) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.ASSESSMENTS.REQUIREMENT_SUBMIT(assessment.id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            presentationFile: data.presentationFile || "",
            attendanceConfirmation: data.attendanceConfirmation || false,
            questionnaireResponses: data.questionnaireResponses || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update assessment");
      }
    } catch (error) {
      console.error("Error updating assessment:", error);
    }
  };

  // Initialize completed tasks based on assessment data
  useEffect(() => {
    const initialCompletedTasks = [];

    if (assessment.attendanceConfirmation) {
      initialCompletedTasks.push("Attendance Confirmation");
    }

    if (assessment.presentationFile) {
      initialCompletedTasks.push("Upload PPT");
    }

    if (assessment.questionnaireResponses) {
      initialCompletedTasks.push("Questionnaire");
      setQuestionnaireResponses(assessment.questionnaireResponses);
    }

    setCompletedTasks(initialCompletedTasks);
  }, [assessment]);

  const requirements = [
    {
      title: "Attendance Confirmation",
      icon: "CheckCircle2",
      buttonText: "Confirm",
      dialogTitle: "Confirm Attendance",
      isCompleted: assessment.attendanceConfirmation || confirmedAttendance,
      isDisabled: false,
    },
    {
      title: "Questionnaire",
      icon: "ClipboardList",
      buttonText: "Start Questionnaire",
      dialogTitle: "Assessment Questionnaire",
      isCompleted: questionnaireResponses || questionnaireCompleted,
      isDisabled: !assessment.attendanceConfirmation && !confirmedAttendance,
    },
    {
      title: "Upload PPT",
      icon: "FileUp",
      buttonText: "Upload",
      dialogTitle: "Upload Presentation",
      isCompleted: assessment.presentationFile || uploadedPPT,
      presentationFile: assessment.presentationFile,
      isDisabled: !assessment.attendanceConfirmation && !confirmedAttendance,
    },
  ];

  const completeTask = (title) => {
    if (!completedTasks.includes(title)) {
      setCompletedTasks((prev) => [...prev, title]);
    }
  };

  const handleAttendanceSubmit = async (value) => {
    const isAttending = value === "Hadir";
    setConfirmedAttendance(value);

    // Update server with attendance confirmation
    await updateAssessment({
      attendanceConfirmation: isAttending,
      presentationFile: uploadedPPT || assessment.presentationFile || "",
      questionnaireResponses: questionnaireResponses,
    });

    if (value === "Tidak Hadir") {
      // If not attending, auto-complete all requirements
      setCompletedTasks(requirements.map((req) => req.title));
    } else {
      completeTask("Attendance Confirmation");
    }
    setOpenDialog(null);
  };

  const handlePPTUpload = async (file) => {
    setUploadedPPT(file.name);
    // Update server with PPT file
    await updateAssessment({
      presentationFile: file.name,
      attendanceConfirmation:
        confirmedAttendance === "Hadir" ||
        assessment.attendanceConfirmation ||
        false,
      questionnaireResponses: questionnaireResponses,
    });
    completeTask("Upload PPT");
    setOpenDialog(null);
  };

  const handleQuestionnaireComplete = async (responses) => {
    setQuestionnaireResponses(responses);
    setQuestionnaireCompleted(true);
    // Update server with questionnaire responses
    await updateAssessment({
      questionnaireResponses: responses,
      presentationFile: uploadedPPT || assessment.presentationFile || "",
      attendanceConfirmation:
        confirmedAttendance === "Hadir" ||
        assessment.attendanceConfirmation ||
        false,
    });
    completeTask("Questionnaire");
    setOpenDialog(null);
  };

  // Calculate progress based on completed requirements
  const calculateProgress = () => {
    if (confirmedAttendance === "Tidak Hadir") {
      return 100;
    }

    const completedCount = requirements.filter(
      (req) => req.isCompleted || completedTasks.includes(req.title)
    ).length;

    return (completedCount / requirements.length) * 100;
  };

  const progress = calculateProgress();

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
        <ul className="space-y-4">
          {requirements.map((req, index) => (
            <RequirementItem
              key={index}
              requirement={req}
              isCompleted={
                req.isCompleted || completedTasks.includes(req.title)
              }
              isDisabled={
                req.isDisabled || confirmedAttendance === "Tidak Hadir"
              }
              uploadedPPT={
                req.title === "Upload PPT"
                  ? uploadedPPT || req.presentationFile
                  : null
              }
              openDialog={() => setOpenDialog(req.title)}
              isAttendanceConfirmed={
                confirmedAttendance === "Hadir" ||
                assessment.attendanceConfirmation
              }
            />
          ))}
        </ul>
      </CardContent>

      <AttendanceDialog
        assessment={assessment}
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
        onComplete={handleQuestionnaireComplete}
        assessment={assessment}
      />
    </Card>
  );
}
