"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function DashboardActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex gap-4"
    >
      <Link href="/dashboard/assessments">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Go To Assessment
        </Button>
      </Link>
      <Button variant="outline">View Reports</Button>
    </motion.div>
  );
}