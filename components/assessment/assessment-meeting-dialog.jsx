"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, MapPin, Users, Video, User } from "lucide-react";
import { motion } from "framer-motion";

export default function ModernAssessmentMeetingDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const meetingDetails = {
    title: "Performance Assessment Meeting",
    date: "May 15, 2024",
    time: "10:00 AM - 11:30 AM",
    user: "John Doe",
    location: "Conference Room A",
    method: "In-person and Video Conference",
    evaluators: [
      { name: "Jane Smith", role: "Senior Manager" },
      { name: "Mike Johnson", role: "HR Representative" },
      { name: "Emily Brown", role: "Department Head" },
    ],
  };

  const MotionCard = motion(Card);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white transition-all duration-300 hover:from-purple-600 hover:to-indigo-700">
          View Assessment Details
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-center text-2xl font-bold text-transparent">
            {meetingDetails.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden shadow-lg"
          >
            <CardContent className="grid gap-4 p-6">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-purple-500" />
                <span className="text-lg font-medium">
                  {meetingDetails.date}, {meetingDetails.time}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-medium">
                  User: {meetingDetails.user}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-pink-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {meetingDetails.location}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-green-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  {meetingDetails.method}
                </span>
              </div>
            </CardContent>
          </MotionCard>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="overflow-hidden shadow-lg"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" />
                Evaluators
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ScrollArea className="h-[200px] pr-4">
                {meetingDetails.evaluators.map((evaluator, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    className="mb-4 last:mb-0"
                  >
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold">
                          {evaluator.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {evaluator.role}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </ScrollArea>
            </CardContent>
          </MotionCard>
        </div>
      </DialogContent>
    </Dialog>
  );
}
