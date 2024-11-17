import {
  Circle,
  CheckCircle2,
  X,
  FileIcon,
  Download,
  ClipboardList,
  FileUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
export function RequirementItem({
  requirement,
  isCompleted,
  isDisabled,
  uploadedPPT,
  openDialog,
  isAttendanceConfirmed,
}) {
  return (
    <li className="flex items-start gap-4 rounded-lg px-2 py-4 hover:bg-blue-100/35">
      <div
        className={`mt-1 rounded-full border-2 p-1 ${
          isDisabled && requirement.title !== "Attendance Confirmation"
            ? "border-red-500 bg-red-500"
            : isCompleted
            ? "border-green-500 bg-green-500"
            : "border-gray-300"
        }`}
      >
        {isDisabled && requirement.title !== "Attendance Confirmation" ? (
          <X className="h-4 w-4 text-white" />
        ) : isCompleted ? (
          <CheckCircle2 className="h-4 w-4 text-white" />
        ) : (
          <Circle className="h-4 w-4 text-gray-300" />
        )}
      </div>
      <div className="flex-1">
        <h3
          className={`text-lg font-medium ${
            isDisabled && requirement.title !== "Attendance Confirmation"
              ? "text-red-600 line-through"
              : isCompleted && requirement.title === "Attendance Confirmation"
              ? "line-through text-green-600"
              : isCompleted
              ? "line-through text-muted-foreground"
              : ""
          }`}
        >
          {requirement.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {requirement.title === "Attendance Confirmation" &&
            "Confirm your presence for the assessment."}
          {requirement.title === "Questionnaire" &&
            "Complete the pre-assessment questionnaire."}
          {requirement.title === "Upload PPT" &&
            "Upload your presentation slides for review."}
        </p>
        <div className="mt-3">
          {requirement.title === "Upload PPT" &&
            (isCompleted || uploadedPPT) && (
              <div className="mb-2 flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileIcon className="h-4 w-4" />
                  <span>{uploadedPPT}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto"
                  onClick={openDialog}
                  disabled={isDisabled}
                >
                  Change
                </Button>
              </div>
            )}
          <Button
            variant={isCompleted ? "outline" : "outline"}
            className="gap-2 border-primary text-primary hover:bg-primary/5 hover:text-primary"
            disabled={
              isDisabled ||
              (requirement.title === "Attendance Confirmation" &&
                isAttendanceConfirmed)
            }
            onClick={openDialog}
          >
            {requirement.title === "Questionnaire" && isCompleted ? (
              <>
                <Download className="h-4 w-4" />
                Download PDF
              </>
            ) : requirement.title === "Upload PPT" &&
              (isCompleted || uploadedPPT) ? (
              <>
                <Download className="h-4 w-4" />
                Download
              </>
            ) : (
              <>
                {requirement.icon === "CheckCircle2" && (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {requirement.icon === "ClipboardList" && (
                  <ClipboardList className="h-4 w-4" />
                )}
                {requirement.icon === "FileUp" && (
                  <FileUp className="h-4 w-4" />
                )}
                {requirement.buttonText}
              </>
            )}
          </Button>
        </div>
      </div>
    </li>
  );
}
