"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@/contexts/user-context"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "student"
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useUser()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you would authenticate with a backend
    console.log("Login attempt:", { ...formData, role })

    // Simulate API call delay
    setTimeout(() => {
      // Mock user data based on role
      const userData = {
        id: Math.floor(Math.random() * 1000),
        name: role === "student" ? "John Doe" : role === "faculty" ? "Prof. Sarah Johnson" : "Admin User",
        email: formData.email,
        role: role as "student" | "faculty" | "admin",
        avatar: "/placeholder.svg?height=40&width=40",
        lastLogin: new Date(),
        // Role-specific fields
        ...(role === "student" && {
          rollNumber: "CS2001",
          semester: 3,
          division: "A",
          department: "Computer Science",
        }),
        ...(role === "faculty" && {
          employeeId: "FAC001",
          department: "Computer Science",
        }),
        ...(role === "admin" && {
          adminId: "ADM001",
          department: "Administration",
        }),
      }

      // Update user context
      setUser(userData)

      // Show success toast
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
        variant: "default",
      })

      setIsLoading(false)

      // Redirect to the appropriate dashboard
      router.push(`/dashboard/${role}`)
    }, 1000)
  }

  const roleTitle = {
    student: "Student Login",
    faculty: "Faculty Login",
    admin: "Admin Login",
  }[role]

  const roleDescription = {
    student: "Access your courses, assignments, and attendance",
    faculty: "Manage your classes, assignments, and student grades",
    admin: "Oversee all college operations and management",
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
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={`/signup?role=${role}`} className="font-medium text-primary underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

