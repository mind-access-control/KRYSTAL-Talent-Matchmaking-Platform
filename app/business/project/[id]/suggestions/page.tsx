"use client";

import type React from "react";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TalentCard } from "@/components/ui/talent-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Search,
  ArrowUpDown,
  Target,
  Brain,
  Users,
  TrendingUp,
  Award,
  Star,
  Filter,
  Sparkles,
  Zap,
  ArrowLeft,
  Eye,
  MessageSquare,
  Heart,
  Crown,
  Trophy,
  Medal,
  CheckCircle,
  Clock,
  MapPin,
  Tag,
  Hash,
  DollarSign,
  Calendar,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  TrendingDown,
  Plus,
  Minus,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Download,
  Share2,
  Bookmark,
  BookmarkPlus,
  Send,
  Phone,
  Mail,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Info,
  Lightbulb,
  Rocket,
  Palette,
  Camera,
  Video,
  Mic,
  Music,
  Gamepad2,
  Code,
  PenTool,
  Palette as PaletteIcon,
  Camera as CameraIcon,
  Video as VideoIcon,
  Mic as MicIcon,
  Music as MusicIcon,
  Gamepad2 as GamepadIcon,
  Code as CodeIcon,
  PenTool as PenToolIcon,
} from "lucide-react";
import Link from "next/link";

