"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { CalendarIcon, CheckCircleIcon, FileIcon, UploadCloudIcon } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import type { Assignment } from "@/components/shared/assignment-card"

export default function AssignmentSubmissionPage() {
  const params = useParams()
  const router = useRouter()
  const assignmentId = params.id

  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [comments, setComments] = useState("")

  // Mock data - in a real app, you would fetch this based on the ID
  const assignments: Record<string | number, Assignment> = {
    "1": {
      id: 1,
      title: "Data Structures Assignment",
      description:
        "Implement a balanced binary search tree and analyze its time complexity for various operations. Submit a report with your implementation and analysis.",
      subject: "Computer Science",
      dueDate: "2025-03-15",
      status: "Pending",
    },
    "2": {
      id: 2,
      title: "Network Analysis",
      description:
        "Analyze the given network topology and identify potential bottlenecks. Suggest improvements to enhance network performance and security.",
      subject: "Computer Networks",
      dueDate: "2025-03-18",
      status: "Submitted",
    },
    "3": {
      id: 3,
      title: "Database Design Project",
      description:
        "Design and implement a database for a hospital management system. Include ER diagrams, schema design, and SQL queries for common operations.",
      subject: "DBMS",
      dueDate: "2025-03-20",
      status: "Pending",
    },
    "4": {
      id: 4,
      title: "Operating Systems Lab",
      description:
        "Implement a simple process scheduler using any programming language of your choice. Compare its performance with standard scheduling algorithms.",
      subject: "Operating Systems",
      dueDate: "2025-03-12",
      status: "Late",
    },
    "5": {
      id: 5,
      title: "Software Engineering Case Study",
      description:
        "Analyze the provided case study and identify the software development methodology used. Discuss its advantages and limitations.",
      subject: "Software Engineering",
      dueDate: "2025-03-25",
      status: "Pending",
    },
  }

  const assignment = assignments[assignmentId as string]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would upload the file and submit the assignment
    console.log("Submitting assignment:", {
      assignmentId,
      file: selectedFile,
      comments,
    })

    setShowSuccessDialog(true)
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
    router.push("/dashboard/student/assignments")
  }

  if (!assignment) {
    return (
      <DashboardLayout role="student">
        <div className="flex h-[50vh] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Assignment not found</h2>
            <p className="text-muted-foreground">
              The assignment you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-4" onClick={() => router.push("/dashboard/student/assignments")}>
              Back to Assignments
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const isSubmitted = assignment.status === "Submitted" || assignment.status === "Graded"

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{assignment.title}</h1>
            <p className="text-muted-foreground">{assignment.subject}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md bg-muted px-3 py-1">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>Due: {assignment.dueDate}</span>
            </div>
            <div
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                assignment.status === "Pending"
                  ? "bg-amber-100 text-amber-800"
                  : assignment.status === "Submitted"
                    ? "bg-green-100 text-green-800"
                    : assignment.status === "Late"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
              }`}
            >
              {assignment.status}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
            <CardDescription>Information about the assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p className="mt-1">{assignment.description}</p>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Submission Guidelines</h3>
                <ul className="mt-2 space-y-2 pl-6 text-sm">
                  <li>Submit your work as a single PDF or ZIP file.</li>
                  <li>Include your name and roll number in the file name.</li>
                  <li>Make sure your code is well-commented if submitting code.</li>
                  <li>Include a README file if submitting multiple files.</li>
                  <li>Late submissions may be penalized as per course policy.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {isSubmitted ? (
          <Card>
            <CardHeader>
              <CardTitle>Submission Details</CardTitle>
              <CardDescription>Your submission for this assignment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <FileIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Assignment_Submission.pdf</h3>
                    <p className="text-sm text-muted-foreground">Submitted on: March 15, 2025</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>

                <div>
                  <h3 className="font-medium">Submission Comments</h3>
                  <p className="mt-1 text-sm">
                    This is my submission for the assignment. I've implemented a balanced binary search tree and
                    analyzed its time complexity for various operations.
                  </p>
                </div>

                {assignment.status === "Graded" && (
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Feedback</h3>
                    <p className="mt-1 text-sm">
                      Good work on the implementation. Your analysis is thorough and well-explained. Consider optimizing
                      the deletion operation in future implementations.
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Grade:</span>
                      <span className="font-medium">85/100</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Submit Assignment</CardTitle>
              <CardDescription>Upload your work for this assignment</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-6">
                    <UploadCloudIcon className="mb-2 h-8 w-8 text-muted-foreground" />
                    <p className="mb-2 text-sm font-medium">Drag and drop your file here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supported formats: PDF, ZIP, DOC, DOCX (Max 10MB)</p>
                    <Input
                      id="file"
                      type="file"
                      className="mt-4 w-full max-w-xs"
                      onChange={handleFileChange}
                      required
                    />
                    {selectedFile && (
                      <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted p-2">
                        <FileIcon className="h-4 w-4" />
                        <span className="text-sm">{selectedFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comments">Comments (Optional)</Label>
                  <Textarea
                    id="comments"
                    placeholder="Add any comments about your submission"
                    rows={4}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto">
                  Submit Assignment
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Assignment Submitted</DialogTitle>
              <DialogDescription>Your assignment has been successfully submitted.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mt-4 text-xl font-semibold">Submission Successful!</h2>
              <p className="mt-2 text-center text-muted-foreground">
                Your assignment has been submitted successfully. You can view your submission status on the assignments
                page.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseSuccessDialog} className="w-full">
                Back to Assignments
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

