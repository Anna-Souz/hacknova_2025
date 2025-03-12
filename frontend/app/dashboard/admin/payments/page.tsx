"use client"

import { useState } from "react"
import { ArrowUpIcon, CalendarIcon, CreditCardIcon, DownloadIcon, FilterIcon, SearchIcon } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Payment {
  id: string | number
  student: {
    id: string | number
    name: string
    rollNumber: string
    avatar?: string
  }
  amount: number
  date: string
  status: "Completed" | "Pending" | "Failed"
  type: "Tuition Fee" | "Hostel Fee" | "Library Fee" | "Exam Fee" | "Other"
  semester: number
  paymentMethod?: "Credit Card" | "Debit Card" | "Net Banking" | "UPI" | "Cash" | "Cheque"
  transactionId?: string
}

export default function AdminPayments() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  // Mock data
  const payments: Payment[] = [
    {
      id: 1,
      student: {
        id: 1,
        name: "John Doe",
        rollNumber: "CS2001",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 45000,
      date: "2025-03-10",
      status: "Completed",
      type: "Tuition Fee",
      semester: 3,
      paymentMethod: "Credit Card",
      transactionId: "TXN123456789",
    },
    {
      id: 2,
      student: {
        id: 2,
        name: "Jane Smith",
        rollNumber: "CS2002",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 45000,
      date: "2025-03-09",
      status: "Completed",
      type: "Tuition Fee",
      semester: 3,
      paymentMethod: "Net Banking",
      transactionId: "TXN123456790",
    },
    {
      id: 3,
      student: {
        id: 3,
        name: "Robert Johnson",
        rollNumber: "CS2003",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 45000,
      date: "2025-03-08",
      status: "Pending",
      type: "Tuition Fee",
      semester: 3,
      paymentMethod: "UPI",
      transactionId: "TXN123456791",
    },
    {
      id: 4,
      student: {
        id: 4,
        name: "Emily Davis",
        rollNumber: "CS2004",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 15000,
      date: "2025-03-07",
      status: "Completed",
      type: "Hostel Fee",
      semester: 3,
      paymentMethod: "Debit Card",
      transactionId: "TXN123456792",
    },
    {
      id: 5,
      student: {
        id: 5,
        name: "Michael Wilson",
        rollNumber: "CS2005",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 2000,
      date: "2025-03-06",
      status: "Completed",
      type: "Library Fee",
      semester: 3,
      paymentMethod: "Credit Card",
      transactionId: "TXN123456793",
    },
    {
      id: 6,
      student: {
        id: 6,
        name: "Sarah Brown",
        rollNumber: "CS2006",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 5000,
      date: "2025-03-05",
      status: "Failed",
      type: "Exam Fee",
      semester: 3,
      paymentMethod: "Net Banking",
      transactionId: "TXN123456794",
    },
    {
      id: 7,
      student: {
        id: 7,
        name: "David Miller",
        rollNumber: "CS2007",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 45000,
      date: "2025-03-04",
      status: "Completed",
      type: "Tuition Fee",
      semester: 3,
      paymentMethod: "UPI",
      transactionId: "TXN123456795",
    },
    {
      id: 8,
      student: {
        id: 8,
        name: "Jennifer Taylor",
        rollNumber: "CS2008",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      amount: 45000,
      date: "2025-03-03",
      status: "Pending",
      type: "Tuition Fee",
      semester: 3,
      paymentMethod: "Cheque",
      transactionId: "TXN123456796",
    },
  ]

  // Filter payments based on search query and filters
  const filteredPayments = payments.filter((payment) => {
    // Search filter
    const matchesSearch =
      payment.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.transactionId && payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()))

    // Status filter
    const matchesStatus = statusFilter === "all" || payment.status.toLowerCase() === statusFilter.toLowerCase()

    // Type filter
    const matchesType =
      typeFilter === "all" || payment.type.toLowerCase().replace(/\s+/g, "-") === typeFilter.toLowerCase()

    // Date filter
    let matchesDate = true
    if (dateFilter === "today") {
      const today = new Date().toISOString().split("T")[0]
      matchesDate = payment.date === today
    } else if (dateFilter === "this-week") {
      const today = new Date()
      const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
      matchesDate = payment.date >= oneWeekAgo
    } else if (dateFilter === "this-month") {
      const today = new Date()
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split("T")[0]
      matchesDate = payment.date >= firstDayOfMonth
    }

    return matchesSearch && matchesStatus && matchesType && matchesDate
  })

  // Calculate total amounts
  const totalCollected = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const pendingAmount = payments.filter((p) => p.status === "Pending").reduce((sum, payment) => sum + payment.amount, 0)

  const paymentRate = Math.round((payments.filter((p) => p.status === "Completed").length / payments.length) * 100)

  // Group payments by type
  const paymentsByType = payments.reduce(
    (acc, payment) => {
      const type = payment.type.toLowerCase().replace(/\s+/g, "-")
      if (!acc[type]) {
        acc[type] = {
          count: 0,
          amount: 0,
        }
      }
      if (payment.status === "Completed") {
        acc[type].count++
        acc[type].amount += payment.amount
      }
      return acc
    },
    {} as Record<string, { count: number; amount: number }>,
  )

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
            <p className="text-muted-foreground">Track and manage student fee payments</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
            <Button variant="outline">
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalCollected.toLocaleString()}</div>
              <div className="mt-1 flex items-center text-xs text-green-600">
                <ArrowUpIcon className="mr-1 h-3 w-3" />
                <span>12% from last semester</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                From {payments.filter((p) => p.status === "Pending").length} students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paymentRate}%</div>
              <Progress value={paymentRate} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
            <CardDescription>View and manage all payment transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, roll number, or transaction ID"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="tuition-fee">Tuition Fee</SelectItem>
                    <SelectItem value="hostel-fee">Hostel Fee</SelectItem>
                    <SelectItem value="library-fee">Library Fee</SelectItem>
                    <SelectItem value="exam-fee">Exam Fee</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Payments</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-12 border-b p-3 font-medium">
                    <div className="col-span-4">Student</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  <div className="divide-y">
                    {filteredPayments.map((payment) => (
                      <div key={payment.id} className="grid grid-cols-12 p-3">
                        <div className="col-span-4 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={payment.student.avatar} alt={payment.student.name} />
                            <AvatarFallback>{payment.student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{payment.student.name}</p>
                            <p className="text-sm text-muted-foreground">{payment.student.rollNumber}</p>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center font-medium">
                          ₹{payment.amount.toLocaleString()}
                        </div>
                        <div className="col-span-2 flex items-center">
                          <div className="flex items-center gap-1 text-sm">
                            <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{payment.date}</span>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center">
                          <Badge variant="outline">{payment.type}</Badge>
                        </div>
                        <div className="col-span-2 flex items-center justify-end">
                          <Badge
                            className={
                              payment.status === "Completed"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : payment.status === "Pending"
                                  ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}

                    {filteredPayments.length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">No payment records found</div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="completed" className="mt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-12 border-b p-3 font-medium">
                    <div className="col-span-4">Student</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2 text-right">Method</div>
                  </div>
                  <div className="divide-y">
                    {filteredPayments
                      .filter((payment) => payment.status === "Completed")
                      .map((payment) => (
                        <div key={payment.id} className="grid grid-cols-12 p-3">
                          <div className="col-span-4 flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={payment.student.avatar} alt={payment.student.name} />
                              <AvatarFallback>{payment.student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{payment.student.name}</p>
                              <p className="text-sm text-muted-foreground">{payment.student.rollNumber}</p>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center font-medium">
                            ₹{payment.amount.toLocaleString()}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="flex items-center gap-1 text-sm">
                              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{payment.date}</span>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Badge variant="outline">{payment.type}</Badge>
                          </div>
                          <div className="col-span-2 flex items-center justify-end">
                            <div className="flex items-center gap-1 text-sm">
                              <CreditCardIcon className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{payment.paymentMethod}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                    {filteredPayments.filter((payment) => payment.status === "Completed").length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">No completed payments found</div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pending" className="mt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-12 border-b p-3 font-medium">
                    <div className="col-span-4">Student</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-2">Due Date</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredPayments
                      .filter((payment) => payment.status === "Pending")
                      .map((payment) => (
                        <div key={payment.id} className="grid grid-cols-12 p-3">
                          <div className="col-span-4 flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={payment.student.avatar} alt={payment.student.name} />
                              <AvatarFallback>{payment.student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{payment.student.name}</p>
                              <p className="text-sm text-muted-foreground">{payment.student.rollNumber}</p>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center font-medium">
                            ₹{payment.amount.toLocaleString()}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="flex items-center gap-1 text-sm">
                              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{payment.date}</span>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Badge variant="outline">{payment.type}</Badge>
                          </div>
                          <div className="col-span-2 flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Remind
                            </Button>
                            <Button size="sm">Mark Paid</Button>
                          </div>
                        </div>
                      ))}

                    {filteredPayments.filter((payment) => payment.status === "Pending").length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">No pending payments found</div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="failed" className="mt-4">
                <div className="rounded-lg border">
                  <div className="grid grid-cols-12 border-b p-3 font-medium">
                    <div className="col-span-4">Student</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredPayments
                      .filter((payment) => payment.status === "Failed")
                      .map((payment) => (
                        <div key={payment.id} className="grid grid-cols-12 p-3">
                          <div className="col-span-4 flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={payment.student.avatar} alt={payment.student.name} />
                              <AvatarFallback>{payment.student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{payment.student.name}</p>
                              <p className="text-sm text-muted-foreground">{payment.student.rollNumber}</p>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center font-medium">
                            ₹{payment.amount.toLocaleString()}
                          </div>
                          <div className="col-span-2 flex items-center">
                            <div className="flex items-center gap-1 text-sm">
                              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{payment.date}</span>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <Badge variant="outline">{payment.type}</Badge>
                          </div>
                          <div className="col-span-2 flex items-center justify-end">
                            <Button size="sm">Retry Payment</Button>
                          </div>
                        </div>
                      ))}

                    {filteredPayments.filter((payment) => payment.status === "Failed").length === 0 && (
                      <div className="p-4 text-center text-muted-foreground">No failed payments found</div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Analytics</CardTitle>
            <CardDescription>Breakdown of payments by type and method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 font-medium">Payments by Type</h3>
                <div className="space-y-4">
                  {Object.entries(paymentsByType).map(([type, data]) => {
                    const formattedType = type
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")
                    const percentage = Math.round((data.amount / totalCollected) * 100)

                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{formattedType}</span>
                          <span>
                            ₹{data.amount.toLocaleString()} ({percentage}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <p className="text-xs text-muted-foreground">{data.count} payments</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-medium">Payment Methods</h3>
                <div className="rounded-lg border">
                  <div className="grid grid-cols-2 border-b p-3 font-medium">
                    <div>Method</div>
                    <div className="text-right">Count</div>
                  </div>
                  <div className="divide-y">
                    {["Credit Card", "Debit Card", "Net Banking", "UPI", "Cash", "Cheque"].map((method) => {
                      const count = payments.filter(
                        (p) => p.status === "Completed" && p.paymentMethod === method,
                      ).length

                      return (
                        <div key={method} className="grid grid-cols-2 p-3">
                          <div className="flex items-center gap-2">
                            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{method}</span>
                          </div>
                          <div className="text-right">{count}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