export default function TalentSuggestions({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [sortBy, setSortBy] = useState("match");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const projectTitle = "Summer Fashion Campaign";

  const talentSuggestions = [
    {
      id: "1",
      name: "Sofia Rodriguez",
      category: "Model",
      location: "Los Angeles, CA",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Professional fashion model with 5+ years experience in commercial and editorial photography. Specializes in lifestyle and beauty campaigns.",
      matchScore: 95,
      followers: 150000,
      engagementRate: 4.5,
      hourlyRate: 250,
      availability: "Available",
      verified: true,
      featured: true,
      skills: [
        "Fashion Photography",
        "Commercial Modeling",
        "Editorial",
        "Beauty",
        "Lifestyle",
      ],
      socialMedia: {
        instagram: "sofia_rodriguez",
        twitter: "sofia_rodriguez",
        linkedin: "sofia-rodriguez",
      },
      portfolio: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
      ],
      recentWork: [
        { brand: "Nike", type: "Campaign", date: "2024-01" },
        { brand: "Vogue", type: "Editorial", date: "2023-12" },
        { brand: "H&M", type: "Commercial", date: "2023-11" },
      ],
    },
    {
      id: "2",
      name: "Isabella Chen",
      category: "Model",
      location: "New York, NY",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Versatile model experienced in high fashion and commercial work. Featured in major fashion magazines and brand campaigns.",
      matchScore: 92,
      followers: 89000,
      engagementRate: 5.2,
      hourlyRate: 300,
      availability: "Available",
      verified: true,
      featured: false,
      skills: ["High Fashion", "Commercial", "Runway", "Print", "Digital"],
      socialMedia: {
        instagram: "isabella_chen",
        twitter: "isabella_chen",
        linkedin: "isabella-chen",
      },
      portfolio: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      ],
      recentWork: [
        { brand: "Chanel", type: "Runway", date: "2024-01" },
        { brand: "Elle", type: "Editorial", date: "2023-12" },
      ],
    },
    {
      id: "3",
      name: "Marcus Thompson",
      category: "Model",
      location: "Miami, FL",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Male fashion model specializing in fitness and lifestyle brands. Strong social media presence and professional portfolio.",
      matchScore: 88,
      followers: 125000,
      engagementRate: 3.8,
      hourlyRate: 200,
      availability: "Available",
      verified: true,
      featured: false,
      skills: [
        "Fitness Modeling",
        "Lifestyle",
        "Commercial",
        "Social Media",
        "Brand Ambassador",
      ],
      socialMedia: {
        instagram: "marcus_thompson",
        twitter: "marcus_thompson",
        linkedin: "marcus-thompson",
      },
      portfolio: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      ],
      recentWork: [
        { brand: "Adidas", type: "Fitness", date: "2024-01" },
        { brand: "GQ", type: "Editorial", date: "2023-12" },
      ],
    },
    {
      id: "4",
      name: "Emma Williams",
      category: "Influencer",
      location: "Los Angeles, CA",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      bio: "Fashion and lifestyle influencer with a focus on sustainable fashion. Creates engaging content for millennial and Gen Z audiences.",
      matchScore: 85,
      followers: 280000,
      engagementRate: 6.1,
      hourlyRate: 400,
      availability: "Available",
      verified: true,
      featured: true,
      skills: [
        "Fashion Content",
        "Sustainable Fashion",
        "Lifestyle",
        "Photography",
        "Video Content",
      ],
      socialMedia: {
        instagram: "emma_williams",
        twitter: "emma_williams",
        linkedin: "emma-williams",
        youtube: "emma_williams",
      },
      portfolio: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      ],
      recentWork: [
        { brand: "H&M Conscious", type: "Campaign", date: "2024-01" },
        { brand: "Vogue", type: "Feature", date: "2023-12" },
      ],
    },
    {
      id: "5",
      name: "David Park",
      category: "Photographer",
      location: "San Francisco, CA",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Creative fashion photographer with a unique artistic vision. Experienced in both studio and location shoots.",
      matchScore: 82,
      followers: 45000,
      engagementRate: 4.2,
      hourlyRate: 350,
      availability: "Available",
      verified: true,
      featured: false,
      skills: [
        "Fashion Photography",
        "Creative Direction",
        "Studio Lighting",
        "Post-Production",
        "Art Direction",
      ],
      socialMedia: {
        instagram: "david_park_photo",
        twitter: "david_park_photo",
        linkedin: "david-park-photography",
      },
      portfolio: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      ],
      recentWork: [
        { brand: "Vogue", type: "Editorial", date: "2024-01" },
        { brand: "Nike", type: "Campaign", date: "2023-12" },
      ],
    },
    {
      id: "6",
      name: "Alicia Martinez",
      category: "Influencer",
      location: "Miami, FL",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
      bio: "Lifestyle and beauty influencer with expertise in makeup tutorials and fashion hauls. Strong engagement with Gen Z audience.",
      matchScore: 78,
      followers: 320000,
      engagementRate: 5.8,
      hourlyRate: 450,
      availability: "Available",
      verified: true,
      featured: false,
      skills: [
        "Beauty Content",
        "Makeup Tutorials",
        "Fashion Hauls",
        "Lifestyle",
        "Video Content",
      ],
      socialMedia: {
        instagram: "alicia_martinez",
        twitter: "alicia_martinez",
        linkedin: "alicia-martinez",
        youtube: "alicia_martinez",
        tiktok: "alicia_martinez",
      },
      portfolio: [
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      ],
      recentWork: [
        { brand: "Sephora", type: "Campaign", date: "2024-01" },
        { brand: "MAC Cosmetics", type: "Tutorial", date: "2023-12" },
      ],
    },
  ];

  const filteredAndSortedTalent = talentSuggestions
    .filter((talent) => {
      const matchesSearch =
        talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        talent.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesFilter =
        filterBy === "all" || talent.category.toLowerCase() === filterBy;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.matchScore - a.matchScore;
        case "followers":
          return b.followers - a.followers;
        case "engagement":
          return b.engagementRate - a.engagementRate;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const averageMatchScore =
    talentSuggestions.reduce((acc, talent) => acc + talent.matchScore, 0) /
    talentSuggestions.length;
  const totalFollowers = talentSuggestions.reduce(
    (acc, talent) => acc + talent.followers,
    0
  );
  const averageEngagement =
    talentSuggestions.reduce((acc, talent) => acc + talent.engagementRate, 0) /
    talentSuggestions.length;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 p-8 text-white shadow-2xl">
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                      AI Talent Matches ✨
                    </h1>
                    <p className="text-pink-100 text-lg">
                      Discover the perfect talent for your project
                    </p>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium shadow-lg">
                    <Brain className="h-4 w-4" />
                    <span>AI Powered Matching</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium shadow-lg">
                    <Users className="h-4 w-4" />
                    <span>{talentSuggestions.length} Matches Found</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white text-sm font-medium shadow-lg">
                    <TrendingUp className="h-4 w-4" />
                    <span>{averageMatchScore.toFixed(0)}% Avg Match</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0 flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  onClick={() => router.push("/business/projects")}
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Projects
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Target className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +{talentSuggestions.length}
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Total Matches
                </p>
                <p className="text-3xl font-bold">{talentSuggestions.length}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Brain className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +{averageMatchScore.toFixed(0)}%
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Avg Match Score
                </p>
                <p className="text-3xl font-bold">
                  {averageMatchScore.toFixed(0)}%
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-white shadow-xl">
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
                  +{(totalFollowers / 1000000).toFixed(1)}M
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Total Reach</p>
                <p className="text-3xl font-bold">
                  {(totalFollowers / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 p-6 text-white shadow-xl">
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
                  +{averageEngagement.toFixed(1)}%
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Avg Engagement
                </p>
                <p className="text-3xl font-bold">
                  {averageEngagement.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Summary Card */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center text-white">
              <Target className="mr-3 h-6 w-6" />
              Project Overview
              <Badge className="ml-auto bg-white/20 text-white">
                {projectTitle}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-blue-600 font-medium">
                  Campaign Type
                </p>
                <p className="text-xl font-bold text-gray-900">Fashion</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-green-600 font-medium">Budget</p>
                <p className="text-xl font-bold text-gray-900">$8,500</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-sm text-purple-600 font-medium">Deadline</p>
                <p className="text-xl font-bold text-gray-900">Feb 15</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-sm text-orange-600 font-medium">Location</p>
                <p className="text-xl font-bold text-gray-900">LA, CA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center text-white">
              <Filter className="mr-3 h-6 w-6" />
              Search & Filters
              <Badge className="ml-auto bg-white/20 text-white">
                AI Optimized
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search talent by name, skills, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 text-lg py-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Basic Filters Row */}
              <div className="flex flex-col lg:flex-row gap-4">
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="text-lg py-4">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="model">Models</SelectItem>
                    <SelectItem value="influencer">Influencers</SelectItem>
                    <SelectItem value="photographer">Photographers</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="text-lg py-4">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="match">Highest Match</SelectItem>
                    <SelectItem value="followers">Most Followers</SelectItem>
                    <SelectItem value="engagement">Best Engagement</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterBy("all");
                    setSortBy("match");
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button
                  size="sm"
                  variant={showAdvancedFilters ? "default" : "outline"}
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className={
                    showAdvancedFilters
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                      : ""
                  }
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {showAdvancedFilters ? "Hide Advanced" : "Advanced Filters"}
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="border-t pt-6 space-y-4">
                  <h4 className="text-lg font-semibold text-gray-700 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Advanced Filters
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Match Score Range
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Min"
                          className="text-sm"
                          type="number"
                          min="0"
                          max="100"
                        />
                        <Input
                          placeholder="Max"
                          className="text-sm"
                          type="number"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Followers Range
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Min"
                          className="text-sm"
                          type="number"
                        />
                        <Input
                          placeholder="Max"
                          className="text-sm"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Engagement Rate
                      </label>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Min %"
                          className="text-sm"
                          type="number"
                          min="0"
                          max="100"
                        />
                        <Input
                          placeholder="Max %"
                          className="text-sm"
                          type="number"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAdvancedFilters(false)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Close
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <Filter className="h-4 w-4 mr-1" />
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border">
          <div className="flex items-center space-x-4">
            <p className="text-lg font-medium text-gray-700">
              Showing{" "}
              <span className="text-blue-600 font-bold">
                {filteredAndSortedTalent.length}
              </span>{" "}
              of{" "}
              <span className="text-gray-600">{talentSuggestions.length}</span>{" "}
              matches
            </p>
            {filteredAndSortedTalent.length > 0 && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {(
                  (filteredAndSortedTalent.length / talentSuggestions.length) *
                  100
                ).toFixed(0)}
                % Match Rate
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Sorted by{" "}
              {sortBy === "match"
                ? "Match Score"
                : sortBy === "followers"
                ? "Followers"
                : sortBy === "engagement"
                ? "Engagement"
                : "Name"}
            </span>
          </div>
        </div>

        {/* Talent Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedTalent.map((talent) => (
              <TalentCard
                key={talent.id}
                talent={talent}
                showMatchScore={true}
                viewUrl={`/business/talent/${talent.id}`}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedTalent.map((talent) => (
              <Card
                key={talent.id}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={talent.avatar}
                        alt={talent.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      {talent.verified && (
                        <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-bold">{talent.name}</h3>
                        {talent.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            <Crown className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline">{talent.category}</Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{talent.bio}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {talent.location}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {(talent.followers / 1000).toFixed(0)}K followers
                        </span>
                        <span className="flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          {talent.engagementRate}% engagement
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {talent.matchScore}%
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            router.push(`/business/talent/${talent.id}`)
                          }
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                          onClick={() => {
                            // Aquí podrías abrir un modal de contacto o redirigir a mensajes
                            router.push(
                              `/business/messages?talent=${talent.id}`
                            );
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredAndSortedTalent.length === 0 && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="text-center py-16">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">No matches found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to find more talent.
                Our AI is constantly learning to provide better matches.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterBy("all");
                    setSortBy("match");
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={() => {
                    // Aquí podrías recargar las sugerencias o aplicar filtros más avanzados
                    // Por ahora, solo recargamos la página para simular nuevas sugerencias
                    window.location.reload();
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Suggestions
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        {filteredAndSortedTalent.length > 0 && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to connect with talent?
                </h3>
                <p className="text-green-100 mb-6">
                  Start conversations with your top matches and bring your
                  project to life with the perfect talent.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => {
                      // Aquí podrías abrir un modal para contactar a todos los matches
                      const talentIds = filteredAndSortedTalent
                        .map((t) => t.id)
                        .join(",");
                      router.push(
                        `/business/messages?talent=${talentIds}&bulk=true`
                      );
                    }}
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contact All Matches
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100"
                    onClick={() => {
                      // Aquí podrías iniciar el proyecto o redirigir a la página de inicio del proyecto
                      router.push(`/business/project/${id}/view`);
                    }}
                  >
                    <Rocket className="h-5 w-5 mr-2" />
                    Start Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
