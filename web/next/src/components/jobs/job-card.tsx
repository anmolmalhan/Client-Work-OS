import { jobCategoryLabels, type JobPost } from "@wdsc/domain";
import { Building2, CalendarClock, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { applyDeadlineLabel, formatDate } from "@/lib/format";

const deadlineVariant = {
  open: "success",
  soon: "warning",
  closed: "muted",
} as const;

export function JobCard({ job, index = 0 }: { job: JobPost; index?: number }) {
  const deadline = applyDeadlineLabel(job.applyEndDate);

  return (
    <Card
      className="color-strip soft-card stagger-card h-full gap-0 pt-1.5"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <Badge>{jobCategoryLabels[job.category]}</Badge>
          {deadline ? (
            <Badge variant={deadlineVariant[deadline.tone]}>
              <CalendarClock aria-hidden="true" />
              {deadline.text}
            </Badge>
          ) : null}
        </div>
        <h3 className="text-lg font-bold leading-6">
          <Link href={`/sarkari-result/${job.slug}`} className="focus-ring rounded hover:text-[var(--trust-dark)]">
            {job.title}
          </Link>
        </h3>
        <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <Building2 className="size-4 shrink-0" aria-hidden="true" />
          {job.organization}
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-3">
        <p className="flex-1 text-sm leading-6 text-muted-foreground">
          {job.shortInfo.length > 140 ? `${job.shortInfo.slice(0, 140)}…` : job.shortInfo}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground">
          {typeof job.vacancies === "number" ? (
            <span className="inline-flex items-center gap-1">
              <Users className="size-4" aria-hidden="true" />
              {job.vacancies.toLocaleString("en-IN")} posts
            </span>
          ) : null}
          {job.applyEndDate ? <span>Last date: {formatDate(job.applyEndDate)}</span> : null}
        </div>
      </CardContent>
      <CardFooter className="pt-5">
        <Button asChild className="w-full">
          <Link href={`/sarkari-result/${job.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
