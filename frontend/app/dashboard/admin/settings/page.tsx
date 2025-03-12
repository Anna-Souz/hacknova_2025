"use client"

import type React from "react"

import { useState } from "react"
import { BellIcon, GlobeIcon, LockIcon, MailIcon, SaveIcon, ServerIcon, ShieldIcon } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    collegeName: "EduPortal College",
    collegeAddress: "123 Education Street, Knowledge City, 560001",
    collegePhone: "+91 9876543210",
    collegeEmail: "info@eduportal.edu",
    collegeWebsite: "https://www.eduportal.edu",
    academicYear: "2024-2025",
    currentSemester: "Odd Semester",
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.eduportal.edu",
    smtpPort: "587",
    smtpUsername: "notifications@eduportal.edu",
    smtpPassword: "••••••••••••",
    fromEmail: "no-reply@eduportal.edu",
    fromName: "EduPortal Notifications",
    enableSSL: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    enablePushNotifications: true,
    notifyOnNewAssignment: true,
    notifyOnGradeUpdate: true,
    notifyOnAttendanceUpdate: true,
    notifyOnPaymentDue: true,
    notifyOnPaymentReceived: true,
    notifyOnNewNotice: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: "strong",
    sessionTimeout: "30",
    loginAttempts: "5",
    twoFactorAuth: true,
    ipRestriction: false,
    auditLogging: true,
  })

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
  }

  const handleSecuritySettingsChange = (name: string, value: string) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecurityToggle = (setting: keyof typeof securitySettings) => {
    if (typeof securitySettings[setting] === "boolean") {
      setSecuritySettings((prev) => ({ ...prev, [setting]: !prev[setting] }))
    }
  }

  const handleSaveSettings = (settingType: string) => {
    // In a real app, you would send this to the backend
    console.log(
      `Saving ${settingType} settings:`,
      settingType === "general"
        ? generalSettings
        : settingType === "email"
          ? emailSettings
          : settingType === "notification"
            ? notificationSettings
            : securitySettings,
    )

    // Show success message or handle errors
  }

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure and manage college system settings</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">
              <GlobeIcon className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="email">
              <MailIcon className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <BellIcon className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <ShieldIcon className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic college information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="collegeName">College Name</Label>
                    <Input
                      id="collegeName"
                      name="collegeName"
                      value={generalSettings.collegeName}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collegeEmail">College Email</Label>
                    <Input
                      id="collegeEmail"
                      name="collegeEmail"
                      value={generalSettings.collegeEmail}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collegeAddress">College Address</Label>
                  <Textarea
                    id="collegeAddress"
                    name="collegeAddress"
                    value={generalSettings.collegeAddress}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="collegePhone">College Phone</Label>
                    <Input
                      id="collegePhone"
                      name="collegePhone"
                      value={generalSettings.collegePhone}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collegeWebsite">College Website</Label>
                    <Input
                      id="collegeWebsite"
                      name="collegeWebsite"
                      value={generalSettings.collegeWebsite}
                      onChange={handleGeneralSettingsChange}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Current Academic Year</Label>
                    <Select
                      value={generalSettings.academicYear}
                      onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, academicYear: value }))}
                    >
                      <SelectTrigger id="academicYear">
                        <SelectValue placeholder="Select academic year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023-2024">2023-2024</SelectItem>
                        <SelectItem value="2024-2025">2024-2025</SelectItem>
                        <SelectItem value="2025-2026">2025-2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentSemester">Current Semester</Label>
                    <Select
                      value={generalSettings.currentSemester}
                      onValueChange={(value) => setGeneralSettings((prev) => ({ ...prev, currentSemester: value }))}
                    >
                      <SelectTrigger id="currentSemester">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Odd Semester">Odd Semester</SelectItem>
                        <SelectItem value="Even Semester">Even Semester</SelectItem>
                        <SelectItem value="Summer Term">Summer Term</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings("general")}>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save General Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>Configure email server settings for notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input
                      id="smtpServer"
                      name="smtpServer"
                      value={emailSettings.smtpServer}
                      onChange={handleEmailSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      name="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      name="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={handleEmailSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      name="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      name="fromEmail"
                      value={emailSettings.fromEmail}
                      onChange={handleEmailSettingsChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      name="fromName"
                      value={emailSettings.fromName}
                      onChange={handleEmailSettingsChange}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="enableSSL"
                    checked={emailSettings.enableSSL}
                    onCheckedChange={(checked) => setEmailSettings((prev) => ({ ...prev, enableSSL: checked }))}
                  />
                  <Label htmlFor="enableSSL">Enable SSL/TLS</Label>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Test Email Configuration</h3>
                  <div className="space-y-2">
                    <Label htmlFor="testEmail">Test Email Address</Label>
                    <div className="flex gap-2">
                      <Input id="testEmail" placeholder="Enter email address" />
                      <Button>Send Test Email</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings("email")}>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Email Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Channels</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="enableEmailNotifications">Email Notifications</Label>
                      </div>
                      <Switch
                        id="enableEmailNotifications"
                        checked={notificationSettings.enableEmailNotifications}
                        onCheckedChange={() => handleNotificationToggle("enableEmailNotifications")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ServerIcon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="enableSMSNotifications">SMS Notifications</Label>
                      </div>
                      <Switch
                        id="enableSMSNotifications"
                        checked={notificationSettings.enableSMSNotifications}
                        onCheckedChange={() => handleNotificationToggle("enableSMSNotifications")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BellIcon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="enablePushNotifications">Push Notifications</Label>
                      </div>
                      <Switch
                        id="enablePushNotifications"
                        checked={notificationSettings.enablePushNotifications}
                        onCheckedChange={() => handleNotificationToggle("enablePushNotifications")}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Events</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyOnNewAssignment">New Assignment</Label>
                      <Switch
                        id="notifyOnNewAssignment"
                        checked={notificationSettings.notifyOnNewAssignment}
                        onCheckedChange={() => handleNotificationToggle("notifyOnNewAssignment")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyOnGradeUpdate">Grade Update</Label>
                      <Switch
                        id="notifyOnGradeUpdate"
                        checked={notificationSettings.notifyOnGradeUpdate}
                        onCheckedChange={() => handleNotificationToggle("notifyOnGradeUpdate")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyOnAttendanceUpdate">Attendance Update</Label>
                      <Switch
                        id="notifyOnAttendanceUpdate"
                        checked={notificationSettings.notifyOnAttendanceUpdate}
                        onCheckedChange={() => handleNotificationToggle("notifyOnAttendanceUpdate")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyOnPaymentDue">Payment Due</Label>
                      <Switch
                        id="notifyOnPaymentDue"
                        checked={notificationSettings.notifyOnPaymentDue}
                        onCheckedChange={() => handleNotificationToggle("notifyOnPaymentDue")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyOnPaymentReceived">Payment Received</Label>
                      <Switch
                        id="notifyOnPaymentReceived"
                        checked={notificationSettings.notifyOnPaymentReceived}
                        onCheckedChange={() => handleNotificationToggle("notifyOnPaymentReceived")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifyOnNewNotice">New Notice</Label>
                      <Switch
                        id="notifyOnNewNotice"
                        checked={notificationSettings.notifyOnNewNotice}
                        onCheckedChange={() => handleNotificationToggle("notifyOnNewNotice")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings("notification")}>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure system security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Password Policy</h3>
                  <div className="space-y-2">
                    <Label htmlFor="passwordPolicy">Password Strength</Label>
                    <Select
                      value={securitySettings.passwordPolicy}
                      onValueChange={(value) => handleSecuritySettingsChange("passwordPolicy", value)}
                    >
                      <SelectTrigger id="passwordPolicy">
                        <SelectValue placeholder="Select password policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (min. 8 characters)</SelectItem>
                        <SelectItem value="medium">Medium (min. 10 characters, 1 number, 1 special)</SelectItem>
                        <SelectItem value="strong">
                          Strong (min. 12 characters, uppercase, lowercase, number, special)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => handleSecuritySettingsChange("sessionTimeout", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                      <Input
                        id="loginAttempts"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => handleSecuritySettingsChange("loginAttempts", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Authentication & Access</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <LockIcon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      </div>
                      <Switch
                        id="twoFactorAuth"
                        checked={securitySettings.twoFactorAuth as boolean}
                        onCheckedChange={() => handleSecurityToggle("twoFactorAuth")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="ipRestriction">IP Restriction</Label>
                      </div>
                      <Switch
                        id="ipRestriction"
                        checked={securitySettings.ipRestriction as boolean}
                        onCheckedChange={() => handleSecurityToggle("ipRestriction")}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ServerIcon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="auditLogging">Audit Logging</Label>
                      </div>
                      <Switch
                        id="auditLogging"
                        checked={securitySettings.auditLogging as boolean}
                        onCheckedChange={() => handleSecurityToggle("auditLogging")}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-medium">Security Status</h3>
                  <div className="flex items-center justify-between">
                    <span>Current Security Level</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Strong</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your system security settings are currently at a strong level. Regular security audits are
                    recommended.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleSaveSettings("security")}>
                  <SaveIcon className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

