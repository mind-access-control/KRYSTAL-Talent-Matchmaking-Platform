"use client"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { StatsCard } from "@/components/ui/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Heart, MessageSquare, TrendingUp, Calendar, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"

export default function TalentDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()

  const notifications = [
    {
      id: 1,
      message: "Profile updated successfully",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      message: "Social media metrics synced",
      time: "5 hours ago",
      type: "info",
    },
    {
      id: 3,
      message: "New project match available",
      time: "1 day ago",
      type: "success",
    },
  ]

  const recentMatches = [
    {
      id: 1,
      title: "Summer Fashion Campaign",
      company: "StyleCo",
      matchScore: 92,
      budget: "$5,000",
      deadline: "2024-02-15",
    },
    {
      id: 2,
      title: "Tech Product Launch",
      company: "InnovateTech",
      matchScore: 87,
      budget: "$3,500",
      deadline: "2024-02-20",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your profile today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link href="/talent/profile/edit">Update Profile</Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Profile Views"
            value="1,234"
            description="This month"
            icon={<Eye className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Project Matches"
            value="8"
            description="Active matches"
            icon={<Heart className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: 3, isPositive: true }}
          />
          <StatsCard
            title="Messages"
            value="24"
            description="Unread"
            icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Rating"
            value="4.9"
            description="Average rating"
            icon={<Star className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        notification.type === "success" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Project Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div key={match.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{match.title}</h4>
                        <p className="text-sm text-muted-foreground">{match.company}</p>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {match.matchScore}% Match
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{match.budget}</span>
                      <span>Due: {match.deadline}</span>
                    </div>
                    <Button size="sm" className="w-full mt-3" asChild>
                      <Link href={`/talent/project/${match.id}/details`}>View Details</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
                <Link href="/talent/portfolio" className="flex flex-col items-center space-y-2">
                  <Eye className="h-6 w-6" />
                  <span>Update Portfolio</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
                <Link href="/talent/social-integrations" className="flex flex-col items-center space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Sync Social Media</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-auto p-4 bg-transparent">
                <Link href="/talent/settings" className="flex flex-col items-center space-y-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Account Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
