"use client"

import { useState } from "react"
import { BookOpenIcon, GraduationCapIcon, SearchIcon, Trash2Icon, UserPlusIcon, UsersIcon } from "lucide-react"

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

interface Faculty {
  id: string | number
  name: string
  email: string
  employeeId: string
  department: string
  subjects: number
  students: number
  joinDate: string
  status: "Active" | "On Leave" | "Inactive"
  avatar?: string
}

export default function AdminFaculty() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddFacultyDialog, setShowAddFacultyDialog] = useState(false)
  const [newFaculty, setNewFaculty] = useState<Partial<Faculty>>({
    name: "",
    email: "",
    employeeId: "",
    department: "Computer Science",
    status: "Active",
    joinDate: new Date().toISOString().split("T")[0],
  })

  // Mock data
  const [facultyList, setFacultyList] = useState<Faculty[]>([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      employeeId: "FAC001",
      department: "Computer Science",
      subjects: 4,
      students: 120,
      joinDate: "2020-06-15",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Prof. Michael Williams",
      email: "michael.williams@example.com",
      employeeId: "FAC002",
      department: "Electronics",
      subjects: 3,
      students: 95,
      joinDate: "2018-08-10",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      email: "emily.davis@example.com",
      employeeId: "FAC003",
      department: "Information Technology",
      subjects: 4,
      students: 110,
      joinDate: "2019-07-22",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Prof. Robert Wilson",
      email: "robert.wilson@example.com",
      employeeId: "FAC004",
      department: "Mechanical",
      subjects: 3,
      students: 85,
      joinDate: "2017-05-18",
      status: "On Leave",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Dr. Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      employeeId: "FAC005",
      department: "Civil",
      subjects: 3,
      students: 90,
      joinDate: "2021-01-10",
      status: "Active",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.email || !newFaculty.employeeId) return

    const faculty: Faculty = {
      id: Date.now(),
      name: newFaculty.name,
      email: newFaculty.email,
      employeeId: newFaculty.employeeId,
      department: newFaculty.department || "Computer Science",
      subjects: 0,
      students: 0,
      joinDate: newFaculty.joinDate || new Date().toISOString().split("T")[0],
      status: newFaculty.status as "Active" | "On Leave" | "Inactive",
      avatar: "/placeholder.svg?height=40&width=40",
    }

    setFacultyList([...facultyList, faculty])
    setNewFaculty({
      name: "",
      email: "",
      employeeId: "",
      department: "Computer Science",
      status: "Active",
      joinDate: new Date().toISOString().split("T")[0],
    })
    setShowAddFacultyDialog(false)
  }

  const handleDeleteFaculty = (id: string | number) => {
    setFacultyList(facultyList.filter((faculty) => faculty.id !== id))
  }

  const filteredFaculty = facultyList.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const departmentCounts = facultyList.reduce(
    (acc, faculty) => {
      acc[faculty.department] = (acc[faculty.department] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Faculty Management</h1>
            <p className="text-muted-foreground">Manage faculty members and their information</p>
          </div>
          <Button onClick={() => setShowAddFacultyDialog(true)}>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            Add Faculty
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{facultyList.length}</div>
              <p className="text-xs text-muted-foreground">Across all departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Faculty</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{facultyList.filter((f) => f.status === "Active").length}</div>
              <p className="text-xs text-muted-foreground">
                {facultyList.filter((f) => f.status === "On Leave").length} on leave
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(departmentCounts).length}</div>
              <p className="text-xs text-muted-foreground">With faculty members</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Faculty Directory</CardTitle>
            <CardDescription>View and manage all faculty members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Faculty</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="onleave">On Leave</TabsTrigger>
                <TabsTrigger value="department">By Department</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredFaculty.length > 0 ? (
                  filteredFaculty.map((faculty) => (
                    <div
                      key={faculty.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={faculty.avatar} alt={faculty.name} />
                          <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{faculty.name}</h3>
                          <p className="text-sm text-muted-foreground">{faculty.email}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="outline">{faculty.employeeId}</Badge>
                            <Badge variant="secondary">{faculty.department}</Badge>
                            <Badge
                              className={
                                faculty.status === "Active"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : faculty.status === "On Leave"
                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {faculty.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                          <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{faculty.subjects} Subjects</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                          <UsersIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{faculty.students} Students</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/dashboard/admin/faculty/${faculty.id}`}>View Details</a>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteFaculty(faculty.id)}>
                          <Trash2Icon className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <EmptyState
                    icon={GraduationCapIcon}
                    title="No faculty found"
                    description={
                      searchQuery ? "Try a different search term" : "Add your first faculty member to get started"
                    }
                    action={{
                      label: "Add Faculty",
                      onClick: () => setShowAddFacultyDialog(true),
                    }}
                  />
                )}
              </TabsContent>

              <TabsContent value="active" className="space-y-4 mt-4">
                {filteredFaculty.filter((faculty) => faculty.status === "Active").length > 0 ? (
                  filteredFaculty
                    .filter((faculty) => faculty.status === "Active")
                    .map((faculty) => (
                      <div
                        key={faculty.id}
                        className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={faculty.avatar} alt={faculty.name} />
                            <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{faculty.name}</h3>
                            <p className="text-sm text-muted-foreground">{faculty.email}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="outline">{faculty.employeeId}</Badge>
                              <Badge variant="secondary">{faculty.department}</Badge>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{faculty.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{faculty.subjects} Subjects</span>
                          </div>
                          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                            <UsersIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{faculty.students} Students</span>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/dashboard/admin/faculty/${faculty.id}`}>View Details</a>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteFaculty(faculty.id)}>
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <EmptyState title="No active faculty" description="Active faculty members will appear here" />
                )}
              </TabsContent>

              <TabsContent value="onleave" className="space-y-4 mt-4">
                {filteredFaculty.filter((faculty) => faculty.status === "On Leave").length > 0 ? (
                  filteredFaculty
                    .filter((faculty) => faculty.status === "On Leave")
                    .map((faculty) => (
                      <div
                        key={faculty.id}
                        className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={faculty.avatar} alt={faculty.name} />
                            <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{faculty.name}</h3>
                            <p className="text-sm text-muted-foreground">{faculty.email}</p>
                            <div className="mt-1 flex items-center gap-2">
                              <Badge variant="outline">{faculty.employeeId}</Badge>
                              <Badge variant="secondary">{faculty.department}</Badge>
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{faculty.status}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{faculty.subjects} Subjects</span>
                          </div>
                          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-sm">
                            <UsersIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{faculty.students} Students</span>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/dashboard/admin/faculty/${faculty.id}`}>View Details</a>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteFaculty(faculty.id)}>
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))
                ) : (
                  <EmptyState title="No faculty on leave" description="Faculty members on leave will appear here" />
                )}
              </TabsContent>

              <TabsContent value="department" className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(departmentCounts).map(([department, count]) => (
                    <Card key={department}>
                      <CardHeader className="pb-2">
                        <CardTitle>{department}</CardTitle>
                        <CardDescription>{count} Faculty Members</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {filteredFaculty
                            .filter((faculty) => faculty.department === department)
                            .slice(0, 3)
                            .map((faculty) => (
                              <div key={faculty.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={faculty.avatar} alt={faculty.name} />
                                    <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{faculty.name}</span>
                                </div>
                                <Badge
                                  className={
                                    faculty.status === "Active"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : faculty.status === "On Leave"
                                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                        : "bg-red-100 text-red-800 hover:bg-red-100"
                                  }
                                >
                                  {faculty.status}
                                </Badge>
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

        {/* Add Faculty Dialog */}
        <Dialog open={showAddFacultyDialog} onOpenChange={setShowAddFacultyDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Faculty</DialogTitle>
              <DialogDescription>Add a new faculty member to the college</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter faculty name"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter faculty email"
                  value={newFaculty.email}
                  onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input
                  id="employeeId"
                  placeholder="Enter employee ID"
                  value={newFaculty.employeeId}
                  onChange={(e) => setNewFaculty({ ...newFaculty, employeeId: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newFaculty.department}
                    onValueChange={(value) => setNewFaculty({ ...newFaculty, department: value })}
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
                    value={newFaculty.status as string}
                    onValueChange={(value) =>
                      setNewFaculty({ ...newFaculty, status: value as "Active" | "On Leave" | "Inactive" })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinDate">Join Date</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={newFaculty.joinDate}
                  onChange={(e) => setNewFaculty({ ...newFaculty, joinDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddFacultyDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFaculty}>Add Faculty</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

