"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Video, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock data based on the provided schema
const mockRooms = [
  {
    id: "1",
    judul: "Leadership Assessment",
    materi: "Leadership Skills Evaluation",
    metodePelaksanaan: "online",
    linkOnline: "https://meet.google.com/abc-defg-hij",
    evaluators: [
      { id: 1, name: "Dr. John Smith", jabatan: "Senior Evaluator", avatar: "" },
      { id: 2, name: "Dr. Sarah Johnson", jabatan: "Lead Assessor", avatar: "" },
      { id: 3, name: "Dr. Michael Brown", jabatan: "Technical Evaluator", avatar: "" }
    ],
    participants: [
      {
        id: 1,
        name: "Alice Cooper",
        nip: "123456",
        jabatan: "Department Head",
        schedule: "2024-03-25T10:00:00Z",
        status: "SCHEDULED"
      }
    ]
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
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarImage src={evaluator.avatar} alt={evaluator.name} />
                  <AvatarFallback>
                    {evaluator.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{evaluator.name}</p>
              <p className="text-xs text-muted-foreground">{evaluator.jabatan}</p>
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
              {evaluators.slice(displayLimit).map(evaluator => (
                <div key={evaluator.id}>
                  <p>{evaluator.name}</p>
                  <p className="text-xs text-muted-foreground">{evaluator.jabatan}</p>
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <StatusBadge status={room.participant.status} />
          <div className="flex items-center gap-2">
            {room.metodePelaksanaan === "online" ? (
              <Video className="h-4 w-4 text-blue-500" />
            ) : (
              <MapPin className="h-4 w-4 text-green-500" />
            )}
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold tracking-tight">{room.judul}</h3>
              <p className="text-sm text-muted-foreground">
                {room.metodePelaksanaan === "online" ? room.linkOnline : room.ruangan}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{format(new Date(room.participant.schedule), "MMM d, HH:mm")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div className="text-right">
                  <p className="font-medium">{room.participant.name}</p>
                  <p className="text-xs text-muted-foreground">{room.participant.jabatan}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <AvatarGroup evaluators={room.evaluators} />
              {room.participant.status !== "COMPLETED" && room.participant.status !== "CANCELLED" && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRoomAction(room)}
                >
                  {room.participant.status === "SCHEDULED" ? "Start Now" : "Join"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Filter rooms based on search and status
  const filteredRooms = mockRooms.flatMap(room => 
    room.participants.map(participant => ({
      ...room,
      participant,
    }))
  ).filter(room => {
    const matchesSearch = search.toLowerCase() === "" || 
      room.judul.toLowerCase().includes(search.toLowerCase()) ||
      room.participant.name.toLowerCase().includes(search.toLowerCase()) ||
      room.participant.nip.includes(search);
    
    const matchesStatus = status === "All" || room.participant.status === status;
    
    return matchesSearch && matchesStatus;
  });

  // Group rooms by status
  const groupedRooms = {
    SCHEDULED: filteredRooms.filter(room => room.participant.status === "SCHEDULED"),
    IN_PROGRESS: filteredRooms.filter(room => room.participant.status === "IN_PROGRESS"),
    COMPLETED: filteredRooms.filter(room => room.participant.status === "COMPLETED"),
    CANCELLED: filteredRooms.filter(room => room.participant.status === "CANCELLED"),
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
      
      {Object.values(groupedRooms).every(group => group.length === 0) && (
        <div className="text-center text-muted-foreground py-8">
          No assessment rooms found
        </div>
      )}
    </div>
  );
}