import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from 'lucide-react';

export default function UpcomingAssessments({ assessments, loading }) {
  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm">
      <CardContent className="space-y-8 pt-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Upcoming Assessments</h3>
          <Card className="rounded-2xl border-gray-100 bg-gray-50 p-3 py-4 shadow-sm">
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 border-b pb-3 last:border-none">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-1 h-3 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : assessments.length === 0 ? (
                <div className="flex items-center space-x-4 rounded-2xl p-6 text-sm text-muted-foreground">
                  No upcoming assessments
                </div>
              ) : (
                assessments.map((assessment, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 border-b pb-3 last:border-none"
                  >
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=60&width=60&text=${assessment.participant.name[0]}`}
                      />
                      <AvatarFallback>{assessment.participant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">
                        {assessment.judul}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(assessment.schedule).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <Link
                href="/dashboard/rooms"
                className="flex w-full items-center justify-center rounded-full border border-primary py-2 text-primary hover:bg-primary/5 hover:text-primary"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Go to Room
              </Link>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

