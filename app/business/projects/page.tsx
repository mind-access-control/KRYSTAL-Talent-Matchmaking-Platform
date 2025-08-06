"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Calendar,
  Users,
  DollarSign,
  Zap,
  Brain,
  Target,
  TrendingUp,
  Award,
  Crown,
  Rocket,
  Sparkles,
  ArrowRight,
  Filter,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  MessageSquare,
  Briefcase,
  Globe,
  Lightbulb,
  Wand2,
  Bot,
  Play,
  Pause,
  CheckSquare,
  Square,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/components/ui/toast";

export default function BusinessProjects() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const projects = [
    {
      id: "1",
      title: "Summer Fashion Campaign",
      description:
        "Looking for fashion models for our summer collection campaign",
      status: "Active",
      budget: "$8,500",
      deadline: "2024-02-15",
      matches: 24,
      category: "Fashion",
      aiScore: 94,
      engagement: 87,
      views: 156,
      priority: "High",
      type: "Brand Campaign",
      location: "Los Angeles, CA",
      duration: "3 days",
      aiGenerated: true,
    },
    {
      id: "2",
      title: "Tech Product Launch",
      description: "Need tech influencers for product launch campaign",
      status: "Draft",
      budget: "$5,200",
      deadline: "2024-02-20",
      matches: 0,
      category: "Technology",
      aiScore: 89,
      engagement: 92,
      views: 89,
      priority: "Medium",
      type: "Product Launch",
      location: "San Francisco, CA",
      duration: "2 days",
      aiGenerated: true,
    },
    {
      id: "3",
      title: "Lifestyle Brand Collaboration",
      description: "Seeking lifestyle influencers for brand partnership",
      status: "Completed",
      budget: "$12,000",
      deadline: "2024-01-30",
      matches: 18,
      category: "Lifestyle",
      aiScore: 96,
      engagement: 94,
      views: 234,
      priority: "High",
      type: "Brand Partnership",
      location: "New York, NY",
      duration: "1 week",
      aiGenerated: false,
    },
    {
      id: "4",
      title: "Beauty Product Campaign",
      description:
        "AI-generated campaign for new skincare line targeting Gen Z",
      status: "Active",
      budget: "$6,800",
      deadline: "2024-02-25",
      matches: 31,
      category: "Beauty",
      aiScore: 91,
      engagement: 89,
      views: 198,
      priority: "High",
      type: "Product Campaign",
      location: "Miami, FL",
      duration: "4 days",
      aiGenerated: true,
    },
  ];

  const stats = [
    {
      title: "Total Projects",
      value: "12",
      change: "+3",
      isPositive: true,
      icon: <Briefcase className="h-5 w-5" />,
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "+2",
      isPositive: true,
      icon: <Play className="h-5 w-5" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "AI Matches",
      value: "156",
      change: "+23",
      isPositive: true,
      icon: <Brain className="h-5 w-5" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+5%",
      isPositive: true,
      icon: <Award className="h-5 w-5" />,
      color: "from-yellow-500 to-orange-600",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePublish = (projectId: string) => {
    // Simulate API call
    setTimeout(() => {
      showToast(
        "Project published successfully! AI is finding matches...",
        "success"
      );
      // Update project status in the projects array
      // In a real app, this would update the backend
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      My Projects 🚀
                    </h1>
                    <p className="text-blue-100 text-lg">
                      AI-powered talent discovery and campaign management
                    </p>
                  </div>
                </div>

                {/* AI Stats */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium shadow-lg">
                    <Brain className="h-4 w-4" />
                    <span>AI Optimized</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium shadow-lg">
                    <TrendingUp className="h-4 w-4" />
                    <span>94% Success Rate</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white text-sm font-medium shadow-lg">
                    <Zap className="h-4 w-4" />
                    <span>Smart Matching</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  asChild
                >
                  <Link
                    href="/business/project/create"
                    className="flex items-center space-x-2"
                  >
                    <Wand2 className="h-5 w-5" />
                    <span>AI Create Project</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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

        {/* Enhanced Filters */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center text-white">
              <Filter className="mr-3 h-6 w-6" />
              Search & Filter
              <Badge className="ml-auto bg-white/20 text-white">Smart</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects by title, description, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <div className="space-y-1 w-4 h-4">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
          }
        >
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-white to-gray-50"
            >
              <CardHeader className="relative">
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  {project.aiGenerated && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Generated
                    </Badge>
                  )}
                  <Badge
                    variant={
                      project.status === "Active"
                        ? "default"
                        : project.status === "Draft"
                        ? "secondary"
                        : "outline"
                    }
                    className={`text-xs font-bold ${
                      project.status === "Active"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : project.status === "Draft"
                        ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
                        : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                    }`}
                  >
                    {project.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <CardTitle className="text-xl pr-20">
                    {project.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>

                  {/* AI Score and Metrics */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                        <Brain className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">
                        AI Score: {project.aiScore}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full">
                        <TrendingUp className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm font-medium">
                        {project.engagement}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Project Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {project.budget}
                      </p>
                      <p className="text-xs text-gray-500">Budget</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {project.deadline}
                      </p>
                      <p className="text-xs text-gray-500">Deadline</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {project.matches}
                      </p>
                      <p className="text-xs text-gray-500">Matches</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {project.views}
                      </p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.type}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.location}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.duration}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    asChild
                    className="flex-1 min-w-[120px]"
                  >
                    <Link
                      href={`/business/project/${project.id}/view`}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Project</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="flex-1 min-w-[120px]"
                  >
                    <Link
                      href={`/business/project/${project.id}/edit`}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                  </Button>
                  {project.status === "Active" && (
                    <Button
                      asChild
                      className="flex-1 min-w-[120px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <Link
                        href={`/business/project/${project.id}/suggestions`}
                        className="flex items-center justify-center space-x-2"
                      >
                        <Target className="h-4 w-4" />
                        <span>View Matches</span>
                      </Link>
                    </Button>
                  )}
                  {project.status === "Draft" && (
                    <Button
                      variant="secondary"
                      onClick={() => handlePublish(project.id)}
                      className="flex-1 min-w-[120px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      <Rocket className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No projects found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters to find your projects"
                  : "Create your first AI-powered project to start discovering amazing talent"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Link
                    href="/business/project/create"
                    className="flex items-center space-x-2"
                  >
                    <Wand2 className="h-5 w-5" />
                    <span>Create Your First Project</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
