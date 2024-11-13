"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CategorySection } from "./category-section";
import { questions } from "./questions-data";

export function QuestionnaireDialog({ onSubmit, open, onOpenChange }) {
  const [answers, setAnswers] = useState({});
  const [agreed, setAgreed] = useState(false);

  const totalQuestions = questions.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Fill Questionnaire</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] max-w-4xl p-0">
        <div className="sticky top-0 z-20 border-b bg-background px-6 pb-4 pt-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-primary">
              Questionnaire SMAP
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Progress ({answeredQuestions} of {totalQuestions} questions)
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="max-h-[calc(90vh-140px)] overflow-y-auto px-6 py-6">
          <div className="space-y-10">
            {questions.map((category, categoryIndex) => {
              const startIndex = questions
                .slice(0, categoryIndex)
                .reduce((acc, cat) => acc + cat.items.length, 0);

              return (
                <CategorySection
                  key={category.category}
                  category={category.category}
                  questions={category.items}
                  startIndex={startIndex}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                />
              );
            })}

            <div className="space-y-6">
              <div className="flex items-start space-x-3 rounded-lg bg-muted/50 p-4">
                <Checkbox
                  id="agreement"
                  checked={agreed}
                  onCheckedChange={setAgreed}
                  className="mt-1"
                />
                <Label htmlFor="agreement" className="text-sm leading-relaxed">
                  Dengan ini Saya telah memahami mengenai SMAP dan berkomitmen
                  untuk mematuhi SMAP dan apabila melanggar, Saya siap mendapat
                  sanksi sesuai ketentuan yang berlaku di Perusahaan.
                </Label>
              </div>

              <Button
                className="w-full py-6 text-lg"
                onClick={handleSubmit}
                disabled={!agreed || progress < 100}
              >
                {progress < 100
                  ? `Please answer all questions (${
                      totalQuestions - answeredQuestions
                    } remaining)`
                  : "Submit Questionnaire"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}