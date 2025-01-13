import { Card, CardContent } from "@/components/ui/card";
import { Tally1Icon } from 'lucide-react';

const jobVacancies = [
  "Assistant Manager Sistem Informasi",
  "Manager Pengadaan Barang dan Jasa",
  "Officer Perencanaan Unit Kerja",
];

export default function UpcomingJobVacancies() {
  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm">
      <CardContent className="space-y-8 pt-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Upcoming Job Vacancies</h3>
          <div className="space-y-2">
            {jobVacancies.map((job, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
              >
                <div className="flex items-center gap-2">
                  <Tally1Icon className="h-5 w-5 text-gray-400" />
                  <h4 className="text-sm font-medium">{job}</h4>
                </div>
                <span className="inline-flex items-center rounded-lg bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                  Retirement
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

