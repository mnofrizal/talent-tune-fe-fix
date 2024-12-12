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

const StatusBadge = ({ status }) => {
  const statusStyles = {
    CREATED: "bg-yellow-100 text-yellow-800",
    SCHEDULED: "bg-yellow-100 text-yellow-800",
    RESCHEDULE: "bg-yellow-100 text-yellow-800",
    WAITING_CONFIRMATION: "bg-blue-100 text-blue-800",
    TALENT_REQUIREMENTS: "bg-blue-100 text-blue-800",
    READY_FOR_ASSESSMENT: "bg-green-100 text-green-800",
    EVALUATING: "bg-blue-100 text-blue-800",
    NEED_REVIEW: "bg-blue-100 text-blue-800",
    DONE: "bg-green-100 text-green-800",
    CANCELED: "bg-red-100 text-red-800",
  };

  const statusText = {
    SCHEDULED: "Scheduled",
    WAITING_CONFIRMATION: "Waiting Confirmation",
    TALENT_REQUIREMENTS: "Talent Requirements",
    READY_FOR_ASSESSMENT: "Ready",
    EVALUATING: "in Progress",
    NEED_REVIEW: "Needs Review",
    DONE: "Done",
    CANCELED: "Canceled",
    RESCHEDULE: "Rescheduled",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {statusText[status] ? statusText[status].toUpperCase() : ""}
    </span>
  );
};

// Status grouping configuration
const STATUS_GROUPS = {
  scheduled: ["READY_FOR_ASSESSMENT"],
  ongoing: ["EVALUATING", "NEED_REVIEW"],
  complete: ["DONE", "CANCELED"],
};

const AvatarGroup = ({ evaluators }) => {
  const displayLimit = 3;
  const displayedEvaluators = evaluators.slice(0, displayLimit);
  const remainingCount = evaluators.length - displayLimit;

  return (
    <div className="flex -space-x-2">
      <TooltipProvider>
        {displayedEvaluators.map((evaluator) => (
          <Tooltip key={evaluator.evaluator.id}>
            <TooltipTrigger asChild>
              <div className="relative">
                <Avatar className="h-6 w-6 border-2 border-background">
                  <AvatarImage src="" alt={evaluator.evaluator.name} />
                  <AvatarFallback>
                    {evaluator.evaluator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{evaluator.evaluator.name}</p>
              <p className="text-xs text-muted-foreground">
                {evaluator.evaluator.nip}
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
                <div key={evaluator.evaluator.id}>
                  <p>{evaluator.evaluator.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {evaluator.evaluator.nip}
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

export function RoomsGrid({ search, status, onStartRoom, assessments }) {
  const router = useRouter();

  const handleCancelRoom = (room) => {
    toast.success("Room cancelled successfully");
  };

  const handleStopRoom = (room) => {
    toast.success("Room stopped successfully");
  };

  const handleRoomAction = (room) => {
    const scheduledStatuses = ["READY_FOR_ASSESSMENT"];
    if (scheduledStatuses.includes(room.status)) {
      onStartRoom(room);
    } else {
      router.push(`/dashboard/rooms/`);
    }
  };

  const isCompletedStatus = (status) => {
    return STATUS_GROUPS.complete.includes(status);
  };

  const RoomCard = ({ room, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
    >
      <Card className="rounded-3xl transition-shadow hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <StatusBadge status={room.status} />
            {room.metodePelaksanaan === "ONLINE" ? (
              <span
                className={`flex items-center space-x-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800`}
              >
                <Video className="h-3 w-3" />
                <div>{room.metodePelaksanaan}</div>
              </span>
            ) : (
              <span
                className={`flex items-center space-x-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800`}
              >
                <MapPin className="h-3 w-3" />
                <div>{room.metodePelaksanaan}</div>
              </span>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!isCompletedStatus(room.status) && (
                <>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => handleCancelRoom(room)}
                  >
                    Cancel Room
                  </DropdownMenuItem>
                  {STATUS_GROUPS.ongoing.includes(room.status) && (
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
                {room.metodePelaksanaan === "ONLINE"
                  ? room.linkMeeting
                  : room.ruangan}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold text-slate-600">
                  {format(new Date(room.schedule), "d MMM, HH:mm")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AvatarGroup evaluators={room.evaluations} />
                <div className="mx-2 h-6 border-l border-gray-300" />
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border-2 border-background">
                    <AvatarImage src="" alt={room.participant.name} />
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
              {!isCompletedStatus(room.status) && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {STATUS_GROUPS.scheduled.includes(room.status) ? (
                    <Button size="sm" onClick={() => handleRoomAction(room)}>
                      Start Now
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => router.push(`/dashboard/rooms/${room.id}`)}
                    >
                      Join
                    </Button>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Filter assessments based on search and status
  const filteredRooms = assessments.filter((room) => {
    const matchesSearch =
      search.toLowerCase() === "" ||
      room.judul.toLowerCase().includes(search.toLowerCase()) ||
      room.participant.name.toLowerCase().includes(search.toLowerCase()) ||
      room.participant.nip.includes(search);

    const matchesStatus = status === "All" || room.status === status;

    return matchesSearch && matchesStatus;
  });

  // Group rooms by their statuses
  const groupedRooms = {
    scheduled: filteredRooms.filter((room) =>
      STATUS_GROUPS.scheduled.includes(room.status)
    ),
    ongoing: filteredRooms.filter((room) =>
      STATUS_GROUPS.ongoing.includes(room.status)
    ),
    complete: filteredRooms.filter((room) =>
      STATUS_GROUPS.complete.includes(room.status)
    ),
  };

  // Status group titles and their order
  const statusGroups = [
    { key: "scheduled", title: "Scheduled Assessments" },
    { key: "ongoing", title: "Ongoing Assessments" },
    { key: "complete", title: "Completed Assessments" },
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
                <RoomCard key={room.id} room={room} index={index} />
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
