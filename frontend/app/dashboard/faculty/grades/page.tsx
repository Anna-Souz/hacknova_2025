"use client"

import { useState } from "react"
import { BookOpenIcon, PlusIcon, SaveIcon, SearchIcon } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Student {
  id: number
  name: string
  rollNumber: string
  avatar?: string
}

interface GradeItem {
  id: number
  title: string
  type: "Assignment" | "Quiz" | "Mid-Term" | "Final" | "Project"
  maxMarks: number
  weightage: number
}

interface Grade {
  studentId: number
  gradeItemId: number
  marks: number
  feedback?: string
  submittedOn?: string
  gradedOn?: string
}

interface Subject {
  id: number
  name: string
  code: string
  semester: number
  division: string
  students: Student[]
  gradeItems: GradeItem[]
  grades: Grade[]
}

export default function FacultyGrades() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null)
  const [selectedGradeItem, setSelectedGradeItem] = useState<number | null>(null)
  const [showAddGradeItemDialog, setShowAddGradeItemDialog] = useState(false)
  const [showUpdateGradesDialog, setShowUpdateGradesDialog] = useState(false)
  const [newGradeItem, setNewGradeItem] = useState<Partial<GradeItem>>({
    title: "",
    type: "Assignment",
    maxMarks: 100,
    weightage: 10,
  })
  const [updatedGrades, setUpdatedGrades] = useState<Record<number, number>>({})
  const [updatedFeedback, setUpdatedFeedback] = useState<Record<number, string>>({})

  // Mock data
  const subjects: Subject[] = [
    {
      id: 1,
      name: "Data Structures",
      code: "CS101",
      semester: 3,
      division: "A",
      students: [
        { id: 1, name: "John Doe", rollNumber: "CS2001", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 2, name: "Jane Smith", rollNumber: "CS2002", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 3, name: "Robert Johnson", rollNumber: "CS2003", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 4, name: "Emily Davis", rollNumber: "CS2004", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 5, name: "Michael Wilson", rollNumber: "CS2005", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      gradeItems: [
        { id: 1, title: "Assignment 1", type: "Assignment", maxMarks: 100, weightage: 10 },
        { id: 2, title: "Quiz 1", type: "Quiz", maxMarks: 50, weightage: 5 },
        { id: 3, title: "Mid-Term Exam", type: "Mid-Term", maxMarks: 100, weightage: 30 },
        { id: 4, title: "Assignment 2", type: "Assignment", maxMarks: 100, weightage: 10 },
      ],
      grades: [
        {
          studentId: 1,
          gradeItemId: 1,
          marks: 85,
          feedback: "Good work",
          submittedOn: "2025-03-05",
          gradedOn: "2025-03-08",
        },
        {
          studentId: 2,
          gradeItemId: 1,
          marks: 92,
          feedback: "Excellent",
          submittedOn: "2025-03-04",
          gradedOn: "2025-03-08",
        },
        {
          studentId: 3,
          gradeItemId: 1,
          marks: 78,
          feedback: "Needs improvement",
          submittedOn: "2025-03-06",
          gradedOn: "2025-03-08",
        },
        {
          studentId: 4,
          gradeItemId: 1,
          marks: 88,
          feedback: "Well done",
          submittedOn: "2025-03-05",
          gradedOn: "2025-03-08",
        },
        {
          studentId: 5,
          gradeItemId: 1,
          marks: 90,
          feedback: "Great job",
          submittedOn: "2025-03-03",
          gradedOn: "2025-03-08",
        },

        {
          studentId: 1,
          gradeItemId: 2,
          marks: 42,
          feedback: "Good",
          submittedOn: "2025-03-10",
          gradedOn: "2025-03-11",
        },
        {
          studentId: 2,
          gradeItemId: 2,
          marks: 48,
          feedback: "Excellent",
          submittedOn: "2025-03-10",
          gradedOn: "2025-03-11",
        },
        {
          studentId: 3,
          gradeItemId: 2,
          marks: 35,
          feedback: "Needs improvement",
          submittedOn: "2025-03-10",
          gradedOn: "2025-03-11",
        },
        {
          studentId: 4,
          gradeItemId: 2,
          marks: 44,
          feedback: "Well done",
          submittedOn: "2025-03-10",
          gradedOn: "2025-03-11",
        },
        {
          studentId: 5,
          gradeItemId: 2,
          marks: 46,
          feedback: "Great job",
          submittedOn: "2025-03-10",
          gradedOn: "2025-03-11",
        },

        {
          studentId: 1,
          gradeItemId: 3,
          marks: 75,
          feedback: "Good understanding",
          submittedOn: "2025-03-15",
          gradedOn: "2025-03-18",
        },
        {
          studentId: 2,
          gradeItemId: 3,
          marks: 88,
          feedback: "Excellent work",
          submittedOn: "2025-03-15",
          gradedOn: "2025-03-18",
        },
        {
          studentId: 3,
          gradeItemId: 3,
          marks: 65,
          feedback: "Needs to improve concepts",
          submittedOn: "2025-03-15",
          gradedOn: "2025-03-18",
        },
        {
          studentId: 4,
          gradeItemId: 3,
          marks: 78,
          feedback: "Good effort",
          submittedOn: "2025-03-15",
          gradedOn: "2025-03-18",
        },
        {
          studentId: 5,
          gradeItemId: 3,
          marks: 82,
          feedback: "Well done",
          submittedOn: "2025-03-15",
          gradedOn: "2025-03-18",
        },
      ],
    },
    {
      id: 2,
      name: "Computer Networks",
      code: "CS201",
      semester: 5,
      division: "B",
      students: [
        { id: 6, name: "Sarah Brown", rollNumber: "CS2006", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 7, name: "David Miller", rollNumber: "CS2007", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 8, name: "Jennifer Taylor", rollNumber: "CS2008", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 9, name: "James Anderson", rollNumber: "CS2009", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 10, name: "Lisa Thomas", rollNumber: "CS2010", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      gradeItems: [
        { id: 5, title: "Assignment 1", type: "Assignment", maxMarks: 100, weightage: 10 },
        { id: 6, title: "Quiz 1", type: "Quiz", maxMarks: 50, weightage: 5 },
      ],
      grades: [
        {
          studentId: 6,
          gradeItemId: 5,
          marks: 88,
          feedback: "Good work",
          submittedOn: "2025-03-08",
          gradedOn: "2025-03-10",
        },
        {
          studentId: 7,
          gradeItemId: 5,
          marks: 92,
          feedback: "Excellent",
          submittedOn: "2025-03-07",
          gradedOn: "2025-03-10",
        },
        {
          studentId: 8,
          gradeItemId: 5,
          marks: 85,
          feedback: "Well done",
          submittedOn: "2025-03-08",
          gradedOn: "2025-03-10",
        },
        {
          studentId: 9,
          gradeItemId: 5,
          marks: 78,
          feedback: "Good effort",
          submittedOn: "2025-03-09",
          gradedOn: "2025-03-10",
        },
        {
          studentId: 10,
          gradeItemId: 5,
          marks: 90,
          feedback: "Great job",
          submittedOn: "2025-03-06",
          gradedOn: "2025-03-10",
        },

        {
          studentId: 6,
          gradeItemId: 6,
          marks: 45,
          feedback: "Good",
          submittedOn: "2025-03-12",
          gradedOn: "2025-03-13",
        },
        {
          studentId: 7,
          gradeItemId: 6,
          marks: 48,
          feedback: "Excellent",
          submittedOn: "2025-03-12",
          gradedOn: "2025-03-13",
        },
        {
          studentId: 8,
          gradeItemId: 6,
          marks: 42,
          feedback: "Well done",
          submittedOn: "2025-03-12",
          gradedOn: "2025-03-13",
        },
        {
          studentId: 9,
          gradeItemId: 6,
          marks: 38,
          feedback: "Needs improvement",
          submittedOn: "2025-03-12",
          gradedOn: "2025-03-13",
        },
        {
          studentId: 10,
          gradeItemId: 6,
          marks: 46,
          feedback: "Great job",
          submittedOn: "2025-03-12",
          gradedOn: "2025-03-13",
        },
      ],
    },
  ]

  const handleAddGradeItem = () => {
    if (!selectedSubject || !newGradeItem.title || !newGradeItem.type) return

    // In a real app, you would send this to the backend
    console.log("Adding grade item:", {
      subjectId: selectedSubject,
      gradeItem: newGradeItem,
    })

    setShowAddGradeItemDialog(false)
    setNewGradeItem({
      title: "",
      type: "Assignment",
      maxMarks: 100,
      weightage: 10,
    })
  }

  const handleUpdateGrades = () => {
    if (!selectedSubject || !selectedGradeItem) return

    // In a real app, you would send this to the backend
    console.log("Updating grades:", {
      subjectId: selectedSubject,
      gradeItemId: selectedGradeItem,
      grades: updatedGrades,
      feedback: updatedFeedback,
    })

    setShowUpdateGradesDialog(false)
    setUpdatedGrades({})
    setUpdatedFeedback({})
  }

  const handleOpenUpdateGradesDialog = (gradeItemId: number) => {
    setSelectedGradeItem(gradeItemId)

    // Initialize with existing grades
    const subject = subjects.find((s) => s.id === selectedSubject)
    if (subject) {
      const initialGrades: Record<number, number> = {}
      const initialFeedback: Record<number, string> = {}

      subject.students.forEach((student) => {
        const grade = subject.grades.find((g) => g.studentId === student.id && g.gradeItemId === gradeItemId)
        if (grade) {
          initialGrades[student.id] = grade.marks
          initialFeedback[student.id] = grade.feedback || ""
        } else {
          initialGrades[student.id] = 0
          initialFeedback[student.id] = ""
        }
      })

      setUpdatedGrades(initialGrades)
      setUpdatedFeedback(initialFeedback)
    }

    setShowUpdateGradesDialog(true)
  }

  const getStudentOverallGrade = (subject: Subject, studentId: number) => {
    let totalWeightedMarks = 0
    let totalWeightage = 0

    subject.gradeItems.forEach((item) => {
      const grade = subject.grades.find((g) => g.studentId === studentId && g.gradeItemId === item.id)
      if (grade) {
        const percentage = (grade.marks / item.maxMarks) * 100
        totalWeightedMarks += percentage * item.weightage
        totalWeightage += item.weightage
      }
    })

    return totalWeightage > 0 ? Math.round(totalWeightedMarks / totalWeightage) : 0
  }

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-emerald-600"
    if (percentage >= 70) return "text-blue-600"
    if (percentage >= 60) return "text-amber-600"
    if (percentage >= 50) return "text-orange-600"
    return "text-red-600"
  }

  const getGradeLetter = (percentage: number) => {
    if (percentage >= 90) return "A+"
    if (percentage >= 85) return "A"
    if (percentage >= 80) return "A-"
    if (percentage >= 75) return "B+"
    if (percentage >= 70) return "B"
    if (percentage >= 65) return "B-"
    if (percentage >= 60) return "C+"
    if (percentage >= 55) return "C"
    if (percentage >= 50) return "C-"
    if (percentage >= 45) return "D"
    if (percentage >= 40) return "E"
    return "F"
  }

  const selectedSubjectData = selectedSubject ? subjects.find((s) => s.id === selectedSubject) : null

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Grades</h1>
            <p className="text-muted-foreground">Manage and update student grades</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Grade Management</CardTitle>
            <CardDescription>View and update grades for your subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={selectedSubject?.toString()}
              onValueChange={(value) => setSelectedSubject(Number.parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id.toString()}>
                    {subject.name} ({subject.code}) - Semester {subject.semester}, Division {subject.division}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedSubjectData ? (
              <Tabs defaultValue="grade-items">
                <TabsList>
                  <TabsTrigger value="grade-items">Grade Items</TabsTrigger>
                  <TabsTrigger value="student-grades">Student Grades</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="grade-items" className="space-y-4 mt-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Grade Components</h3>
                    <Button size="sm" onClick={() => setShowAddGradeItemDialog(true)}>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Grade Item
                    </Button>
                  </div>

                  <div className="rounded-lg border">
                    <div className="grid grid-cols-12 border-b p-3 font-medium">
                      <div className="col-span-4">Title</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Max Marks</div>
                      <div className="col-span-2">Weightage</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {selectedSubjectData.gradeItems.map((item) => (
                        <div key={item.id} className="grid grid-cols-12 p-3">
                          <div className="col-span-4">{item.title}</div>
                          <div className="col-span-2">
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                          <div className="col-span-2">{item.maxMarks}</div>
                          <div className="col-span-2">{item.weightage}%</div>
                          <div className="col-span-2 flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleOpenUpdateGradesDialog(item.id)}>
                              Update Grades
                            </Button>
                          </div>
                        </div>
                      ))}

                      {selectedSubjectData.gradeItems.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">No grade items added yet</div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="student-grades" className="space-y-4 mt-4">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="rounded-lg border">
                    <div className="grid grid-cols-12 border-b p-3 font-medium">
                      <div className="col-span-4">Student</div>
                      <div className="col-span-2">Roll Number</div>
                      <div className="col-span-4">Grade Breakdown</div>
                      <div className="col-span-2 text-right">Overall Grade</div>
                    </div>
                    <div className="divide-y">
                      {selectedSubjectData.students
                        .filter(
                          (student) =>
                            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()),
                        )
                        .map((student) => {
                          const overallGrade = getStudentOverallGrade(selectedSubjectData, student.id)
                          return (
                            <div key={student.id} className="grid grid-cols-12 p-3">
                              <div className="col-span-4 flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.avatar} alt={student.name} />
                                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{student.name}</span>
                              </div>
                              <div className="col-span-2 flex items-center">
                                <Badge variant="outline">{student.rollNumber}</Badge>
                              </div>
                              <div className="col-span-4 flex items-center">
                                <div className="w-full space-y-1">
                                  {selectedSubjectData.gradeItems.map((item) => {
                                    const grade = selectedSubjectData.grades.find(
                                      (g) => g.studentId === student.id && g.gradeItemId === item.id,
                                    )
                                    if (!grade) return null

                                    const percentage = Math.round((grade.marks / item.maxMarks) * 100)
                                    return (
                                      <div key={item.id} className="flex items-center justify-between text-xs">
                                        <span>{item.title}</span>
                                        <span className={getGradeColor(percentage)}>
                                          {grade.marks}/{item.maxMarks} ({percentage}%)
                                        </span>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                              <div className="col-span-2 flex items-center justify-end">
                                <div className="text-right">
                                  <div className={`text-lg font-bold ${getGradeColor(overallGrade)}`}>
                                    {getGradeLetter(overallGrade)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{overallGrade}%</div>
                                </div>
                              </div>
                            </div>
                          )
                        })}

                      {selectedSubjectData.students.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">No students found</div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6 mt-4">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Class Average</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.round(
                            selectedSubjectData.students.reduce(
                              (acc, student) => acc + getStudentOverallGrade(selectedSubjectData, student.id),
                              0,
                            ) / selectedSubjectData.students.length,
                          )}
                          %
                        </div>
                        <Progress
                          value={Math.round(
                            selectedSubjectData.students.reduce(
                              (acc, student) => acc + getStudentOverallGrade(selectedSubjectData, student.id),
                              0,
                            ) / selectedSubjectData.students.length,
                          )}
                          className="mt-2 h-2"
                        />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Highest Grade</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.max(
                            ...selectedSubjectData.students.map((student) =>
                              getStudentOverallGrade(selectedSubjectData, student.id),
                            ),
                          )}
                          %
                        </div>
                        <p className="text-xs text-muted-foreground">Top performer in class</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Grade Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {["A+", "A", "B+", "B", "C+", "C", "D", "F"].map((grade) => {
                            const count = selectedSubjectData.students.filter((student) => {
                              const percentage = getStudentOverallGrade(selectedSubjectData, student.id)
                              return getGradeLetter(percentage) === grade
                            }).length

                            return (
                              <div key={grade} className="flex items-center gap-2">
                                <div className="w-8 text-sm font-medium">{grade}</div>
                                <Progress value={(count / selectedSubjectData.students.length) * 100} className="h-2" />
                                <div className="w-8 text-sm text-muted-foreground">{count}</div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Grade Item</CardTitle>
                      <CardDescription>Average scores for each assessment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedSubjectData.gradeItems.map((item) => {
                          const grades = selectedSubjectData.grades.filter((g) => g.gradeItemId === item.id)
                          const average =
                            grades.length > 0
                              ? Math.round(grades.reduce((acc, g) => acc + g.marks, 0) / grades.length)
                              : 0
                          const percentage = Math.round((average / item.maxMarks) * 100)

                          return (
                            <div key={item.id} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">{item.title}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {item.type} • {item.weightage}% of total
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">
                                    {average}/{item.maxMarks}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{percentage}% average</div>
                                </div>
                              </div>
                              <Progress value={percentage} className="h-2" />
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <EmptyState
                icon={BookOpenIcon}
                title="No subject selected"
                description="Please select a subject to view and manage grades"
              />
            )}
          </CardContent>
        </Card>

        {/* Add Grade Item Dialog */}
        <Dialog open={showAddGradeItemDialog} onOpenChange={setShowAddGradeItemDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Grade Item</DialogTitle>
              <DialogDescription>Add a new assessment or exam to the grading system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Assignment 1, Mid-Term Exam"
                  value={newGradeItem.title}
                  onChange={(e) => setNewGradeItem({ ...newGradeItem, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newGradeItem.type}
                  onValueChange={(value) => setNewGradeItem({ ...newGradeItem, type: value as GradeItem["type"] })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Assignment">Assignment</SelectItem>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                    <SelectItem value="Final">Final</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Maximum Marks</Label>
                  <Input
                    id="maxMarks"
                    type="number"
                    min="1"
                    value={newGradeItem.maxMarks?.toString()}
                    onChange={(e) => setNewGradeItem({ ...newGradeItem, maxMarks: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weightage">Weightage (%)</Label>
                  <Input
                    id="weightage"
                    type="number"
                    min="1"
                    max="100"
                    value={newGradeItem.weightage?.toString()}
                    onChange={(e) => setNewGradeItem({ ...newGradeItem, weightage: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddGradeItemDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGradeItem}>Add Grade Item</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Update Grades Dialog */}
        <Dialog open={showUpdateGradesDialog} onOpenChange={setShowUpdateGradesDialog}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Update Grades</DialogTitle>
              <DialogDescription>Enter marks and feedback for each student</DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto py-4">
              <div className="space-y-4">
                {selectedSubjectData && selectedGradeItem && (
                  <>
                    <div className="rounded-lg bg-muted p-3">
                      <h3 className="font-medium">
                        {selectedSubjectData.gradeItems.find((i) => i.id === selectedGradeItem)?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Maximum Marks:{" "}
                        {selectedSubjectData.gradeItems.find((i) => i.id === selectedGradeItem)?.maxMarks}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {selectedSubjectData.students.map((student) => (
                        <div key={student.id} className="rounded-lg border p-3">
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{student.name}</h4>
                              <p className="text-sm text-muted-foreground">{student.rollNumber}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`marks-${student.id}`}>Marks</Label>
                              <Input
                                id={`marks-${student.id}`}
                                type="number"
                                min="0"
                                max={selectedSubjectData.gradeItems.find((i) => i.id === selectedGradeItem)?.maxMarks}
                                value={updatedGrades[student.id]?.toString() || "0"}
                                onChange={(e) =>
                                  setUpdatedGrades({
                                    ...updatedGrades,
                                    [student.id]: Number.parseInt(e.target.value),
                                  })
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`feedback-${student.id}`}>Feedback</Label>
                              <Input
                                id={`feedback-${student.id}`}
                                placeholder="Optional feedback"
                                value={updatedFeedback[student.id] || ""}
                                onChange={(e) =>
                                  setUpdatedFeedback({
                                    ...updatedFeedback,
                                    [student.id]: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUpdateGradesDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateGrades}>
                <SaveIcon className="mr-2 h-4 w-4" />
                Save Grades
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

