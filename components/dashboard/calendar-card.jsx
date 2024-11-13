"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export function CalendarCard() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">{currentMonth}</div>
          <Button variant="ghost" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-7 text-center text-sm">
          <div className="text-muted-foreground">Su</div>
          <div className="text-muted-foreground">Mo</div>
          <div className="text-muted-foreground">Tu</div>
          <div className="text-muted-foreground">We</div>
          <div className="text-muted-foreground">Th</div>
          <div className="text-muted-foreground">Fr</div>
          <div className="text-muted-foreground">Sa</div>
          {Array.from({ length: 35 }, (_, i) => (
            <div
              key={i}
              className={`p-2 ${
                i === 8
                  ? "rounded-md bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              {((i - 2) % 31) + 1}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}