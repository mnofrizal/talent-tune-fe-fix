"use client";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  CheckCircle,
  Download,
  Eye,
  MapPin,
  RefreshCw,
  Send,
  Trash,
  Video,
  Wifi,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import AssessmentDetailsDialog from "./assessment-details-dialog";
import StatusBadge from "../status-badge";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export function AssessmentTable({
  assessments,
  search,
  status,
  dateRange,
  currentPage,
  setCurrentPage,
  onSendInvitation,
  onDelete,
  onResetStatus,
  onSetFinish,
}) {
  const { user } = useAuth();
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "schedule",
    direction: "desc",
  });
  const [pageSize, setPageSize] = useState(10);

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortValue = (assessment, key) => {
    switch (key) {
      case "id":
        return assessment.id;
      case "title":
        return assessment.judul?.toLowerCase() || "";
      case "participant":
        return assessment.participant?.name?.toLowerCase() || "";
      case "evaluator":
        return assessment.evaluations?.length || 0;
      case "method":
        return assessment.metodePelaksanaan || "";
      case "schedule":
        return new Date(assessment.schedule);
      case "status":
        return assessment.status || "";
      default:
        return "";
    }
  };

  const filteredAssessments = useMemo(() => {
    // First filter the assessments
    const filtered = assessments.filter((assessment) => {
      const matchesSearch =
        search.toLowerCase() === "" ||
        assessment.judul?.toLowerCase().includes(search.toLowerCase()) ||
        assessment.participant?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        assessment.participant?.nip?.includes(search);

      const matchesStatus = status === "All" || assessment.status === status;

      const assessmentDate = new Date(assessment.schedule);
      const matchesDateRange =
        !dateRange?.from ||
        (assessmentDate >= dateRange.from &&
          (!dateRange.to || assessmentDate <= dateRange.to));

      return matchesSearch && matchesStatus && matchesDateRange;
    });

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      const aValue = getSortValue(a, sortConfig.key);
      const bValue = getSortValue(b, sortConfig.key);

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    });
  }, [assessments, search, status, dateRange, sortConfig]);

  const SortableHeader = ({ column, children }) => (
    <TableHead
      onClick={() => handleSort(column)}
      className="cursor-pointer hover:bg-muted/50"
    >
      <div className="flex items-center gap-2">
        {children}
        {sortConfig.key === column && (
          <ArrowUpDown
            className={cn(
              "h-4 w-4 transition-transform",
              sortConfig.direction === "desc" ? "rotate-180" : ""
            )}
          />
        )}
      </div>
    </TableHead>
  );

  const paginatedAssessments = filteredAssessments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
            <TableRow>
              <SortableHeader column="id">No</SortableHeader>
              <SortableHeader column="title">Title</SortableHeader>
              <SortableHeader column="participant">Participant</SortableHeader>
              <SortableHeader column="evaluator">Evaluators</SortableHeader>
              <SortableHeader column="method">Method</SortableHeader>
              <SortableHeader column="schedule">Created At</SortableHeader>
              <SortableHeader column="status">Status</SortableHeader>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedAssessments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No assessments found
                </TableCell>
              </TableRow>
            ) : (
              paginatedAssessments.map((assessment) => (
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
                          <>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => onResetStatus(assessment.id)}
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              <span>Reset Status</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={() => onDelete(assessment.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-blue-700"
                              onClick={() => onSetFinish(assessment.id)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4 text-blue-700" />
                              <span>Finish</span>
                            </DropdownMenuItem>
                          </>
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

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Rows per page</p>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 30].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="text-sm">
            Page {currentPage} of{" "}
            {Math.ceil(filteredAssessments.length / pageSize)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredAssessments.length / pageSize)
                )
              )
            }
            disabled={
              currentPage === Math.ceil(filteredAssessments.length / pageSize)
            }
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
