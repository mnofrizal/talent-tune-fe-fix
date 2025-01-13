"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import QuestionItem from "@/components/penilaian/question-item";
import ParticipantInfo from "@/components/penilaian/participant-info";
import EvaluationProgress from "@/components/penilaian/evaluation-progress";
import { questions } from "@/components/penilaian/constants";
import { API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function PenilaianDetailPage({ params }) {
  const { session } = useAuth();
  const router = useRouter();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [states, setStates] = useState(
    Object.fromEntries(questions.map((q) => [q.id, { rating: "", notes: "" }]))
  );

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          API_ENDPOINTS.EVALUATIONS.DETAIL(params.id),
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch evaluation");
        }
        const data = await response.json();
        if (data.success) {
          setEvaluation(data.data);
          // Set submitted state if status is COMPLETED
          if (data.data.status === "COMPLETED") {
            setIsSubmitted(true);
          }
          // If there are existing scores, populate the states
          if (data.data.scores || data.data.recommendation) {
            const scores = Object.entries(data.data.scores || {}).reduce(
              (acc, [key, value]) => {
                acc[`q-${key.slice(1)}`] = value;
                return acc;
              },
              {}
            );

            setStates({
              ...scores,
              conclusion: {
                rating: "",
                notes: data.data.recommendation || "",
              },
            });
          }
        } else {
          throw new Error(data.message || "Failed to fetch evaluation");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (session?.accessToken) {
      fetchEvaluation();
    }
  }, [params.id, session?.accessToken]);

  const { completed, canSubmit, completedQuestions } = useMemo(() => {
    const isCompleted = (questionId, state) => {
      if (questionId === "conclusion") {
        return state.notes.trim() !== "";
      }
      return state.rating !== "";
    };

    const completedStates = Object.entries(states).reduce(
      (acc, [id, state]) => {
        acc[id] = isCompleted(id, state);
        return acc;
      },
      {}
    );

    return {
      completed: completedStates,
      canSubmit: Object.values(completedStates).every(Boolean),
      completedQuestions: Object.values(completedStates).filter(Boolean).length,
    };
  }, [states]);

  const handleChange = (questionId, field, value) => {
    setStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    // Extract conclusion and format scores
    const { conclusion, ...questionScores } = states;
    const scores = Object.entries(questionScores).reduce(
      (acc, [key, value]) => {
        acc[key.replace("-", "")] = value;
        return acc;
      },
      {}
    );

    setSubmitting(true);
    try {
      const response = await fetch(
        API_ENDPOINTS.EVALUATIONS.UPDATE(params.id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            scores,
            recommendation: conclusion.notes,
            status: "COMPLETED",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit evaluation");
      }

      const data = await response.json();
      if (data.success) {
        // Preserve the existing evaluation data structure and update only the scores
        setEvaluation((prev) => ({
          ...prev,
          scores: data.data.scores,
          conclusion: data.data.conclusion,
          status: "COMPLETED",
        }));
        setIsSubmitted(true);
        router.push("/dashboard/penilaian"); // Redirect to the dashboard after submission
      } else {
        throw new Error(data.message || "Failed to submit evaluation");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-4">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-32" />
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                    {i < 3 && <Separator className="my-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-6 w-full" />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!evaluation) return null;

  const participantInfo = {
    name: evaluation.assessment.participant.name,
    nip: evaluation.assessment.participant.nip,
    bidang: evaluation.assessment.participant.bidang,
    jabatan: evaluation.assessment.participant.jabatan,
    education: "-",
    proyeksi: evaluation.assessment.proyeksi,
    judul: evaluation.assessment.judul,
    status: evaluation.status,
  };

  return (
    <div className="w-full max-w-7xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">Evaluation Form</h1>
          <Badge variant="outline" className="ml-2">
            {evaluation.status}
          </Badge>
        </div>

        <div className="flex gap-2">
          {isSubmitted && (
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Edit
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting || isSubmitted}
          >
            {submitting
              ? "Submitting..."
              : isSubmitted
              ? "Submitted"
              : "Submit Evaluation"}
          </Button>
        </div>
      </div>

      <EvaluationProgress
        completedQuestions={completedQuestions}
        totalQuestions={questions.length}
      />

      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Penilaian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id}>
                  <QuestionItem
                    question={question}
                    index={index}
                    state={states[question.id]}
                    onStateChange={handleChange}
                    completed={completed[question.id]}
                    disabled={isSubmitted}
                  />
                  {index < questions.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <ParticipantInfo participant={participantInfo} />
        </div>
      </div>
    </div>
  );
}
