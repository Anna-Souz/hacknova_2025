"use client"

import { useState } from "react"
import { CalendarIcon, MapPinIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { EmptyState } from "@/components/shared/empty-state"
import { type Event, EventCard } from "@/components/shared/event-card"

export default function FacultyEvents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddEventDialog, setShowAddEventDialog] = useState(false)
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    time: "",
    location: "",
    status: "Coming Soon",
  })

  // Mock data
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Annual Tech Fest",
      description:
        "Join us for the annual technology festival featuring workshops, competitions, and guest lectures from industry experts. This is a great opportunity to showcase your skills and learn from the best in the field.",
      startDate: "2025-03-25",
      endDate: "2025-03-27",
      time: "9:00 AM - 5:00 PM",
      location: "College Main Auditorium",
      organizer: "Computer Science Department",
      status: "Open",
      registrations: 120,
      capacity: 200,
    },
    {
      id: 2,
      title: "Career Fair",
      description:
        "Connect with top companies and explore career opportunities. Bring your resume and be prepared for on-the-spot interviews. Professional attire is recommended.",
      startDate: "2025-04-05",
      time: "10:00 AM - 4:00 PM",
      location: "College Convention Center",
      organizer: "Placement Cell",
      status: "Open",
      registrations: 85,
      capacity: 150,
    },
    {
      id: 3,
      title: "Workshop on AI",
      description:
        "A comprehensive workshop on Artificial Intelligence and Machine Learning fundamentals. The workshop will cover basic concepts, algorithms, and hands-on sessions with popular frameworks.",
      startDate: "2025-04-12",
      time: "9:30 AM - 3:30 PM",
      location: "Computer Lab 3",
      organizer: "AI Club",
      status: "Coming Soon",
      registrations: 0,
      capacity: 50,
    },
  ])

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.startDate) return

    const event: Event = {
      id: Date.now(),
      title: newEvent.title,
      description: newEvent.description,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      time: newEvent.time,
      location: newEvent.location,
      organizer: "Prof. Sarah Johnson",
      status: newEvent.status as "Open" | "Closed" | "Coming Soon" | "In Progress" | "Completed",
      registrations: 0,
      capacity: 50,
    }

    setEvents([event, ...events])
    setNewEvent({
      title: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      time: "",
      location: "",
      status: "Coming Soon",
    })
    setShowAddEventDialog(false)
  }

  const handleDeleteEvent = (id: string | number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Events</h1>
            <p className="text-muted-foreground">Create and manage college events</p>
          </div>
          <Button onClick={() => setShowAddEventDialog(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create New Event
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Events</CardTitle>
            <CardDescription>Create, edit, and track college events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="coming">Coming Soon</TabsTrigger>
                <TabsTrigger value="closed">Closed/Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      variant="detailed"
                      actions={
                        <div className="flex justify-end">
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete Event
                          </Button>
                        </div>
                      }
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No events found"
                    description={searchQuery ? "Try a different search term" : "Create your first event to get started"}
                    action={{
                      label: "Create Event",
                      onClick: () => setShowAddEventDialog(true),
                    }}
                  />
                )}
              </TabsContent>

              <TabsContent value="open" className="space-y-4 mt-4">
                {filteredEvents.filter((event) => event.status === "Open" || event.status === "In Progress").length >
                0 ? (
                  filteredEvents
                    .filter((event) => event.status === "Open" || event.status === "In Progress")
                    .map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete Event
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState title="No open events" description="Open events will appear here" />
                )}
              </TabsContent>

              <TabsContent value="coming" className="space-y-4 mt-4">
                {filteredEvents.filter((event) => event.status === "Coming Soon").length > 0 ? (
                  filteredEvents
                    .filter((event) => event.status === "Coming Soon")
                    .map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete Event
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState title="No upcoming events" description="Upcoming events will appear here" />
                )}
              </TabsContent>

              <TabsContent value="closed" className="space-y-4 mt-4">
                {filteredEvents.filter((event) => event.status === "Closed" || event.status === "Completed").length >
                0 ? (
                  filteredEvents
                    .filter((event) => event.status === "Closed" || event.status === "Completed")
                    .map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete Event
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState title="No closed events" description="Closed or completed events will appear here" />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Event Dialog */}
        <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Create a new event for students to participate in</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter event description"
                  rows={4}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startDate"
                      type="date"
                      className="pl-10"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endDate"
                      type="date"
                      className="pl-10"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder="Enter location"
                      className="pl-10"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Event Status</Label>
                <Select
                  value={newEvent.status as string}
                  onValueChange={(value) => setNewEvent({ ...newEvent, status: value as Event["status"] })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEvent}>Create Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

