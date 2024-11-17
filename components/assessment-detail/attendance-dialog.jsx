"use client";

import { useState } from "react";
import { Check, Calendar, MapPin, LinkIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function AttendanceDialog({ open, onOpenChange, onSubmit, assessment }) {
  const [attendance, setAttendance] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(attendance);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Confirm Attendance</DialogTitle>
          <DialogDescription className="text-base">
            {assessment.judul}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Assessment Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(assessment.schedule)}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{assessment.ruangan}</span>
            </div>

            {(assessment.metodePelaksanaan === "HYBRID" ||
              assessment.metodePelaksanaan === "ONLINE") && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <LinkIcon className="h-4 w-4" />
                <a
                  href={assessment.linkMeeting}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Meeting Link
                </a>
              </div>
            )}
          </div>

          {/* Method Badge */}
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            {assessment.metodePelaksanaan}
          </div>

          <RadioGroup
            value={attendance || ""}
            onValueChange={(value) => setAttendance(value)}
            className="mt-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Label className="cursor-pointer [&:has([data-state=checked])]:opacity-100">
                <RadioGroupItem value="Hadir" className="sr-only" />
                <Card
                  className={`relative p-4 transition-all hover:bg-muted/50 ${
                    attendance === "Hadir"
                      ? "border-primary bg-primary/10"
                      : "opacity-75"
                  }`}
                >
                  <CardTitle className="flex items-center gap-2">
                    Hadir
                    {attendance === "Hadir" && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CardTitle>
                </Card>
              </Label>

              <Label className="cursor-pointer [&:has([data-state=checked])]:opacity-100">
                <RadioGroupItem value="Tidak Hadir" className="sr-only" />
                <Card
                  className={`relative p-4 transition-all hover:bg-muted/50 ${
                    attendance === "Tidak Hadir"
                      ? "border-destructive bg-destructive/10"
                      : "opacity-75"
                  }`}
                >
                  <CardTitle className="flex items-center gap-2">
                    Tidak Hadir
                    {attendance === "Tidak Hadir" && (
                      <Check className="h-4 w-4 text-destructive" />
                    )}
                  </CardTitle>
                </Card>
              </Label>
            </div>
          </RadioGroup>

          {attendance === "Tidak Hadir" && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                By selecting "Cannot Attend", you will be marked as absent for
                this assessment.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!attendance || isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Submitting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
