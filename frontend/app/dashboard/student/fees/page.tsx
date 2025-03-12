"use client"

import { useState } from "react"
import Image from "next/image"
import { CheckCircle2, CreditCard, IndianRupee, QrCode } from "lucide-react"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentFees() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  // Mock data
  const feeDetails = {
    tuitionFee: 40000,
    libraryFee: 2000,
    laboratoryFee: 3000,
    totalFee: 45000,
    dueDate: "March 31, 2025",
    status: "Pending",
  }

  const paymentHistory = [
    {
      id: 1,
      semester: "Previous Semester",
      amount: 45000,
      date: "September 15, 2024",
      status: "Paid",
      method: "Credit Card",
    },
    { id: 2, semester: "First Year - Sem 2", amount: 42000, date: "March 20, 2024", status: "Paid", method: "UPI" },
    {
      id: 3,
      semester: "First Year - Sem 1",
      amount: 42000,
      date: "September 10, 2023",
      status: "Paid",
      method: "Net Banking",
    },
  ]

  const handlePayNow = () => {
    setShowPaymentDialog(true)
  }

  const handleProcessPayment = () => {
    setShowPaymentDialog(false)
    setShowSuccessDialog(true)
  }

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fee Payment</h1>
          <p className="text-muted-foreground">Manage and pay your college fees</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Current Fee Details */}
          <Card>
            <CardHeader>
              <CardTitle>Current Semester Fee</CardTitle>
              <CardDescription>Fee details for the current semester</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status</span>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                    {feeDetails.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium">Due Date</span>
                  <span className="text-sm">{feeDetails.dueDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tuition Fee</span>
                  <span className="text-sm">₹{feeDetails.tuitionFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Library Fee</span>
                  <span className="text-sm">₹{feeDetails.libraryFee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Laboratory Fee</span>
                  <span className="text-sm">₹{feeDetails.laboratoryFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex items-center justify-between font-medium">
                    <span>Total Amount</span>
                    <span>₹{feeDetails.totalFee.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handlePayNow}>
                <IndianRupee className="mr-2 h-4 w-4" />
                Pay Now
              </Button>
            </CardFooter>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Choose your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="online" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="online">Online Payment</TabsTrigger>
                  <TabsTrigger value="offline">Offline Payment</TabsTrigger>
                </TabsList>

                <TabsContent value="online" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-4 hover:bg-muted">
                      <CreditCard className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Credit/Debit Card</span>
                    </div>

                    <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-4 hover:bg-muted">
                      <QrCode className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">UPI Payment</span>
                    </div>

                    <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-4 hover:bg-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
                        <polyline points="10 8 16 8 16 14" />
                        <path d="M16 8 8 16" />
                      </svg>
                      <span className="text-sm font-medium">Net Banking</span>
                    </div>

                    <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-4 hover:bg-muted">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M12 12h.01" />
                        <path d="M17 12h.01" />
                        <path d="M7 12h.01" />
                      </svg>
                      <span className="text-sm font-medium">Wallet</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="offline" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Pay at College Finance Office</h3>
                    <p className="text-sm text-muted-foreground">
                      You can pay your fees directly at the college finance office during working hours (9:00 AM - 4:00
                      PM, Monday to Friday).
                    </p>
                    <div className="mt-4 rounded-lg bg-muted p-3">
                      <p className="text-sm font-medium">Finance Office Location:</p>
                      <p className="text-sm">Ground Floor, Administration Building</p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="mb-2 font-medium">Bank Transfer</h3>
                    <p className="text-sm text-muted-foreground">
                      You can also pay via direct bank transfer to the college account.
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Account Name:</span>
                        <span className="text-sm">College Name</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Account Number:</span>
                        <span className="text-sm">1234567890</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">IFSC Code:</span>
                        <span className="text-sm">ABCD0001234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Bank:</span>
                        <span className="text-sm">State Bank of India</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your previous fee payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex flex-col justify-between gap-2 rounded-lg border p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <h3 className="font-semibold">{payment.semester}</h3>
                    <p className="text-sm text-muted-foreground">
                      Paid on: {payment.date} • Method: {payment.method}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">₹{payment.amount.toLocaleString()}</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Payment</DialogTitle>
              <DialogDescription>Pay your semester fee of ₹{feeDetails.totalFee.toLocaleString()}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-center space-x-2 rounded-lg border p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border p-3">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex flex-1 cursor-pointer items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    <span>UPI Payment</span>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <div className="rounded-lg border p-4">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="UPI QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">Scan the QR code with any UPI app to pay</p>
                  <div className="space-y-1">
                    <Label htmlFor="upiId">Or enter UPI ID</Label>
                    <Input id="upiId" placeholder="username@upi" />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleProcessPayment}>Pay ₹{feeDetails.totalFee.toLocaleString()}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold">Payment Successful!</h2>
              <p className="text-center text-muted-foreground">
                Your payment of ₹{feeDetails.totalFee.toLocaleString()} has been successfully processed. A receipt has
                been sent to your email.
              </p>
              <div className="mt-4 rounded-lg bg-muted p-4 text-center">
                <p className="text-sm font-medium">Transaction ID</p>
                <p className="text-sm">TXN123456789</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowSuccessDialog(false)} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

