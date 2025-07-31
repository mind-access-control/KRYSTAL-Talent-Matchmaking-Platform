"use client";

import type React from "react";
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Camera,
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { useAuth } from "@/contexts/auth-context";

export default function BusinessSettings() {
  const { showToast } = useToast();
  const { user, logout } = useAuth();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Dialog states
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [showBillingHistoryDialog, setShowBillingHistoryDialog] =
    useState(false);

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "Creative Agency Inc.",
    industry: "marketing",
    website: "https://creativeagency.com",
    description:
      "A leading creative agency specializing in digital marketing and brand development.",
    size: "50-100",
    location: "New York, NY",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    emailApplications: true,
    emailMessages: true,
    emailUpdates: false,
    pushApplications: true,
    pushMessages: true,
    pushUpdates: false,
  });

  const [billing, setBilling] = useState({
    plan: "professional",
    billingEmail: user?.email || "",
    paymentMethod: "**** **** **** 1234",
    nextBilling: "2024-02-15",
  });

  // Mock billing history
  const billingHistory = [
    {
      id: "1",
      date: "2024-01-15",
      amount: "$99.00",
      status: "Paid",
      description: "Professional Plan - Monthly",
      invoice: "INV-2024-001",
    },
    {
      id: "2",
      date: "2023-12-15",
      amount: "$99.00",
      status: "Paid",
      description: "Professional Plan - Monthly",
      invoice: "INV-2023-012",
    },
    {
      id: "3",
      date: "2023-11-15",
      amount: "$99.00",
      status: "Paid",
      description: "Professional Plan - Monthly",
      invoice: "INV-2023-011",
    },
  ];

  // Available plans
  const availablePlans = [
    {
      id: "starter",
      name: "Starter Plan",
      price: "$29",
      period: "month",
      features: [
        "Up to 5 active projects",
        "Basic AI matching",
        "Email support",
        "Standard templates",
      ],
      current: false,
    },
    {
      id: "professional",
      name: "Professional Plan",
      price: "$99",
      period: "month",
      features: [
        "Unlimited projects",
        "Advanced AI matching",
        "Priority support",
        "Custom templates",
        "Analytics dashboard",
        "Team collaboration",
      ],
      current: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Plan",
      price: "$299",
      period: "month",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics",
        "White-label options",
        "API access",
      ],
      current: false,
    },
  ];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      showToast("Profile photo updated successfully!", "success");
    }
  };

  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompanyInfoSave = () => {
    showToast("Company information updated successfully!", "success");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      showToast("New passwords don't match", "error");
      return;
    }

    if (passwords.new.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    setTimeout(() => {
      showToast("Password updated successfully!", "success");
      setPasswords({ current: "", new: "", confirm: "" });
    }, 1000);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    showToast("Notification preferences updated", "success");
  };

  const handleDeleteAccount = () => {
    setTimeout(() => {
      showToast("Account deleted successfully", "success");
      logout();
    }, 1000);
  };

  // Payment methods
  const handlePaymentUpdate = () => {
    if (
      !paymentForm.cardNumber ||
      !paymentForm.expiryDate ||
      !paymentForm.cvv ||
      !paymentForm.cardholderName
    ) {
      showToast("Please fill in all payment fields", "error");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setBilling((prev) => ({
        ...prev,
        paymentMethod: `**** **** **** ${paymentForm.cardNumber.slice(-4)}`,
      }));
      setShowPaymentDialog(false);
      setPaymentForm({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
      });
      showToast("Payment method updated successfully!", "success");
    }, 1000);
  };

  const handlePlanChange = (planId: string) => {
    const selectedPlan = availablePlans.find((plan) => plan.id === planId);
    if (!selectedPlan) return;

    // Simulate API call
    setTimeout(() => {
      setBilling((prev) => ({
        ...prev,
        plan: planId,
      }));
      setShowPlanDialog(false);
      showToast(
        `Plan changed to ${selectedPlan.name} successfully!`,
        "success"
      );
    }, 1000);
  };

  const handleBillingEmailUpdate = (email: string) => {
    setBilling((prev) => ({ ...prev, billingEmail: email }));
    showToast("Billing email updated successfully!", "success");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Business Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your business account preferences and settings.
          </p>
        </div>

        {/* Profile Photo */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4 pb-6">
              <div className="relative">
                <img
                  src={
                    avatarPreview ||
                    user?.avatar ||
                    "/placeholder.svg?height=120&width=120&query=business"
                  }
                  alt="Company Logo"
                  className="w-24 h-24 rounded-full object-cover border-4 border-muted"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Company Logo</p>
                <p className="text-xs text-muted-foreground">
                  Click the camera icon to upload a new logo
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyInfo.companyName}
                  onChange={(e) =>
                    handleCompanyInfoChange("companyName", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={companyInfo.industry}
                  onValueChange={(value) =>
                    handleCompanyInfoChange("industry", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">
                      Marketing & Advertising
                    </SelectItem>
                    <SelectItem value="fashion">Fashion & Beauty</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companyInfo.website}
                  onChange={(e) =>
                    handleCompanyInfoChange("website", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={companyInfo.location}
                  onChange={(e) =>
                    handleCompanyInfoChange("location", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Select
                value={companyInfo.size}
                onValueChange={(value) =>
                  handleCompanyInfoChange("size", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 employees</SelectItem>
                  <SelectItem value="11-50">11-50 employees</SelectItem>
                  <SelectItem value="51-100">51-100 employees</SelectItem>
                  <SelectItem value="101-500">101-500 employees</SelectItem>
                  <SelectItem value="500+">500+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                value={companyInfo.description}
                onChange={(e) =>
                  handleCompanyInfoChange("description", e.target.value)
                }
                rows={3}
              />
            </div>

            <Button onClick={handleCompanyInfoSave}>
              Save Company Information
            </Button>
          </CardContent>
        </Card>

        {/* Account Security */}
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={user?.email || ""} disabled />
              <p className="text-sm text-muted-foreground">
                Contact support to change your email address.
              </p>
            </div>

            <Separator />

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <h4 className="font-medium">Change Password</h4>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      current: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords((prev) => ({ ...prev, new: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      confirm: e.target.value,
                    }))
                  }
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
                    <Label htmlFor="emailApplications">
                      Talent Applications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when talent applies to your projects
                    </p>
                  </div>
                  <Switch
                    id="emailApplications"
                    checked={notifications.emailApplications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("emailApplications", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailMessages">Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when you receive new messages
                    </p>
                  </div>
                  <Switch
                    id="emailMessages"
                    checked={notifications.emailMessages}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("emailMessages", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailUpdates">Platform Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new features and updates
                    </p>
                  </div>
                  <Switch
                    id="emailUpdates"
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("emailUpdates", checked)
                    }
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
                    <Label htmlFor="pushApplications">
                      Talent Applications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Instant notifications for new applications
                    </p>
                  </div>
                  <Switch
                    id="pushApplications"
                    checked={notifications.pushApplications}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("pushApplications", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushMessages">Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Instant notifications for new messages
                    </p>
                  </div>
                  <Switch
                    id="pushMessages"
                    checked={notifications.pushMessages}
                    onCheckedChange={(checked) =>
                      handleNotificationChange("pushMessages", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Billing & Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Current Plan</Label>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Professional Plan
                  </span>
                </div>
              </div>
              <div>
                <Label>Next Billing Date</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {billing.nextBilling}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingEmail">Billing Email</Label>
              <Input
                id="billingEmail"
                value={billing.billingEmail}
                onChange={(e) => handleBillingEmailUpdate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{billing.paymentMethod}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPaymentDialog(true)}
                >
                  Update
                </Button>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowPlanDialog(true)}>
                Change Plan
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowBillingHistoryDialog(true)}
              >
                View Billing History
              </Button>
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
                  Once you delete your account, there is no going back. All your
                  projects and data will be permanently deleted.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your business account, all projects, and remove
                        your data from our servers.
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

        {/* Payment Method Update Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Payment Method</DialogTitle>
              <DialogDescription>
                Enter your new payment information to update your billing
                method.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentForm.cardNumber}
                  onChange={(e) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      cardNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={paymentForm.expiryDate}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        expiryDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentForm.cvv}
                    onChange={(e) =>
                      setPaymentForm((prev) => ({
                        ...prev,
                        cvv: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  placeholder="John Doe"
                  value={paymentForm.cardholderName}
                  onChange={(e) =>
                    setPaymentForm((prev) => ({
                      ...prev,
                      cardholderName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handlePaymentUpdate}>
                Update Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Plan Dialog */}
        <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Change Subscription Plan</DialogTitle>
              <DialogDescription>
                Choose a plan that best fits your business needs. You can change
                your plan at any time.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              {availablePlans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative ${
                    plan.current ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {plan.current && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Current Plan
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        /{plan.period}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-4"
                      variant={plan.current ? "outline" : "default"}
                      disabled={plan.current}
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      {plan.current ? "Current Plan" : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPlanDialog(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Billing History Dialog */}
        <Dialog
          open={showBillingHistoryDialog}
          onOpenChange={setShowBillingHistoryDialog}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Billing History</DialogTitle>
              <DialogDescription>
                View your past invoices and payment history.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {billingHistory.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {invoice.date}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {invoice.invoice}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}</p>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowBillingHistoryDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
