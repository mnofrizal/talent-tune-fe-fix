"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { AssessmentDetailHeader } from "@/components/assessment-detail/assessment-detail-header";
import { AssessmentProgress } from "@/components/assessment-detail/assessment-progress";
import { AssessmentInfo } from "@/components/assessment-detail/assessment-info";
import { AssessmentRequirements } from "@/components/assessment-detail/assessment-requirements";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";

export default function AssessmentDetailPage() {
  const params = useParams();
  const { session } = useAuth(); // Accessing session from useAuth
  const [assessment, setAssessment] = useState([]);
  console.log({ assessment });

  const fetchAssessment = async () => {
    try {
      const response = await fetch(
        API_ENDPOINTS.ASSESSMENTS.DETAIL(params.id),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`, // Using session.accessToken
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();

      if (result.success) {
        setAssessment(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchAssessment();
    }
  }, [session]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto"
    >
      <AssessmentDetailHeader id={params.id} />
      {/* <AssessmentProgress /> */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AssessmentInfo assessment={assessment} />
        </div>
        <div className="space-y-6">
          <AssessmentRequirements assessment={assessment} />
        </div>
      </div>
    </motion.div>
  );
}
