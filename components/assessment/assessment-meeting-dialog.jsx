"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ChevronDown,
  Plus,
  Calendar,
  X,
  CheckCircle2,
  Circle,
  Download,
  MoreHorizontal,
  Trash2,
  FileSpreadsheet,
  File,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert } from "../ui/alert";

export default function ModernAssessmentMeetingDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Card ID</Button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-[800px]">
        <Card className="w-full border-0 shadow-none">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">
                Making a NFT Landing Page
              </h1>
              <div className="flex items-center space-x-2">
                <Alert
                  variant="destructive"
                  className="p-2 text-center text-sm"
                >
                  Talent Tidak Hadir
                </Alert>
                <Button
                  variant="outline"
                  className="border-0 bg-green-50 text-green-600 hover:bg-green-50 hover:text-green-600"
                >
                  In Progress
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">ASSIGNED TO</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>RF</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">Muhammad Naufal Amrizal</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">JABATAN</div>
                    <div className="text-sm">OFFICER FASILITAS DAN SARANA</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-500">GRADE</div>
                    <div className="flex items-center gap-2 text-sm">
                      GENERALIS 2 / 11
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
                            Generalis 2 Bidang Operasi
                          </h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Judul</div>
                            <div className="text-sm font-medium">
                              Generalis 2 Bidang Operasi
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">
                              Schedule
                            </div>
                            <div className="text-sm font-medium">
                              14 Jan 2023, 15:43:23
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Materi</div>
                            <div className="text-sm font-medium">
                              Peran bidang untuk mencapai kinerja unti yang baik
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-sm text-gray-500">Lokasi</div>
                            <div className="text-sm font-medium">
                              Offline - Ruang IHT
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="evaluators" className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Card className="w-full transition-colors hover:bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src="" alt="Evaluator 1" />
                                <AvatarFallback>E1</AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="text-sm font-medium">
                                  Evaluator Name 1
                                </div>
                                <div className="text-xs text-gray-500">
                                  Jabatan 1
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="w-full transition-colors hover:bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src="" alt="Evaluator 2" />
                                <AvatarFallback>E2</AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="text-sm font-medium">
                                  Evaluator Name 2
                                </div>
                                <div className="text-xs text-gray-500">
                                  Jabatan 2
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="w-full transition-colors hover:bg-gray-50">
                          <CardContent className="p-4">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src="" alt="Evaluator 3" />
                                <AvatarFallback>E3</AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="text-sm font-medium">
                                  Evaluator Name 3
                                </div>
                                <div className="text-xs text-gray-500">
                                  Jabatan 3
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="penilaian">
                    Courier information content
                  </TabsContent>
                  <TabsContent value="documents" className="pt-2">
                    <div className="space-y-6">
                      <Card className="w-full">
                        <CardContent className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-3">
                            <File className="h-5 w-5 text-orange-600" />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">
                                peran-msdm.pptx
                              </span>
                              <span className="text-xs text-gray-500">
                                14 MB
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-gray-900"
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-gray-900"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
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
                    <div className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Assesment dibuat
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Undangan terkirim
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Konfirmasi Kehadiran
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="h-5 w-5 text-gray-400" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Persyaratan Talent
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Circle className="h-5 w-5 text-gray-400" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Fit and Proper test
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Circle className="h-5 w-5 text-gray-400" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Penilaian Evaluator
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Circle className="h-5 w-5 text-gray-400" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          Assesment Selesai
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
