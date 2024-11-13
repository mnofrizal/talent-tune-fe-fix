"use client";
import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <h1 className="text-3xl font-bold">
        Welcome back, User
      </h1>
      <p className="text-muted-foreground">
        Here's an overview of your assessment activities
      </p>
    </motion.div>
  );
}