"use client";
import { AssessmentHeader } from "@/components/assessment/assessment-header";
import { AssessmentFilters } from "@/components/assessment/assessment-filters";
import { AssessmentTable } from "@/components/assessment/assessment-table";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssessmentStastics from "@/components/assessment/assesment-statistics";
import { useAuth } from "@/hooks/use-auth";
import { API_ENDPOINTS } from "@/config/api";
import { useToast } from "@/hooks/use-toast";

export default function AssessmentPage() {
  const { toast } = useToast();
  const { session } = useAuth(); // Accessing session from useAuth
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [dateRange, setDateRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [assessments, setAssessments] = useState([]);

  const fetchAssessments = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.ASSESSMENTS.LIST, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Using session.accessToken
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();

      if (result.success) {
        setAssessments(result.data);
        console.log(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendInvitation = async (assessmentId) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.ASSESSMENTS.SEND_INVITATIONMAIL(assessmentId),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send invitation");
      }
      toast({
        title: "Success",
        description: `Invitation sent successfully!`,
      });
      fetchAssessments();
    } catch (error) {
      toast({
        title: "Error",
        description: `Error sending invitation for assessment ID: ${assessmentId}, error: ${error}`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (assessmentId) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.ASSESSMENTS.DETAIL(assessmentId),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete assessment");
      }
      toast({
        title: "Success",
        description: `Assessment ID: ${assessmentId} deleted successfully!`,
      });
      fetchAssessments();
    } catch (error) {
      toast({
        title: "Error",
        description: `Error deleting assessment ID: ${assessmentId}, error: ${error}`,
        variant: "destructive",
      });
    }
  };

  const handleResetStatus = async (assessmentId) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.ASSESSMENTS.RESET_STATUS(assessmentId),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reset assessment status");
      }
      toast({
        title: "Success",
        description: `Assessment ID: ${assessmentId} status reset successfully!`,
      });
      fetchAssessments();
    } catch (error) {
      toast({
        title: "Error",
        description: `Error resetting status for assessment ID: ${assessmentId}, error: ${error}`,
        variant: "destructive",
      });
    }
  };

  const handleSetFinish = async (assessmentId) => {
    try {
      const response = await fetch(
        API_ENDPOINTS.ASSESSMENTS.UPDATE_STATUS(assessmentId),
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "DONE" }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to set assessment status to finished");
      }
      toast({
        title: "Success",
        description: `Assessment ID: ${assessmentId} status set to finished successfully!`,
      });
      fetchAssessments();
    } catch (error) {
      toast({
        title: "Error",
        description: `Error setting status to finished for assessment ID: ${assessmentId}, error: ${error}`,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (session) {
      fetchAssessments();
    }
  }, [session]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <AssessmentHeader onAssessmentCreated={fetchAssessments} />
      <AssessmentStastics assessments={assessments} />
      <Card className="w-full rounded-2xl border-gray-100 shadow-sm">
        <CardHeader>
          <AssessmentFilters
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </CardHeader>
        <CardContent>
          <AssessmentTable
            assessments={assessments}
            search={search}
            status={status}
            dateRange={dateRange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onSendInvitation={handleSendInvitation}
            onDelete={handleDelete}
            onResetStatus={handleResetStatus}
            onSetFinish={handleSetFinish}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
