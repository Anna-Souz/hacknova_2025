import type React from "react"
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface Event {
  id: string | number
  title: string
  description?: string
  startDate: string
  endDate?: string
  time?: string
  location?: string
  organizer?: string
  status: "Open" | "Closed" | "Coming Soon" | "In Progress" | "Completed"
  registrations?: number
  capacity?: number
  image?: string
}

interface EventCardProps {
  event: Event
  variant?: "default" | "compact" | "detailed"
  actions?: React.ReactNode
  className?: string
}

export function EventCard({ event, variant = "default", actions, className }: EventCardProps) {
  const statusColors = {
    Open: "bg-green-100 text-green-800",
    Closed: "bg-red-100 text-red-800",
    "Coming Soon": "bg-amber-100 text-amber-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-gray-100 text-gray-800",
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        <div>
          <p className="font-medium">{event.title}</p>
          <p className="text-sm text-muted-foreground">{event.startDate}</p>
        </div>
        <Badge className={cn(statusColors[event.status])}>{event.status}</Badge>
      </div>
    )
  }

  if (variant === "detailed") {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.organizer && `Organized by ${event.organizer}`}</CardDescription>
            </div>
            <Badge className={cn(statusColors[event.status])}>{event.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {event.description && <p>{event.description}</p>}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-muted-foreground">
                  {event.startDate}
                  {event.endDate && event.endDate !== event.startDate && ` - ${event.endDate}`}
                </p>
              </div>
            </div>

            {event.time && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>
            )}

            {event.registrations !== undefined && event.capacity !== undefined && (
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Registrations</p>
                  <p className="text-sm text-muted-foreground">
                    {event.registrations}/{event.capacity} Registered
                  </p>
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
    <div className={cn("rounded-lg border p-3", className)}>
      <div className="flex justify-between">
        <div className="rounded bg-primary/10 p-2 text-primary">
          <CalendarIcon className="h-4 w-4" />
        </div>
        <Badge className={cn(statusColors[event.status])}>{event.status}</Badge>
      </div>
      <h3 className="mt-3 font-semibold">{event.title}</h3>
      <p className="text-sm text-muted-foreground">{event.startDate}</p>
      {actions && <div className="mt-3">{actions}</div>}
    </div>
  )
}

