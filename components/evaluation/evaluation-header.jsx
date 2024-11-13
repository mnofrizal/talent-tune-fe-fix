"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export function EvaluationHeader({ id }) {
  return (
    <>
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <Link href="/dashboard/penilaian" className="hover:text-foreground">
          Penilaian
        </Link>
        <span className="mx-2">/</span>
        <span>Evaluation</span>
      </div>

      <div className="flex items-center justify-between">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight"
        >
          Evaluation Form
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Evaluation
          </Button>
        </motion.div>
      </div>
    </>
  );
}