"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { PenilaianHeader } from "@/components/penilaian/penilaian-header";
import { PenilaianFilters } from "@/components/penilaian/penilaian-filters";
import { PenilaianGrid } from "@/components/penilaian/penilaian-grid";

export default function PenilaianPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <PenilaianHeader />
      <PenilaianFilters 
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <PenilaianGrid 
        search={search}
        status={status}
      />
    </motion.div>
  );
}