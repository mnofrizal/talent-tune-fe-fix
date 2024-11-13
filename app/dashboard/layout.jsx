"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen bg-background">
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 md:ml-64">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />

          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="container min-h-[calc(100vh-4rem)] p-4 md:p-6"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
