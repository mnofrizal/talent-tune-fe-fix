"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Welcome to <span className="text-primary">TalentTune</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            Platform digital terintegrasi untuk mengelola seluruh proses fit & proper test, 
            termasuk penilaian, dokumentasi, dan analisis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-x-4"
          >
            <Button asChild size="lg">
              <Link href="/login">
                Login to Platform
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="p-6 bg-card rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

const features = [
  {
    title: "Penilaian Terstruktur",
    description: "Sistem penilaian komprehensif dengan kriteria yang terukur dan objektif."
  },
  {
    title: "Dokumentasi Digital",
    description: "Simpan dan kelola semua dokumen fit & proper test secara digital dan aman."
  },
  {
    title: "Analisis Real-time",
    description: "Dapatkan insight dan analisis hasil test secara real-time untuk pengambilan keputusan."
  }
];