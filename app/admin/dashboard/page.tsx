"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/ui/stats-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import {
  Users,
  Briefcase,
  DollarSign,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Database,
} from "lucide-react";

// Mock data for admin dashboard
const mockStats = [
  {
    title: "Total Users",
    value: "12,847",
    description: "Active platform users",
    icon: Users,
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Active Projects",
    value: "1,234",
    description: "Currently running",
    icon: Briefcase,
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Platform Revenue",
    value: "$245,670",
    description: "This month",
    icon: DollarSign,
    trend: { value: 15, isPositive: true },
  },
  {
    title: "System Health",
    value: "99.9%",
    description: "Uptime this month",
    icon: Activity,
    trend: { value: 0.1, isPositive: true },
  },
];

const mockSystemAlerts = [
  {
    id: "1",
    type: "warning",
    title: "High API Usage",
    message: "AI matching service approaching rate limits",
    time: "5 minutes ago",
    severity: "medium",
  },
  {
    id: "2",
    type: "info",
    title: "Scheduled Maintenance",
    message: "Database optimization scheduled for tonight",
    time: "2 hours ago",
    severity: "low",
  },
  {
    id: "3",
    type: "success",
    title: "Backup Completed",
    message: "Daily backup completed successfully",
    time: "6 hours ago",
    severity: "low",
  },
];

const mockRecentUsers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@creativestudios.com",
    type: "business",
    joinDate: "2024-01-28",
    status: "active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Emma Rodriguez",
    email: "emma@example.com",
    type: "talent",
    joinDate: "2024-01-27",
    status: "pending",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@brandco.com",
    type: "business",
    joinDate: "2024-01-26",
    status: "active",
    avatar: "/placeholder.svg?height=32&width=32",
  },
];

const mockPlatformMetrics = [
  { label: "Daily Active Users", value: "3,247", change: "+12%" },
  { label: "Successful Matches", value: "89%", change: "+5%" },
  { label: "Average Response Time", value: "1.2s", change: "-8%" },
  { label: "User Satisfaction", value: "4.8/5", change: "+3%" },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "info":
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50";
      case "medium":
        return "border-yellow-200 bg-yellow-50";
      case "low":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "business":
        return "bg-blue-100 text-blue-800";
      case "talent":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {t("dashboard.welcome")}, {user?.name}!
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor platform performance and manage system operations.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
            <Button>
              <Database className="mr-2 h-4 w-4" />
              Run Backup
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                System Alerts
              </CardTitle>
              <CardDescription>
                Recent system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSystemAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${getAlertColor(
                      alert.severity
                    )}`}
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Platform Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Platform Metrics
              </CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPlatformMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <span className="font-medium">{metric.label}</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div
                        className={`text-xs ${
                          metric.change.startsWith("+")
                            ? "text-green-600"
                            : metric.change.startsWith("-")
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {metric.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Recent User Registrations
            </CardTitle>
            <CardDescription>
              Latest users who joined the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getUserTypeColor(user.type)}>
                      {user.type}
                    </Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {user.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {user.joinDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
