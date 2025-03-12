import type React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface Assignment {
  id: string | number
  title: string
  description?: string
  subject: string
  dueDate: string
  status?: "Pending" | "Submitted" | "Graded" | "Late"
  submissionCount?: number
  totalStudents?: number
  semester?: number
  division?: string
  createdBy?: string
}

interface AssignmentCardProps {
  assignment: Assignment
  variant?: "student" | "faculty" | "compact"
  actions?: React.ReactNode
  className?: string
}

export function AssignmentCard({ assignment, variant = "student", actions, className }: AssignmentCardProps) {
  const statusColors = {
    Pending: "bg-amber-100 text-amber-800",
    Submitted: "bg-green-100 text-green-800",
    Graded: "bg-blue-100 text-blue-800",
    Late: "bg-red-100 text-red-800",
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <div>
          <p className="font-medium">{assignment.title}</p>
          <p className="text-sm text-muted-foreground">{assignment.subject}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
          {assignment.status && (
            <span className={`rounded-full px-2 py-1 text-xs ${statusColors[assignment.status]}`}>
              {assignment.status}
            </span>
          )}
        </div>
      </div>
    )
  }

  if (variant === "faculty") {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <CardTitle>{assignment.title}</CardTitle>
              <CardDescription>
                {assignment.subject} • Semester {assignment.semester}, Division {assignment.division}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <CalendarIcon className="h-3 w-3" />
                Due: {assignment.dueDate}
              </Badge>
              {assignment.submissionCount !== undefined && assignment.totalStudents !== undefined && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  {assignment.submissionCount}/{assignment.totalStudents} Submitted
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        {assignment.description && (
          <CardContent>
            <p>{assignment.description}</p>
          </CardContent>
        )}
        {actions && <CardFooter>{actions}</CardFooter>}
      </Card>
    )
  }

  // Student variant (default)
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <CardTitle>{assignment.title}</CardTitle>
            <CardDescription>{assignment.subject}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              Due: {assignment.dueDate}
            </Badge>
            {assignment.status && <Badge className={cn(statusColors[assignment.status])}>{assignment.status}</Badge>}
          </div>
        </div>
      </CardHeader>
      {assignment.description && (
        <CardContent>
          <p>{assignment.description}</p>
        </CardContent>
      )}
      {actions && <CardFooter>{actions}</CardFooter>}
    </Card>
  )
}

