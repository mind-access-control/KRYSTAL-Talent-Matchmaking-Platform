"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  Edit,
  Trash2,
  Play,
  ImageIcon,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  Star,
  Eye,
  Heart,
  Share2,
  Download,
  BarChart3,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Camera,
  Video,
  Palette,
  Users,
  Globe,
  Award,
  Crown,
  Rocket,
  Brain,
  TargetIcon,
  Briefcase,
  Calendar,
  DollarSign,
  MessageSquare,
  Settings,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Maximize2,
  RotateCcw,
  Sparkle,
  Trophy,
  TrendingDown,
  Activity,
  PieChart,
  LineChart,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface MediaItem {
  id: string;
  type: "photo" | "video";
  url: string;
  description: string;
  uploadDate: string;
  category: string;
  tags: string[];
  aiScore: number;
  engagement: number;
  views: number;
}

interface AIAnalysis {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  marketFit: number;
  brandAlignment: number;
  technicalQuality: number;
  recommendations: string[];
}

interface ProjectMatch {
  id: string;
  title: string;
  company: string;
  budget: string;
  matchScore: number;
  description: string;
  requirements: string[];
  deadline: string;
}

export default function TalentPortfolio() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadDescription, setUploadDescription] = useState("");
  const [uploadCategory, setUploadCategory] = useState("Commercial");
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [editDescription, setEditDescription] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
  const [isApplyingAI, setIsApplyingAI] = useState(false);
  const [editCategory, setEditCategory] = useState<string>("");
  const [isAnalyzingCategory, setIsAnalyzingCategory] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [showProjectMatches, setShowProjectMatches] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Simulated portfolio data with realistic images
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      type: "photo",
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face",
      description:
        "Editorial fashion shoot for Vogue - High fashion editorial showcasing versatility and professional modeling skills",
      uploadDate: "2024-01-15",
      category: "Editorial",
      tags: ["fashion", "editorial", "vogue", "high-end"],
      aiScore: 95,
      engagement: 89,
      views: 1250,
    },
    {
      id: "2",
      type: "photo",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face",
      description:
        "Commercial campaign for luxury brand - Lifestyle photography demonstrating brand alignment and market appeal",
      uploadDate: "2024-01-10",
      category: "Commercial",
      tags: ["commercial", "luxury", "lifestyle", "brand"],
      aiScore: 92,
      engagement: 76,
      views: 980,
    },
    {
      id: "3",
      type: "video",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&crop=face",
      description:
        "Behind the scenes fashion video - Dynamic content showing personality and behind-the-scenes authenticity",
      uploadDate: "2024-01-08",
      category: "Behind Scenes",
      tags: ["video", "behind-scenes", "authentic", "personality"],
      aiScore: 88,
      engagement: 94,
      views: 2100,
    },
    {
      id: "4",
      type: "photo",
      url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=800&fit=crop&crop=face",
      description:
        "Beauty campaign for cosmetics brand - Close-up beauty photography highlighting natural features and makeup skills",
      uploadDate: "2024-01-05",
      category: "Beauty",
      tags: ["beauty", "cosmetics", "close-up", "makeup"],
      aiScore: 96,
      engagement: 82,
      views: 1560,
    },
    {
      id: "5",
      type: "photo",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop&crop=face",
      description:
        "Lifestyle brand collaboration - Authentic lifestyle content perfect for wellness and lifestyle brands",
      uploadDate: "2024-01-03",
      category: "Lifestyle",
      tags: ["lifestyle", "wellness", "authentic", "natural"],
      aiScore: 90,
      engagement: 78,
      views: 890,
    },
    {
      id: "6",
      type: "photo",
      url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=800&fit=crop&crop=face",
      description:
        "Artistic portrait session - Creative photography demonstrating artistic range and creative collaboration",
      uploadDate: "2024-01-01",
      category: "Artistic",
      tags: ["artistic", "creative", "portrait", "artistic"],
      aiScore: 87,
      engagement: 71,
      views: 720,
    },
  ]);

  // Simulated AI Analysis
  const simulatedAIAnalysis: AIAnalysis = {
    overallScore: 91,
    strengths: [
      "Excellent brand alignment with luxury and fashion markets",
      "Strong technical quality across all media types",
      "High engagement rates indicating audience connection",
      "Diverse portfolio showing versatility",
      "Professional presentation and styling",
    ],
    improvements: [
      "Add more video content to increase marketability",
      "Include more diverse cultural representation",
      "Consider adding behind-the-scenes content",
      "Optimize for emerging markets (Asia, Middle East)",
    ],
    marketFit: 94,
    brandAlignment: 96,
    technicalQuality: 89,
    recommendations: [
      "Focus on luxury fashion and beauty campaigns",
      "Develop video content for social media platforms",
      "Consider editorial work for high-end magazines",
      "Explore international markets for expansion",
    ],
  };

  // Simulated Project Matches
  const projectMatches: ProjectMatch[] = [
    {
      id: "1",
      title: "Luxury Fashion Campaign",
      company: "Chanel",
      budget: "$15,000 - $25,000",
      matchScore: 98,
      description: "High-end fashion campaign for Spring/Summer collection",
      requirements: [
        "Fashion modeling",
        "Editorial experience",
        "Luxury brand alignment",
      ],
      deadline: "2024-03-15",
    },
    {
      id: "2",
      title: "Beauty Product Launch",
      company: "MAC Cosmetics",
      budget: "$8,000 - $12,000",
      matchScore: 95,
      description: "New product line launch campaign",
      requirements: [
        "Beauty photography",
        "Makeup skills",
        "Social media presence",
      ],
      deadline: "2024-02-28",
    },
    {
      id: "3",
      title: "Lifestyle Brand Ambassador",
      company: "Lululemon",
      budget: "$5,000 - $8,000/month",
      matchScore: 92,
      description: "Long-term brand partnership for wellness content",
      requirements: [
        "Lifestyle content",
        "Authentic personality",
        "Wellness focus",
      ],
      deadline: "2024-04-01",
    },
  ];

  const categories = [
    "All",
    "Editorial",
    "Commercial",
    "Beauty",
    "Lifestyle",
    "Artistic",
    "Behind Scenes",
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL for the selected file
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const analyzeUploadCategory = () => {
    if (!uploadDescription.trim()) {
      toast({
        title: "Error",
        description: "Please add a description first to analyze the category",
        variant: "destructive",
      });
      return;
    }

    // Simple AI logic to determine category based on description keywords
    const description = uploadDescription.toLowerCase();
    let suggestedCategory = "Commercial";

    if (
      description.includes("editorial") ||
      description.includes("vogue") ||
      description.includes("fashion") ||
      description.includes("magazine")
    ) {
      suggestedCategory = "Editorial";
    } else if (
      description.includes("beauty") ||
      description.includes("makeup") ||
      description.includes("cosmetics") ||
      description.includes("skincare")
    ) {
      suggestedCategory = "Beauty";
    } else if (
      description.includes("lifestyle") ||
      description.includes("wellness") ||
      description.includes("fitness") ||
      description.includes("health")
    ) {
      suggestedCategory = "Lifestyle";
    } else if (
      description.includes("artistic") ||
      description.includes("creative") ||
      description.includes("art") ||
      description.includes("conceptual")
    ) {
      suggestedCategory = "Artistic";
    } else if (
      description.includes("behind") ||
      description.includes("scenes") ||
      description.includes("bts") ||
      description.includes("backstage")
    ) {
      suggestedCategory = "Behind Scenes";
    }

    setUploadCategory(suggestedCategory);

    toast({
      title: "Category Analyzed!",
      description: `AI suggests: ${suggestedCategory}`,
    });
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile || !uploadDescription.trim()) {
      toast({
        title: "Error",
        description: "Please select a file and add a description",
        variant: "destructive",
      });
      return;
    }

    // Create a unique ID for the new item
    const newItemId = Date.now().toString();

    // Create the new item immediately for better UX
    const newItem: MediaItem = {
      id: newItemId,
      type: selectedFile.type.startsWith("video/") ? "video" : "photo",
      url:
        previewUrl ??
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face", // Use the user's actual uploaded image
      description: uploadDescription,
      uploadDate: new Date().toISOString().split("T")[0],
      category: uploadCategory,
      tags: ["new", "upload", "fresh"],
      aiScore: Math.floor(Math.random() * 20) + 80,
      engagement: Math.floor(Math.random() * 30) + 70,
      views: Math.floor(Math.random() * 500) + 500,
    };

    // Add item immediately to show it in the portfolio
    setMediaItems((prev) => [newItem, ...prev]);

    // Start upload simulation
    await simulateUpload();

    // Keep the user's uploaded image - don't replace it with simulated images
    // The previewUrl already contains the user's actual image
    const finalImageUrl =
      previewUrl ||
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face";

    // Only update if we have a valid preview URL (user's actual image)
    if (previewUrl) {
      setMediaItems((prev) =>
        prev.map((item) =>
          item.id === newItemId ? { ...item, url: finalImageUrl } : item
        )
      );
    }

    // Clear form
    setSelectedFile(null);
    setUploadDescription("");
    setUploadCategory("Commercial");
    setPreviewUrl(null);

    toast({
      title: "Success",
      description: "Media uploaded successfully! AI analysis completed.",
    });

    // Show AI analysis automatically after upload
    setTimeout(() => {
      setAiAnalysis(simulatedAIAnalysis);
      setShowAIAnalysis(true);
    }, 500);

    // Remove "fresh" tag after 5 seconds
    setTimeout(() => {
      setMediaItems((prev) =>
        prev.map((item) =>
          item.id === newItemId
            ? { ...item, tags: item.tags.filter((tag) => tag !== "fresh") }
            : item
        )
      );
    }, 5000);
  };

  const handleEdit = (item: MediaItem) => {
    // Ensure we're using the correct item data
    const itemToEdit = {
      ...item,
      url: item.url, // Ensure the URL is preserved correctly
    };

    setEditingItem(itemToEdit);
    setEditDescription(item.description);
    setEditCategory(item.category);
    setEditImageFile(null);
    setEditPreviewUrl(null);
  };

  const analyzeAndCategorize = async () => {
    if (!editDescription.trim()) {
      toast({
        title: "Error",
        description: "Please add a description first to analyze the category",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzingCategory(true);

    // Simulate AI analysis for categorization
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simple AI logic to determine category based on description keywords
    const description = editDescription.toLowerCase();
    let suggestedCategory = "Commercial";

    if (
      description.includes("editorial") ||
      description.includes("vogue") ||
      description.includes("fashion") ||
      description.includes("magazine")
    ) {
      suggestedCategory = "Editorial";
    } else if (
      description.includes("beauty") ||
      description.includes("makeup") ||
      description.includes("cosmetics") ||
      description.includes("skincare")
    ) {
      suggestedCategory = "Beauty";
    } else if (
      description.includes("lifestyle") ||
      description.includes("wellness") ||
      description.includes("fitness") ||
      description.includes("health")
    ) {
      suggestedCategory = "Lifestyle";
    } else if (
      description.includes("artistic") ||
      description.includes("creative") ||
      description.includes("art") ||
      description.includes("conceptual")
    ) {
      suggestedCategory = "Artistic";
    } else if (
      description.includes("behind") ||
      description.includes("scenes") ||
      description.includes("bts") ||
      description.includes("backstage")
    ) {
      suggestedCategory = "Behind Scenes";
    }

    setEditCategory(suggestedCategory);
    setIsAnalyzingCategory(false);

    toast({
      title: "Category Analyzed!",
      description: `AI suggests: ${suggestedCategory}`,
    });
  };

  const handleEditImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImageFile(file);
      const url = URL.createObjectURL(file);
      setEditPreviewUrl(url);
    }
  };

  const applyAISuggestions = async () => {
    if (!editingItem) return;

    setIsApplyingAI(true);

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Keep the current image but improve the AI score and other metrics
    setMediaItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              // Keep the current image URL (don't replace it)
              url: editPreviewUrl || editingItem.url,
              aiScore: Math.min(100, item.aiScore + 5),
              description: editDescription || item.description,
              category: editCategory || item.category,
            }
          : item
      )
    );

    setIsApplyingAI(false);
    setEditingItem(null);
    setEditDescription("");
    setEditCategory("");
    setEditImageFile(null);
    setEditPreviewUrl(null);

    toast({
      title: "AI Enhancements Applied!",
      description: "Your content has been improved with AI suggestions.",
    });
  };

  const handleSaveEdit = () => {
    if (!editingItem || !editDescription.trim()) return;

    setMediaItems((prev) =>
      prev.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              description: editDescription,
              category: editCategory,
              url: editPreviewUrl || item.url, // Use new image if selected
            }
          : item
      )
    );
    setEditingItem(null);
    setEditDescription("");
    setEditCategory("");
    setEditImageFile(null);
    setEditPreviewUrl(null);
    toast({
      title: "Success",
      description: "Content updated successfully!",
    });
  };

  const handleDelete = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Success",
      description: "Media deleted successfully!",
    });
  };

  const runAIAnalysis = () => {
    setAiAnalysis(simulatedAIAnalysis);
    setShowAIAnalysis(true);
    toast({
      title: "AI Analysis Complete",
      description: "Your portfolio has been analyzed! Check the results.",
    });
  };

  const filteredMediaItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const averageAIScore =
    mediaItems.length > 0
      ? Math.round(
          mediaItems.reduce((sum, item) => sum + item.aiScore, 0) /
            mediaItems.length
        )
      : 0;

  const totalViews = mediaItems.reduce((sum, item) => sum + item.views, 0);
  const averageEngagement =
    mediaItems.length > 0
      ? Math.round(
          mediaItems.reduce((sum, item) => sum + item.engagement, 0) /
            mediaItems.length
        )
      : 0;

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      if (editPreviewUrl) {
        URL.revokeObjectURL(editPreviewUrl);
      }
    };
  }, [previewUrl, editPreviewUrl]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-full">
                <Sparkles className="h-6 w-6" />
              </div>
              <h1 className="text-4xl font-bold">AI-Powered Portfolio</h1>
            </div>
            <p className="text-xl text-white/90 max-w-2xl">
              Showcase your talent with intelligent portfolio management,
              AI-driven analysis, and smart project matching.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <Button
                size="lg"
                onClick={runAIAnalysis}
                className="bg-white text-purple-600 hover:bg-white/90"
              >
                <Brain className="h-5 w-5 mr-2" />
                Run AI Analysis
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowProjectMatches(true)}
                className="border-white text-white hover:bg-white/10 bg-white/10"
              >
                <Target className="h-5 w-5 mr-2" />
                View Matches
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Portfolio Score</p>
                  <p className="text-3xl font-bold">{averageAIScore}/100</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Trophy className="h-6 w-6" />
                </div>
              </div>
              <Progress value={averageAIScore} className="mt-3 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Views</p>
                  <p className="text-3xl font-bold">
                    {totalViews.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-green-100 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% this month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Engagement Rate</p>
                  <p className="text-3xl font-bold">{averageEngagement}%</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Heart className="h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-purple-100 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8% this month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Project Matches</p>
                  <p className="text-3xl font-bold">{projectMatches.length}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">
                  <Target className="h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-orange-100 text-sm">
                <CheckCircle className="h-4 w-4 mr-1" />
                High match rate
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upload Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Upload className="mr-3 h-6 w-6 text-blue-500" />
              Upload New Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file" className="text-sm font-medium">
                    Select Media File
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Input
                      id="file"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      {previewUrl ? (
                        <div className="space-y-4">
                          <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            {selectedFile?.type.startsWith("video/") && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <Play className="h-8 w-8 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {selectedFile?.name}
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-sm text-gray-600">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, MP4 up to 10MB
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe this content and its purpose..."
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    maxLength={200}
                    rows={4}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {uploadDescription.length}/200 characters
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="uploadCategory"
                      className="text-sm font-medium"
                    >
                      Category
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={analyzeUploadCategory}
                      disabled={!uploadDescription.trim()}
                      className="text-xs"
                    >
                      <Brain className="h-3 w-3 mr-1" />
                      AI Suggest
                    </Button>
                  </div>
                  <select
                    id="uploadCategory"
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Beauty">Beauty</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Artistic">Artistic</option>
                    <option value="Behind Scenes">Behind Scenes</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Let AI suggest the best category based on your description
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                    AI Enhancement Tips
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Use high-quality, well-lit images</li>
                    <li>• Include diverse poses and expressions</li>
                    <li>• Add relevant tags for better matching</li>
                    <li>• Consider your target audience</li>
                  </ul>
                </div>

                {isUploading && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                      <span className="text-sm font-medium text-green-900 dark:text-green-100">
                        Uploading & Analyzing...
                      </span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      {uploadProgress}% complete
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  disabled={
                    !selectedFile || !uploadDescription.trim() || isUploading
                  }
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                  size="lg"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5 mr-2" />
                      Upload & Analyze
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold">
              Your Portfolio ({mediaItems.length} items)
            </h2>
            <p className="text-muted-foreground">
              AI-optimized content for maximum impact
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search portfolio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button asChild>
              <Link href="/talent/portfolio/preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Link>
            </Button>
          </div>
        </div>

        {/* Portfolio Gallery */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMediaItems.map((item) => (
                  <div
                    key={item.id}
                    className={`group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                      item.tags.includes("fresh")
                        ? "ring-2 ring-green-500 animate-pulse"
                        : ""
                    }`}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.description}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback image if the original fails to load
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face";
                        }}
                      />
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/50 rounded-full p-4 group-hover:bg-black/70 transition-colors">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge
                          className={`${
                            item.aiScore >= 90
                              ? "bg-green-500"
                              : item.aiScore >= 80
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          } text-white`}
                        >
                          {item.aiScore}/100
                        </Badge>
                      </div>
                      {item.tags.includes("fresh") && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-green-500 text-white animate-bounce">
                            <Sparkles className="h-3 w-3 mr-1" />
                            NEW
                          </Badge>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {item.views}
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {item.engagement}%
                            </span>
                          </div>
                          <p className="text-xs line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {item.uploadDate}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                          className="flex-1"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.url}
                        alt={item.description}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">
                        {item.description}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.uploadDate}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {item.views}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {item.engagement}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={`${
                          item.aiScore >= 90
                            ? "bg-green-500"
                            : item.aiScore >= 80
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        } text-white`}
                      >
                        {item.aiScore}/100
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredMediaItems.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No content found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filter.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Analysis Dialog */}
        <Dialog open={showAIAnalysis} onOpenChange={setShowAIAnalysis}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center text-2xl">
                <Brain className="mr-3 h-6 w-6 text-blue-500" />
                AI Portfolio Analysis
              </DialogTitle>
            </DialogHeader>
            {aiAnalysis && (
              <div className="space-y-6">
                {/* Overall Score */}
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {aiAnalysis.overallScore}/100
                  </div>
                  <div className="text-xl font-medium text-blue-800 dark:text-blue-200">
                    Overall Portfolio Score
                  </div>
                  <Progress value={aiAnalysis.overallScore} className="mt-4" />
                </div>

                {/* Detailed Scores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {aiAnalysis.marketFit}%
                      </div>
                      <div className="text-sm font-medium">Market Fit</div>
                      <Progress value={aiAnalysis.marketFit} className="mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {aiAnalysis.brandAlignment}%
                      </div>
                      <div className="text-sm font-medium">Brand Alignment</div>
                      <Progress
                        value={aiAnalysis.brandAlignment}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        {aiAnalysis.technicalQuality}%
                      </div>
                      <div className="text-sm font-medium">
                        Technical Quality
                      </div>
                      <Progress
                        value={aiAnalysis.technicalQuality}
                        className="mt-2"
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-600">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {aiAnalysis.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-600">
                        <AlertCircle className="mr-2 h-5 w-5" />
                        Areas for Improvement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {aiAnalysis.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm">{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-600">
                      <Lightbulb className="mr-2 h-5 w-5" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aiAnalysis.recommendations.map(
                        (recommendation, index) => (
                          <div
                            key={index}
                            className="flex items-start p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg"
                          >
                            <Sparkles className="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{recommendation}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Project Matches Dialog */}
        <Dialog open={showProjectMatches} onOpenChange={setShowProjectMatches}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center text-2xl">
                <Target className="mr-3 h-6 w-6 text-green-500" />
                Intelligent Project Matches
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {projectMatches.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {project.company}
                        </p>
                        <p className="text-sm">{project.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            project.matchScore >= 95
                              ? "bg-green-500"
                              : project.matchScore >= 90
                              ? "bg-yellow-500"
                              : "bg-orange-500"
                          } text-white`}
                        >
                          {project.matchScore}% Match
                        </Badge>
                        <div className="text-lg font-bold text-green-600 mt-1">
                          {project.budget}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {project.requirements.map((req, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {req}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Edit className="mr-2 h-5 w-5" />
                Edit Content
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Current Image Preview */}
              <div className="space-y-2">
                <Label>Current Image</Label>
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                  {editingItem?.url ? (
                    <img
                      src={editingItem.url}
                      alt="Current"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Try to use a fallback based on the item's category or type
                        const fallbackImages = {
                          Editorial:
                            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face",
                          Beauty:
                            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=800&fit=crop&crop=face",
                          Lifestyle:
                            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop&crop=face",
                          Artistic:
                            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&h=800&fit=crop&crop=face",
                          "Behind Scenes":
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&crop=face",
                          Commercial:
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face",
                        };
                        const fallback =
                          fallbackImages[
                            editingItem?.category as keyof typeof fallbackImages
                          ] || fallbackImages.Commercial;
                        e.currentTarget.src = fallback;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  {editingItem?.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {editingItem?.category} • {editingItem?.type}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  ID: {editingItem?.id}
                </p>
              </div>

              {/* New Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="editImage">Replace Image (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                  <Input
                    id="editImage"
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleEditImageSelect}
                    className="hidden"
                  />
                  <Label htmlFor="editImage" className="cursor-pointer">
                    {editPreviewUrl ? (
                      <div className="space-y-2">
                        <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden">
                          <img
                            src={editPreviewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          {editImageFile?.name}
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload new image or video
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, MP4 up to 10MB
                        </p>
                      </>
                    )}
                  </Label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="editDescription">Description</Label>
                <Textarea
                  id="editDescription"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  maxLength={200}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  {editDescription.length}/200 characters
                </p>
              </div>

              {/* Category Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="editCategory">Category</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={analyzeAndCategorize}
                    disabled={!editDescription.trim() || isAnalyzingCategory}
                    className="text-xs"
                  >
                    {isAnalyzingCategory ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="h-3 w-3 mr-1" />
                        AI Suggest
                      </>
                    )}
                  </Button>
                </div>
                <select
                  id="editCategory"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Commercial">Commercial</option>
                  <option value="Editorial">Editorial</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Artistic">Artistic</option>
                  <option value="Behind Scenes">Behind Scenes</option>
                </select>
                <p className="text-xs text-muted-foreground">
                  Let AI suggest the best category based on your description
                </p>
              </div>

              {/* AI Suggestions Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  <Label className="text-sm font-medium">
                    AI Enhancement Options
                  </Label>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                    Apply AI suggestions to improve your content quality and
                    engagement:
                  </p>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Enhanced lighting and composition</li>
                    <li>• Optimized color grading</li>
                    <li>• Improved background processing</li>
                    <li>• Better visual appeal for target audience</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveEdit}
                  disabled={!editDescription.trim()}
                >
                  Save Changes
                </Button>
                <Button
                  onClick={applyAISuggestions}
                  disabled={isApplyingAI}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {isApplyingAI ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Applying AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Apply AI Enhancements
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
