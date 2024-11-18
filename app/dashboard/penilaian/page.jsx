"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PenilaianHeader } from "@/components/penilaian/penilaian-header";
import { PenilaianFilters } from "@/components/penilaian/penilaian-filters";
import { PenilaianGrid } from "@/components/penilaian/penilaian-grid";
import { API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/hooks/use-auth";

export default function PenilaianPage() {
  const { session } = useAuth(); // Accessing session from useAuth
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [assessments, setAssessments] = useState([]);

  console.log(assessments);

  const fetchAssessments = async () => {
    try {
      let url =
        session?.user.systemRole === "ADMINISTRATOR"
          ? API_ENDPOINTS.ASSESSMENTS.LIST
          : API_ENDPOINTS.ASSESSMENTS.LIST_BY_EVALUATOR(session.user.id);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Using session.accessToken
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch assessments");
      }
      const result = await response.json();

      if (result.success) {
        setAssessments(result.data);
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
        assessments={assessments}
      />
    </motion.div>
  );
}
