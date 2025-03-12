import Link from "next/link"
import { Calendar, FileText, GraduationCap, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentDashboard() {
  // Mock data
  const stats = [
    { title: "Attendance", value: "85%", icon: Users, color: "bg-blue-500" },
    { title: "Assignments", value: "12/15", icon: FileText, color: "bg-green-500" },
    { title: "Current GPA", value: "3.7", icon: GraduationCap, color: "bg-purple-500" },
    { title: "Upcoming Events", value: "3", icon: Calendar, color: "bg-amber-500" },
  ]

  const assignments = [
    {
      id: 1,
      title: "Data Structures Assignment",
      subject: "Computer Science",
      dueDate: "2025-03-15",
      status: "Pending",
    },
    { id: 2, title: "Network Analysis", subject: "Computer Networks", dueDate: "2025-03-18", status: "Submitted" },
    { id: 3, title: "Database Design Project", subject: "DBMS", dueDate: "2025-03-20", status: "Pending" },
  ]

  const notices = [
    { id: 1, title: "Mid-Semester Examination Schedule", date: "2025-03-10", priority: "High" },
    { id: 2, title: "Annual College Fest Registration Open", date: "2025-03-08", priority: "Medium" },
    { id: 3, title: "Library Timings Extended for Exams", date: "2025-03-05", priority: "Low" },
  ]

  const subjects = [
    { id: 1, name: "Data Structures", attendance: 90, instructor: "Dr. Smith" },
    { id: 2, name: "Computer Networks", attendance: 85, instructor: "Prof. Johnson" },
    { id: 3, name: "Database Management", attendance: 78, instructor: "Dr. Williams" },
    { id: 4, name: "Operating Systems", attendance: 92, instructor: "Prof. Davis" },
  ]

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your academic progress.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Academic Calendar
            </Button>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              View Assignments
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} rounded-full p-2 text-white`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="notices">Notices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Recent Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Assignments</CardTitle>
                  <CardDescription>Your latest assignments and their status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assignments.slice(0, 3).map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{assignment.title}</p>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            assignment.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/dashboard/student/assignments">View All Assignments</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Important Notices */}
              <Card>
                <CardHeader>
                  <CardTitle>Important Notices</CardTitle>
                  <CardDescription>Latest announcements from the college</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notices.map((notice) => (
                    <div key={notice.id} className="flex items-start gap-2">
                      <span
                        className={`mt-1 h-2 w-2 rounded-full ${
                          notice.priority === "High"
                            ? "bg-red-500"
                            : notice.priority === "Medium"
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{notice.title}</p>
                        <p className="text-sm text-muted-foreground">Posted on: {notice.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/dashboard/student/notices">View All Notices</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>College events you might be interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between">
                      <div className="rounded bg-primary/10 p-2 text-primary">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Open</span>
                    </div>
                    <h3 className="mt-3 font-semibold">Annual Tech Fest</h3>
                    <p className="text-sm text-muted-foreground">March 25-27, 2025</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Register
                    </Button>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between">
                      <div className="rounded bg-primary/10 p-2 text-primary">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Open</span>
                    </div>
                    <h3 className="mt-3 font-semibold">Career Fair</h3>
                    <p className="text-sm text-muted-foreground">April 5, 2025</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Register
                    </Button>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between">
                      <div className="rounded bg-primary/10 p-2 text-primary">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">Coming Soon</span>
                    </div>
                    <h3 className="mt-3 font-semibold">Workshop on AI</h3>
                    <p className="text-sm text-muted-foreground">April 12, 2025</p>
                    <Button variant="outline" size="sm" className="mt-3 w-full" disabled>
                      Registration Closed
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Assignments</CardTitle>
                <CardDescription>Track and submit your assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex flex-col justify-between gap-2 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                        <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            assignment.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {assignment.status}
                        </span>
                        <Button size="sm" variant={assignment.status === "Submitted" ? "outline" : "default"}>
                          {assignment.status === "Submitted" ? "View Submission" : "Submit"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Your attendance across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{subject.name}</p>
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
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Notices</CardTitle>
                <CardDescription>Important announcements from the college</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notices.map((notice) => (
                    <div key={notice.id} className="rounded-lg border p-4">
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1 h-3 w-3 rounded-full ${
                            notice.priority === "High"
                              ? "bg-red-500"
                              : notice.priority === "Medium"
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div>
                          <h3 className="font-semibold">{notice.title}</h3>
                          <p className="text-sm text-muted-foreground">Posted on: {notice.date}</p>
                          <p className="mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

