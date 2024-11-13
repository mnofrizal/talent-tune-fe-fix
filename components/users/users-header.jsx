"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export function UsersHeader({ isDialogOpen, setIsDialogOpen }) {
  return (
    <div className="flex items-center justify-between">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold tracking-tight"
      >
        Users Management
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </motion.div>
    </div>
  );
}