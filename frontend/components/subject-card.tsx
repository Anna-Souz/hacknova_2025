import type React from "react"
import { BookOpenIcon, GraduationCapIcon, UsersIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface Subject {
  id: string | number
  name: string
  code?: string
  semester: number
  division: string
  instructor?: string
  students?: number
  description?: string
  credits?: number
  department?: string
}

interface SubjectCardProps {
  subject: Subject
  variant?: "default" | "compact" | "detailed"
  actions?: React.ReactNode
  className?: string
}

export function SubjectCard({ subject, variant = "default", actions, className }: SubjectCardProps) {
  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <div>
          <p className="font-medium">{subject.name}</p>
          <p className="text-sm text-muted-foreground">
            Semester {subject.semester}, Division {subject.division}
          </p>
        </div>
        {subject.students !== undefined && (
          <Badge variant="outline" className="flex items-center gap-1">
            <UsersIcon className="h-3 w-3" />
            {subject.students} Students
          </Badge>
        )}
      </div>
    )
  }

  if (variant === "detailed") {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <CardTitle>{subject.name}</CardTitle>
              <CardDescription>
                {subject.code && `${subject.code} • `}
                Semester {subject.semester}, Division {subject.division}
              </CardDescription>
            </div>
            {subject.credits !== undefined && <Badge variant="outline">{subject.credits} Credits</Badge>}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {subject.description && <p>{subject.description}</p>}

          <div className="grid gap-3 sm:grid-cols-2">
            {subject.instructor && (
              <div className="flex items-center gap-2">
                <GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Instructor</p>
                  <p className="text-sm text-muted-foreground">{subject.instructor}</p>
                </div>
              </div>
            )}

            {subject.students !== undefined && (
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Students</p>
                  <p className="text-sm text-muted-foreground">{subject.students} Enrolled</p>
                </div>
              </div>
            )}

            {subject.department && (
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Department</p>
                  <p className="text-sm text-muted-foreground">{subject.department}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {actions && <CardFooter>{actions}</CardFooter>}
      </Card>
    )
  }

  // Default variant
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{subject.name}</CardTitle>
        <CardDescription>
          Semester {subject.semester}, Division {subject.division}
          {subject.instructor && ` • Instructor: ${subject.instructor}`}
        </CardDescription>
      </CardHeader>
      {subject.description && (
        <CardContent>
          <p>{subject.description}</p>
        </CardContent>
      )}
      {actions && <CardFooter>{actions}</CardFooter>}
    </Card>
  )
}

