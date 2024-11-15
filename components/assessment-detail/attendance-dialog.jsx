"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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
} from "@/components/ui/dialog";

export function AttendanceDialog({ open, onOpenChange, onSubmit }) {
  const [attendance, setAttendance] = useState(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Attendance</DialogTitle>
          <DialogDescription>
            Please confirm your attendance for the assessment.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <RadioGroup
            value={attendance || ""}
            onValueChange={(value) => setAttendance(value)}
          >
            <div className="flex space-x-4">
              <Label className="flex-1 cursor-pointer">
                <RadioGroupItem value="Hadir" className="sr-only" />
                <Card
                  className={`relative p-4 ${
                    attendance === "Hadir"
                      ? "border-primary bg-primary/10"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <CardTitle>Hadir</CardTitle>
                  {attendance === "Hadir" && (
                    <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
                  )}
                </Card>
              </Label>
              <Label className="flex-1 cursor-pointer">
                <RadioGroupItem value="Tidak Hadir" className="sr-only" />
                <Card
                  className={`relative p-4 ${
                    attendance === "Tidak Hadir"
                      ? "border-destructive bg-destructive/10"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <CardTitle>Tidak Hadir</CardTitle>
                  {attendance === "Tidak Hadir" && (
                    <Check className="absolute right-2 top-2 h-4 w-4 text-destructive" />
                  )}
                </Card>
              </Label>
            </div>
          </RadioGroup>
          <Button
            onClick={() => onSubmit(attendance)}
            className="mt-4 w-full"
            disabled={!attendance}
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
