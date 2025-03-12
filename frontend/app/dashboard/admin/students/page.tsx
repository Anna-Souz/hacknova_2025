"use client"

import { useState } from "react"
import { BookOpenIcon, SearchIcon, Trash2Icon, UserPlusIcon, UsersIcon } from "lucide-react"

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
import { EmptyState } from "@/components/shared/empty-state"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Student {
  id: string | number
  name: string
  email: string
  rollNumber: string
  semester: number
  division: string
  department: string
  joinDate: string
  status: "Active" | "Inactive" | "Alumni"
  avatar?: string
}

export default function AdminStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false)
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: "",
    email: "",
    rollNumber: "",
    semester: 1,
    division: "A",
    department: "Computer Science",
    status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
  })

  // Mock data
  const [studentList, setStudentList] = useState<Student[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      rollNumber: "CS2001",
      semester: 3,
      division: "A",
      department: "Computer Science",
      joinDate: "2023-08-15",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      rollNumber: "CS2002",
      semester: 3,
      division: "A",
      department: "Computer Science",
      joinDate: "2023-08-15",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      rollNumber: "IT2001",
      semester: 5,
      division: "B",
      department: "Information Technology",
      joinDate: "2022-08-10",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      rollNumber: "EC2001",
      semester: 7,
      division: "A",
      department: "Electronics",
      joinDate: "2021-08-05",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      rollNumber: "ME2001",
      semester: 5,
      division: "C",
      department: "Mechanical",
      joinDate: "2022-08-10",
      status: "Inactive",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.rollNumber) return

    const student: Student = {
      id: Date.now(),
      name: newStudent.name,
      email: newStudent.email,
      rollNumber: newStudent.rollNumber,
      semester: newStudent.semester as number,
      division: newStudent.division as string,
      department: newStudent.department as string,
      joinDate: newStudent.joinDate as string,
      status: newStudent.status as "Active" | "Inactive" | "Alumni",
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setStudentList([...studentList, student])
    setNewStudent({
      name: "",
      email: "",
      rollNumber: "",
      semester: 1,
      division: "A",
      department: "Computer Science",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
    })
    setShowAddStudentDialog(false)
  }

  const handleDeleteStudent = (id: string | number) => {
    setStudentList(studentList.filter((student) => student.id !== id))
  }

  const filteredStudents = studentList.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const semesterCounts = studentList.reduce(
    (acc, student) => {
      acc[student.semester] = (acc[student.semester] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  const departmentCounts = studentList.reduce(
    (acc, student) => {
      acc[student.department] = (acc[student.department] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
            <p className="text-muted-foreground">Manage students and their information</p>
          </div>
          <Button onClick={() => setShowAddStudentDialog(true)}>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentList.length}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentList.filter((s) => s.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">
                {studentList.filter((s) => s.status === "Inactive").length} inactive
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(departmentCounts).length}</div>
              <p className="text-xs text-muted-foreground">With enrolled students</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Student Directory</CardTitle>
            <CardDescription>View and manage all students</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Students</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="semester">By Semester</TabsTrigger>
                <TabsTrigger value="department">By Department</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline">{student.rollNumber}</Badge>
                            <Badge variant="secondary">{student.department}</Badge>
                            <Badge
                              className={
                                student.status === "Active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : student.status === "Inactive"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {student.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                          <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                          <span>Semester {student.semester}</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                          <UsersIcon className="h-4 w-4 text-muted-foreground" />
                          <span>Division {student.division}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/dashboard/admin/students/${student.id}`}>View Details</a>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteStudent(student.id)}>
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    icon={UsersIcon}
                    title="No students found"
                    description={searchQuery ? "Try a different search term" : "Add your first student to get started"}
                    action={{
                      label: "Add Student",
                      onClick: () => setShowAddStudentDialog(true),
                    }}
                  />
                )}
              </TabsContent>

              <TabsContent value="active" className="space-y-4 mt-4">
                {filteredStudents.filter((student) => student.status === "Active").length > 0 ? (
                  filteredStudents
                    .filter((student) => student.status === "Active")
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{student.name}</h3>
                            <p className="text-sm text-muted-foreground">{student.email}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="outline">{student.rollNumber}</Badge>
                              <Badge variant="secondary">{student.department}</Badge>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{student.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                            <span>Semester {student.semester}</span>
                          </div>
                          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                            <UsersIcon className="h-4 w-4 text-muted-foreground" />
                            <span>Division {student.division}</span>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/dashboard/admin/students/${student.id}`}>View Details</a>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteStudent(student.id)}>
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <EmptyState title="No active students" description="Active students will appear here" />
                )}
              </TabsContent>

              <TabsContent value="semester" className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(semesterCounts).map(([semester, count]) => (
                    <Card key={semester}>
                      <CardHeader className="pb-2">
                        <CardTitle>Semester {semester}</CardTitle>
                        <CardDescription>{count} Students</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {filteredStudents
                            .filter((student) => student.semester === Number.parseInt(semester))
                            .slice(0, 3)
                            .map((student) => (
                              <div key={student.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={student.avatar} alt={student.name} />
                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{student.name}</span>
                                </div>
                                <Badge variant="outline">{student.rollNumber}</Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="department" className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(departmentCounts).map(([department, count]) => (
                    <Card key={department}>
                      <CardHeader className="pb-2">
                        <CardTitle>{department}</CardTitle>
                        <CardDescription>{count} Students</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {filteredStudents
                            .filter((student) => student.department === department)
                            .slice(0, 3)
                            .map((student) => (
                              <div key={student.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={student.avatar} alt={student.name} />
                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{student.name}</span>
                                </div>
                                <Badge variant="outline">Sem {student.semester}</Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Student Dialog */}
        <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Add a new student to the college</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter student name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter student email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="Enter roll number"
                  value={newStudent.rollNumber}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={newStudent.semester?.toString()}
                    onValueChange={(value) => setNewStudent({ ...newStudent, semester: Number.parseInt(value) })}
                  >
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="division">Division</Label>
                  <Select
                    value={newStudent.division}
                    onValueChange={(value) => setNewStudent({ ...newStudent, division: value })}
                  >
                    <SelectTrigger id="division">
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C", "D"].map((div) => (
                        <SelectItem key={div} value={div}>
                          Division {div}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newStudent.department}
                    onValueChange={(value) => setNewStudent({ ...newStudent, department: value })}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newStudent.status as string}
                    onValueChange={(value) =>
                      setNewStudent({ ...newStudent, status: value as "Active" | "Inactive" | "Alumni" })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Alumni">Alumni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={newStudent.joinDate}
                  onChange={(e) => setNewStudent({ ...newStudent, joinDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

