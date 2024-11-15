"use client";

import { Separator } from "@/components/ui/separator";
import { QuestionCard } from "./question-card";

export function CategorySection({
  category,
  questions,
  startIndex,
  answers,
  onAnswerChange,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-primary">{category}</h2>
        <Separator className="mt-4" />
      </div>
      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            questionNumber={startIndex + index + 1}
            question={question}
            value={answers[question.id]}
            onChange={onAnswerChange}
          />
        ))}
      </div>
    </div>
  );
}
