"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: "q-1",
    title: "Referensi",
    description:
      "Pemahaman Keputusan Direksi No. 204.K/010/IP/2019 tentang Kebijakan mengenai Anti Penyuapan di PT Indonesia Power.",
  },
  {
    id: "q-2",
    title: "Pemahaman Bidang Kerja",
    description:
      "Pemahaman peserta terhadap bidang kerja dan tanggung jawabnya",
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

export default function Component({ id = "" }) {
  const [states, setStates] = useState(
    Object.fromEntries(questions.map((q) => [q.id, { rating: "", notes: "" }]))
  );
  const [initialStates, setInitialStates] = useState(
    Object.fromEntries(questions.map((q) => [q.id, { rating: "", notes: "" }]))
  );
  const [completed, setCompleted] = useState(
    Object.fromEntries(questions.map((q) => [q.id, false]))
  );
  const [canSubmit, setCanSubmit] = useState(false);
  const [openItem, setOpenItem] = useState(undefined);
  const [triggerClose, setTriggerClose] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  useEffect(() => {
    setCanSubmit(Object.values(completed).every(Boolean));
    const completedCount = Object.values(completed).filter(Boolean).length;
    setCompletedQuestions(completedCount);
  }, [completed]);

  useEffect(() => {
    if (triggerClose) {
      setOpenItem(undefined);
      setTriggerClose(false);
    }
  }, [triggerClose]);

  const handleSave = (questionId) => {
    setCompleted((prev) => {
      const newCompleted = { ...prev, [questionId]: true };
      const completedCount = Object.values(newCompleted).filter(Boolean).length;
      setCompletedQuestions(completedCount);
      return newCompleted;
    });
    setInitialStates((prev) => ({
      ...prev,
      [questionId]: { ...states[questionId] },
    }));
    setTriggerClose(true);
  };

  const isSaveEnabled = (questionId) => {
    const currentState = states[questionId];
    const initialState = initialStates[questionId];

    if (questionId === "conclusion") {
      return (
        currentState.notes !== "" && currentState.notes !== initialState.notes
      );
    }

    return (
      currentState.rating !== "" && currentState.rating !== initialState.rating
    );
  };

  const handleChange = (questionId, field, value) => {
    setStates((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], [field]: value },
    }));
    // Remove the automatic completion when rating changes
  };

  return (
    <div className="w-full max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Evaluation Form</h1>
        <Button disabled={!canSubmit}>Submit Evaluation</Button>
      </div>

      <div className="mb-6">
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
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={setOpenItem}
            className="w-full space-y-4"
            key={triggerClose ? "closed" : "open"}
          >
            {questions.map((question, index) => (
              <AccordionItem
                key={question.id}
                value={question.id}
                className="rounded-lg border bg-white px-6"
              >
                <AccordionTrigger className="py-4 text-lg font-semibold">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-600">
                      {index + 1}
                    </span>
                    {question.title}
                    {completed[question.id] && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pb-6">
                  <p className="text-sm text-muted-foreground">
                    {question.description}
                  </p>

                  {question.id !== "conclusion" && (
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
                              checked={
                                states[question.id].rating === option.value
                              }
                              onChange={() =>
                                handleChange(
                                  question.id,
                                  "rating",
                                  option.value
                                )
                              }
                              className="sr-only"
                            />
                            <label
                              htmlFor={`${question.id}-${option.value}`}
                              className={`flex flex-col items-center justify-center h-full p-4 border rounded-lg cursor-pointer transition-all ${
                                states[question.id].rating === option.value
                                  ? "border-primary bg-primary/5"
                                  : "border-gray-200 hover:border-primary/50"
                              }`}
                            >
                              <div className="flex flex-col items-center gap-1">
                                <span className="text-sm font-medium">
                                  {option.label}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {option.number}
                                </span>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label
                      htmlFor={`notes-${question.id}`}
                      className="text-sm font-medium"
                    >
                      {question.id === "conclusion"
                        ? "Kesimpulan & Rekomendasi"
                        : "Catatan (Opsional)"}
                    </Label>
                    <Textarea
                      id={`notes-${question.id}`}
                      placeholder={
                        question.id === "conclusion"
                          ? "Tuliskan kesimpulan dan rekomendasi..."
                          : "Tambahkan catatan di sini..."
                      }
                      className="min-h-[100px]"
                      value={states[question.id].notes}
                      onChange={(e) =>
                        handleChange(question.id, "notes", e.target.value)
                      }
                    />
                  </div>

                  <Button
                    onClick={() => handleSave(question.id)}
                    disabled={!isSaveEnabled(question.id)}
                  >
                    {completed[question.id] ? "Saved" : "Save"}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
