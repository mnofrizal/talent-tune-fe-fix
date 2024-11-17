import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

export function EvaluatorSelection({ formData, setFormData, evaluators }) {
  const handleEvaluatorSelect = (evaluatorId) => {
    const numericId = parseInt(evaluatorId);
    if (!formData.evaluators?.some((e) => e.evaluatorId === numericId)) {
      setFormData((prev) => ({
        ...prev,
        evaluators: [...(prev.evaluators || []), { evaluatorId: numericId }],
      }));
    }
  };

  const handleRemoveEvaluator = (evaluatorId) => {
    setFormData((prev) => ({
      ...prev,
      evaluators: prev.evaluators.filter((e) => e.evaluatorId !== evaluatorId),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="evaluator">Pilih Evaluator</Label>
        <Select onValueChange={handleEvaluatorSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih evaluator" />
          </SelectTrigger>
          <SelectContent>
            {evaluators?.map((evaluator) => (
              <SelectItem key={evaluator.id} value={evaluator.id.toString()}>
                {evaluator.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {!formData.evaluators?.length && (
        <p className="text-red-500">Please select at least one evaluator.</p>
      )}
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {formData.evaluators?.map((evaluator) => {
            const evaluatorData = evaluators.find(
              (e) => e.id === evaluator.evaluatorId
            );
            return (
              <Card key={evaluator.evaluatorId}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-semibold">{evaluatorData?.name}</h3>
                    {evaluatorData?.jabatan && (
                      <p className="text-sm text-muted-foreground">
                        {evaluatorData.jabatan}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveEvaluator(evaluator.evaluatorId)}
                    aria-label="Remove evaluator"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

export default EvaluatorSelection;
