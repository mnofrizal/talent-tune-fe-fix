import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecentAssessmentsTable({ assessments, loading }) {
  return (
    <Card className="rounded-2xl border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">
                  <Checkbox />
                </th>
                <th className="p-4 text-left font-medium">Nama</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-left font-medium">Tanggal</th>
                <th className="p-4 text-left font-medium">Assessment</th>
                <th className="p-4 text-left font-medium">Progress</th>
                <th className="p-4 text-left font-medium">Evaluators</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                assessments.map((item, index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="p-4">
                      <Checkbox />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${item.participant.name[0]}`}
                          />
                          <AvatarFallback>
                            {item.participant.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">
                            {item.participant.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.participant.jabatan}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium">
                        <div
                          className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                            item.attendanceConfirmation
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <span
                          className={
                            item.attendanceConfirmation
                              ? "text-green-500"
                              : "text-yellow-500"
                          }
                        >
                          {item.attendanceConfirmation ? "Hadir" : "Pending"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      {new Date(item.schedule).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm">{item.judul}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-blue-500"
                              style={{
                                width: `${
                                  (item.evaluations.filter(
                                    (e) => e.status === "COMPLETED"
                                  ).length /
                                    item.evaluations.length) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {Math.round(
                              (item.evaluations.filter(
                                (e) => e.status === "COMPLETED"
                              ).length /
                                item.evaluations.length) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex -space-x-2">
                        {item.evaluations.map((evaluation) => (
                          <Avatar
                            key={evaluation.id}
                            className="h-6 w-6 border-2 border-background"
                          >
                            <AvatarImage
                              src={`/placeholder.svg?height=24&width=24&text=${evaluation.evaluator.name[0]}`}
                            />
                            <AvatarFallback>
                              {evaluation.evaluator.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <tr key={index} className="border-b last:border-0">
          <td className="p-4">
            <Skeleton className="h-4 w-4" />
          </td>
          <td className="p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-1 h-3 w-24" />
              </div>
            </div>
          </td>
          <td className="p-4">
            <Skeleton className="h-6 w-16" />
          </td>
          <td className="p-4">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="p-4">
            <Skeleton className="h-4 w-32" />
          </td>
          <td className="p-4">
            <Skeleton className="h-2 w-full" />
          </td>
          <td className="p-4">
            <div className="flex -space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
