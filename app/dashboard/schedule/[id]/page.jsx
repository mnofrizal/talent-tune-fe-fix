"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { AssessmentDetailHeader } from "@/components/assessment-detail/assessment-detail-header";
import { AssessmentProgress } from "@/components/assessment-detail/assessment-progress";
import { AssessmentInfo } from "@/components/assessment-detail/assessment-info";
import { AssessmentRequirements } from "@/components/assessment-detail/assessment-requirements";

export default function AssessmentDetailPage() {
  const params = useParams();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto p-6"
    >
      <AssessmentDetailHeader id={params.id} />
      <AssessmentProgress />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <AssessmentInfo />
        </div>
        <div className="space-y-6">
          <AssessmentRequirements />
        </div>
      </div>
    </motion.div>
  );
}