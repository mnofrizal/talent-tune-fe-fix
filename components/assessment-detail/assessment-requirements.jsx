"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useAssessmentStore } from "@/stores/assessment-store";
import { CircularProgress } from "@/components/ui/circular-progress";
import { QuestionnaireDialog } from "@/components/questionnaire/questionnaire-dialog";

export function AssessmentRequirements() {
  const { 
    progress,
    status,
    attendanceConfirmed,
    attendanceType: storeAttendanceType,
    questionnaireCompleted,
    pptUploaded,
    confirmAttendance,
    submitQuestionnaire,
    uploadPPT 
  } = useAssessmentStore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [localAttendanceType, setLocalAttendanceType] = useState("");
  const [attendanceReason, setAttendanceReason] = useState("");
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);

  const handleAttendanceConfirmation = (e) => {
    e.preventDefault();
    confirmAttendance(localAttendanceType, attendanceReason);
  };

  const handlePPTUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      uploadPPT(selectedFile);
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-6">
          <CircularProgress value={progress} />
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className={`${attendanceConfirmed ? "outline outline-1 outline-green-300" : "outline outline-1 outline-red-300"}`}>
          <CardHeader>
            <CardTitle>Attendance Confirmation</CardTitle>
            <CardDescription>Confirm your attendance for the assessment</CardDescription>
          </CardHeader>
          <CardContent>
            {attendanceConfirmed ? (
              <Badge variant="outline">
                {storeAttendanceType === "hadir" ? "Will Attend" : "Will Not Attend"}
              </Badge>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Confirm Attendance</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Attendance</DialogTitle>
                    <DialogDescription>
                      Please confirm your attendance for the assessment session
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAttendanceConfirmation}>
                    <RadioGroup
                      value={localAttendanceType}
                      onValueChange={setLocalAttendanceType}
                      className="grid gap-4"
                    >
                      <Label
                        htmlFor="hadir"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem
                          value="hadir"
                          id="hadir"
                          className="sr-only"
                        />
                        <span className="text-lg font-semibold">Will Attend</span>
                      </Label>
                      <Label
                        htmlFor="tidak-hadir"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem
                          value="tidak-hadir"
                          id="tidak-hadir"
                          className="sr-only"
                        />
                        <span className="text-lg font-semibold">Cannot Attend</span>
                      </Label>
                    </RadioGroup>
                    {localAttendanceType === "tidak-hadir" && (
                      <div className="mt-4">
                        <Label htmlFor="attendance-reason">
                          Reason for not attending:
                        </Label>
                        <Textarea
                          id="attendance-reason"
                          value={attendanceReason}
                          onChange={(e) => setAttendanceReason(e.target.value)}
                          required
                        />
                      </div>
                    )}
                    <DialogFooter className="mt-4">
                      <Button type="submit">Confirm</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card
          className={`${
            questionnaireCompleted
              ? "outline outline-1 outline-green-200"
              : "outline outline-1 outline-red-200"
          }`}
        >
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <CardDescription>Required questions before assessment</CardDescription>
          </CardHeader>
          <CardContent>
            {questionnaireCompleted ? (
              <Badge variant="outline">Completed</Badge>
            ) : attendanceConfirmed && storeAttendanceType === "tidak-hadir" ? (
              <Badge variant="secondary">Disabled</Badge>
            ) : (
              <QuestionnaireDialog 
                open={questionnaireOpen}
                onOpenChange={setQuestionnaireOpen}
                onSubmit={submitQuestionnaire}
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card
          className={`${
            pptUploaded
              ? "outline outline-1 outline-green-200"
              : "outline outline-1 outline-red-200"
          }`}
        >
          <CardHeader>
            <CardTitle>Upload PPT</CardTitle>
            <CardDescription>Your presentation file upload status</CardDescription>
          </CardHeader>
          <CardContent>
            {pptUploaded ? (
              <div className="space-y-2">
                <Badge variant="outline">
                  {selectedFile?.name || "File uploaded"}
                </Badge>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Change</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Change PPT</DialogTitle>
                        <DialogDescription>
                          Select a new PPT or PPTX file to upload.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePPTUpload}>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="ppt-file">PPT File</Label>
                            <Input
                              id="ppt-file"
                              type="file"
                              accept=".ppt,.pptx"
                              onChange={(e) =>
                                setSelectedFile(
                                  e.target.files ? e.target.files[0] : null
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Upload</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  {selectedFile && (
                    <Button variant="outline">
                      <a
                        href={URL.createObjectURL(selectedFile)}
                        download={selectedFile.name}
                      >
                        Download
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ) : attendanceConfirmed && storeAttendanceType === "tidak-hadir" ? (
              <Badge variant="secondary">Disabled</Badge>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Upload PPT</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Upload PPT</DialogTitle>
                    <DialogDescription>
                      Select a PPT or PPTX file to upload.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePPTUpload}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="ppt-file">PPT File</Label>
                        <Input
                          id="ppt-file"
                          type="file"
                          accept=".ppt,.pptx"
                          onChange={(e) =>
                            setSelectedFile(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Upload</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}