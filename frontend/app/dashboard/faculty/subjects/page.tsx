"use client"

import { useState } from "react"
import { PlusIcon, SearchIcon, Trash2Icon } from "lucide-react"

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
import { type Subject, SubjectCard } from "@/components/shared/subject-card"

export default function FacultySubjects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddSubjectDialog, setShowAddSubjectDialog] = useState(false)
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    name: "",
    code: "",
    semester: 1,
    division: "A",
    description: "",
    credits: 4,
    department: "Computer Science",
  })

  // Mock data
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      name: "Data Structures",
      code: "CS101",
      semester: 3,
      division: "A",
      instructor: "Prof. Sarah Johnson",
      students: 35,
      description:
        "Introduction to data structures and algorithms. Topics include arrays, linked lists, stacks, queues, trees, graphs, and basic algorithm analysis.",
      credits: 4,
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
      description:
        "Fundamentals of computer networks, protocols, and network programming. Covers OSI model, TCP/IP, routing, and network security basics.",
      credits: 4,
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
      description:
        "Introduction to database concepts, design, and implementation. Covers relational model, SQL, normalization, and transaction management.",
      credits: 4,
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
      description:
        "Principles of operating systems design and implementation. Topics include process management, memory management, file systems, and security.",
      credits: 4,
      department: "Computer Science",
    },
  ])

  const handleAddSubject = () => {
    if (!newSubject.name || !newSubject.semester) return

    const subject: Subject = {
      id: Date.now(),
      name: newSubject.name,
      code: newSubject.code,
      semester: newSubject.semester as number,
      division: newSubject.division as string,
      instructor: "Prof. Sarah Johnson",
      students: 0,
      description: newSubject.description,
      credits: newSubject.credits,
      department: newSubject.department,
    }

    setSubjects([...subjects, subject])
    setNewSubject({
      name: "",
      code: "",
      semester: 1,
      division: "A",
      description: "",
      credits: 4,
      department: "Computer Science",
    })
    setShowAddSubjectDialog(false)
  }

  const handleDeleteSubject = (id: string | number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id))
  }

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (subject.code && subject.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (subject.description && subject.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
            <p className="text-muted-foreground">Manage your teaching subjects</p>
          </div>
          <Button onClick={() => setShowAddSubjectDialog(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Subject
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Subjects</CardTitle>
            <CardDescription>Subjects you are currently teaching</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                <TabsTrigger value="sem3">Semester 3</TabsTrigger>
                <TabsTrigger value="sem4">Semester 4</TabsTrigger>
                <TabsTrigger value="sem5">Semester 5+</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      variant="detailed"
                      actions={
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/dashboard/faculty/subjects/${subject.id}`}>View Details</a>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteSubject(subject.id)}>
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      }
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No subjects found"
                    description={searchQuery ? "Try a different search term" : "Add your first subject to get started"}
                    action={{
                      label: "Add Subject",
                      onClick: () => setShowAddSubjectDialog(true),
                    }}
                  />
                )}
              </TabsContent>

              <TabsContent value="sem3" className="space-y-4 mt-4">
                {filteredSubjects.filter((subject) => subject.semester === 3).length > 0 ? (
                  filteredSubjects
                    .filter((subject) => subject.semester === 3)
                    .map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/dashboard/faculty/subjects/${subject.id}`}>View Details</a>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteSubject(subject.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState title="No semester 3 subjects" description="Semester 3 subjects will appear here" />
                )}
              </TabsContent>

              <TabsContent value="sem4" className="space-y-4 mt-4">
                {filteredSubjects.filter((subject) => subject.semester === 4).length > 0 ? (
                  filteredSubjects
                    .filter((subject) => subject.semester === 4)
                    .map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/dashboard/faculty/subjects/${subject.id}`}>View Details</a>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteSubject(subject.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState title="No semester 4 subjects" description="Semester 4 subjects will appear here" />
                )}
              </TabsContent>

              <TabsContent value="sem5" className="space-y-4 mt-4">
                {filteredSubjects.filter((subject) => subject.semester >= 5).length > 0 ? (
                  filteredSubjects
                    .filter((subject) => subject.semester >= 5)
                    .map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a href={`/dashboard/faculty/subjects/${subject.id}`}>View Details</a>
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteSubject(subject.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState
                    title="No semester 5+ subjects"
                    description="Semester 5 and above subjects will appear here"
                  />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Subject Dialog */}
        <Dialog open={showAddSubjectDialog} onOpenChange={setShowAddSubjectDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
              <DialogDescription>Add a new subject to your teaching schedule</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Subject Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter subject name"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="code">Subject Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g., CS101"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={newSubject.semester?.toString()}
                    onValueChange={(value) => setNewSubject({ ...newSubject, semester: Number.parseInt(value) })}
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
                    value={newSubject.division}
                    onValueChange={(value) => setNewSubject({ ...newSubject, division: value })}
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
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    min="1"
                    max="6"
                    value={newSubject.credits?.toString()}
                    onChange={(e) => setNewSubject({ ...newSubject, credits: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newSubject.department}
                    onValueChange={(value) => setNewSubject({ ...newSubject, department: value })}
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter subject description"
                  rows={3}
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddSubjectDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSubject}>Add Subject</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

