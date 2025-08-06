"use client";

import type React from "react";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  ArrowLeft,
  Target,
  Brain,
  TrendingUp,
  Award,
  Users,
  DollarSign,
  Calendar as CalendarIcon2,
  MapPin,
  Tag,
  Hash,
  Image,
  Video,
  FileText,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Edit3,
  ExternalLink,
  Share2,
  Download,
  Copy,
  MessageSquare,
  Users as UsersIcon,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

export default function ViewProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Mock project data based on ID
  const project = {
    title: "Summer Fashion Campaign",
    description:
      "Looking for fashion models for our summer collection campaign. We need versatile talent who can showcase our new line with authenticity and style. This campaign will target Gen Z and millennial audiences through social media and traditional advertising channels.",
    campaignType: "Brand Campaign",
    industrySector: "Fashion",
    budget: "8500",
    deadline: new Date("2024-02-15"),
    talentTypes: ["Model", "Influencer"],
    skills: [
      "Fashion Photography",
      "Commercial Modeling",
      "Social Media",
      "Lifestyle Content",
    ],
    location: "Los Angeles, CA",
    styleAndTone:
      "Fresh, vibrant, and youthful aesthetic that appeals to millennials and Gen Z. Looking for natural, authentic expressions and diverse representation. The style should be modern, inclusive, and reflect current fashion trends.",
    references: [
      {
        id: "1",
        name: "summer-collection-moodboard.jpg",
        type: "image",
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        size: "2.4 MB",
      },
      {
        id: "2",
        name: "brand-guidelines.pdf",
        type: "document",
        url: "#",
        size: "1.2 MB",
      },
      {
        id: "3",
        name: "reference-video.mp4",
        type: "video",
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=600&fit=crop",
        size: "8.7 MB",
      },
      {
        id: "4",
        name: "color-palette.jpg",
        type: "image",
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
        size: "1.8 MB",
      },
    ] as any[],
    aiScore: 94,
    estimatedMatches: 24,
    successProbability: 92,
    views: 156,
    engagement: 87,
    status: "Active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev ===
      project.references.filter((r) => r.type === "image" || r.type === "video")
        .length -
        1
        ? 0
        : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0
        ? project.references.filter(
            (r) => r.type === "image" || r.type === "video"
          ).length - 1
        : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const mediaFiles = project.references.filter(
    (r) => r.type === "image" || r.type === "video"
  );
  const currentMedia = mediaFiles[currentImageIndex];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
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
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      {project.title} ✨
                    </h1>
                    <p className="text-blue-100 text-lg">
                      Complete project overview and requirements
                    </p>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium shadow-lg">
                    <Brain className="h-4 w-4" />
                    <span>AI Score: {project.aiScore}%</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium shadow-lg">
                    <Users className="h-4 w-4" />
                    <span>{project.estimatedMatches} Matches</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white text-sm font-medium shadow-lg">
                    <TrendingUp className="h-4 w-4" />
                    <span>{project.successProbability}% Success</span>
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
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  asChild
                >
                  <Link href={`/business/project/${id}/edit`}>
                    <Edit3 className="h-5 w-5 mr-2" />
                    Edit Project
                  </Link>
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
                  <Eye className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +12%
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Project Views
                </p>
                <p className="text-3xl font-bold">{project.views}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl">
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
                  Engagement Rate
                </p>
                <p className="text-3xl font-bold">{project.engagement}%</p>
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
                  +8
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Talent Matches
                </p>
                <p className="text-3xl font-bold">{project.estimatedMatches}</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Award className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +3%
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Success Rate
                </p>
                <p className="text-3xl font-bold">
                  {project.successProbability}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Description */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <FileText className="mr-3 h-6 w-6" />
                  Project Description
                  <Badge className="ml-auto bg-white/20 text-white">
                    Overview
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-gray-700">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Talent Requirements */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Users className="mr-3 h-6 w-6" />
                  Talent Requirements
                  <Badge className="ml-auto bg-white/20 text-white">
                    AI Optimized
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Talent Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.talentTypes.map((type) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Location</h3>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span className="text-lg">{project.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Style & Tone */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Image className="mr-3 h-6 w-6" />
                  Style & Tone
                  <Badge className="ml-auto bg-white/20 text-white">
                    Creative
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-gray-700">
                  {project.styleAndTone}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Hash className="mr-3 h-6 w-6" />
                  Project Info
                  <Badge className="ml-auto bg-white/20 text-white">
                    Details
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Tag className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-blue-600">
                        Campaign Type
                      </span>
                    </div>
                    <p className="text-lg">{project.campaignType}</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Hash className="h-4 w-4 text-green-600" />
                      <span className="font-semibold text-green-600">
                        Industry
                      </span>
                    </div>
                    <p className="text-lg">{project.industrySector}</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                      <span className="font-semibold text-purple-600">
                        Budget
                      </span>
                    </div>
                    <p className="text-lg">${project.budget}</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CalendarIcon2 className="h-4 w-4 text-orange-600" />
                      <span className="font-semibold text-orange-600">
                        Deadline
                      </span>
                    </div>
                    <p className="text-lg">
                      {project.deadline
                        ? format(project.deadline, "MMM dd, yyyy")
                        : "Not set"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Target className="mr-3 h-6 w-6" />
                  Quick Actions
                  <Badge className="ml-auto bg-white/20 text-white">
                    Actions
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    <Link href={`/business/project/${id}/suggestions`}>
                      <Target className="h-4 w-4 mr-2" />
                      View Matches
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/business/project/${id}/edit`}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Project
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowShareDialog(true)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Media Gallery */}
        {mediaFiles.length > 0 && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center text-white">
                <Image className="mr-3 h-6 w-6" />
                Reference Materials
                <Badge className="ml-auto bg-white/20 text-white">
                  {mediaFiles.length} Files
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Main Media Display */}
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  {currentMedia && (
                    <>
                      {currentMedia.type === "image" ? (
                        <img
                          src={currentMedia.url}
                          alt={currentMedia.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <div className="text-center text-white">
                            <Video className="h-16 w-16 mx-auto mb-4" />
                            <p className="text-lg">{currentMedia.name}</p>
                            <p className="text-sm text-gray-300">
                              {currentMedia.size}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Navigation Arrows */}
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      {/* Fullscreen Button */}
                      <button
                        onClick={() => setShowFullscreen(true)}
                        className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <Maximize2 className="h-5 w-5" />
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 text-white rounded-full text-sm">
                        {currentImageIndex + 1} of {mediaFiles.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {mediaFiles.map((file, index) => (
                    <button
                      key={file.id}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? "border-blue-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {file.type === "image" ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <Video className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* File List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.references.map((file, index) => (
                    <div
                      key={file.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {file.type === "image" && (
                            <Image className="h-4 w-4 text-blue-500" />
                          )}
                          {file.type === "video" && (
                            <Video className="h-4 w-4 text-red-500" />
                          )}
                          {file.type === "document" && (
                            <FileText className="h-4 w-4 text-green-500" />
                          )}
                          <span className="text-sm font-medium truncate">
                            {file.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{file.size}</span>
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fullscreen Image Modal */}
        <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
          <DialogContent className="max-w-7xl max-h-[95vh] p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>Fullscreen View</DialogTitle>
            </DialogHeader>
            {currentMedia && (
              <div className="relative">
                {currentMedia.type === "image" ? (
                  <img
                    src={currentMedia.url}
                    alt={currentMedia.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center bg-gray-900">
                    <div className="text-center text-white">
                      <Video className="h-16 w-16 mx-auto mb-4" />
                      <p className="text-lg">{currentMedia.name}</p>
                      <p className="text-sm text-gray-300">
                        {currentMedia.size}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setShowFullscreen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/50 text-white rounded-lg">
                  <p className="font-medium">{currentMedia.name}</p>
                  <p className="text-sm text-gray-300">{currentMedia.size}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Share Project Dialog */}
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-xl">
                <Share2 className="mr-3 h-6 w-6" />
                Share Project
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Project Preview */}
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <p className="text-sm text-gray-600">
                      {project.campaignType}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Share Link */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Project Link</Label>
                <div className="flex space-x-2">
                  <Input
                    value={`https://krystal.com/project/${id}`}
                    readOnly
                    className="flex-1 text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://krystal.com/project/${id}`
                      );
                      // You could add a toast notification here
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Anyone with this link can view the project details
                </p>
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Share via</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Message</span>
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowShareDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://krystal.com/project/${id}`
                    );
                    setShowShareDialog(false);
                    // You could add a toast notification here
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
