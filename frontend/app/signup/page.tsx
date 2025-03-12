"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/contexts/user-context"

export default function SignupPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "student"
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useUser()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    // Common fields
    name: "",
    email: "",
    password: "",
    profilePhoto: "",

    // Student specific fields
    semester: "",
    division: "",
    rollNumber: "",

    // Faculty specific fields
    employeeId: "",

    // Admin specific fields
    adminId: "",
    department: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would handle file upload to a storage service
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, profilePhoto: URL.createObjectURL(file) }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
      return
    }

    setIsLoading(true)

    // In a real app, you would register the user with a backend
    console.log("Registration data:", { ...formData, role })

    // Simulate API call delay
    setTimeout(() => {
      // Create user object with form data
      const userData = {
        id: Math.floor(Math.random() * 1000),
        name: formData.name,
        email: formData.email,
        role: role as "student" | "faculty" | "admin",
        avatar: formData.profilePhoto || "/placeholder.svg?height=40&width=40",
        lastLogin: new Date(),
        // Role-specific fields
        ...(role === "student" && {
          rollNumber: formData.rollNumber,
          semester: Number.parseInt(formData.semester) || 1,
          division: formData.division,
          department: formData.department || "Computer Science",
        }),
        ...(role === "faculty" && {
          employeeId: formData.employeeId,
          department: formData.department || "Computer Science",
        }),
        ...(role === "admin" && {
          adminId: formData.adminId,
          department: formData.department || "Administration",
        }),
      }

      // Update user context
      setUser(userData)

      // Show success toast
      toast({
        title: "Registration Successful",
        description: `Welcome to EduPortal, ${userData.name}!`,
        variant: "default",
      })

      setIsLoading(false)

      // Redirect to the appropriate dashboard
      router.push(`/dashboard/${role}`)
    }, 1500)
  }

  const roleTitle = {
    student: "Student Registration",
    faculty: "Faculty Registration",
    admin: "Admin Registration",
  }[role]

  const roleDescription = {
    student: "Create your student account to access courses and assignments",
    faculty: "Create your faculty account to manage classes and grades",
    admin: "Create your admin account to oversee college operations",
  }[role]

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to home</span>
              </Link>
            </Button>
            <CardTitle className="text-2xl">{roleTitle}</CardTitle>
          </div>
          <CardDescription>{roleDescription}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Tabs value={`step-${step}`} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="step-1" disabled={step !== 1}>
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="step-2" disabled={step !== 2}>
                  {role === "student" ? "Student Details" : role === "faculty" ? "Faculty Details" : "Admin Details"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="step-1" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profilePhoto">Profile Photo</Label>
                  <Input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </TabsContent>

              <TabsContent value="step-2" className="space-y-4 pt-4">
                {role === "student" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={formData.semester}
                        onValueChange={(value) => handleSelectChange("semester", value)}
                      >
                        <SelectTrigger>
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
                        value={formData.division}
                        onValueChange={(value) => handleSelectChange("division", value)}
                      >
                        <SelectTrigger>
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

                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">USN / Roll Number</Label>
                      <Input
                        id="rollNumber"
                        name="rollNumber"
                        placeholder="e.g., 1AB19CS001"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                )}

                {role === "faculty" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        name="employeeId"
                        placeholder="e.g., FAC001"
                        value={formData.employeeId}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil"].map(
                            (dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {role === "admin" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="adminId">Admin ID</Label>
                      <Input
                        id="adminId"
                        name="adminId"
                        placeholder="e.g., ADM001"
                        value={formData.adminId}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Administration", "Academics", "Finance", "IT"].map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {step === 1 ? (
              <Button type="submit" className="w-full">
                Continue
              </Button>
            ) : (
              <div className="flex w-full gap-2">
                <Button type="button" variant="outline" className="w-1/2" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="w-1/2" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Register"}
                </Button>
              </div>
            )}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href={`/login?role=${role}`} className="font-medium text-primary underline underline-offset-4">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

