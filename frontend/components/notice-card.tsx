import type React from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export interface Notice {
  id: string | number
  title: string
  content: string
  date: string
  priority: "High" | "Medium" | "Low"
  author?: string
  department?: string
}

interface NoticeCardProps {
  notice: Notice
  variant?: "default" | "compact" | "detailed"
  actions?: React.ReactNode
  className?: string
}

export function NoticeCard({ notice, variant = "default", actions, className }: NoticeCardProps) {
  const priorityColor = {
    High: "bg-red-500",
    Medium: "bg-amber-500",
    Low: "bg-green-500",
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-start gap-2", className)}>
        <span className={`mt-1 h-2 w-2 rounded-full ${priorityColor[notice.priority]}`} />
        <div>
          <p className="font-medium">{notice.title}</p>
          <p className="text-sm text-muted-foreground">Posted on: {notice.date}</p>
        </div>
      </div>
    )
  }

  if (variant === "detailed") {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <span className={`mt-1.5 h-3 w-3 rounded-full ${priorityColor[notice.priority]}`} />
              <div>
                <CardTitle>{notice.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  {notice.date}
                  {notice.author && ` • By ${notice.author}`}
                  {notice.department && ` • ${notice.department}`}
                </CardDescription>
              </div>
            </div>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${
                notice.priority === "High"
                  ? "bg-red-100 text-red-800"
                  : notice.priority === "Medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {notice.priority} Priority
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{notice.content}</p>
        </CardContent>
        {actions && <CardFooter>{actions}</CardFooter>}
      </Card>
    )
  }

  // Default variant
  return (
    <div className={cn("rounded-lg border p-4", className)}>
      <div className="flex items-start gap-2">
        <span className={`mt-1 h-3 w-3 rounded-full ${priorityColor[notice.priority]}`} />
        <div>
          <h3 className="font-semibold">{notice.title}</h3>
          <p className="text-sm text-muted-foreground">Posted on: {notice.date}</p>
          <p className="mt-2">{notice.content}</p>
          {actions && <div className="mt-4">{actions}</div>}
        </div>
      </div>
    </div>
  )
}

