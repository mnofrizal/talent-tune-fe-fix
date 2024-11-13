"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const ANSWER_OPTIONS = [
  "Sangat Paham",
  "Paham",
  "Cukup Paham",
  "Kurang Paham",
  "Tidak Paham",
];

export function QuestionCard({ questionNumber, question, value, onChange }) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
            {questionNumber}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {question.material}
            </h3>
            <p className="mt-2 leading-relaxed text-gray-600">
              {question.statement}
            </p>
          </div>
        </div>
      </div>
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(question.id, value)}
        className="grid grid-cols-2 gap-3 pt-4 md:grid-cols-5"
      >
        {ANSWER_OPTIONS.map((option) => (
          <div key={option} className="flex items-center justify-center">
            <RadioGroupItem
              value={option}
              id={`${question.id}-${option}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`${question.id}-${option}`}
              className={cn(
                "flex items-center justify-center rounded-md border-2 border-muted bg-popover p-3",
                "hover:bg-accent hover:text-accent-foreground",
                "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                "[&:has([data-state=checked])]:border-primary cursor-pointer text-center h-full w-full transition-all"
              )}
            >
              <span className="text-sm font-medium leading-none">{option}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}