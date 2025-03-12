"use client"

import { useState } from "react"
import { CalendarIcon, FileTextIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"

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
import { type Assignment, AssignmentCard } from "@/components/shared/assignment-card"
import type { Subject } from "@/components/shared/subject-card"

export default function FacultyAssignments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddAssignmentDialog, setShowAddAssignmentDialog] = useState(false)
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: "",
    description: "",
    subject: "",
    dueDate: "",
    semester: 1,
    division: "A",
  })

  // Mock data for subjects
  const subjects: Subject[] = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS101",
      semester: 3,
      division: "A",
      instructor: "Prof. Sarah Johnson",
      students: 35,
      department: "Computer Science",
    },
    {
      id: 2,
      name: "Computer Networks",
      code: "CS201",
      semester: 5,
      division: "B",
      instructor: "Prof. Sarah Johnson",
      students: 30,
      department: "Computer Science",
    },
    {
      id: 3,
      name: "Database Management",
      code: "CS301",
      semester: 4,
      division: "A",
      instructor: "Prof. Sarah Johnson",
      students: 32,
      department: "Computer Science",
    },
    {
      id: 4,
      name: "Operating Systems",
      code: "CS401",
      semester: 6,
      division: "C",
      instructor: "Prof. Sarah Johnson",
      students: 28,
      department: "Computer Science",
    },
  ]

  // Mock data for assignments
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Data Structures Assignment #3",
      description:
        "Implement a balanced binary search tree and analyze its time complexity for various operations. Submit a report with your implementation and analysis.",
      subject: "Data Structures",
      dueDate: "2025-03-15",
      submissionCount: 15,
      totalStudents: 35,
      semester: 3,
      division: "A",
      createdBy: "Prof. Sarah Johnson",
    },
    {
      id: 2,
      title: "Computer Networks Quiz",
      description:
        "Online quiz covering TCP/IP protocols, subnetting, and network security concepts. The quiz will be available for 24 hours starting from the due date.",
      subject: "Computer Networks",
      dueDate: "2025-03-18",
      submissionCount: 8,
      totalStudents: 30,
      semester: 5,
      division: "B",
      createdBy: "Prof. Sarah Johnson",
    },
    {
      id: 3,
      title: "Database Management Project",
      description:
        "Design and implement a database for a hospital management system. Include ER diagrams, schema design, and SQL queries for common operations.",
      subject: "Database Management",
      dueDate: "2025-03-20",
      submissionCount: 0,
      totalStudents: 32,
      semester: 4,
      division: "A",
      createdBy: "Prof. Sarah Johnson",
    },
  ])

  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.subject || !newAssignment.dueDate) return

    const assignment: Assignment = {
      id: Date.now(),
      title: newAssignment.title,
      description: newAssignment.description,
      subject: newAssignment.subject,
      dueDate: newAssignment.dueDate,
      submissionCount: 0,
      totalStudents: subjects.find((s) => s.name === newAssignment.subject)?.students || 0,
      semester: newAssignment.semester as number,
      division: newAssignment.division as string,
      createdBy: "Prof. Sarah Johnson",
    }

    setAssignments([assignment, ...assignments])
    setNewAssignment({
      title: "",
      description: "",
      subject: "",
      dueDate: "",
      semester: 1,
      division: "A",
    })
    setShowAddAssignmentDialog(false)
  }

  const handleDeleteAssignment = (id: string | number) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id))
  }

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (assignment.description && assignment.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground">Create and manage assignments for your classes</p>
          </div>
          <Button onClick={() => setShowAddAssignmentDialog(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Assignments</CardTitle>
              <CardDescription>Create, track, and grade student assignments</CardDescription>
            </div>
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

            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="drafts">Drafts</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4 mt-4">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment) => (
                    <AssignmentCard
                      key={assignment.id}
                      assignment={assignment}
                      variant="faculty"
                      actions={
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/dashboard/faculty/assignments/${assignment.id}`}>View Submissions</a>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteAssignment(assignment.id)}>
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      }
                    />
                  ))
                ) : (
                  <EmptyState
                    icon={FileTextIcon}
                    title="No assignments found"
                    description={
                      searchQuery ? "Try a different search term" : "Create your first assignment to get started"
                    }
                    action={{
                      label: "Create Assignment",
                      onClick: () => setShowAddAssignmentDialog(true),
                    }}
                  />
                )}
              </TabsContent>

              <TabsContent value="past">
                <EmptyState title="No past assignments" description="Past assignments will appear here" />
              </TabsContent>

              <TabsContent value="drafts">
                <EmptyState title="No draft assignments" description="Draft assignments will appear here" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Assignment Dialog */}
        <Dialog open={showAddAssignmentDialog} onOpenChange={setShowAddAssignmentDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>Create a new assignment for your students</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  placeholder="Enter assignment title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Assignment Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter assignment description"
                  rows={4}
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={newAssignment.subject}
                  onValueChange={(value) => {
                    const subject = subjects.find((s) => s.name === value)
                    setNewAssignment({
                      ...newAssignment,
                      subject: value,
                      semester: subject?.semester,
                      division: subject?.division,
                    })
                  }}
                >
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name} (Sem {subject.semester}, Div {subject.division})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dueDate"
                    type="date"
                    className="pl-10"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddAssignmentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAssignment}>Create Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

