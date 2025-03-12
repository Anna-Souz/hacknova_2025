import { BookOpen, Calendar, FileText, GraduationCap, PieChart, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FacultyDashboard() {
  // Mock data
  const stats = [
    { title: "Total Students", value: "120", icon: Users, color: "bg-blue-500" },
    { title: "Subjects", value: "4", icon: BookOpen, color: "bg-green-500" },
    { title: "Assignments", value: "15", icon: FileText, color: "bg-purple-500" },
    { title: "Events", value: "2", icon: Calendar, color: "bg-amber-500" },
  ]

  const classes = [
    { id: 1, name: "Data Structures", semester: 3, division: "A", students: 35 },
    { id: 2, name: "Computer Networks", semester: 5, division: "B", students: 30 },
    { id: 3, name: "Database Management", semester: 4, division: "A", students: 32 },
    { id: 4, name: "Operating Systems", semester: 6, division: "C", students: 28 },
  ]

  const pendingTasks = [
    { id: 1, title: "Grade Data Structures Assignment", dueDate: "2025-03-15", priority: "High" },
    { id: 2, title: "Take Attendance for Computer Networks", dueDate: "Today", priority: "High" },
    { id: 3, title: "Prepare Quiz for Database Management", dueDate: "2025-03-18", priority: "Medium" },
  ]

  const recentActivities = [
    { id: 1, action: "Posted new assignment", subject: "Data Structures", time: "2 hours ago" },
    { id: 2, action: "Marked attendance", subject: "Computer Networks", time: "Yesterday" },
    { id: 3, action: "Updated grades", subject: "Database Management", time: "2 days ago" },
  ]

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your classes and tasks.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Create Assignment
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
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Pending Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle>Pending Tasks</CardTitle>
                  <CardDescription>Tasks that require your attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-2">
                      <span
                        className={`mt-1 h-2 w-2 rounded-full ${
                          task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Tasks
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your latest actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.subject}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Activity Log
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you might want to perform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <Users className="h-5 w-5" />
                    <span>Take Attendance</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <FileText className="h-5 w-5" />
                    <span>Create Assignment</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <GraduationCap className="h-5 w-5" />
                    <span>Update Grades</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <Calendar className="h-5 w-5" />
                    <span>Schedule Event</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Classes</CardTitle>
                <CardDescription>Subjects you are currently teaching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((cls) => (
                    <div
                      key={cls.id}
                      className="flex flex-col justify-between gap-2 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{cls.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Semester {cls.semester}, Division {cls.division} • {cls.students} Students
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          Attendance
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Assignments
                        </Button>
                        <Button size="sm">
                          <PieChart className="mr-2 h-4 w-4" />
                          Grades
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Manage assignments for your classes</CardDescription>
                </div>
                <Button size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  Create Assignment
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="mb-4">
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                    <TabsTrigger value="drafts">Drafts</TabsTrigger>
                  </TabsList>

                  <TabsContent value="active" className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="font-semibold">Data Structures Assignment #3</h3>
                          <p className="text-sm text-muted-foreground">Semester 3, Division A • Due: March 15, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                            15/35 Submitted
                          </span>
                          <Button size="sm" variant="outline">
                            View Submissions
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="font-semibold">Computer Networks Quiz</h3>
                          <p className="text-sm text-muted-foreground">Semester 5, Division B • Due: March 18, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                            8/30 Submitted
                          </span>
                          <Button size="sm" variant="outline">
                            View Submissions
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="font-semibold">Database Management Project</h3>
                          <p className="text-sm text-muted-foreground">Semester 4, Division A • Due: March 20, 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                            0/32 Submitted
                          </span>
                          <Button size="sm" variant="outline">
                            View Submissions
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="past">
                    <div className="rounded-lg border p-4 text-center text-muted-foreground">
                      Past assignments will appear here
                    </div>
                  </TabsContent>

                  <TabsContent value="drafts">
                    <div className="rounded-lg border p-4 text-center text-muted-foreground">
                      Draft assignments will appear here
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Attendance Management</CardTitle>
                  <CardDescription>Take and view attendance for your classes</CardDescription>
                </div>
                <Button size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Take Attendance
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="data-structures">
                  <TabsList className="mb-4">
                    {classes.map((cls) => (
                      <TabsTrigger key={cls.id} value={cls.name.toLowerCase().replace(/\s+/g, "-")}>
                        {cls.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="data-structures" className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h3 className="font-semibold">Data Structures</h3>
                        <p className="text-sm text-muted-foreground">Semester 3, Division A • 35 Students</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Average Attendance</p>
                        <p className="text-2xl font-bold text-green-600">92%</p>
                      </div>
                    </div>

                    <div className="rounded-lg border">
                      <div className="flex items-center justify-between border-b p-4">
                        <h3 className="font-semibold">Recent Attendance Records</h3>
                        <Button size="sm" variant="outline">
                          View All Records
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">March 10, 2025</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">32/35 Present</span>
                              <span className="font-medium text-green-600">91%</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="font-medium">March 8, 2025</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">34/35 Present</span>
                              <span className="font-medium text-green-600">97%</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="font-medium">March 6, 2025</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">30/35 Present</span>
                              <span className="font-medium text-green-600">86%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Other class tabs would be similar */}
                  <TabsContent value="computer-networks">
                    <div className="rounded-lg border p-4 text-center text-muted-foreground">
                      Attendance records for Computer Networks will appear here
                    </div>
                  </TabsContent>

                  <TabsContent value="database-management">
                    <div className="rounded-lg border p-4 text-center text-muted-foreground">
                      Attendance records for Database Management will appear here
                    </div>
                  </TabsContent>

                  <TabsContent value="operating-systems">
                    <div className="rounded-lg border p-4 text-center text-muted-foreground">
                      Attendance records for Operating Systems will appear here
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

