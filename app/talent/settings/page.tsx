"use client"

import type React from "react"
import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/contexts/auth-context"

export default function TalentSettings() {
  const { showToast } = useToast()
  const { user, logout } = useAuth()

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [notifications, setNotifications] = useState({
    emailMatches: true,
    emailMessages: true,
    emailUpdates: false,
    pushMatches: true,
    pushMessages: true,
    pushUpdates: false,
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showRates: true,
    showLocation: true,
    allowDirectContact: true,
  })

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwords.new !== passwords.confirm) {
      showToast("New passwords don't match", "error")
      return
    }

    if (passwords.new.length < 6) {
      showToast("Password must be at least 6 characters", "error")
      return
    }

    // Simulate API call
    setTimeout(() => {
      showToast("Password updated successfully!", "success")
      setPasswords({ current: "", new: "", confirm: "" })
    }, 1000)
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
    showToast("Notification preferences updated", "success")
  }

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
    showToast("Privacy settings updated", "success")
  }

  const handleDeleteAccount = () => {
    // Simulate account deletion
    setTimeout(() => {
      showToast("Account deleted successfully", "success")
      logout()
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences and security settings.</p>
        </div>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={user?.name || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={user?.email || ""} disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Input id="accountType" value="Talent" disabled />
            </div>
            <p className="text-sm text-muted-foreground">
              To change your basic account information, please contact support.
            </p>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Email Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailMatches">Project Matches</Label>
                    <p className="text-sm text-muted-foreground">Get notified when new projects match your profile</p>
                  </div>
                  <Switch
                    id="emailMatches"
                    checked={notifications.emailMatches}
                    onCheckedChange={(checked) => handleNotificationChange("emailMatches", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailMessages">Messages</Label>
                    <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                  </div>
                  <Switch
                    id="emailMessages"
                    checked={notifications.emailMessages}
                    onCheckedChange={(checked) => handleNotificationChange("emailMessages", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailUpdates">Platform Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about new features and updates</p>
                  </div>
                  <Switch
                    id="emailUpdates"
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("emailUpdates", checked)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Push Notifications</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushMatches">Project Matches</Label>
                    <p className="text-sm text-muted-foreground">Instant notifications for new matches</p>
                  </div>
                  <Switch
                    id="pushMatches"
                    checked={notifications.pushMatches}
                    onCheckedChange={(checked) => handleNotificationChange("pushMatches", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushMessages">Messages</Label>
                    <p className="text-sm text-muted-foreground">Instant notifications for new messages</p>
                  </div>
                  <Switch
                    id="pushMessages"
                    checked={notifications.pushMessages}
                    onCheckedChange={(checked) => handleNotificationChange("pushMessages", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushUpdates">Platform Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about new features</p>
                  </div>
                  <Switch
                    id="pushUpdates"
                    checked={notifications.pushUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("pushUpdates", checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profileVisible">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to businesses</p>
                </div>
                <Switch
                  id="profileVisible"
                  checked={privacy.profileVisible}
                  onCheckedChange={(checked) => handlePrivacyChange("profileVisible", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showRates">Show Rates</Label>
                  <p className="text-sm text-muted-foreground">Display your daily rates on your profile</p>
                </div>
                <Switch
                  id="showRates"
                  checked={privacy.showRates}
                  onCheckedChange={(checked) => handlePrivacyChange("showRates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showLocation">Show Location</Label>
                  <p className="text-sm text-muted-foreground">Display your location on your profile</p>
                </div>
                <Switch
                  id="showLocation"
                  checked={privacy.showLocation}
                  onCheckedChange={(checked) => handlePrivacyChange("showLocation", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowDirectContact">Allow Direct Contact</Label>
                  <p className="text-sm text-muted-foreground">Allow businesses to contact you directly</p>
                </div>
                <Switch
                  id="allowDirectContact"
                  checked={privacy.allowDirectContact}
                  onCheckedChange={(checked) => handlePrivacyChange("allowDirectContact", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Delete Account</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
