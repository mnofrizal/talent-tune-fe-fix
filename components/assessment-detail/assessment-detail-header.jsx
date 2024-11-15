"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAssessmentStore } from "@/stores/assessment-store";

export function AssessmentDetailHeader({ id }) {
  const { progress, status } = useAssessmentStore();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center justify-between"
      >
        <h1 className="text-3xl font-bold">Assessment Detail</h1>
        <Button disabled={progress < 100 || status === "Canceled"} asChild>
          <Link href={`/dashboard/rooms/${id}`}>
            {status === "Canceled" ? "Canceled" : "Go to Room"}
          </Link>
        </Button>
      </motion.div>
    </>
  );
}
