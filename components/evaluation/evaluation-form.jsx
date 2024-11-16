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
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

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
];

const ratingOptions = [
  { value: "K", label: "K", number: "(1)" },
  { value: "CK", label: "CK", number: "(2)" },
  { value: "CB", label: "CB", number: "(3)" },
  { value: "B", label: "B", number: "(4)" },
];

export function EvaluationForm({ id }) {
  const [states, setStates] = useState(
    Object.fromEntries(questions.map((q) => [q.id, { rating: "", notes: "" }]))
  );
  const [initialStates, setInitialStates] = useState(
    Object.fromEntries(questions.map((q) => [q.id, { rating: "", notes: "" }]))
  );
  const [completed, setCompleted] = useState(
    Object.fromEntries(questions.map((q) => [q.id, false]))
  );
  const [conclusion, setConclusion] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [openItem, setOpenItem] = useState(undefined);
  const [triggerClose, setTriggerClose] = useState(false);

  useEffect(() => {
    setCanSubmit(Object.values(completed).every(Boolean));
  }, [completed]);

  useEffect(() => {
    if (triggerClose) {
      setOpenItem(undefined);
      setTriggerClose(false);
    }
  }, [triggerClose]);

  const handleSave = (questionId) => {
    setCompleted((prev) => ({ ...prev, [questionId]: true }));
    setInitialStates((prev) => ({
      ...prev,
      [questionId]: { ...states[questionId] },
    }));
    setTriggerClose(true);
  };

  const isSaveEnabled = (questionId) => {
    const currentState = states[questionId];
    const initialState = initialStates[questionId];
    return (
      currentState.rating !== "" &&
      (currentState.rating !== initialState.rating ||
        currentState.notes !== initialState.notes)
    );
  };

  const handleChange = (questionId, field, value) => {
    setStates((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], [field]: value },
    }));
    setCompleted((prev) => ({ ...prev, [questionId]: false }));
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Evaluation Form</h1>

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
            className="rounded-lg border px-6"
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
                        checked={states[question.id].rating === option.value}
                        onChange={() =>
                          handleChange(question.id, "rating", option.value)
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

              <div className="space-y-2">
                <Label
                  htmlFor={`notes-${question.id}`}
                  className="text-sm font-medium"
                >
                  Catatan (Opsional)
                </Label>
                <Textarea
                  id={`notes-${question.id}`}
                  placeholder="Tambahkan catatan di sini..."
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

      <Card className="rounded-lg border">
        <CardHeader>
          <h2 className="text-xl font-semibold">Kesimpulan & Rekomendasi</h2>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Tuliskan kesimpulan dan rekomendasi..."
            className="min-h-[150px]"
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button disabled={!canSubmit}>Submit Evaluation</Button>
      </div>
    </div>
  );
}
