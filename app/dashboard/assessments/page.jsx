"use client";
import { AssessmentHeader } from "@/components/assessment/assessment-header";
import { AssessmentFilters } from "@/components/assessment/assessment-filters";
import { AssessmentTable } from "@/components/assessment/assessment-table";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AssessmentPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <AssessmentHeader />
      <AssessmentFilters 
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <AssessmentTable 
        search={search}
        status={status}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </motion.div>
  );
}