"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronRight,
  BarChart,
  Users,
  TrendingUp,
  Calendar,
  Bell,
  FileText,
  Zap,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TalentTuneLanding() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link className="flex items-center justify-center" href="#">
            <Zap className="h-6 w-6" />
            <span className="ml-2 text-lg font-bold">TalentTune</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#features"
            >
              Fitur
            </Link>
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#benefits"
            >
              Manfaat
            </Link>
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="#contact"
            >
              Kontak
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-10 md:py-24 lg:py-32 xl:py-40">
          <motion.div
            className="container mx-auto px-4"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <div className="flex flex-col items-center space-y-6 text-center">
              <motion.div className="space-y-6 px-5" variants={fadeInUp}>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Optimalisasi Fit and Proper Test
                  </h1>
                  <div className="mt-0 pt-0 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none">
                    dengan TalentTune
                  </div>
                </div>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg">
                  Tingkatkan kualitas pengelolaan karir pegawai dengan aplikasi
                  inovatif kami.
                </p>
              </motion.div>
              <motion.div className="space-x-4 pt-6" variants={fadeInUp}>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-2 text-lg text-white transition-all duration-300 hover:from-purple-600 hover:to-indigo-700"
                >
                  Masuk ke Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
                <Button variant="outline" size="lg" className="text-lg">
                  Pelajari Lebih Lanjut
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section
          id="features"
          className="bg-[#f4f6fa] py-12 dark:bg-gray-800 md:py-24 lg:py-32"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Fitur Utama
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: BarChart,
                  title: "Analisis Mendalam",
                  description:
                    "Evaluasi komprehensif keterampilan dan potensi pegawai melalui fit and proper test.",
                },
                {
                  icon: Users,
                  title: "Manajemen Talenta",
                  description:
                    "Kelola dan kembangkan bakat pegawai dengan strategi yang tepat sasaran.",
                },
                {
                  icon: TrendingUp,
                  title: "Perencanaan Karir",
                  description:
                    "Rancang jalur karir yang optimal berdasarkan kinerja dan potensi pegawai.",
                },
                {
                  icon: FileText,
                  title: "Integrasi Data Karir",
                  description:
                    "Mengintegrasikan data riwayat karir pegawai untuk menghasilkan rekomendasi yang relevan.",
                },
                {
                  icon: Calendar,
                  title: "Penjadwalan Fit and Proper Test",
                  description:
                    "Otomatisasi penjadwalan tes berdasarkan ketersediaan peserta dan penguji.",
                },
                {
                  icon: Bell,
                  title: "Notifikasi Progres",
                  description:
                    "Memberikan notifikasi kepada pengguna terkait jadwal, hasil, dan rekomendasi pengembangan karir.",
                },
                {
                  icon: BarChart,
                  title: "Pelaporan dan Analitik",
                  description:
                    "Menyediakan laporan yang mencakup analisis data kompetensi dan saran perbaikan.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1"
                >
                  <Card className="h-full transform cursor-pointer rounded-2xl transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg">
                    <CardHeader>
                      <feature.icon className="mb-2 h-8 w-8" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p>{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section id="benefits" className="py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4">
            <motion.h2
              className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Manfaat
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }}>
                <Card className="h-full cursor-pointer rounded-2xl transition hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>Bagi Pegawai</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>
                        Pemahaman lebih baik tentang kekuatan dan area
                        pengembangan
                      </li>
                      <li>Peluang pengembangan karir yang lebih jelas</li>
                      <li>Peningkatan motivasi dan kepuasan kerja</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeInUp} whileHover={{ scale: 1.05 }}>
                <Card className="h-full cursor-pointer rounded-2xl transition hover:shadow-lg">
                  <CardHeader>
                    <CardTitle>Bagi Organisasi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc space-y-2 pl-5">
                      <li>Peningkatan efektivitas dalam penempatan pegawai</li>
                      <li>Optimalisasi pengembangan talenta internal</li>
                      <li>Peningkatan produktivitas dan kinerja organisasi</li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
        <section className="bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
          <motion.div
            className="container mx-auto px-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <motion.div className="space-y-2" variants={fadeInUp}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Siap Meningkatkan Kualitas Pengelolaan Karir?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Mulai optimalisasi fit and proper test dan manajemen talenta
                  Anda sekarang.
                </p>
              </motion.div>
              <motion.div className="space-x-4" variants={fadeInUp}>
                <Button
                  className="inline-flex items-center justify-center"
                  size="lg"
                >
                  Masuk ke Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 py-6 sm:flex-row">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2024 TalentTune. Hak Cipta Dilindungi.
          </p>
          <nav className="mt-4 flex gap-4 sm:mt-0 sm:gap-6">
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Kebijakan Privasi
            </Link>
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href="#"
            >
              Syarat & Ketentuan
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
