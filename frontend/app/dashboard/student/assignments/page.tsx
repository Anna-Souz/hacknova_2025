"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarIcon, FileTextIcon, SearchIcon, UploadIcon } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/shared/empty-state"
import { type Assignment, AssignmentCard } from "@/components/shared/assignment-card"

export default function StudentAssignments() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const assignments: Assignment[] = [
    {
      id: 1,
      title: "Data Structures Assignment",
      description:
        "Implement a balanced binary search tree and analyze its time complexity for various operations. Submit a report with your implementation and analysis.",
      subject: "Computer Science",
      dueDate: "2025-03-15",
      status: "Pending",
    },
    {
      id: 2,
      title: "Network Analysis",
      description:
        "Analyze the given network topology and identify potential bottlenecks. Suggest improvements to enhance network performance and security.",
      subject: "Computer Networks",
      dueDate: "2025-03-18",
      status: "Submitted",
    },
    {
      id: 3,
      title: "Database Design Project",
      description:
        "Design and implement a database for a hospital management system. Include ER diagrams, schema design, and SQL queries for common operations.",
      subject: "DBMS",
      dueDate: "2025-03-20",
      status: "Pending",
    },
    {
      id: 4,
      title: "Operating Systems Lab",
      description:
        "Implement a simple process scheduler using any programming language of your choice. Compare its performance with standard scheduling algorithms.",
      subject: "Operating Systems",
      dueDate: "2025-03-12",
      status: "Late",
    },
    {
      id: 5,
      title: "Software Engineering Case Study",
      description:
        "Analyze the provided case study and identify the software development methodology used. Discuss its advantages and limitations.",
      subject: "Software Engineering",
      dueDate: "2025-03-25",
      status: "Pending",
    },
  ]

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (assignment.description && assignment.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const pendingAssignments = filteredAssignments.filter((a) => a.status === "Pending" || a.status === "Late")
  const submittedAssignments = filteredAssignments.filter((a) => a.status === "Submitted" || a.status === "Graded")

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">View and submit your assignments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Assignments</CardTitle>
            <CardDescription>Track and submit your assignments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="pending">
              <TabsList>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4 mt-4">
                {pendingAssignments.length > 0 ? (
                  pendingAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      actions={
                        <div className="flex justify-end">
                          <Button asChild>
                            <Link href={`/dashboard/student/assignments/${assignment.id}`}>
                              <UploadIcon className="mr-2 h-4 w-4" />
                              Submit Assignment
                            </Link>
                          </Button>
                        </div>
                      }
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={FileTextIcon}
                    title="No pending assignments"
                    description={searchQuery ? "Try a different search term" : "You're all caught up!"}
                  />
                )}
              </TabsContent>

              <TabsContent value="submitted" className="space-y-4 mt-4">
                {submittedAssignments.length > 0 ? (
                  submittedAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      actions={
                        <div className="flex justify-end">
                          <Button variant="outline" asChild>
                            <Link href={`/dashboard/student/assignments/${assignment.id}`}>View Submission</Link>
                          </Button>
                        </div>
                      }
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={FileTextIcon}
                    title="No submitted assignments"
                    description={
                      searchQuery ? "Try a different search term" : "You haven't submitted any assignments yet"
                    }
                  />
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      actions={
                        <div className="flex justify-end">
                          {assignment.status === "Pending" || assignment.status === "Late" ? (
                            <Button asChild>
                              <Link href={`/dashboard/student/assignments/${assignment.id}`}>
                                <UploadIcon className="mr-2 h-4 w-4" />
                                Submit Assignment
                              </Link>
                            </Button>
                          ) : (
                            <Button variant="outline" asChild>
                              <Link href={`/dashboard/student/assignments/${assignment.id}`}>View Submission</Link>
                            </Button>
                          )}
                        </div>
                      }
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={FileTextIcon}
                    title="No assignments found"
                    description="Try a different search term"
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Assignments due in the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingAssignments
                .filter((a) => {
                  const dueDate = new Date(a.dueDate)
                  const today = new Date()
                  const diffTime = dueDate.getTime() - today.getTime()
                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                  return diffDays <= 7 && diffDays >= 0
                })
                .map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h3 className="font-semibold">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Due: {assignment.dueDate}</span>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/dashboard/student/assignments/${assignment.id}`}>Submit</Link>
                      </Button>
                    </div>
                  </div>
                ))}

              {pendingAssignments.filter((a) => {
                const dueDate = new Date(a.dueDate)
                const today = new Date()
                const diffTime = dueDate.getTime() - today.getTime()
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                return diffDays <= 7 && diffDays >= 0
              }).length === 0 && (
                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-sm text-muted-foreground">No upcoming deadlines in the next 7 days</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

