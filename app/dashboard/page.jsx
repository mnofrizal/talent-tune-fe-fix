"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BarChartIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  SunIcon,
  Tally1Icon,
} from "lucide-react";

import { Poppins } from "next/font/google";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const formasiData = [
  { name: "IP", value: 80, color: "#459ab0" },
  { name: "CDB", value: 40, color: "#f97316" },
];

export default function DashboardPage() {
  return (
    <div className="">
      {/* Dashboard Content */}
      <div className="grid grid-cols-4 gap-6 p-6">
        {/* Welcome Section */}

        {/* Left Content - Takes up 3 columns */}
        <div className="col-span-3 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-6">
            <div className="col-span-4 flex items-start justify-between">
              <div className="space-y-1">
                <h1 className="text-4xl font-medium tracking-tight">
                  Welcome back, Sarah
                </h1>
                <p className="text-lg text-muted-foreground">
                  Here's an overview of your assessment activities
                </p>
              </div>
              <Link href="/dashboard/assessments">
                <Button
                  size="lg"
                  className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Go to Assessments
                </Button>
              </Link>
            </div>
          </div>

          <Card className="w-full rounded-2xl border-gray-100 shadow-sm">
            <CardContent className="flex space-x-6 pt-6">
              <Card className="rounded-2xl shadow-none dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Assessments
                      </p>
                      <BarChartIcon className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-semibold">1,081</span>
                      <span className="text-sm font-medium text-purple-500">
                        All
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-none dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">
                        Scheduled Assessments
                      </p>
                      <CalendarIcon className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-semibold">42</span>
                      <span className="text-sm font-medium text-blue-500">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-none dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">
                        In Progress Assessments
                      </p>
                      <ClockIcon className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-semibold">18</span>
                      <span className="text-sm font-medium text-yellow-500">
                        Active
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow-none dark:border-gray-800">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-muted-foreground">
                        Completed Assessments
                      </p>
                      <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-semibold">1,021</span>
                      <span className="text-sm font-medium text-green-500">
                        +5%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Assessment History Chart */}
          <Card className="w-full rounded-2xl border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                Assessment History (5 Years)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { year: 2020, assessments: 15 },
                    { year: 2021, assessments: 76 },
                    { year: 2022, assessments: 87 },
                    { year: 2023, assessments: 87 },
                    { year: 2024, assessments: 77 },
                  ]}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="year" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      zIndex: 1000,
                    }}
                    cursor={{ fill: "#f4f6fa", radius: [8, 8, 0, 0] }}
                  />
                  {/* <Legend /> */}
                  <Bar
                    dataKey="assessments"
                    fill="#102c8e"
                    name="Total Assessments"
                    barSize={60}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Assessments */}
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left">
                        <Checkbox />
                      </th>
                      <th className="p-4 text-left font-medium">Employee</th>
                      <th className="p-4 text-left font-medium">Status</th>
                      <th className="p-4 text-left font-medium">Date</th>
                      <th className="p-4 text-left font-medium">Assessment</th>
                      <th className="p-4 text-left font-medium">Progress</th>
                      <th className="p-4 text-left font-medium">Evaluators</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Alice Cooper",
                        jabatan: "Software Engineer",
                        status: "Attend",
                        date: "Dec 4, 2023",
                        assessment: "Technical Skills",
                        progress: 75,
                        evaluators: 3,
                      },
                      {
                        name: "Bob Dylan",
                        jabatan: "Project Manager",
                        status: "Attend",
                        date: "Dec 12, 2023",
                        assessment: "Leadership Potential",
                        progress: 90,
                        evaluators: 2,
                      },
                      {
                        name: "Carol Danvers",
                        jabatan: "Data Analyst",
                        status: "Attend",
                        date: "Dec 15, 2023",
                        assessment: "Problem Solving",
                        progress: 60,
                        evaluators: 4,
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="p-4">
                          <Checkbox />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={`/placeholder.svg?height=40&width=40&text=${item.name[0]}`}
                              />
                              <AvatarFallback>{item.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {item.jabatan}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                            <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-green-500">
                              {item.status}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{item.date}</td>
                        <td className="p-4 text-sm">{item.assessment}</td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                <div
                                  className="h-full rounded-full bg-blue-500"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {item.progress}%
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex -space-x-2">
                            {Array.from({ length: item.evaluators }).map(
                              (_, i) => (
                                <Avatar
                                  key={i}
                                  className="h-6 w-6 border-2 border-background"
                                >
                                  <AvatarImage
                                    src={`/placeholder.svg?height=24&width=24&text=E${
                                      i + 1
                                    }`}
                                  />
                                  <AvatarFallback>E{i + 1}</AvatarFallback>
                                </Avatar>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Takes up 1 column */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardContent className="space-y-8 pt-6">
              {/* Formasi Chart Section */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Formasi</h3>
                <div className="relative">
                  <ResponsiveContainer width="100%" height={230}>
                    <PieChart>
                      <Pie
                        data={formasiData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {formasiData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend
                        verticalAlign="bottom"
                        align="center"
                        layout="horizontal"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />
                      <Tooltip
                        formatter={(value) => `${value}`}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          zIndex: 1000,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
                    style={{ zIndex: 0 }}
                  >
                    <div className="text-2xl font-bold">
                      {formasiData.reduce((sum, item) => sum + item.value, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-gray-100 shadow-sm">
            <CardContent className="space-y-8 pt-6">
              {/* Upcoming Assessments Section */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">
                  Upcoming Assessments
                </h3>
                <Card className="rounded-2xl border-gray-100 bg-gray-50 p-3 py-4 shadow-sm dark:border-gray-800">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Generalis 2 Bidang Operasi",
                        date: "Tomorrow at 10:00 AM",
                        avatar: "TA",
                      },
                      {
                        title: "Generalis 3 Bidang Umum",
                        date: "Oct 20, 2:00 PM",
                        avatar: "LA",
                      },
                    ].length === 0 ? (
                      <div className="flex items-center space-x-4 rounded-2xl p-6 text-sm text-muted-foreground">
                        No upcoming assessments
                      </div>
                    ) : (
                      [
                        {
                          title: "Generalis 2 Bidang Operasi",
                          date: "Tomorrow at 10:00 AM",
                          avatar: "TA",
                        },
                        {
                          title: "Generalis 3 Bidang Umum",
                          date: "Oct 20, 2:00 PM",
                          avatar: "LA",
                        },
                      ].map((assessment, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 border-b pb-3 last:border-none"
                        >
                          <Avatar>
                            <AvatarImage
                              src={`/placeholder.svg?height=60&width=60&text=${assessment.avatar}`}
                            />
                            <AvatarFallback>{assessment.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-sm font-semibold">
                              {assessment.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {assessment.date}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full rounded-full"
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Go to Room
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Upcoming Job Vacancies Section */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">
                  Upcoming Job Vacancies
                </h3>
                <div className="space-y-2">
                  {[
                    "Assistant Manager Sistem Informasi",
                    "Manager Pengadaan Barang dan Jasa",
                    "Officer Perencanaan Unit Kerja",
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Tally1Icon className="h-5 w-5 text-gray-400" />
                        <h4 className="text-sm font-medium">{job}</h4>
                      </div>
                      <span className="inline-flex items-center rounded-lg bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                        Retirement
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
