"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function PenilaianHeader() {
  return (
    <>
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span>Penilaian</span>
      </div>

      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold tracking-tight"
      >
        Assessment Evaluation
      </motion.h1>
    </>
  );
}