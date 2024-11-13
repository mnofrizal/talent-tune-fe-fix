"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { EvaluationHeader } from "@/components/evaluation/evaluation-header";
import { EvaluationForm } from "@/components/evaluation/evaluation-form";
import { EvaluationSummary } from "@/components/evaluation/evaluation-summary";

export default function PenilaianDetailPage() {
  const { id } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6"
    >
      <EvaluationHeader id={id} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <EvaluationForm id={id} />
        </div>
        <div>
          <EvaluationSummary id={id} />
        </div>
      </div>
    </motion.div>
  );
}