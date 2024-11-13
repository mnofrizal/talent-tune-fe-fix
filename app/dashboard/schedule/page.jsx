"use client";
import { ScheduleHeader } from "@/components/schedule/schedule-header";
import { ScheduleFilters } from "@/components/schedule/schedule-filters";
import { ScheduleGrid } from "@/components/schedule/schedule-grid";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SchedulePage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <ScheduleHeader />
      <ScheduleFilters 
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <ScheduleGrid 
        search={search}
        status={status}
      />
    </motion.div>
  );
}