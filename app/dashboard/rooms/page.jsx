"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { RoomsHeader } from "@/components/rooms/rooms-header";
import { RoomsFilters } from "@/components/rooms/rooms-filters";
import { RoomsGrid } from "@/components/rooms/rooms-grid";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

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
      className="space-y-6 p-6"
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
      />

      <AlertDialog open={startDialogOpen} onOpenChange={setStartDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start Assessment Room</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p>Are you sure you want to start this assessment room? This action cannot be undone.</p>
                {selectedRoom && (
                  <div className="mt-2 space-y-1">
                    <p><span className="font-medium">Room:</span> {selectedRoom.judul}</p>
                    <p><span className="font-medium">Participant:</span> {selectedRoom.participant.name}</p>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmStart}>Start Room</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}