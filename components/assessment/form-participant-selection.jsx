import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ParticipantSelection({ formData, setFormData, candidates }) {
  // Filter out users who are already evaluators
  const availableParticipants = candidates?.filter(
    (candidate) =>
      !formData.evaluators?.some((e) => e.evaluatorId === candidate.id)
  );

  const handleParticipantSelect = (participantId) => {
    const numericId = parseInt(participantId);
    if (
      !formData.assessment.participants?.some(
        (p) => p.participantId === numericId
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        assessment: {
          ...prev.assessment,
          participants: [
            ...(prev.assessment.participants || []),
            {
              participantId: numericId,
              schedule: "",
            },
          ],
        },
      }));
    }
  };

  const handleRemoveParticipant = (participantId) => {
    setFormData((prev) => ({
      ...prev,
      assessment: {
        ...prev.assessment,
        participants: prev.assessment.participants.filter(
          (p) => p.participantId !== participantId
        ),
      },
    }));
  };

  const handleScheduleChange = (participantId, schedule) => {
    setFormData((prev) => ({
      ...prev,
      assessment: {
        ...prev.assessment,
        participants: prev.assessment.participants.map((p) =>
          p.participantId === participantId ? { ...p, schedule } : p
        ),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="participant">Pilih Participant</Label>
        <Select onValueChange={handleParticipantSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih participant" />
          </SelectTrigger>
          <SelectContent>
            {availableParticipants?.map((participant) => (
              <SelectItem
                key={participant.id}
                value={participant.id.toString()}
              >
                {participant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {!formData.assessment.participants?.length && (
        <p className="text-red-500">
          Please select at least one participant and set their schedule.
        </p>
      )}
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {formData.assessment.participants?.map((participant) => {
            const participantData = candidates?.find(
              (c) => c.id === participant.participantId
            );
            return (
              <Card key={participant.participantId}>
                <CardContent className="flex items-center p-4">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-2 ring-white">
                          <AvatarImage
                            src="/avatars/01.png"
                            alt={participantData.name}
                          />
                          <AvatarFallback>
                            {participantData?.name
                              ? participantData?.name.charAt(0)
                              : "JD"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">
                            {participantData?.name}
                          </h3>
                          {participantData?.jabatan && (
                            <p className="text-sm text-muted-foreground">
                              {participantData.jabatan}
                            </p>
                          )}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleRemoveParticipant(participant.participantId)
                        }
                        aria-label="Remove participant"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      type="datetime-local"
                      value={participant.schedule || ""}
                      onChange={(e) =>
                        handleScheduleChange(
                          participant.participantId,
                          e.target.value
                        )
                      }
                      className="mt-2"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ParticipantSelection;
