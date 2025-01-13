"use client";

import { memo } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
import { ratingOptions } from "./constants";

const QuestionItem = memo(
  ({ question, index, state, onStateChange, completed, disabled }) => {
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
              disabled={disabled}
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
                  disabled={disabled}
                />
                <label
                  htmlFor={`${question.id}-${option.value}`}
                  className={`flex flex-col items-center justify-center h-full p-2 border rounded-lg transition-all ${
                    !disabled
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-70"
                  } ${
                    state.rating === option.value
                      ? option.value === "K"
                        ? "border-red-500 bg-red-50"
                        : option.value === "CK"
                        ? "border-orange-500 bg-orange-50"
                        : option.value === "CB"
                        ? "border-green-500 bg-green-50"
                        : "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={` font-bold ${
                        option.value === "K"
                          ? "text-red-600"
                          : option.value === "CK"
                          ? "text-orange-600"
                          : option.value === "CB"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
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
      </div>
    );
  }
);

QuestionItem.displayName = "QuestionItem";

export default QuestionItem;
