"use client";
import { ScheduleHeader } from "@/components/schedule/schedule-header";
import { ScheduleFilters } from "@/components/schedule/schedule-filters";
import { ScheduleGrid } from "@/components/schedule/schedule-grid";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/hooks/use-auth";

export default function SchedulePage() {
  const { session } = useAuth(); // Accessing session from useAuth
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [assessments, setAssessments] = useState([]);
  console.log({ assessments });

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
      className="space-y-6"
    >
      <ScheduleHeader />
      <ScheduleFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />
      <ScheduleGrid search={search} status={status} assessments={assessments} />
    </motion.div>
  );
}
