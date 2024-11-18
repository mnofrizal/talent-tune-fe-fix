import React from "react";
import { cn } from "@/lib/utils";

const StatusBadge = ({ status = "status", className }) => {
  const statusStyles = {
    SCHEDULED: "bg-indigo-100 text-indigo-800",
    WAITING_CONFIRMATION: "bg-purple-100 text-purple-800",
    TALENT_REQUIREMENTS: "bg-cyan-100 text-cyan-800",
    READY_FOR_ASSESSMENT: "bg-emerald-100 text-emerald-800",
    EVALUATING: "bg-blue-100 text-blue-800",
    NEED_REVIEW: "bg-yellow-100 text-yellow-800",
    DONE: "bg-green-100 text-green-800",
    CANCELED: "bg-red-100 text-red-800",
    RESCHEDULE: "bg-orange-100 text-orange-800",
  };

  const statusText = {
    SCHEDULED: "Scheduled",
    WAITING_CONFIRMATION: "Waiting Confirmation",
    TALENT_REQUIREMENTS: "Talent Requirements",
    READY_FOR_ASSESSMENT: "Ready for Assessment",
    EVALUATING: "Evaluating",
    NEED_REVIEW: "Needs Review",
    DONE: "Done",
    CANCELED: "Canceled",
    RESCHEDULE: "Rescheduled",
  };

  return (
    <span
      className={cn(
        `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`,
        statusStyles[status] || "bg-gray-100 text-gray-800",
        className
      )}
    >
      {statusText[status] ? statusText[status].toUpperCase() : ""}
    </span>
  );
};

export default StatusBadge;
