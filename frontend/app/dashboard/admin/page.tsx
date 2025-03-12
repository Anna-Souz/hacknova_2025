import Link from "next/link"
import { BookOpen, Calendar, CreditCard, FileText, GraduationCap, PieChart, Users } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  // Mock data
  const stats = [
    { title: "Total Students", value: "850", icon: Users, color: "bg-blue-500" },
    { title: "Total Faculty", value: "45", icon: GraduationCap, color: "bg-green-500" },
    { title: "Departments", value: "8", icon: BookOpen, color: "bg-purple-500" },
    { title: "Fee Collection", value: "₹24.5L", icon: CreditCard, color: "bg-amber-500" },
  ]

  const recentPayments = [
    { id: 1, student: "John Doe", amount: "₹45,000", date: "2025-03-10", status: "Completed" },
    { id: 2, student: "Jane Smith", amount: "₹45,000", date: "2025-03-09", status: "Completed" },
    { id: 3, student: "Robert Johnson", amount: "₹45,000", date: "2025-03-08", status: "Pending" },
  ]

  const facultyList = [
    { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science", students: 120, subjects: 4 },
    { id: 2, name: "Prof. Michael Williams", department: "Electronics", students: 95, subjects: 3 },
    { id: 3, name: "Dr. Emily Davis", department: "Information Technology", students: 110, subjects: 4 },
  ]

  const departmentStats = [
    { id: 1, name: "Computer Science", students: 220, faculty: 12, color: "bg-blue-500" },
    { id: 2, name: "Electronics", students: 180, faculty: 10, color: "bg-green-500" },
    { id: 3, name: "Information Technology", students: 200, faculty: 11, color: "bg-purple-500" },
    { id: 4, name: "Mechanical", students: 150, faculty: 8, color: "bg-amber-500" },
  ]

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of the college operations.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
            <Button size="sm">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
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
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Department Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Statistics</CardTitle>
                  <CardDescription>Overview of departments, students, and faculty</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {departmentStats.map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${dept.color}`} />
                        <span className="font-medium">{dept.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Students</p>
                          <p className="font-medium">{dept.students}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Faculty</p>
                          <p className="font-medium">{dept.faculty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Departments
                  </Button>
                </CardFooter>
              </Card>

              {/* Recent Payments */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest fee payments by students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{payment.student}</p>
                        <p className="text-sm text-muted-foreground">Date: {payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <p
                          className={`text-sm ${payment.status === "Completed" ? "text-green-600" : "text-amber-600"}`}
                        >
                          {payment.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/dashboard/admin/payments">View All Payments</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <Users className="h-5 w-5" />
                    <span>Add Student</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <GraduationCap className="h-5 w-5" />
                    <span>Add Faculty</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <FileText className="h-5 w-5" />
                    <span>Create Notice</span>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-center justify-center gap-2 p-4">
                    <Calendar className="h-5 w-5" />
                    <span>Schedule Event</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faculty" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Faculty Management</CardTitle>
                  <CardDescription>View and manage faculty members</CardDescription>
                </div>
                <Button size="sm">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Add Faculty
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {facultyList.map((faculty) => (
                    <div
                      key={faculty.id}
                      className="flex flex-col justify-between gap-2 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{faculty.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {faculty.department} • {faculty.subjects} Subjects • {faculty.students} Students
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline">
                          <Users className="mr-2 h-4 w-4" />
                          View Students
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          View Subjects
                        </Button>
                        <Button size="sm">
                          <PieChart className="mr-2 h-4 w-4" />
                          Performance
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View All Faculty
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage students</CardDescription>
                </div>
                <Button size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Students</TabsTrigger>
                    <TabsTrigger value="department">By Department</TabsTrigger>
                    <TabsTrigger value="semester">By Semester</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Total Students</h3>
                          <p className="text-sm text-muted-foreground">Across all departments and semesters</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">850</p>
                      </div>
                    </div>

                    <div className="rounded-lg border">
                      <div className="flex items-center justify-between border-b p-4">
                        <h3 className="font-semibold">Student Directory</h3>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            Export
                          </Button>
                          <Button size="sm">Search</Button>
                        </div>
                      </div>
                      <div className="p-4 text-center text-muted-foreground">
                        Student directory will be displayed here
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="department">
                    <div className="rounded-lg border p-4 text-center text-muted-foreground">
                      Department-wise student breakdown will appear here
                    </div>
                  </TabsContent>

                  <TabsContent value="semester">
                    <div className="rounded-lg border p-4 text-center text-muted-foreground">
                      Semester-wise student breakdown will appear here
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Payment Management</CardTitle>
                  <CardDescription>Track and manage student fee payments</CardDescription>
                </div>
                <Button size="sm">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹24,50,000</div>
                        <p className="text-xs text-muted-foreground">+12% from last semester</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₹8,75,000</div>
                        <p className="text-xs text-muted-foreground">From 65 students</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">73%</div>
                        <Progress value={73} className="h-2" />
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-lg border">
                    <div className="flex items-center justify-between border-b p-4">
                      <h3 className="font-semibold">Recent Transactions</h3>
                      <Button size="sm" variant="outline">
                        View All
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="space-y-4">
                        {recentPayments.map((payment) => (
                          <div key={payment.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{payment.student}</p>
                              <p className="text-sm text-muted-foreground">Date: {payment.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{payment.amount}</p>
                              <p
                                className={`text-sm ${
                                  payment.status === "Completed" ? "text-green-600" : "text-amber-600"
                                }`}
                              >
                                {payment.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

