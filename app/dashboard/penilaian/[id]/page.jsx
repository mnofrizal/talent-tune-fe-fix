"use client";
import React, { useState, useEffect, memo, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const questions = [
  {
    id: "q-1",
    title: "Pemahaman Unit",
    description: "Pemahaman tentang struktur dan fungsi unit kerja perusahaan.",
  },
  {
    id: "q-2",
    title: "Pemahaman Bidang Kerja",
    description:
      "Pemahaman peserta terhadap bidang kerja dan tanggung jawabnya",
  },
  {
    id: "q-3",
    title: "Sikap/Attitude",
    description: "Evaluasi sikap dan attitude peserta dalam bekerja.",
  },
  {
    id: "q-4",
    title: "Keterampilan Komunikasi",
    description: "Evaluasi keterampilan komunikasi peserta dalam berinteraksi.",
  },
  {
    id: "conclusion",
    title: "Kesimpulan & Rekomendasi",
    description: "Tuliskan kesimpulan dan rekomendasi evaluasi",
  },
];

const ratingOptions = [
  { value: "K", label: "K", number: "(1)" },
  { value: "CK", label: "CK", number: "(2)" },
  { value: "CB", label: "CB", number: "(3)" },
  { value: "B", label: "B", number: "(4)" },
];

const participantInfo = {
  name: "John Doe",
  position: "Software Engineer",
  nip: "198501012010011001",
  education: "S1 Teknik Informatika",
  projectedPosition: "Senior Software Engineer",
  assessment: "Leadership Assessment",
  status: "IN_PROGRESS",
};

const QuestionItem = memo(
  ({ question, index, state, onStateChange, completed }) => {
    const handleChange = (field, value) => {
      onStateChange(question.id, field, value);
    };

    if (question.id === "conclusion") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600">
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold">{question.title}</h3>
            </div>
            {completed && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>
          <p className="text-sm text-muted-foreground">
            {question.description}
          </p>
          <div className="pt-2">
            <Textarea
              value={state.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Tuliskan kesimpulan dan rekomendasi..."
              className="min-h-[100px]"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600">
              {index + 1}
            </span>
            <h3 className="text-lg font-semibold">{question.title}</h3>
          </div>
          {completed && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
        <p className="text-sm text-muted-foreground">{question.description}</p>
        <div className="space-y-4">
          <Label className="text-sm font-medium">Penilaian</Label>
          <div className="flex gap-4">
            {ratingOptions.map((option) => (
              <div key={option.value} className="flex-1">
                <input
                  type="radio"
                  id={`${question.id}-${option.value}`}
                  name={`${question.id}-rating`}
                  value={option.value}
                  checked={state.rating === option.value}
                  onChange={() => handleChange("rating", option.value)}
                  className="sr-only"
                />
                <label
                  htmlFor={`${question.id}-${option.value}`}
                  className={`flex flex-col items-center justify-center h-full p-2 border rounded-lg cursor-pointer transition-all ${
                    state.rating === option.value
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs text-gray-500">
                      {option.number}
                    </span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

QuestionItem.displayName = "QuestionItem";

export default function Component({ id = "" }) {
  const [states, setStates] = useState(
    Object.fromEntries(questions.map((q) => [q.id, { rating: "", notes: "" }]))
  );

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

  return (
    <div className="w-full max-w-7xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Evaluation Form</h1>
        <Button disabled={!canSubmit}>Submit Evaluation</Button>
      </div>

      <div className="mb-4">
        <Progress
          value={(completedQuestions / questions.length) * 100}
          className="w-full"
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Question {completedQuestions} of {questions.length} completed
        </p>
      </div>

      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Penilaian</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, index) => (
                <React.Fragment key={question.id}>
                  <QuestionItem
                    question={question}
                    index={index}
                    state={states[question.id]}
                    onStateChange={handleChange}
                    completed={completed[question.id]}
                  />
                  {index < questions.length - 1 && (
                    <Separator className="my-6" />
                  )}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Peserta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src="/placeholder.svg?height=80&width=80"
                    alt={participantInfo.name}
                  />
                  <AvatarFallback>
                    {participantInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {participantInfo.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {participantInfo.position}
                  </p>
                </div>
              </div>
              <dl className="space-y-2">
                <div>
                  <dt className="font-semibold">NIP</dt>
                  <dd>{participantInfo.nip}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Pendidikan</dt>
                  <dd>{participantInfo.education}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Proyeksi Jabatan</dt>
                  <dd>{participantInfo.projectedPosition}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Assessment</dt>
                  <dd>{participantInfo.assessment}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Status</dt>
                  <dd>{participantInfo.status}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
