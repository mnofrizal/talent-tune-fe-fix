"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ParticipantInfo = ({ participant }) => {
  const InfoItem = ({ label, value }) => (
    <div className="space-y-1">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm font-semibold">{value}</dd>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Informasi Peserta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src="/placeholder.svg?height=80&width=80"
              alt={participant.name}
            />
            <AvatarFallback>
              {participant.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{participant.name}</h3>
            <p className="text-sm text-muted-foreground">
              {participant.jabatan}
            </p>
            <Badge variant="outline" className="mt-2">
              {participant.status}
            </Badge>
          </div>
        </div>
        <Separator className="my-4" />
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InfoItem label="NIP" value={participant.nip} />
          <InfoItem label="Sub Bidang" value={participant.bidang} />
          <InfoItem
            label="Proyeksi Jabatan"
            value={participant.proyeksi.replace(/_/g, " ")}
          />
          <InfoItem label="Assessment" value={participant.judul} />
        </dl>
      </CardContent>
    </Card>
  );
};

export default ParticipantInfo;
