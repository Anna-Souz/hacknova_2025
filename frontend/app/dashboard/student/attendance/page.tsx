"use client"

import { useState } from "react"
import { CalendarIcon, CheckIcon, ClockIcon, XIcon } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Subject {
  id: number
  name: string
  code: string
  instructor: string
  attendance: number
  classes: {
    date: string
    status: "present" | "absent"
    time?: string
  }[]
}

export default function StudentAttendance() {
  const [selectedMonth, setSelectedMonth] = useState("March")

  // Mock data
  const subjects: Subject[] = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS101",
      instructor: "Dr. Smith",
      attendance: 90,
      classes: [
        { date: "2025-03-10", status: "present", time: "10:00 AM - 11:00 AM" },
        { date: "2025-03-08", status: "present", time: "10:00 AM - 11:00 AM" },
        { date: "2025-03-06", status: "present", time: "10:00 AM - 11:00 AM" },
        { date: "2025-03-04", status: "absent", time: "10:00 AM - 11:00 AM" },
        { date: "2025-03-02", status: "present", time: "10:00 AM - 11:00 AM" },
      ],
    },
    {
      id: 2,
      name: "Computer Networks",
      code: "CS201",
      instructor: "Prof. Johnson",
      attendance: 85,
      classes: [
        { date: "2025-03-11", status: "present", time: "11:00 AM - 12:00 PM" },
        { date: "2025-03-09", status: "present", time: "11:00 AM - 12:00 PM" },
        { date: "2025-03-07", status: "absent", time: "11:00 AM - 12:00 PM" },
        { date: "2025-03-05", status: "present", time: "11:00 AM - 12:00 PM" },
        { date: "2025-03-03", status: "present", time: "11:00 AM - 12:00 PM" },
      ],
    },
    {
      id: 3,
      name: "Database Management",
      code: "CS301",
      instructor: "Dr. Williams",
      attendance: 78,
      classes: [
        { date: "2025-03-12", status: "present", time: "2:00 PM - 3:00 PM" },
        { date: "2025-03-10", status: "absent", time: "2:00 PM - 3:00 PM" },
        { date: "2025-03-08", status: "present", time: "2:00 PM - 3:00 PM" },
        { date: "2025-03-06", status: "present", time: "2:00 PM - 3:00 PM" },
        { date: "2025-03-04", status: "absent", time: "2:00 PM - 3:00 PM" },
      ],
    },
    {
      id: 4,
      name: "Operating Systems",
      code: "CS401",
      instructor: "Prof. Davis",
      attendance: 92,
      classes: [
        { date: "2025-03-13", status: "present", time: "9:00 AM - 10:00 AM" },
        { date: "2025-03-11", status: "present", time: "9:00 AM - 10:00 AM" },
        { date: "2025-03-09", status: "present", time: "9:00 AM - 10:00 AM" },
        { date: "2025-03-07", status: "present", time: "9:00 AM - 10:00 AM" },
        { date: "2025-03-05", status: "absent", time: "9:00 AM - 10:00 AM" },
      ],
    },
  ]

  const totalClasses = subjects.reduce((acc, subject) => acc + subject.classes.length, 0)
  const totalPresent = subjects.reduce(
    (acc, subject) => acc + subject.classes.filter((c) => c.status === "present").length,
    0,
  )
  const overallAttendance = Math.round((totalPresent / totalClasses) * 100)

  // Calculate attendance status
  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 85) return { label: "Good", color: "bg-green-100 text-green-800" }
    if (percentage >= 75) return { label: "Average", color: "bg-amber-100 text-amber-800" }
    return { label: "Low", color: "bg-red-100 text-red-800" }
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">Track your attendance across all subjects</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAttendance}%</div>
              <Progress value={overallAttendance} className="mt-2 h-2" />
              <p className="mt-2 text-xs text-muted-foreground">Across all subjects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClasses}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPresent}</div>
              <p className="text-xs text-muted-foreground">Out of {totalClasses}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{getAttendanceStatus(overallAttendance).label}</div>
                <Badge className={getAttendanceStatus(overallAttendance).color}>{overallAttendance}%</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Minimum required: 75%</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Your attendance across all subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January">January</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="April">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm">Present</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm">Absent</span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="subject-wise">
              <TabsList>
                <TabsTrigger value="subject-wise">Subject-wise</TabsTrigger>
                <TabsTrigger value="date-wise">Date-wise</TabsTrigger>
              </TabsList>

              <TabsContent value="subject-wise" className="space-y-6 mt-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {subject.name} ({subject.code})
                        </p>
                        <p className="text-sm text-muted-foreground">Instructor: {subject.instructor}</p>
                      </div>
                      <span
                        className={`font-medium ${
                          subject.attendance >= 85
                            ? "text-green-600"
                            : subject.attendance >= 75
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {subject.attendance}%
                      </span>
                    </div>
                    <Progress value={subject.attendance} className="h-2" />

                    <div className="mt-2 rounded-lg border p-3">
                      <h4 className="mb-2 text-sm font-medium">Recent Classes</h4>
                      <div className="space-y-2">
                        {subject.classes.slice(0, 3).map((cls, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {cls.status === "present" ? (
                                <CheckIcon className="h-4 w-4 text-green-600" />
                              ) : (
                                <XIcon className="h-4 w-4 text-red-600" />
                              )}
                              <div className="flex items-center gap-1 text-sm">
                                <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                <span>{cls.date}</span>
                              </div>
                            </div>
                            {cls.time && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <ClockIcon className="h-3.5 w-3.5" />
                                <span>{cls.time}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="date-wise" className="mt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-7 border-b p-2 text-center text-sm font-medium">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 p-2">
                    {/* Calendar days would be generated here */}
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i}
                        className={`aspect-square flex items-center justify-center rounded-md text-sm ${
                          i < 3 ? "text-muted-foreground" : ""
                        }`}
                      >
                        {i + 1 <= 31 ? i + 1 : ""}
                        {i + 1 >= 4 && i + 1 <= 31 && (
                          <div
                            className={`absolute bottom-1 h-1 w-1 rounded-full ${
                              Math.random() > 0.2 ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">Attendance Log</h4>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, index) => {
                      const date = new Date(2025, 2, 10 - index)
                      const isPresent = Math.random() > 0.2
                      return (
                        <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                          <div className="flex items-center gap-2">
                            {isPresent ? (
                              <div className="rounded-full bg-green-100 p-1">
                                <CheckIcon className="h-4 w-4 text-green-600" />
                              </div>
                            ) : (
                              <div className="rounded-full bg-red-100 p-1">
                                <XIcon className="h-4 w-4 text-red-600" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">
                                {date.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {isPresent ? "Present in" : "Absent from"} {Math.floor(Math.random() * 3) + 1} classes
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

