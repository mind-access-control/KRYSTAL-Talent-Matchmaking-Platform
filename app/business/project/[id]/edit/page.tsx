"use client";

import type React from "react";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  Upload,
  X,
  Wand2,
  Brain,
  Sparkles,
  Target,
  Zap,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Globe,
  Briefcase,
  Star,
  TrendingUp,
  Award,
  Crown,
  Rocket,
  Bot,
  MessageSquare,
  Play,
  Loader2,
  Copy,
  Eye,
  Edit3,
  Save,
  Trash2,
  Image,
  Video,
  FileText,
  Settings,
  BarChart3,
  Heart,
  Share2,
  Download,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Eye as EyeIcon,
  Users as UsersIcon,
  MapPin,
  Calendar as CalendarIcon2,
  Tag,
  Hash,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

export default function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const { id } = use(params);

  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Mock project data based on ID
  const [project, setProject] = useState({
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
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
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
  });

  const [newSkill, setNewSkill] = useState("");

  const talentTypeOptions = [
    "Model",
    "Influencer",
    "Actor",
    "Digital Artist",
    "Photographer",
    "Content Creator",
  ];

  const campaignTypes = [
    "Brand Campaign",
    "Product Launch",
    "Social Media Campaign",
    "Event Promotion",
    "Content Creation",
    "Commercial",
  ];

  const industrySectors = [
    "Fashion",
    "Technology",
    "Beauty",
    "Lifestyle",
    "Food & Beverage",
    "Automotive",
    "Travel",
    "Health & Fitness",
  ];

  const handleTalentTypeChange = (type: string, checked: boolean) => {
    setProject((prev) => ({
      ...prev,
      talentTypes: checked
        ? [...prev.talentTypes, type]
        : prev.talentTypes.filter((t) => t !== type),
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !project.skills.includes(newSkill.trim())) {
      setProject((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newReferences = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      type: file.type.startsWith("video/") ? "video" : "image",
      url: URL.createObjectURL(file),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    }));

    setProject((prev) => ({
      ...prev,
      references: [...prev.references, ...newReferences],
    }));
  };

  const removeFile = (index: number) => {
    setProject((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();

    if (!project.title.trim() || !project.description.trim()) {
      showToast("Please fill in required fields", "error");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (isDraft) {
        showToast("Project saved as draft!", "success");
        router.push("/business/projects");
      } else {
        showToast("Project updated successfully!", "success");
        router.push(`/business/project/${id}/suggestions`);
      }
    }, 1000);
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      setTimeout(() => {
        showToast("Project deleted successfully", "success");
        router.push("/business/projects");
      }, 1000);
    }
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
                    <Edit3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      Edit Project ✨
                    </h1>
                    <p className="text-blue-100 text-lg">
                      Update your project requirements and preferences
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
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                  onClick={() => setShowProjectDetails(true)}
                >
                  <Eye className="h-5 w-5 mr-2" />
                  View Details
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="bg-red-500/20 hover:bg-red-500/30 text-white border-red-300/30 backdrop-blur-sm"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete Project
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
                  <Heart className="h-5 w-5" />
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

        <form className="space-y-6">
          {/* Project Details */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center text-white">
                <FileText className="mr-3 h-6 w-6" />
                Project Details
                <Badge className="ml-auto bg-white/20 text-white">
                  Required
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-semibold">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    value={project.title}
                    onChange={(e) =>
                      setProject((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="e.g., Summer Fashion Campaign"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-lg font-semibold"
                  >
                    Project Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={project.description}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe your project, goals, and creative vision..."
                    rows={6}
                    required
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="campaignType"
                      className="text-lg font-semibold"
                    >
                      Campaign Type
                    </Label>
                    <Select
                      value={project.campaignType}
                      onValueChange={(value) =>
                        setProject((prev) => ({ ...prev, campaignType: value }))
                      }
                    >
                      <SelectTrigger className="text-lg">
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        {campaignTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="industrySector"
                      className="text-lg font-semibold"
                    >
                      Industry Sector
                    </Label>
                    <Select
                      value={project.industrySector}
                      onValueChange={(value) =>
                        setProject((prev) => ({
                          ...prev,
                          industrySector: value,
                        }))
                      }
                    >
                      <SelectTrigger className="text-lg">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industrySectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-lg font-semibold">
                      Budget (USD)
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      value={project.budget}
                      onChange={(e) =>
                        setProject((prev) => ({
                          ...prev,
                          budget: e.target.value,
                        }))
                      }
                      placeholder="8500"
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-lg font-semibold">Deadline</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal text-lg",
                            !project.deadline && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5" />
                          {project.deadline
                            ? format(project.deadline, "PPP")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={project.deadline}
                          onSelect={(date) =>
                            setProject((prev) => ({
                              ...prev,
                              deadline: date || new Date(),
                            }))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
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
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Talent Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {talentTypeOptions.map((type) => (
                      <div
                        key={type}
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        <Checkbox
                          id={type}
                          checked={project.talentTypes.includes(type)}
                          onCheckedChange={(checked) =>
                            handleTalentTypeChange(type, checked as boolean)
                          }
                        />
                        <Label
                          htmlFor={type}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-semibold">
                    Specific Skills
                  </Label>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-2 px-3 py-2 text-sm"
                      >
                        <Tag className="h-3 w-3" />
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Add skill (e.g., Fashion Photography)"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={addSkill}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      Add Skill
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-lg font-semibold">
                    Desired Location
                  </Label>
                  <Input
                    id="location"
                    value={project.location}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="e.g., Los Angeles, CA or Remote"
                    className="text-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Style & References */}
          <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center text-white">
                <Image className="mr-3 h-6 w-6" />
                Style & References
                <Badge className="ml-auto bg-white/20 text-white">
                  {project.references.length} Files
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label
                    htmlFor="styleAndTone"
                    className="text-lg font-semibold"
                  >
                    Desired Style and Tone
                  </Label>
                  <Textarea
                    id="styleAndTone"
                    value={project.styleAndTone}
                    onChange={(e) =>
                      setProject((prev) => ({
                        ...prev,
                        styleAndTone: e.target.value,
                      }))
                    }
                    placeholder="Describe the aesthetic, mood, and style you're looking for..."
                    rows={4}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="references" className="text-lg font-semibold">
                    Visual Examples/References
                  </Label>

                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 hover:border-blue-300 transition-colors">
                    <div className="text-center">
                      <Upload className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                      <div className="space-y-2">
                        <Label htmlFor="file-upload" className="cursor-pointer">
                          <span className="text-lg font-medium text-primary hover:text-primary/80">
                            Upload reference images or videos
                          </span>
                        </Label>
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept="image/*,video/*,.pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG, MP4, PDF up to 10MB each
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Uploaded Files Grid */}
                  {project.references.length > 0 && (
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">
                        Uploaded Files
                      </Label>
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
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
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
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/business/projects")}
              className="text-lg px-8 py-3"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, true)}
              className="text-lg px-8 py-3"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Draft
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-3"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              Update Project
            </Button>
          </div>
        </form>

        {/* Project Details Dialog */}
        <Dialog open={showProjectDetails} onOpenChange={setShowProjectDetails}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center text-2xl">
                <Eye className="mr-3 h-6 w-6" />
                Project Details
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-8">
              {/* Project Header */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">{project.title}</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {project.description}
                </p>

                {/* Project Stats */}
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {project.aiScore}%
                    </p>
                    <p className="text-sm text-muted-foreground">AI Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {project.estimatedMatches}
                    </p>
                    <p className="text-sm text-muted-foreground">Matches</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {project.successProbability}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Success Rate
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {project.views}
                    </p>
                    <p className="text-sm text-muted-foreground">Views</p>
                  </div>
                </div>
              </div>

              {/* Project Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                      ? format(project.deadline, "MMM dd")
                      : "Not set"}
                  </p>
                </div>
              </div>

              {/* Location & Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Location
                  </h3>
                  <p className="text-lg">{project.location}</p>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <UsersIcon className="mr-2 h-5 w-5" />
                    Talent Types
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.talentTypes.map((type) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Style & Tone */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Style & Tone</h3>
                <p className="text-lg leading-relaxed">
                  {project.styleAndTone}
                </p>
              </div>

              {/* Skills */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Media Gallery */}
              {mediaFiles.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Reference Materials</h3>

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
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowProjectDetails(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() =>
                    router.push(`/business/project/${id}/suggestions`)
                  }
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Target className="mr-2 h-4 w-4" />
                  View Matches
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

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
      </div>
    </DashboardLayout>
  );
}
