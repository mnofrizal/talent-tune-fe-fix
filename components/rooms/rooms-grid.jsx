"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Video, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

// Mock data based on the provided schema
const mockRooms = [
  {
    id: "1",
    judul: "Generalis 2 Bidang Pemeliharaan",
    materi: "Leadership Skills Evaluation",
    metodePelaksanaan: "online",
    linkOnline: "https://meet.google.com/abc-defg-hij",
    evaluators: [
      {
        id: 1,
        name: "Dr. John Smith",
        jabatan: "Senior Evaluator",
        avatar: "",
      },
      {
        id: 2,
        name: "Dr. Sarah Johnson",
        jabatan: "Lead Assessor",
        avatar: "",
      },
      {
        id: 3,
        name: "Dr. Michael Brown",
        jabatan: "Technical Evaluator",
        avatar: "",
      },
    ],
    participants: [
      {
        id: 1,
        name: "Alice Cooper",
        nip: "123456",
        jabatan: "Officer Perencaan Unit Kerja",
        schedule: "2024-03-25T10:00:00Z",
        status: "SCHEDULED",
      },
    ],
  },
  {
    id: "2",
    judul: "Generalis 2 Bidang Pemeliharaan",
    materi: "Leadership Skills Evaluation",
    metodePelaksanaan: "online",
    linkOnline: "https://meet.google.com/abc-defg-hij",
    evaluators: [
      {
        id: 1,
        name: "Dr. John Smith",
        jabatan: "Senior Evaluator",
        avatar: "",
      },
      {
        id: 2,
        name: "Dr. Sarah Johnson",
        jabatan: "Lead Assessor",
        avatar: "",
      },
      {
        id: 3,
        name: "Dr. Michael Brown",
        jabatan: "Technical Evaluator",
        avatar: "",
      },
    ],
    participants: [
      {
        id: 1,
        name: "Alice Cooper",
        nip: "123456",
        jabatan: "Officer Perencaan Unit Kerja",
        schedule: "2024-03-25T10:00:00Z",
        status: "IN_PROGRESS",
      },
    ],
  },
  // ... rest of the mock data remains the same
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

const AvatarGroup = ({ evaluators }) => {
  const displayLimit = 3;
  const displayedEvaluators = evaluators.slice(0, displayLimit);
  const remainingCount = evaluators.length - displayLimit;

  return (
    <div className="flex -space-x-2">
      <TooltipProvider>
        {displayedEvaluators.map((evaluator) => (
          <Tooltip key={evaluator.id}>
            <TooltipTrigger asChild>
              <div className="relative">
                <Avatar className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={evaluator.avatar} alt={evaluator.name} />
                  <AvatarFallback>
                    {evaluator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{evaluator.name}</p>
              <p className="text-xs text-muted-foreground">
                {evaluator.jabatan}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                +{remainingCount}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              {evaluators.slice(displayLimit).map((evaluator) => (
                <div key={evaluator.id}>
                  <p>{evaluator.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {evaluator.jabatan}
                  </p>
                </div>
              ))}
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
};

export function RoomsGrid({ search, status, onStartRoom }) {
  const router = useRouter();

  const handleCancelRoom = (room) => {
    toast.success("Room cancelled successfully");
  };

  const handleStopRoom = (room) => {
    toast.success("Room stopped successfully");
  };

  const handleRoomAction = (room) => {
    if (room.participant.status === "SCHEDULED") {
      onStartRoom(room);
    } else {
      router.push(`/dashboard/rooms/${room.id}`);
    }
  };

  const RoomCard = ({ room, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }} // Add zoom effect on hover
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <Card className="rounded-3xl transition-shadow hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <StatusBadge status={room.participant.status} />
            {room.metodePelaksanaan === "online" ? (
              <span
                className={`flex items-center space-x-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800`}
              >
                <Video className="h-3 w-3" />
                <div>{room.metodePelaksanaan.toUpperCase()}</div>
              </span>
            ) : (
              <MapPin className="h-4 w-4 text-green-500" />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {room.participant.status !== "COMPLETED" && (
                <>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleCancelRoom(room)}
                  >
                    Cancel Room
                  </DropdownMenuItem>
                  {room.participant.status === "IN_PROGRESS" && (
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleStopRoom(room)}
                    >
                      Stop Room
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold tracking-tight text-slate-800">
                {room.judul}
              </h3>
              <p className="text-xs text-muted-foreground">
                {room.metodePelaksanaan === "online"
                  ? room.linkOnline
                  : room.ruangan}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-slate-600">
                  {format(new Date(room.participant.schedule), "d MMM, HH:mm")}
                </span>
              </div>
              {/* <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-medium">{room.participant.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {room.participant.jabatan}
                  </p>
                </div>
              </div> */}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AvatarGroup evaluators={room.evaluators} />
                <div className="mx-2 h-6 border-l border-gray-300" />
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border-2 border-background">
                    <AvatarImage
                      src={room.participant.avatar}
                      alt={room.participant.name}
                    />
                    <AvatarFallback>
                      {room.participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{room.participant.name}</p>
                </div>
              </div>
              {room.participant.status !== "COMPLETED" &&
                room.participant.status !== "CANCELLED" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="sm" onClick={() => handleRoomAction(room)}>
                      {room.participant.status === "SCHEDULED"
                        ? "Start Now"
                        : "Join"}
                    </Button>
                  </motion.div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Filter rooms based on search and status
  const filteredRooms = mockRooms
    .flatMap((room) =>
      room.participants.map((participant) => ({
        ...room,
        participant,
      }))
    )
    .filter((room) => {
      const matchesSearch =
        search.toLowerCase() === "" ||
        room.judul.toLowerCase().includes(search.toLowerCase()) ||
        room.participant.name.toLowerCase().includes(search.toLowerCase()) ||
        room.participant.nip.includes(search);

      const matchesStatus =
        status === "All" || room.participant.status === status;

      return matchesSearch && matchesStatus;
    });

  // Group rooms by status
  const groupedRooms = {
    SCHEDULED: filteredRooms.filter(
      (room) => room.participant.status === "SCHEDULED"
    ),
    IN_PROGRESS: filteredRooms.filter(
      (room) => room.participant.status === "IN_PROGRESS"
    ),
    COMPLETED: filteredRooms.filter(
      (room) => room.participant.status === "COMPLETED"
    ),
    CANCELLED: filteredRooms.filter(
      (room) => room.participant.status === "CANCELLED"
    ),
  };

  // Status group titles and their order
  const statusGroups = [
    { key: "SCHEDULED", title: "Scheduled Assessments" },
    { key: "IN_PROGRESS", title: "Ongoing Assessments" },
    { key: "COMPLETED", title: "Completed Assessments" },
    { key: "CANCELLED", title: "Cancelled Assessments" },
  ];

  return (
    <div className="space-y-8">
      {statusGroups.map(({ key, title }) => {
        const rooms = groupedRooms[key];
        if (rooms.length === 0) return null;

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rooms.map((room, index) => (
                <RoomCard
                  key={`${room.id}-${room.participant.id}`}
                  room={room}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        );
      })}

      {Object.values(groupedRooms).every((group) => group.length === 0) && (
        <div className="py-8 text-center text-muted-foreground">
          No assessment rooms found
        </div>
      )}
    </div>
  );
}
