"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { NewAssessmentForm } from "./new-assessment-form";
import ModernAssessmentMeetingDialog from "./assessment-meeting-dialog";

export function AssessmentHeader({ onAssessmentCreated }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Assessments
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <NewAssessmentForm onAssessmentCreated={onAssessmentCreated} />
          <ModernAssessmentMeetingDialog />
        </motion.div>
      </div>
    </>
  );
}
