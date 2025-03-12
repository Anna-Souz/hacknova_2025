"use client"

import { useState } from "react"
import { Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Save, Search, X } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function FacultyAttendance() {
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [openClassSelector, setOpenClassSelector] = useState(false)

  // Mock data
  const classes = [
    { id: "cs101", name: "Data Structures", semester: 3, division: "A", students: 35 },
    { id: "cs201", name: "Computer Networks", semester: 5, division: "B", students: 30 },
    { id: "cs301", name: "Database Management", semester: 4, division: "A", students: 32 },
    { id: "cs401", name: "Operating Systems", semester: 6, division: "C", students: 28 },
  ]

  const students = [
    { id: 1, name: "John Doe", rollNumber: "CS2001", status: "present" },
    { id: 2, name: "Jane Smith", rollNumber: "CS2002", status: "present" },
    { id: 3, name: "Robert Johnson", rollNumber: "CS2003", status: "absent" },
    { id: 4, name: "Emily Davis", rollNumber: "CS2004", status: "present" },
    { id: 5, name: "Michael Wilson", rollNumber: "CS2005", status: "present" },
    { id: 6, name: "Sarah Brown", rollNumber: "CS2006", status: "absent" },
    { id: 7, name: "David Miller", rollNumber: "CS2007", status: "present" },
    { id: 8, name: "Jennifer Taylor", rollNumber: "CS2008", status: "present" },
    { id: 9, name: "James Anderson", rollNumber: "CS2009", status: "present" },
    { id: 10, name: "Lisa Thomas", rollNumber: "CS2010", status: "absent" },
  ]

  const attendanceHistory = [
    { date: "2025-03-10", present: 32, absent: 3, percentage: 91 },
    { date: "2025-03-08", present: 34, absent: 1, percentage: 97 },
    { date: "2025-03-06", present: 30, absent: 5, percentage: 86 },
    { date: "2025-03-04", present: 33, absent: 2, percentage: 94 },
    { date: "2025-03-02", present: 31, absent: 4, percentage: 89 },
  ]

  const [attendanceData, setAttendanceData] = useState(students)

  const handleStatusChange = (studentId: number, newStatus: "present" | "absent") => {
    setAttendanceData((prev) =>
      prev.map((student) => (student.id === studentId ? { ...student, status: newStatus } : student)),
    )
  }

  const handleMarkAll = (status: "present" | "absent") => {
    setAttendanceData((prev) => prev.map((student) => ({ ...student, status })))
  }

  const filteredStudents = attendanceData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedClassData = classes.find((cls) => cls.id === selectedClass)

  const presentCount = attendanceData.filter((student) => student.status === "present").length
  const absentCount = attendanceData.filter((student) => student.status === "absent").length
  const attendancePercentage = Math.round((presentCount / attendanceData.length) * 100)

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
            <p className="text-muted-foreground">Take and manage attendance for your classes</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Take Attendance</CardTitle>
              <CardDescription>Mark attendance for your class</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* Class Selector */}
                <div className="flex-1">
                  <Popover open={openClassSelector} onOpenChange={setOpenClassSelector}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openClassSelector}
                        className="w-full justify-between"
                      >
                        {selectedClass ? classes.find((cls) => cls.id === selectedClass)?.name : "Select class..."}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search class..." />
                        <CommandList>
                          <CommandEmpty>No class found.</CommandEmpty>
                          <CommandGroup>
                            {classes.map((cls) => (
                              <CommandItem
                                key={cls.id}
                                value={cls.id}
                                onSelect={(currentValue) => {
                                  setSelectedClass(currentValue === selectedClass ? "" : currentValue)
                                  setOpenClassSelector(false)
                                }}
                              >
                                <Check
                                  className={cn("mr-2 h-4 w-4", selectedClass === cls.id ? "opacity-100" : "opacity-0")}
                                />
                                <div className="flex flex-col">
                                  <span>{cls.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    Semester {cls.semester}, Division {cls.division}
                                  </span>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Date Selector */}
                <div className="flex-1">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {selectedClass ? (
                <>
                  <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {selectedClassData?.name} • Semester {selectedClassData?.semester}, Division{" "}
                        {selectedClassData?.division}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleMarkAll("present")}>
                        Mark All Present
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleMarkAll("absent")}>
                        Mark All Absent
                      </Button>
                    </div>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or roll number..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="rounded-lg border">
                    <div className="grid grid-cols-12 border-b p-3 font-medium">
                      <div className="col-span-1">#</div>
                      <div className="col-span-3">Roll No.</div>
                      <div className="col-span-5">Name</div>
                      <div className="col-span-3 text-right">Status</div>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {filteredStudents.map((student, index) => (
                        <div key={student.id} className="grid grid-cols-12 border-b p-3 last:border-0">
                          <div className="col-span-1">{index + 1}</div>
                          <div className="col-span-3">{student.rollNumber}</div>
                          <div className="col-span-5">{student.name}</div>
                          <div className="col-span-3 flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant={student.status === "present" ? "default" : "outline"}
                              className={student.status === "present" ? "bg-green-600 hover:bg-green-700" : ""}
                              onClick={() => handleStatusChange(student.id, "present")}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={student.status === "absent" ? "default" : "outline"}
                              className={student.status === "absent" ? "bg-red-600 hover:bg-red-700" : ""}
                              onClick={() => handleStatusChange(student.id, "absent")}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <h3 className="font-medium">No Class Selected</h3>
                    <p className="text-sm text-muted-foreground">Please select a class to take attendance</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm">
                  <span className="font-medium text-green-600">{presentCount}</span> Present
                </div>
                <div className="text-sm">
                  <span className="font-medium text-red-600">{absentCount}</span> Absent
                </div>
                <div className="text-sm">
                  <span className="font-medium">{attendancePercentage}%</span> Attendance
                </div>
              </div>
              <Button disabled={!selectedClass}>
                <Save className="mr-2 h-4 w-4" />
                Save Attendance
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>Recent attendance records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} (Sem {cls.semester}, Div {cls.division})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="space-y-2">
                {attendanceHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium">{record.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {record.present}/{record.present + record.absent} Present
                      </p>
                    </div>
                    <span
                      className={`font-medium ${
                        record.percentage >= 90
                          ? "text-green-600"
                          : record.percentage >= 75
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {record.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Records
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Analytics</CardTitle>
            <CardDescription>Attendance trends and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="students">Student-wise</TabsTrigger>
                <TabsTrigger value="dates">Date-wise</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Average Attendance</h3>
                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-3xl font-bold text-green-600">91%</span>
                      <span className="text-sm text-muted-foreground">Last 30 days</span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Students with 100% Attendance</h3>
                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-3xl font-bold">15</span>
                      <span className="text-sm text-muted-foreground">Out of 35</span>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Students Below 75%</h3>
                    <div className="mt-2 flex items-end justify-between">
                      <span className="text-3xl font-bold text-red-600">3</span>
                      <span className="text-sm text-muted-foreground">Need attention</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border p-4">
                  <h3 className="mb-4 font-medium">Monthly Attendance Trend</h3>
                  <div className="h-[200px] w-full bg-muted/50 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Attendance chart will be displayed here</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="students">
                <div className="rounded-lg border">
                  <div className="border-b p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search students..." className="pl-10" />
                    </div>
                  </div>
                  <div className="p-4 text-center text-muted-foreground">
                    Student-wise attendance data will be displayed here
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dates">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous Month
                  </Button>
                  <h3 className="font-medium">March 2025</h3>
                  <Button variant="outline" size="sm">
                    Next Month
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 p-4 text-center text-muted-foreground">
                  Date-wise attendance data will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

