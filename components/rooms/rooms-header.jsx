"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function RoomsHeader() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold tracking-tight"
      >
        Assessment Rooms
      </motion.h1>
    </>
  );
}
