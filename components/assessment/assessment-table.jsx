"use client";
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
import { Download, Eye, MapPin, Send, Video, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

// Mock data
const mockAssessments = [
  {
    id: 1,
    judul: "Generalis 2 Bidang Operasi",
    proyeksi: "generalis_2",
    metodePelaksanaan: "online",
    participants: [
      {
        userId: 1,
        user: {
          name: "Muhammad Naufal Amrizal",
          nip: "961733371I",
          jabatan: "Officer Fasilitas dan Sarana",
          avatarUrl: "/path/to/avatar1.jpg",
        },
        status: "SCHEDULED",
        schedule: "2024-03-20T10:00:00Z",
      },
    ],
  },
  {
    id: 2,
    judul: "Generalis 3 Bidang Pemeliharaan",
    proyeksi: "generalis_3",
    metodePelaksanaan: "offline",
    participants: [
      {
        userId: 2,
        user: {
          name: "Amrizal Muhammad",
          nip: "961733371I",
          jabatan: "Officer Pengadaan Barang dan Jasa",
          avatarUrl: "/path/to/avatar2.jpg",
        },
        status: "IN_PROGRESS",
        schedule: "2024-03-21T14:00:00Z",
      },
    ],
  },
  {
    id: 3,
    judul: "Generalis 2 Bidang SDM",
    proyeksi: "generalis_2",
    metodePelaksanaan: "online",
    participants: [
      {
        userId: 3,
        user: {
          name: "Bob Wilson",
          nip: "961733371I",
          jabatan: "Junior Officer Pengadaan Barang dan Jasa",
          avatarUrl: "/path/to/avatar3.jpg",
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

export function AssessmentTable({
  search,
  status,
  currentPage,
  setCurrentPage,
}) {
  const filteredAssessments = mockAssessments.filter((assessment) => {
    const matchesSearch =
      search.toLowerCase() === "" ||
      assessment.judul?.toLowerCase().includes(search.toLowerCase()) ||
      assessment.participants?.some(
        (participant) =>
          participant.user.name?.toLowerCase().includes(search.toLowerCase()) ||
          participant.user.nip?.includes(search)
      );

    const matchesStatus =
      status === "All" ||
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
            <TableRow className="">
              <TableHead>No</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Evauators</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssessments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No assessments found
                </TableCell>
              </TableRow>
            ) : (
              filteredAssessments.map((assessment, index) =>
                assessment.participants.map((participant) => (
                  <>
                    <TableRow key={`${assessment.id}-${participant.userId}`}>
                      <TableCell>#03EG0{index + 1}</TableCell>
                      <TableCell>
                        <div className="">
                          <div className="font-medium text-slate-800">
                            {assessment.judul}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {assessment.proyeksi === "generalis_2"
                              ? "Generalis 2"
                              : "Generalis 3"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={participant.user.avatarUrl} />
                            <AvatarFallback>
                              {participant.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {participant.user.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {participant.user.jabatan}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center -space-x-2">
                          <Avatar className="h-8 w-8 border-2 border-white">
                            <AvatarImage src="/avatars/user1.png" />
                            <AvatarFallback>U1</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-8 w-8 border-2 border-white">
                            <AvatarImage src="/avatars/user2.png" />
                            <AvatarFallback>U2</AvatarFallback>
                          </Avatar>
                          <Avatar className="h-8 w-8 border-2 border-white">
                            <AvatarImage src="/avatars/user3.png" />
                            <AvatarFallback>U3</AvatarFallback>
                          </Avatar>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="px-3 py-1">
                          {assessment.metodePelaksanaan === "offline" ? (
                            <MapPin className="mr-1 h-4 w-4" />
                          ) : (
                            <Wifi className="mr-1 h-4 w-4" />
                          )}
                          {assessment.metodePelaksanaan.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          {format(
                            new Date(participant.schedule),
                            "dd MMMM yyyy"
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(participant.schedule), "HH:mm")}
                        </div>
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
                              <Send className="mr-2 h-4 w-4" />
                              <span>Send Invitation</span>
                            </DropdownMenuItem>
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
                  </>
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
