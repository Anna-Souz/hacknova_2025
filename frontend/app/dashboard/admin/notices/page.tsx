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
import { type Notice, NoticeCard } from "@/components/shared/notice-card"

export default function AdminNotices() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddNoticeDialog, setShowAddNoticeDialog] = useState(false)
  const [newNotice, setNewNotice] = useState<Partial<Notice>>({
    title: "",
    content: "",
    priority: "Medium",
    date: new Date().toISOString().split("T")[0],
    department: "All Departments",
  })

  // Mock data
  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: "Mid-Semester Examination Schedule",
      content:
        "The mid-semester examinations for all courses will be held from April 10-15, 2025. The detailed schedule will be posted on the department notice board. All students are required to bring their ID cards to the examination hall.",
      date: "2025-03-10",
      priority: "High",
      author: "Admin Office",
      department: "All Departments",
    },
    {
      id: 2,
      title: "Annual College Fest Registration Open",
      content:
        "Registrations for the annual college fest 'TechFusion 2025' are now open. Students interested in participating in various events can register through the college portal. Last date for registration is March 25, 2025.",
      date: "2025-03-08",
      priority: "Medium",
      author: "Cultural Committee",
      department: "All Departments",
    },
    {
      id: 3,
      title: "Library Timings Extended for Exams",
      content:
        "The college library will remain open from 8:00 AM to 10:00 PM during the examination period (April 5-20, 2025). Students are encouraged to utilize this facility for their exam preparations.",
      date: "2025-03-05",
      priority: "Low",
      author: "Library",
      department: "All Departments",
    },
    {
      id: 4,
      title: "Scholarship Application Deadline",
      content:
        "The last date to apply for the merit scholarship for the academic year 2025-26 is March 31, 2025. Eligible students are requested to submit their applications along with the required documents to the scholarship cell.",
      date: "2025-03-12",
      priority: "High",
      author: "Admin Office",
      department: "All Departments",
    },
    {
      id: 5,
      title: "Guest Lecture on AI and Machine Learning",
      content:
        "A guest lecture on 'Recent Advances in AI and Machine Learning' will be conducted by Dr. Robert Smith from Tech University on March 20, 2025, at 2:00 PM in the Main Auditorium. All students are encouraged to attend.",
      date: "2025-03-09",
      priority: "Medium",
      author: "Computer Science Department",
      department: "Computer Science",
    },
  ])

  const handleAddNotice = () => {
    if (!newNotice.title || !newNotice.content) return

    const notice: Notice = {
      id: Date.now(),
      title: newNotice.title,
      content: newNotice.content,
      date: newNotice.date || new Date().toISOString().split("T")[0],
      priority: newNotice.priority as "High" | "Medium" | "Low",
      author: "Admin Office",
      department: newNotice.department || "All Departments",
    }

    setNotices([notice, ...notices])
    setNewNotice({
      title: "",
      content: "",
      priority: "Medium",
      date: new Date().toISOString().split("T")[0],
      department: "All Departments",
    })
    setShowAddNoticeDialog(false)
  }

  const handleDeleteNotice = (id: string | number) => {
    setNotices(notices.filter((notice) => notice.id !== id))
  }

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notice.author && notice.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (notice.department && notice.department.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const departments = [
    "All Departments",
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical",
    "Civil",
  ]

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notice Board</h1>
            <p className="text-muted-foreground">Create and manage notices for the college</p>
          </div>
          <Button onClick={() => setShowAddNoticeDialog(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Notice
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notices.length}</div>
              <p className="text-xs text-muted-foreground">Active notices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notices.filter((n) => n.priority === "High").length}</div>
              <p className="text-xs text-muted-foreground">Urgent notices</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(notices.map((n) => n.department)).size}</div>
              <p className="text-xs text-muted-foreground">With active notices</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Notices</CardTitle>
            <CardDescription>Create, edit, and delete notices for students and faculty</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notices..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Notices</TabsTrigger>
                <TabsTrigger value="high">High Priority</TabsTrigger>
                <TabsTrigger value="medium">Medium Priority</TabsTrigger>
                <TabsTrigger value="low">Low Priority</TabsTrigger>
                <TabsTrigger value="department">By Department</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice) => (
                    <NoticeCard
                      key={notice.id}
                      notice={notice}
                      variant="detailed"
                      actions={
                        <div className="flex justify-end">
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteNotice(notice.id)}>
                            <Trash2Icon className="mr-2 h-4 w-4" />
                            Delete Notice
                          </Button>
                        </div>
                      }
                    />
                  ))
                ) : (
                  <EmptyState
                    title="No notices found"
                    description={
                      searchQuery ? "Try a different search term" : "Create your first notice to get started"
                    }
                    action={{
                      label: "Add Notice",
                      onClick: () => setShowAddNoticeDialog(true),
                    }}
                  />
                )}
              </TabsContent>

              <TabsContent value="high" className="space-y-4 mt-4">
                {filteredNotices.filter((notice) => notice.priority === "High").length > 0 ? (
                  filteredNotices
                    .filter((notice) => notice.priority === "High")
                    .map((notice) => (
                      <NoticeCard
                        key={notice.id}
                        notice={notice}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteNotice(notice.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete Notice
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState title="No high priority notices" description="High priority notices will appear here" />
                )}
              </TabsContent>

              <TabsContent value="medium" className="space-y-4 mt-4">
                {filteredNotices.filter((notice) => notice.priority === "Medium").length > 0 ? (
                  filteredNotices
                    .filter((notice) => notice.priority === "Medium")
                    .map((notice) => (
                      <NoticeCard
                        key={notice.id}
                        notice={notice}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteNotice(notice.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete Notice
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState
                    title="No medium priority notices"
                    description="Medium priority notices will appear here"
                  />
                )}
              </TabsContent>

              <TabsContent value="low" className="space-y-4 mt-4">
                {filteredNotices.filter((notice) => notice.priority === "Low").length > 0 ? (
                  filteredNotices
                    .filter((notice) => notice.priority === "Low")
                    .map((notice) => (
                      <NoticeCard
                        key={notice.id}
                        notice={notice}
                        variant="detailed"
                        actions={
                          <div className="flex justify-end">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteNotice(notice.id)}>
                              <Trash2Icon className="mr-2 h-4 w-4" />
                              Delete Notice
                            </Button>
                          </div>
                        }
                      />
                    ))
                ) : (
                  <EmptyState title="No low priority notices" description="Low priority notices will appear here" />
                )}
              </TabsContent>

              <TabsContent value="department" className="space-y-4 mt-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {departments.map((department) => {
                    const deptNotices = filteredNotices.filter((n) => n.department === department)
                    return (
                      <Card key={department}>
                        <CardHeader>
                          <CardTitle>{department}</CardTitle>
                          <CardDescription>{deptNotices.length} notices</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {deptNotices.slice(0, 3).map((notice) => (
                              <NoticeCard key={notice.id} notice={notice} variant="compact" />
                            ))}
                            {deptNotices.length > 3 && (
                              <Button variant="link" className="px-0">
                                View all {deptNotices.length} notices
                              </Button>
                            )}
                            {deptNotices.length === 0 && (
                              <p className="text-sm text-muted-foreground">No notices for this department</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Add Notice Dialog */}
        <Dialog open={showAddNoticeDialog} onOpenChange={setShowAddNoticeDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Notice</DialogTitle>
              <DialogDescription>Create a new notice to be displayed on the college notice board</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notice Title</Label>
                <Input
                  id="title"
                  placeholder="Enter notice title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Notice Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter notice content"
                  rows={5}
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newNotice.priority as string}
                    onValueChange={(value) =>
                      setNewNotice({ ...newNotice, priority: value as "High" | "Medium" | "Low" })
                    }
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newNotice.department}
                    onValueChange={(value) => setNewNotice({ ...newNotice, department: value })}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newNotice.date}
                    onChange={(e) => setNewNotice({ ...newNotice, date: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddNoticeDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNotice}>Add Notice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

