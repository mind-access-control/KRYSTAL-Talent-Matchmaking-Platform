"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  Calendar,
  Star,
  Zap,
  Target,
  Award,
  Crown,
  Rocket,
  Brain,
  Sparkles,
  ArrowRight,
  Play,
  Camera,
  Users,
  Globe,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Bell,
  Settings,
  User,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function TalentDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const notifications = [
    {
      id: 1,
      message:
        "🎉 Profile updated successfully! Your AI score increased by 15%",
      time: "2 hours ago",
      type: "success",
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      id: 2,
      message: "📊 Social media metrics synced - 3 new platforms connected",
      time: "5 hours ago",
      type: "info",
      icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      message: "💎 New premium project match available - 95% compatibility",
      time: "1 day ago",
      type: "success",
      icon: <Crown className="h-4 w-4 text-yellow-500" />,
    },
    {
      id: 4,
      message: "🔥 Your portfolio is trending! 50+ new views today",
      time: "2 days ago",
      type: "success",
      icon: <TrendingUp className="h-4 w-4 text-red-500" />,
    },
  ];

  const recentMatches = [
    {
      id: 1,
      title: "Summer Fashion Campaign",
      company: "StyleCo",
      matchScore: 95,
      budget: "$8,500",
      deadline: "2024-02-15",
      category: "Fashion",
      type: "Campaign",
      location: "Los Angeles, CA",
      duration: "3 days",
      status: "Premium",
    },
    {
      id: 2,
      title: "Tech Product Launch",
      company: "InnovateTech",
      matchScore: 87,
      budget: "$5,200",
      deadline: "2024-02-20",
      category: "Technology",
      type: "Commercial",
      location: "San Francisco, CA",
      duration: "2 days",
      status: "Featured",
    },
    {
      id: 3,
      title: "Luxury Brand Editorial",
      company: "Vogue Magazine",
      matchScore: 92,
      budget: "$12,000",
      deadline: "2024-02-25",
      category: "Editorial",
      type: "Magazine",
      location: "New York, NY",
      duration: "1 day",
      status: "Exclusive",
    },
  ];

  const quickStats = [
    {
      title: "Profile Views",
      value: "2,847",
      change: "+23%",
      isPositive: true,
      icon: <Eye className="h-5 w-5" />,
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Project Matches",
      value: "12",
      change: "+5",
      isPositive: true,
      icon: <Heart className="h-5 w-5" />,
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Messages",
      value: "34",
      change: "+8",
      isPositive: true,
      icon: <MessageSquare className="h-5 w-5" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "AI Rating",
      value: "9.2",
      change: "+0.3",
      isPositive: true,
      icon: <Star className="h-5 w-5" />,
      color: "from-yellow-500 to-orange-600",
    },
  ];

  const achievements = [
    {
      title: "Top Performer",
      description: "Ranked in top 5% of talents",
      icon: <Crown className="h-6 w-6" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "AI Optimized",
      description: "Portfolio fully AI-enhanced",
      icon: <Brain className="h-6 w-6" />,
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Verified Talent",
      description: "Identity and skills verified",
      icon: <CheckCircle className="h-6 w-6" />,
      color: "from-green-400 to-blue-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Welcome back, {user?.name}! ✨
                    </h1>
                    <p className="text-blue-100 text-lg">
                      Your AI-powered career is thriving! Here's your
                      performance overview.
                    </p>
                  </div>
                </div>

                {/* Achievement Badges */}
                <div className="flex flex-wrap gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${achievement.color} text-white text-sm font-medium shadow-lg`}
                    >
                      {achievement.icon}
                      <span>{achievement.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  asChild
                >
                  <Link
                    href="/talent/profile/edit"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-5 w-5" />
                    <span>Update Profile</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.color} p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs font-bold ${
                      stat.isPositive
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Recent Activity */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center text-white">
                <Bell className="mr-3 h-6 w-6" />
                Recent Activity
                <Badge className="ml-auto bg-white/20 text-white">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="p-2 bg-gray-50 rounded-lg">
                      {notification.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Recent Matches */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center text-white">
                <Target className="mr-3 h-6 w-6" />
                Premium Matches
                <Badge className="ml-auto bg-white/20 text-white">
                  {recentMatches.length} Active
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-white"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-gray-900">
                            {match.title}
                          </h4>
                          <Badge
                            variant="secondary"
                            className={`text-xs font-bold ${
                              match.status === "Premium"
                                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                                : match.status === "Featured"
                                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                                : "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                            }`}
                          >
                            {match.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">
                          {match.company}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {match.category}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {match.duration}
                          </span>
                          <span className="flex items-center">
                            <Globe className="h-3 w-3 mr-1" />
                            {match.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
                            match.matchScore >= 90
                              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                              : match.matchScore >= 80
                              ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                              : "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                          }`}
                        >
                          {match.matchScore}%
                        </div>
                        <p className="text-lg font-bold text-gray-900 mt-1">
                          {match.budget}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
                      asChild
                    >
                      <Link
                        href={`/talent/project/${match.id}/details`}
                        className="flex items-center justify-center space-x-2"
                      >
                        <span>View Details</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center text-white">
              <Rocket className="mr-3 h-6 w-6" />
              Quick Actions
              <Badge className="ml-auto bg-white/20 text-white">
                AI Powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button
                variant="outline"
                asChild
                className="h-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-blue-100 hover:to-indigo-200 border-blue-200 hover:border-blue-300 transition-all duration-300 hover:scale-105"
              >
                <Link
                  href="/talent/portfolio"
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
                    <Camera className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-900">
                      Update Portfolio
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      AI-enhanced content
                    </p>
                  </div>
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-auto p-6 bg-gradient-to-br from-green-50 to-emerald-100 hover:from-green-100 hover:to-emerald-200 border-green-200 hover:border-green-300 transition-all duration-300 hover:scale-105"
              >
                <Link
                  href="/talent/social-integrations"
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-900">
                      Sync Social Media
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Connect & analyze
                    </p>
                  </div>
                </Link>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-auto p-6 bg-gradient-to-br from-purple-50 to-pink-100 hover:from-purple-100 hover:to-pink-200 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105"
              >
                <Link
                  href="/talent/settings"
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full text-white">
                    <Settings className="h-8 w-8" />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-900">
                      Account Settings
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage preferences
                    </p>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Performance Insights */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center text-white">
              <BarChart3 className="mr-3 h-6 w-6" />
              Performance Insights
              <Badge className="ml-auto bg-white/20 text-white">
                AI Analysis
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  AI Score
                </h3>
                <p className="text-3xl font-bold text-blue-600">9.2/10</p>
                <p className="text-sm text-gray-600 mt-1">
                  Excellent performance
                </p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Engagement Rate
                </h3>
                <p className="text-3xl font-bold text-green-600">87%</p>
                <p className="text-sm text-gray-600 mt-1">Above average</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Success Rate
                </h3>
                <p className="text-3xl font-bold text-orange-600">94%</p>
                <p className="text-sm text-gray-600 mt-1">Outstanding</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
