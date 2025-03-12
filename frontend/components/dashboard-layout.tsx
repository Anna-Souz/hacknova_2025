"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Home,
  LogOut,
  Menu,
  PieChart,
  Settings,
  User,
  Users,
  Clock,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/components/ui/use-toast"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "student" | "faculty" | "admin"
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, logout, isLoading } = useUser()
  const { toast } = useToast()

  // Redirect if user is not logged in or has a different role
  useEffect(() => {
    if (!isLoading && (!user || user.role !== role)) {
      toast({
        title: "Access Denied",
        description: "Please log in to access this page",
        variant: "destructive",
      })
      router.push(`/login?role=${role}`)
    }
  }, [user, role, isLoading, router, toast])

  // Format the last login time
  const formatLastLogin = (date?: Date) => {
    if (!date) return "N/A"

    // Check if it's today
    const today = new Date()
    const loginDate = new Date(date)

    if (today.toDateString() === loginDate.toDateString()) {
      return `Today at ${loginDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    // Check if it's yesterday
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (yesterday.toDateString() === loginDate.toDateString()) {
      return `Yesterday at ${loginDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
    }

    // Otherwise show full date and time
    return loginDate.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      { title: "Dashboard", href: `/dashboard/${role}`, icon: Home },
      { title: "Notices", href: `/dashboard/${role}/notices`, icon: Bell },
    ]

    const studentItems = [
      ...baseItems,
      { title: "Assignments", href: `/dashboard/${role}/assignments`, icon: FileText },
      { title: "Attendance", href: `/dashboard/${role}/attendance`, icon: BookOpen },
      { title: "Events", href: `/dashboard/${role}/events`, icon: Calendar },
      { title: "Pay Fees", href: `/dashboard/${role}/fees`, icon: CreditCard },
    ]

    const facultyItems = [
      ...baseItems,
      { title: "Subjects", href: `/dashboard/${role}/subjects`, icon: BookOpen },
      { title: "Assignments", href: `/dashboard/${role}/assignments`, icon: FileText },
      { title: "Attendance", href: `/dashboard/${role}/attendance`, icon: Users },
      { title: "Grades", href: `/dashboard/${role}/grades`, icon: PieChart },
      { title: "Events", href: `/dashboard/${role}/events`, icon: Calendar },
    ]

    const adminItems = [
      ...baseItems,
      { title: "Faculty", href: `/dashboard/${role}/faculty`, icon: Users },
      { title: "Students", href: `/dashboard/${role}/students`, icon: Users },
      { title: "Payments", href: `/dashboard/${role}/payments`, icon: CreditCard },
      { title: "Settings", href: `/dashboard/${role}/settings`, icon: Settings },
    ]

    return role === "student" ? studentItems : role === "faculty" ? facultyItems : adminItems
  }

  const navItems = getNavItems()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    })
    router.push("/")
  }

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <Sidebar>
          <SidebarHeader className="border-b px-6 py-3">
            <Link href={`/dashboard/${role}`} className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">EduPortal</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Last login: {formatLastLogin(user.lastLogin)}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Mobile Header */}
        <div className="flex w-full flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
            <Button variant="outline" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-primary p-1">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">EduPortal</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <SidebarTrigger />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Last login: {formatLastLogin(user.lastLogin)}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden">
              <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <Link href={`/dashboard/${role}`} className="flex items-center gap-2">
                    <div className="rounded-md bg-primary p-1">
                      <BookOpen className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold">EduPortal</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </Button>
                </div>
                <nav className="mt-6 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                        pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-2 rounded-lg border p-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    Last login: {formatLastLogin(user.lastLogin)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

