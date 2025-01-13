"use client";

import { Progress } from "@/components/ui/progress";

const EvaluationProgress = ({ completedQuestions, totalQuestions }) => {
  return (
    <div className="mb-4">
      <Progress
        value={(completedQuestions / totalQuestions) * 100}
        className="w-full"
      />
      <p className="mt-2 text-sm text-muted-foreground">
        Question {completedQuestions} of {totalQuestions} completed
      </p>
    </div>
  );
};

export default EvaluationProgress;
