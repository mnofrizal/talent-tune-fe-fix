"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const SCORE_OPTIONS = [
  { value: "1", label: "K" },
  { value: "2", label: "CK" },
  { value: "3", label: "CB" },
  { value: "4", label: "B" },
];

const evaluationCriteria = [
  {
    id: "pemahaman_unit",
    title: "Pemahaman Unit",
    description: "Pemahaman peserta terhadap unit kerja dan prosesnya",
  },
  {
    id: "pemahaman_bidang",
    title: "Pemahaman Bidang Kerja",
    description: "Pemahaman peserta terhadap bidang kerja dan tanggung jawabnya",
  },
  {
    id: "sikap",
    title: "Sikap/Attitude",
    description: "Penilaian terhadap sikap dan perilaku peserta",
  },
  {
    id: "komunikasi",
    title: "Keterampilan Komunikasi",
    description: "Kemampuan peserta dalam berkomunikasi dan menyampaikan informasi",
  },
];

const ScoreCard = ({ criteriaId, value, onChange, disabled = false }) => (
  <RadioGroup
    value={value}
    onValueChange={onChange}
    className="grid grid-cols-4 gap-2"
    disabled={disabled}
  >
    {SCORE_OPTIONS.map((option) => (
      <div key={option.value}>
        <RadioGroupItem
          value={option.value}
          id={`${criteriaId}-${option.value}`}
          className="peer sr-only"
        />
        <Label
          htmlFor={`${criteriaId}-${option.value}`}
          className={cn(
            "flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4",
            "hover:bg-accent hover:text-accent-foreground",
            "peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
            "[&:has([data-state=checked])]:border-primary cursor-pointer"
          )}
        >
          <span className="text-xl font-bold">{option.label}</span>
          <span className="text-xs text-muted-foreground mt-1">({option.value})</span>
        </Label>
      </div>
    ))}
  </RadioGroup>
);

export function EvaluationForm({ id }) {
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [conclusion, setConclusion] = useState("");

  const handleScoreChange = (criteriaId, value) => {
    setScores((prev) => ({ ...prev, [criteriaId]: value }));
  };

  const handleCommentChange = (criteriaId, value) => {
    setComments((prev) => ({ ...prev, [criteriaId]: value }));
  };

  return (
    <div className="space-y-6">
      {evaluationCriteria.map((criteria, index) => (
        <motion.div
          key={criteria.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{criteria.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {criteria.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Penilaian</Label>
                <ScoreCard
                  criteriaId={criteria.id}
                  value={scores[criteria.id] || ""}
                  onChange={(value) => handleScoreChange(criteria.id, value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Catatan</Label>
                <Textarea
                  value={comments[criteria.id] || ""}
                  onChange={(e) => handleCommentChange(criteria.id, e.target.value)}
                  placeholder="Tambahkan catatan di sini..."
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: evaluationCriteria.length * 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Kesimpulan & Rekomendasi</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              placeholder="Tuliskan kesimpulan dan rekomendasi..."
              className="min-h-[140px]"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}