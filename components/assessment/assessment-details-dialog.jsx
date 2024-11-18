"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Plus,
  CheckCircle2,
  Circle,
  Download,
  Trash2,
  File,
  XCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert } from "@/components/ui/alert";
import StatusBadge from "../status-badge";

const statusOrder = [
  "SCHEDULED",
  "WAITING_CONFIRMATION",
  "TALENT_REQUIREMENTS",
  "READY_FOR_ASSESSMENT",
  "EVALUATING",
  "DONE",
];

const getTimelineSteps = (status) => {
  const steps = [
    {
      status: "SCHEDULED",
      label: "Assessment Created",
      icon: Circle,
      iconColor: "text-gray-400",
    },
    {
      status: "WAITING_CONFIRMATION",
      label: "Kirim Undangan",
      icon: Circle,
      iconColor: "text-gray-400",
    },
    {
      status: "TALENT_REQUIREMENTS",
      label: "Konfirmasi Kehadiran",
      icon: Circle,
      iconColor: "text-gray-400",
    },
    {
      status: "READY_FOR_ASSESSMENT",
      label: "Persyaratan Talent",
      icon: Circle,
      iconColor: "text-gray-400",
    },
    {
      status: "EVALUATING",
      label: "Fit and Proper test",
      icon: Circle,
      iconColor: "text-gray-400",
    },
    {
      status: "DONE",
      label: "Penilaian Evaluator",
      icon: Circle,
      iconColor: "text-gray-400",
    },
    {
      status: "DONE",
      label: "Assessment Selesai",
      icon: Circle,
      iconColor: "text-gray-400",
    },
  ];

  // Determine the current status index
  const currentStatusIndex = statusOrder.indexOf(status);

  // Mark previous steps as completed with gray CheckCircle2
  for (let i = 0; i < currentStatusIndex; i++) {
    steps[i].icon = CheckCircle2;
    steps[i].iconColor = "text-blue-600";
  }

  // Mark the next step after current status with gray CheckCircle2
  if (currentStatusIndex !== -1 && currentStatusIndex + 1 < steps.length) {
    steps[currentStatusIndex + 1].icon = CheckCircle2;
    steps[currentStatusIndex + 1].iconColor = "text-gray-500";
  }

  // Mark the current step with active Circle
  if (currentStatusIndex !== -1) {
    steps[currentStatusIndex].icon = CheckCircle2;
    steps[currentStatusIndex].iconColor = "text-blue-600";
  }

  // Special handling for RESCHEDULE
  if (status === "RESCHEDULE") {
    steps.forEach((step, index) => {
      if (index === 0) {
        step.icon = CheckCircle2;
        step.iconColor = "text-blue-600";
      } else {
        step.icon = Circle;
        step.iconColor = "text-gray-400";
      }
    });
  }

  // Special handling for CANCELED
  if (status === "CANCELED") {
    steps.forEach((step, index) => {
      if (index < steps.length - 1) {
        step.icon = CheckCircle2;
        step.iconColor = "text-gray-500";
      } else {
        step.icon = XCircle;
        step.iconColor = "text-red-400";
      }
    });
  }

  return steps;
};

export default function AssessmentDetailsDialog({
  open,
  onOpenChange,
  assessment,
}) {
  if (!assessment) return null;

  const timelineSteps = getTimelineSteps(assessment.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 sm:max-w-[800px]">
        <Card className="w-full border-0 shadow-none">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{assessment.judul}</h1>
              <div className="flex items-center space-x-2">
                {/* <Alert
                  variant={
                    assessment.attendanceConfirmation
                      ? "success"
                      : "destructive"
                  }
                  className="p-2 text-center text-sm"
                >
                  {assessment.attendanceConfirmation ? "HADIR" : "TIDAK HADIR"}
                </Alert> */}
                <StatusBadge
                  status={assessment.status}
                  className={"rounded-lg p-2 px-3 text-sm"}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">ASSIGNED TO</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {assessment.participant?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        {assessment.participant?.name}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">JABATAN</div>
                    <div className="text-sm">
                      {assessment.participant?.jabatan}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">GRADE</div>
                    <div className="flex items-center gap-2 text-sm">
                      {assessment.participant?.grade || "N/A"}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="h-auto w-full justify-between rounded-none border-b bg-transparent p-0">
                    <TabsTrigger
                      value="history"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Order History
                    </TabsTrigger>
                    <TabsTrigger
                      value="evaluators"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Evaluator
                    </TabsTrigger>
                    <TabsTrigger
                      value="penilaian"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Penilaian
                    </TabsTrigger>
                    <TabsTrigger
                      value="documents"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Dokumen
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="history" className="pt-4">
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h1 className="text-xl font-bold">
                            {assessment.proyeksi}
                          </h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Judul</div>
                            <div className="text-sm font-medium">
                              {assessment.judul}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">
                              Schedule
                            </div>
                            <div className="text-sm font-medium">
                              {new Date(assessment.schedule).toLocaleString()}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Metode</div>
                            <div className="text-sm font-medium">
                              {assessment.metodePelaksanaan}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Lokasi</div>
                            <div className="text-sm font-medium">
                              {assessment.metodePelaksanaan === "online" ? (
                                <a
                                  href={assessment.linkMeeting}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  {assessment.linkMeeting}
                                </a>
                              ) : assessment.metodePelaksanaan === "offline" ? (
                                <div>{assessment.ruangan}</div>
                              ) : (
                                <>
                                  <div>{assessment.ruangan}</div>
                                  <a
                                    href={assessment.linkMeeting}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    {assessment.linkMeeting}
                                  </a>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="evaluators" className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {assessment.evaluations?.map((evaluation, index) => (
                          <Card
                            key={evaluation.evaluatorId}
                            className="w-full transition-colors hover:bg-gray-50"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback>
                                    {evaluation.evaluator?.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                  <div className="text-sm font-medium">
                                    {evaluation.evaluator?.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {evaluation.evaluator?.jabatan}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="penilaian">Penilaian content</TabsContent>
                  <TabsContent value="documents" className="pt-2">
                    <div className="space-y-6">
                      <Card className="w-full">
                        <CardContent className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-3">
                            <File className="h-5 w-5 text-orange-600" />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">
                                No documents available
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              <div className="border-gray-2 col-span-2 border-l pl-6">
                <div className="space-y-4">
                  <div className="text-sm font-medium">Timeline</div>
                  <div className="space-y-5">
                    {timelineSteps.map((step, index) => (
                      <div key={index} className="flex gap-3">
                        <step.icon className={`h-5 w-5 ${step.iconColor}`} />
                        <div className="space-y-1">
                          <div className="text-sm font-medium">
                            {step.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
