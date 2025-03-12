"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { CalendarIcon, SearchIcon } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/shared/empty-state"
import { type Event, EventCard } from "@/components/shared/event-card"

export default function StudentEvents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false)

  // Mock data
  const events: Event[] = [
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
    {
      id: 4,
      title: "Cultural Night",
      description:
        "An evening of music, dance, and drama performances by students. Come and enjoy the diverse cultural talents of our college community.",
      startDate: "2025-03-18",
      time: "6:00 PM - 9:00 PM",
      location: "Open Air Theatre",
      organizer: "Cultural Committee",
      status: "Open",
      registrations: 150,
      capacity: 300,
    },
    {
      id: 5,
      title: "Sports Tournament",
      description:
        "Inter-department sports tournament featuring cricket, football, basketball, and volleyball. Form your team and register to participate.",
      startDate: "2025-04-01",
      endDate: "2025-04-10",
      location: "College Sports Complex",
      organizer: "Sports Committee",
      status: "Open",
      registrations: 200,
      capacity: 250,
    },
  ]

  const handleRegisterForEvent = (event: Event) => {
    setSelectedEvent(event)
    setShowRegistrationDialog(true)
  }

  const handleConfirmRegistration = () => {
    // In a real app, you would send this to the backend
    console.log(`Registered for event: ${selectedEvent?.title}`)
    setShowRegistrationDialog(false)
  }

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.organizer && event.organizer.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground">Discover and register for college events</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events happening in and around the college</CardDescription>
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
                <TabsTrigger value="open">Open for Registration</TabsTrigger>
                <TabsTrigger value="coming">Coming Soon</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredEvents.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        actions={
                          event.status === "Open" ? (
                            <Button className="w-full" onClick={() => handleRegisterForEvent(event)}>
                              Register
                            </Button>
                          ) : event.status === "Coming Soon" ? (
                            <Button className="w-full" disabled>
                              Registration Closed
                            </Button>
                          ) : null
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    title="No events found"
                    description={searchQuery ? "Try a different search term" : "No events available at the moment"}
                  />
                )}
              </TabsContent>

              <TabsContent value="open" className="space-y-4 mt-4">
                {filteredEvents.filter((event) => event.status === "Open").length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents
                      .filter((event) => event.status === "Open")
                      .map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          actions={
                            <Button className="w-full" onClick={() => handleRegisterForEvent(event)}>
                              Register
                            </Button>
                          }
                        />
                      ))}
                  </div>
                ) : (
                  <EmptyState title="No open events" description="Events open for registration will appear here" />
                )}
              </TabsContent>

              <TabsContent value="coming" className="space-y-4 mt-4">
                {filteredEvents.filter((event) => event.status === "Coming Soon").length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents
                      .filter((event) => event.status === "Coming Soon")
                      .map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          actions={
                            <Button className="w-full" disabled>
                              Registration Closed
                            </Button>
                          }
                        />
                      ))}
                  </div>
                ) : (
                  <EmptyState title="No upcoming events" description="Upcoming events will appear here" />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Event Registration Dialog */}
        <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register for Event</DialogTitle>
              <DialogDescription>Complete your registration for {selectedEvent?.title}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedEvent?.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent?.startDate}
                      {selectedEvent?.endDate &&
                        selectedEvent?.endDate !== selectedEvent?.startDate &&
                        ` - ${selectedEvent?.endDate}`}
                      {selectedEvent?.time && ` • ${selectedEvent?.time}`}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <p>
                    <strong>Location:</strong> {selectedEvent?.location}
                  </p>
                  <p>
                    <strong>Organizer:</strong> {selectedEvent?.organizer}
                  </p>
                  <p>
                    <strong>Available Spots:</strong>{" "}
                    {selectedEvent && selectedEvent.capacity - selectedEvent.registrations} of {selectedEvent?.capacity}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your full name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input id="rollNumber" placeholder="Enter your roll number" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRegistrationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmRegistration}>Confirm Registration</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

