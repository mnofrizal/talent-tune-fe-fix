"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Eye, Video } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

// Mock data
const mockAssessments = [
  {
    id: 1,
    judul: "Leadership Assessment",
    metodePelaksanaan: "online",
    participants: [
      {
        userId: 1,
        user: {
          name: "John Doe",
          nip: "123456",
          jabatan: "Senior Manager",
        },
        status: "SCHEDULED",
        schedule: "2024-03-20T10:00:00Z",
      },
    ],
  },
  {
    id: 2,
    judul: "Technical Evaluation",
    metodePelaksanaan: "offline",
    participants: [
      {
        userId: 2,
        user: {
          name: "Jane Smith",
          nip: "789012",
          jabatan: "Team Lead",
        },
        status: "IN_PROGRESS",
        schedule: "2024-03-21T14:00:00Z",
      },
    ],
  },
  {
    id: 3,
    judul: "Management Skills",
    metodePelaksanaan: "online",
    participants: [
      {
        userId: 3,
        user: {
          name: "Bob Wilson",
          nip: "345678",
          jabatan: "Department Head",
        },
        status: "COMPLETED",
        schedule: "2024-03-19T09:00:00Z",
      },
    ],
  },
];

const StatusBadge = ({ status }) => {
  const statusStyles = {
    SCHEDULED: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

export function AssessmentTable({ search, status, currentPage, setCurrentPage }) {
  const filteredAssessments = mockAssessments.filter((assessment) => {
    const matchesSearch = search.toLowerCase() === "" || 
      assessment.judul?.toLowerCase().includes(search.toLowerCase()) ||
      assessment.participants?.some(
        (participant) =>
          participant.user.name?.toLowerCase().includes(search.toLowerCase()) ||
          participant.user.nip?.includes(search)
      );
    
    const matchesStatus = status === "All" || 
      assessment.participants?.some(
        (participant) => participant.status === status
      );
    
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
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>NIP</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Schedule</TableHead>
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
              filteredAssessments.map((assessment) =>
                assessment.participants.map((participant) => (
                  <TableRow key={`${assessment.id}-${participant.userId}`}>
                    <TableCell>{assessment.judul}</TableCell>
                    <TableCell>{participant.user.name}</TableCell>
                    <TableCell>{participant.user.nip}</TableCell>
                    <TableCell>{participant.user.jabatan}</TableCell>
                    <TableCell className="capitalize">
                      {assessment.metodePelaksanaan}
                    </TableCell>
                    <TableCell>
                      {format(new Date(participant.schedule), "PPP p")}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={participant.status} />
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          {assessment.metodePelaksanaan === "online" &&
                            participant.status !== "COMPLETED" &&
                            participant.status !== "CANCELLED" && (
                              <DropdownMenuItem>
                                <Video className="mr-2 h-4 w-4" />
                                <span>Join Meeting</span>
                              </DropdownMenuItem>
                            )}
                          {participant.status === "COMPLETED" && (
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
              )
            )}
          </TableBody>
        </Table>
      </motion.div>

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