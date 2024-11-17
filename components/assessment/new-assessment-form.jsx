"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { API_ENDPOINTS } from "@/config/api";
import { AssessmentDetails } from "./form-assesment-details";
import { EvaluatorSelection } from "./form-evaluator-select";
import { ParticipantSelection } from "./form-participant-selection";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function NewAssessmentForm({ onAssessmentCreated }) {
  const { toast } = useToast();
  const { session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [evaluators, setEvaluators] = useState();
  const [candidates, setCandidates] = useState();
  const [formData, setFormData] = useState({
    assessment: {
      judul: "",
      materi: "",
      proyeksi: "",
      metodePelaksanaan: "OFFLINE",
      ruangan: "",
      linkMeeting: null,
      notaDinas: null,
      participants: [],
      isActive: true,
    },
    evaluators: [],
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS.LIST, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();

      if (result.success) {
        setEvaluators(result.data);
        setCandidates(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
  }, [session]);

  const validateStep = () => {
    switch (step) {
      case 1:
        const isValidStep1 =
          formData.assessment.judul &&
          formData.assessment.materi &&
          formData.assessment.metodePelaksanaan &&
          ((formData.assessment.metodePelaksanaan === "OFFLINE" &&
            formData.assessment.ruangan) ||
            (formData.assessment.metodePelaksanaan !== "OFFLINE" &&
              formData.assessment.linkMeeting));
        console.log("Step 1 validation:", isValidStep1, formData.assessment);
        return isValidStep1;

      case 2:
        const isValidStep2 = formData.evaluators?.length > 0;
        console.log("Step 2 validation:", isValidStep2, formData.evaluators);
        return isValidStep2;

      case 3:
        const isValidStep3 =
          formData.assessment.participants?.length > 0 &&
          formData.assessment.participants.every((p) => p.schedule);
        console.log(
          "Step 3 validation:",
          isValidStep3,
          formData.assessment.participants
        );
        return isValidStep3;

      default:
        return false;
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (validateStep() && step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AssessmentDetails formData={formData} setFormData={setFormData} />
        );
      case 2:
        return (
          <EvaluatorSelection
            formData={formData}
            setFormData={setFormData}
            evaluators={evaluators}
          />
        );
      case 3:
        return (
          <ParticipantSelection
            formData={formData}
            setFormData={setFormData}
            candidates={candidates}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    if (validateStep() && step === 3) {
      try {
        const formDataToSend = new FormData();

        // Create the assessment object without the file
        const assessmentData = {
          ...formData.assessment,
          createdBy: session?.user?.id,
        };

        // Add the notaDinas file separately if it exists
        if (formData.assessment.notaDinas) {
          formDataToSend.append("notaDinas", formData.assessment.notaDinas);
          // Remove the file from the assessment data
          delete assessmentData.notaDinas;
        }

        // Prepare the final payload
        const payload = {
          assessment: {
            ...assessmentData,
            participants: assessmentData.participants.map((p) => ({
              ...p,
              schedule: new Date(p.schedule).toISOString(),
            })),
          },
          evaluators: formData.evaluators,
        };

        console.log("Sending payload:", payload);
        // formDataToSend.append("data", JSON.stringify(payload));

        const response = await fetch(API_ENDPOINTS.ASSESSMENTS.LIST, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log("API response:", result);

        if (response.ok && result.success) {
          toast({
            variant: "default",
            title: "Success",
            description: "Assessment added successfully",
            duration: 3000,
          });
          onAssessmentCreated();
          setIsOpen(false);
          setFormData({
            assessment: {
              judul: "",
              materi: "",
              proyeksi: "",
              metodePelaksanaan: "OFFLINE",
              ruangan: "",
              linkMeeting: null,
              notaDinas: null,
              participants: [],
              isActive: true,
            },
            evaluators: [],
          });
          setStep(1);
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.message || "Failed to create assessment",
            duration: 3000,
          });
        }
      } catch (error) {
        console.error("Failed to create assessment:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create assessment",
          duration: 3000,
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Assessment
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-[425px] md:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create New Assessment</DialogTitle>
        </DialogHeader>
        <Card className="w-full rounded-2xl">
          <CardHeader>
            <CardTitle>
              Step {step} of 3 -{" "}
              {step === 1
                ? "Assessment Details"
                : step === 2
                ? "Evaluators"
                : "Participants"}
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>{renderStep()}</CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                >
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!validateStep()}
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!validateStep()}
                  onClick={(e) => {
                    console.log("Submit button clicked");
                    handleSubmit(e);
                  }}
                >
                  Submit
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
