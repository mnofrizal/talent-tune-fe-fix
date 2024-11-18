"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, Eye, MapPin, Send, Trash, Video, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import AssessmentDetailsDialog from "./assessment-details-dialog";
import StatusBadge from "../status-badge";
import { useAuth } from "@/hooks/use-auth";

export function AssessmentTable({
  assessments,
  search,
  status,
  currentPage,
  setCurrentPage,
  onSendInvitation,
  onDelete,
}) {
  const { user } = useAuth();
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      search.toLowerCase() === "" ||
      assessment.judul?.toLowerCase().includes(search.toLowerCase()) ||
      assessment.participant?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      assessment.participant?.nip?.includes(search);

    const matchesStatus = status === "All" || assessment.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-md border"
      >
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead>No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead>Evaluators</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssessments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No assessments found
                </TableCell>
              </TableRow>
            ) : (
              filteredAssessments.map((assessment, index) => (
                <TableRow key={assessment.id}>
                  <TableCell>
                    #{String(assessment.id).padStart(4, "0")}
                  </TableCell>
                  <TableCell
                    onClick={() => setSelectedAssessment(assessment)}
                    className="cursor-pointer hover:underline"
                  >
                    <div className="">
                      <div className="font-medium text-slate-800">
                        {assessment.judul}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {assessment.proyeksi}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {assessment.participant?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {assessment.participant?.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {assessment.participant?.jabatan}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center -space-x-2">
                      {assessment.evaluations?.map((evaluation) => (
                        <Avatar
                          key={evaluation.evaluatorId}
                          className="h-8 w-8 border-2 border-white"
                        >
                          <AvatarFallback>
                            {evaluation.evaluator?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="px-3 py-1">
                      {assessment.metodePelaksanaan === "OFFLINE" ? (
                        <MapPin className="mr-1 h-4 w-4" />
                      ) : (
                        <Wifi className="mr-1 h-4 w-4" />
                      )}
                      {assessment.metodePelaksanaan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      {new Date(assessment.schedule).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(assessment.schedule).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={assessment.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => onSendInvitation(assessment.id)}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          <span>Send Invitation</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setSelectedAssessment(assessment)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Details</span>
                        </DropdownMenuItem>
                        {user?.systemRole === "ADMINISTRATOR" && (
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600"
                            onClick={() => onDelete(assessment.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        )}
                        {assessment.metodePelaksanaan === "ONLINE" &&
                          assessment.status !== "DONE" &&
                          assessment.status !== "CANCELED" && (
                            <DropdownMenuItem>
                              <Video className="mr-2 h-4 w-4" />
                              <span>Join Meeting</span>
                            </DropdownMenuItem>
                          )}
                        {assessment.status === "DONE" && (
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            <span>Download Report</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {selectedAssessment && (
        <AssessmentDetailsDialog
          open={!!selectedAssessment}
          onOpenChange={() => setSelectedAssessment(null)}
          assessment={selectedAssessment}
        />
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="text-sm">
          Page {currentPage} of {Math.ceil(filteredAssessments.length / 10)}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredAssessments.length / 10))
            )
          }
          disabled={currentPage === Math.ceil(filteredAssessments.length / 10)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
