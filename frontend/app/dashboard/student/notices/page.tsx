"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyState } from "@/components/shared/empty-state"
import { type Notice, NoticeCard } from "@/components/shared/notice-card"

export default function StudentNotices() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const notices: Notice[] = [
    {
      id: 1,
      title: "Mid-Semester Examination Schedule",
      content:
        "The mid-semester examinations for all courses will be held from April 10-15, 2025. The detailed schedule will be posted on the department notice board. All students are required to bring their ID cards to the examination hall.",
      date: "2025-03-10",
      priority: "High",
      author: "Prof. Sarah Johnson",
      department: "Computer Science",
    },
    {
      id: 2,
      title: "Annual College Fest Registration Open",
      content:
        "Registrations for the annual college fest 'TechFusion 2025' are now open. Students interested in participating in various events can register through the college portal. Last date for registration is March 25, 2025.",
      date: "2025-03-08",
      priority: "Medium",
      author: "Prof. Sarah Johnson",
      department: "Computer Science",
    },
    {
      id: 3,
      title: "Library Timings Extended for Exams",
      content:
        "The college library will remain open from 8:00 AM to 10:00 PM during the examination period (April 5-20, 2025). Students are encouraged to utilize this facility for their exam preparations.",
      date: "2025-03-05",
      priority: "Low",
      author: "Prof. Sarah Johnson",
      department: "Computer Science",
    },
    {
      id: 4,
      title: "Scholarship Application Deadline",
      content:
        "The last date to apply for the merit scholarship for the academic year 2025-26 is March 31, 2025. Eligible students are requested to submit their applications along with the required documents to the scholarship cell.",
      date: "2025-03-12",
      priority: "High",
      author: "Admin Office",
      department: "Administration",
    },
    {
      id: 5,
      title: "Guest Lecture on AI and Machine Learning",
      content:
        "A guest lecture on 'Recent Advances in AI and Machine Learning' will be conducted by Dr. Robert Smith from Tech University on March 20, 2025, at 2:00 PM in the Main Auditorium. All students are encouraged to attend.",
      date: "2025-03-09",
      priority: "Medium",
      author: "Prof. Michael Williams",
      department: "Computer Science",
    },
  ]

  const filteredNotices = notices.filter(
    (notice) =>
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notice.author && notice.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (notice.department && notice.department.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notice Board</h1>
          <p className="text-muted-foreground">View important announcements from the college</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Notices</CardTitle>
            <CardDescription>Important announcements from the college</CardDescription>
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
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice) => <NoticeCard key={notice.id} notice={notice} variant="detailed" />)
                ) : (
                  <EmptyState
                    title="No notices found"
                    description={searchQuery ? "Try a different search term" : "No notices available at the moment"}
                  />
                )}
              </TabsContent>

              <TabsContent value="high" className="space-y-4 mt-4">
                {filteredNotices.filter((notice) => notice.priority === "High").length > 0 ? (
                  filteredNotices
                    .filter((notice) => notice.priority === "High")
                    .map((notice) => <NoticeCard key={notice.id} notice={notice} variant="detailed" />)
                ) : (
                  <EmptyState title="No high priority notices" description="High priority notices will appear here" />
                )}
              </TabsContent>

              <TabsContent value="medium" className="space-y-4 mt-4">
                {filteredNotices.filter((notice) => notice.priority === "Medium").length > 0 ? (
                  filteredNotices
                    .filter((notice) => notice.priority === "Medium")
                    .map((notice) => <NoticeCard key={notice.id} notice={notice} variant="detailed" />)
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
                    .map((notice) => <NoticeCard key={notice.id} notice={notice} variant="detailed" />)
                ) : (
                  <EmptyState title="No low priority notices" description="Low priority notices will appear here" />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

