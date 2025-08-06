"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  Briefcase,
  Users,
  TrendingUp,
  Calendar,
  Plus,
  ArrowRight,
  Target,
  Brain,
  Award,
  Crown,
  Trophy,
  Medal,
  CheckCircle,
  Check,
  Clock,
  DollarSign,
  Globe,
  Star,
  Zap,
  Lightbulb,
  Rocket,
  Sparkles,
  Activity,
  BarChart3,
  PieChart,
  TrendingDown,
  Eye,
  MessageSquare,
  Heart,
  Share2,
  Settings,
  Filter,
  Search,
  Bell,
  Mail,
  Phone,
  MapPin,
  Tag,
  Hash,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Download,
  Bookmark,
  BookmarkPlus,
  Send,
  Camera,
  Video,
  Mic,
  Music,
  Gamepad2,
  Code,
  PenTool,
  Palette,
  Image,
  FileText,
  Folder,
  User,
  Shield,
  Verified,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Users as UsersIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Award as AwardIcon,
  Crown as CrownIcon,
  Trophy as TrophyIcon,
  Medal as MedalIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon2,
  Tag as TagIcon,
  Hash as HashIcon,
  DollarSign as DollarSignIcon,
  Globe as GlobeIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Linkedin as LinkedinIcon,
  Youtube as YoutubeIcon,
  Facebook as FacebookIcon,
  ExternalLink as ExternalLinkIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Lightbulb as LightbulbIcon,
  Rocket as RocketIcon,
  Sparkles as SparklesIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  Brain as BrainIcon,
  Activity as ActivityIcon,
  BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon,
  TrendingDown as TrendingDownIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  X as XIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Maximize2 as Maximize2Icon,
  Minimize2 as Minimize2Icon,
  Download as DownloadIcon,
  Bookmark as BookmarkIcon,
  BookmarkPlus as BookmarkPlusIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Camera as CameraIcon,
  Video as VideoIcon,
  Mic as MicIcon,
  Music as MusicIcon,
  Gamepad2 as Gamepad2Icon,
  Code as CodeIcon,
  PenTool as PenToolIcon,
  Palette as PaletteIcon,
  Image as ImageIcon,
  FileText as FileTextIcon,
  Folder as FolderIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Shield as ShieldIcon,
  Verified as VerifiedIcon,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function BusinessDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLanguage();

  const recentSuggestions = [
    {
      id: "1",
      name: "Sofia Rodriguez",
      category: "Fashion Model",
      location: "Los Angeles, CA",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Professional fashion model with 5+ years experience in commercial and editorial photography",
      matchScore: 95,
      followers: 150000,
      engagementRate: 4.5,
      skills: ["Fashion", "Commercial", "Editorial", "Beauty"],
      verified: true,
      featured: true,
    },
    {
      id: "2",
      name: "Marcus Chen",
      category: "Tech Influencer",
      location: "New York, NY",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Tech lifestyle influencer and content creator with expertise in AI and innovation",
      matchScore: 87,
      followers: 250000,
      engagementRate: 6.2,
      skills: ["Tech", "Lifestyle", "Video Content", "AI"],
      verified: true,
      featured: false,
    },
    {
      id: "3",
      name: "Emma Thompson",
      category: "Content Creator",
      location: "Miami, FL",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Lifestyle and beauty content creator with a passion for sustainable living",
      matchScore: 92,
      followers: 180000,
      engagementRate: 5.8,
      skills: ["Lifestyle", "Beauty", "Sustainability", "Social Media"],
      verified: true,
      featured: true,
    },
  ];

  const activeProjects = [
    {
      id: "1",
      title: "Summer Fashion Campaign",
      status: "Active",
      matches: 24,
      deadline: "2024-02-15",
      budget: "$15,000",
      aiScore: 94,
      successProbability: 92,
      views: 156,
      engagement: 87,
      category: "Fashion",
      industry: "Lifestyle",
    },
    {
      id: "2",
      title: "Tech Product Launch",
      status: "Draft",
      matches: 0,
      deadline: "2024-02-20",
      budget: "$25,000",
      aiScore: 78,
      successProbability: 85,
      views: 0,
      engagement: 0,
      category: "Product Launch",
      industry: "Technology",
    },
    {
      id: "3",
      title: "Beauty Brand Campaign",
      status: "Active",
      matches: 18,
      deadline: "2024-02-25",
      budget: "$12,000",
      aiScore: 89,
      successProbability: 88,
      views: 89,
      engagement: 76,
      category: "Brand Campaign",
      industry: "Beauty",
    },
  ];

  const quickActions = [
    {
      id: "1",
      title: "Create New Project",
      description: "Start a new campaign or project",
      icon: <Plus className="h-6 w-6" />,
      color: "from-blue-500 to-purple-600",
      href: "/business/project/create",
    },
    {
      id: "2",
      title: "View All Projects",
      description: "Manage your existing projects",
      icon: <Briefcase className="h-6 w-6" />,
      color: "from-green-500 to-emerald-600",
      href: "/business/projects",
    },
    {
      id: "3",
      title: "AI Preferences",
      description: "Customize your AI matching",
      icon: <Brain className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600",
      href: "/business/ai-preferences",
    },
    {
      id: "4",
      title: "Network",
      description: "Connect with other businesses",
      icon: <Users className="h-6 w-6" />,
      color: "from-orange-500 to-red-600",
      href: "/business/network",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "project_created",
      title: "Summer Fashion Campaign created",
      description: "New project added to your portfolio",
      time: "2 hours ago",
      icon: <Plus className="h-4 w-4" />,
      color: "text-green-600",
    },
    {
      id: "2",
      type: "match_found",
      title: "24 new matches found",
      description: "Sofia Rodriguez and 23 others matched your project",
      time: "4 hours ago",
      icon: <Target className="h-4 w-4" />,
      color: "text-blue-600",
    },
    {
      id: "3",
      type: "message_received",
      title: "New message from Marcus Chen",
      description: "Interested in your Tech Product Launch project",
      time: "6 hours ago",
      icon: <MessageSquare className="h-4 w-4" />,
      color: "text-purple-600",
    },
    {
      id: "4",
      type: "project_completed",
      title: "Winter Collection Campaign completed",
      description: "Project successfully finished with 4.9 rating",
      time: "1 day ago",
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-emerald-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Welcome back, {user?.name}! ✨
                    </h1>
                    <p className="text-blue-100 text-lg">
                      Manage your projects and discover amazing talent
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium shadow-lg">
                    <Briefcase className="h-4 w-4" />
                    <span>3 Active Projects</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium shadow-lg">
                    <Users className="h-4 w-4" />
                    <span>47 Total Matches</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white text-sm font-medium shadow-lg">
                    <TrendingUp className="h-4 w-4" />
                    <span>89% Response Rate</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  onClick={() => router.push("/business/project/create")}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Project
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Briefcase className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +1
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Active Projects
                </p>
                <p className="text-3xl font-bold">3</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +15
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Total Matches
                </p>
                <p className="text-3xl font-bold">47</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +5%
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Response Rate
                </p>
                <p className="text-3xl font-bold">89%</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Calendar className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +2
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center text-white">
              <Zap className="mr-3 h-6 w-6" />
              Quick Actions
              <Badge className="ml-auto bg-white/20 text-white">
                AI Powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  variant="outline"
                  className="h-auto p-6 flex flex-col items-center space-y-3 bg-white hover:bg-gray-50 border-2 hover:border-blue-300 transition-all duration-300 group"
                  onClick={() => router.push(action.href)}
                >
                  <div
                    className={`p-3 rounded-full bg-gradient-to-r ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}
                  >
                    {action.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{action.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Projects */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="flex items-center">
                    <Briefcase className="mr-3 h-6 w-6" />
                    My Projects
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => router.push("/business/projects")}
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {activeProjects.map((project) => (
                    <div
                      key={project.id}
                      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-white p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-xl font-semibold">
                              {project.title}
                            </h4>
                            <Badge
                              variant={
                                project.status === "Active"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                project.status === "Active"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : ""
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                              <span>Due: {project.deadline}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                              <span>{project.budget}</span>
                            </div>
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-2 text-purple-600" />
                              <span>{project.matches} matches</span>
                            </div>
                            <div className="flex items-center">
                              <Brain className="h-4 w-4 mr-2 text-orange-600" />
                              <span>{project.aiScore}% AI Score</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                              {project.successProbability}%
                            </p>
                            <p className="text-xs text-gray-600">
                              Success Rate
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600">
                              {project.views}
                            </p>
                            <p className="text-xs text-gray-600">Views</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-purple-600">
                              {project.engagement}%
                            </p>
                            <p className="text-xs text-gray-600">Engagement</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                          onClick={() =>
                            router.push(
                              `/business/project/${project.id}/suggestions`
                            )
                          }
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Suggestions
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Activity className="mr-3 h-6 w-6" />
                  Recent Activity
                  <Badge className="ml-auto bg-white/20 text-white">
                    Live Updates
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div
                        className={`p-2 rounded-full bg-white ${activity.color}`}
                      >
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900">
                          {activity.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Talent Suggestions */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Users className="mr-3 h-6 w-6" />
                  Top Matches
                  <Badge className="ml-auto bg-white/20 text-white">
                    AI Selected
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentSuggestions.map((talent) => (
                    <div
                      key={talent.id}
                      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-white p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <UserAvatar
                            user={{ name: talent.name, avatar: talent.avatar }}
                            size="lg"
                          />
                          {talent.verified && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                          {talent.featured && (
                            <div className="absolute -top-1 -left-1 bg-yellow-500 rounded-full p-1">
                              <Crown className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 truncate">
                              {talent.name}
                            </h4>
                            <Badge
                              variant="secondary"
                              className="text-green-600 bg-green-100"
                            >
                              {talent.matchScore}% Match
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {talent.category}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                            {talent.bio}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {talent.location}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {talent.followers.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                              onClick={() =>
                                router.push(`/business/talent/${talent.id}`)
                              }
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                router.push(`/business/talent/${talent.id}`)
                              }
                            >
                              <MessageSquare className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="w-full bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-pink-100"
                    onClick={() => router.push("/business/projects")}
                  >
                    View All Matches
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <BarChart3 className="mr-3 h-6 w-6" />
                  Performance Insights
                  <Badge className="ml-auto bg-white/20 text-white">
                    This Month
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                      <span className="text-sm font-medium">Response Rate</span>
                    </div>
                    <span className="text-lg font-bold text-emerald-600">
                      89%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Target className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">
                        Avg Match Score
                      </span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="text-sm font-medium">
                        Avg Response Time
                      </span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                      2.4h
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-orange-600 mr-2" />
                      <span className="text-sm font-medium">Total Spent</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">
                      $52K
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
