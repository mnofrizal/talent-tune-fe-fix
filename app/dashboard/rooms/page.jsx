"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RoomsHeader } from "@/components/rooms/rooms-header";
import { RoomsFilters } from "@/components/rooms/rooms-filters";
import { RoomsGrid } from "@/components/rooms/rooms-grid";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/use-auth";
import { API_ENDPOINTS } from "@/config/api";

export default function RoomsPage() {
  const { session } = useAuth(); // Accessing session from useAuth
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [assessments, setAssessments] = useState([]);

  const fetchAssessments = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ASSESSMENTS.LIST, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Using session.accessToken
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();

      if (result.success) {
        setAssessments(result.data);
        console.log(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAssessments();
    }
  }, [session]);

  const handleStartRoom = (room) => {
    setSelectedRoom(room);
    setStartDialogOpen(true);
  };

  const handleConfirmStart = () => {
    // Handle room start logic here
    setStartDialogOpen(false);
    setSelectedRoom(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <RoomsHeader />
      <RoomsFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <RoomsGrid
        search={search}
        status={status}
        onStartRoom={handleStartRoom}
        assessments={assessments}
      />

      <AlertDialog open={startDialogOpen} onOpenChange={setStartDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start Assessment Room</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p>
                  Are you sure you want to start this assessment room? This
                  action cannot be undone.
                </p>
                {selectedRoom && (
                  <div className="mt-2 space-y-1">
                    <p>
                      <span className="font-medium">Room:</span>{" "}
                      {selectedRoom.judul}
                    </p>
                    <p>
                      <span className="font-medium">Participant:</span>{" "}
                      {selectedRoom.participant.name}
                    </p>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmStart}>
              Start Room
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
