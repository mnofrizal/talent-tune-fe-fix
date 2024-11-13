"use client";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { useAssessmentStore } from "@/stores/assessment-store";

export function AssessmentProgress() {
  const { progress } = useAssessmentStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-6"
    >
      <h2 className="mb-2 text-xl font-semibold">Completion Status</h2>
      <Progress value={progress} className="w-full" />
    </motion.div>
  );
}