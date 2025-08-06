"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Share2,
  Download,
  ExternalLink,
  Play,
  MapPin,
  Star,
  TrendingUp,
  Copy,
  FileText,
  ImageIcon,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Heart,
  Eye,
  MessageSquare,
  Calendar,
  DollarSign,
  Award,
  Crown,
  Sparkles,
  Brain,
  Target,
  Zap,
  Users,
  Globe,
  Camera,
  Video,
  Palette,
  Settings,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  RotateCcw,
  Sparkle,
  Trophy,
  TrendingDown,
  Activity,
  PieChart,
  LineChart,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Briefcase,
  Clock,
  Tag,
  Hash,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  MessageCircle,
  Send,
  Phone,
  Mail,
  Globe as GlobeIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { ChatDialog } from "@/components/ui/chat-dialog";
import Link from "next/link";

export default function PortfolioPreview() {
  const { showToast } = useToast();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [isPublicView, setIsPublicView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  const talent = {
    name: "Sofia Rodriguez",
    category: "Fashion Model",
    location: "Los Angeles, CA",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    bio: "Professional fashion model with 5+ years of experience in commercial and editorial photography. I specialize in lifestyle and beauty campaigns, bringing authenticity and creativity to every project. My work has been featured in Vogue, Elle, and Harper's Bazaar, and I've collaborated with luxury brands including Chanel, Dior, and Gucci.",
    skills: [
      "Fashion Photography",
      "Commercial Modeling",
      "Editorial",
      "Beauty",
      "Lifestyle",
      "Runway",
      "High Fashion",
      "Luxury Brands",
      "International Markets",
    ],
    languages: ["English", "Spanish", "French"],
    rates: 2500,
    socialMetrics: {
      instagram: { followers: 150000, engagementRate: 4.5 },
      tiktok: { followers: 89000, engagementRate: 6.2 },
      youtube: { followers: 25000, engagementRate: 3.8 },
    },
    portfolio: [
      {
        id: "1",
        type: "photo",
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&h=1600&fit=crop&crop=face",
        description:
          "Editorial fashion shoot for Vogue - High fashion editorial showcasing versatility and professional modeling skills",
        category: "Editorial",
        tags: ["vogue", "editorial", "high-fashion", "professional"],
        aiScore: 95,
        views: 1250,
        likes: 89,
      },
      {
        id: "2",
        type: "photo",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1600&fit=crop&crop=face",
        description:
          "Commercial campaign for luxury brand - Lifestyle photography demonstrating brand alignment and market appeal",
        category: "Commercial",
        tags: ["luxury", "commercial", "lifestyle", "brand"],
        aiScore: 92,
        views: 980,
        likes: 76,
      },
      {
        id: "3",
        type: "video",
        url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=1600&fit=crop&crop=face",
        description:
          "Behind the scenes fashion video - Dynamic content showing personality and behind-the-scenes authenticity",
        category: "Behind Scenes",
        tags: ["video", "behind-scenes", "authentic", "personality"],
        aiScore: 88,
        views: 2100,
        likes: 94,
      },
      {
        id: "4",
        type: "photo",
        url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=1200&h=1600&fit=crop&crop=face",
        description:
          "Beauty campaign for cosmetics brand - Close-up beauty photography highlighting natural features and makeup skills",
        category: "Beauty",
        tags: ["beauty", "cosmetics", "close-up", "makeup"],
        aiScore: 96,
        views: 1560,
        likes: 82,
      },
      {
        id: "5",
        type: "photo",
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=1600&fit=crop&crop=face",
        description:
          "Lifestyle brand collaboration - Authentic lifestyle content perfect for wellness and lifestyle brands",
        category: "Lifestyle",
        tags: ["lifestyle", "wellness", "authentic", "natural"],
        aiScore: 90,
        views: 890,
        likes: 78,
      },
      {
        id: "6",
        type: "photo",
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&h=1600&fit=crop&crop=face",
        description:
          "Artistic portrait session - Creative photography demonstrating artistic range and creative collaboration",
        category: "Artistic",
        tags: ["artistic", "creative", "portrait", "artistic"],
        aiScore: 87,
        views: 720,
        likes: 71,
      },
    ],
    measurements: {
      height: "5'9\"",
      bust: "32B",
      waist: '24"',
      hips: '34"',
      shoes: "8 US",
      eyes: "Green",
      hair: "Dark Blonde",
    },
    experience: {
      years: 5,
      campaigns: 45,
      magazines: 12,
      brands: 28,
    },
    aiAnalysis: {
      overallScore: 94,
      marketFit: 96,
      brandAlignment: 98,
      technicalQuality: 92,
      recommendations: [
        "Perfect for luxury fashion campaigns",
        "Excellent editorial potential",
        "Strong commercial appeal",
        "Ideal for beauty and lifestyle brands",
      ],
    },
    workHistory: [
      {
        id: "1",
        company: "Chanel",
        project: "Spring/Summer Campaign 2024",
        type: "Fashion Campaign",
        date: "2024-01-15",
        rating: 5.0,
        review:
          "Sofia was absolutely professional and brought our vision to life perfectly. Her experience with luxury brands was evident throughout the entire shoot.",
        matchScore: 98,
        budget: "$25,000",
        status: "completed",
      },
      {
        id: "2",
        company: "Vogue Magazine",
        project: "Editorial Feature - 'The New Face of Fashion'",
        type: "Editorial",
        date: "2023-11-20",
        rating: 5.0,
        review:
          "Exceptional editorial work. Sofia's versatility and professionalism made this one of our best shoots of the year.",
        matchScore: 96,
        budget: "$18,000",
        status: "completed",
      },
      {
        id: "3",
        company: "MAC Cosmetics",
        project: "Beauty Campaign - 'Natural Glow'",
        type: "Beauty",
        date: "2023-09-10",
        rating: 4.9,
        review:
          "Sofia's natural beauty and makeup skills were perfect for our campaign. Highly recommend for beauty projects.",
        matchScore: 94,
        budget: "$15,000",
        status: "completed",
      },
      {
        id: "4",
        company: "Lululemon",
        project: "Lifestyle Campaign - 'Active Living'",
        type: "Lifestyle",
        date: "2023-07-05",
        rating: 4.8,
        review:
          "Great energy and authenticity. Sofia perfectly captured our brand's active lifestyle message.",
        matchScore: 92,
        budget: "$12,000",
        status: "completed",
      },
      {
        id: "5",
        company: "Gucci",
        project: "Fall Collection Preview",
        type: "Fashion Campaign",
        date: "2023-05-15",
        rating: 5.0,
        review:
          "Outstanding work with our luxury aesthetic. Sofia's professionalism and creativity exceeded expectations.",
        matchScore: 97,
        budget: "$30,000",
        status: "completed",
      },
    ],
  };

  const portfolioUrl = `https://krystal.talent/portfolio/${talent.name
    .toLowerCase()
    .replace(" ", "-")}`;

  const handleShare = (platform: string) => {
    const url = portfolioUrl;
    const text = `Check out ${talent.name}'s portfolio on KRYSTAL Talent`;

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(url);
        showToast("Portfolio link copied to clipboard!", "success");
        break;
      case "linkedin":
        window.open(
          `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        showToast("Opening LinkedIn share...", "info");
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        showToast("Opening Twitter share...", "info");
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(
            text
          )}&body=${encodeURIComponent(`${text}\n\n${url}`)}`
        );
        showToast("Opening email client...", "info");
        break;
    }
    setShareDialogOpen(false);
  };

  const handleExport = (format: string) => {
    switch (format) {
      case "pdf":
        showToast(
          "Generating PDF export... Download will start shortly.",
          "success"
        );
        setTimeout(() => {
          showToast("PDF export ready for download!", "success");
        }, 2000);
        break;
      case "images":
        showToast(
          "Preparing image archive... Download will start shortly.",
          "success"
        );
        setTimeout(() => {
          showToast("Image archive ready for download!", "success");
        }, 2000);
        break;
      case "json":
        const portfolioData = {
          talent,
          exportDate: new Date().toISOString(),
          format: "json",
        };
        const blob = new Blob([JSON.stringify(portfolioData, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${talent.name.replace(" ", "_")}_Portfolio.json`;
        link.click();
        showToast("JSON export downloaded!", "success");
        break;
    }
    setExportDialogOpen(false);
  };

  const handlePublicView = () => {
    setIsPublicView(true);
    showToast(
      "Switched to public view - this is how visitors see your portfolio",
      "info"
    );
  };

  const handleContactTalent = () => {
    setChatOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === talent.portfolio.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? talent.portfolio.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentImage = talent.portfolio[currentImageIndex];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/talent/portfolio">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                Portfolio Preview{" "}
                {isPublicView && (
                  <Badge variant="secondary" className="ml-2">
                    Public View
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground">
                {isPublicView
                  ? "This is how your portfolio appears to the public"
                  : "This is how your portfolio appears to potential clients"}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShareDialogOpen(true)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExportDialogOpen(true)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={handlePublicView}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Public View
            </Button>
          </div>
        </div>

        {/* Hero Section - LA Models Style */}
        <div className="relative h-[80vh] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={currentImage.url}
              alt={currentImage.description}
              className="w-full h-full object-cover opacity-70"
              onError={(e) => {
                const fallbackImages = {
                  Editorial:
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&h=1600&fit=crop&crop=face",
                  Commercial:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1600&fit=crop&crop=face",
                  "Behind Scenes":
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=1600&fit=crop&crop=face",
                  Beauty:
                    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=1200&h=1600&fit=crop&crop=face",
                  Lifestyle:
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=1600&fit=crop&crop=face",
                  Artistic:
                    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&h=1600&fit=crop&crop=face",
                };
                const fallback =
                  fallbackImages[
                    currentImage.category as keyof typeof fallbackImages
                  ] || fallbackImages.Editorial;
                e.currentTarget.src = fallback;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-20 cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-20 cursor-pointer"
            style={{ pointerEvents: "auto" }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Main Content */}
          <div
            className="relative z-10 h-full flex items-end p-8"
            style={{ pointerEvents: "none" }}
          >
            <div className="flex items-end space-x-8 w-full">
              {/* Model Info */}
              <div className="flex-1 text-white">
                <h1 className="text-6xl font-bold mb-4 tracking-tight">
                  {talent.name.toUpperCase()}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                  <div>
                    <span className="text-gray-300">Height:</span>
                    <div className="font-semibold">
                      {talent.measurements.height}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Bust:</span>
                    <div className="font-semibold">
                      {talent.measurements.bust}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Waist:</span>
                    <div className="font-semibold">
                      {talent.measurements.waist}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Hips:</span>
                    <div className="font-semibold">
                      {talent.measurements.hips}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Shoes:</span>
                    <div className="font-semibold">
                      {talent.measurements.shoes}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Eyes:</span>
                    <div className="font-semibold">
                      {talent.measurements.eyes}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Hair:</span>
                    <div className="font-semibold">
                      {talent.measurements.hair}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-300">Rate:</span>
                    <div className="font-semibold">${talent.rates}/day</div>
                  </div>
                </div>
                <div
                  className="flex items-center space-x-4"
                  style={{ pointerEvents: "auto" }}
                >
                  <Button
                    size="lg"
                    onClick={handleContactTalent}
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Contact {talent.name}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/20 hover:text-white bg-white/10 font-semibold"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Portfolio
                  </Button>
                </div>
              </div>

              {/* Current Image Info */}
              <div
                className="text-white text-right max-w-md"
                style={{ pointerEvents: "auto" }}
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">
                    {currentImage.category}
                  </h3>
                  <p className="text-sm text-gray-300 mb-3">
                    {currentImage.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {currentImage.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {currentImage.likes}%
                    </span>
                    <Badge
                      className={`${
                        currentImage.aiScore >= 90
                          ? "bg-green-500"
                          : currentImage.aiScore >= 80
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {currentImage.aiScore}/100
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-300">
                  {currentImageIndex + 1} of {talent.portfolio.length}
                </div>
              </div>
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setShowFullscreen(true)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>

        {/* Portfolio Thumbnails */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {talent.portfolio.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-32 h-48 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentImageIndex
                  ? "ring-4 ring-blue-500 scale-105"
                  : "hover:scale-105"
              }`}
            >
              <img
                src={item.url}
                alt={item.description}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face";
                }}
              />
            </button>
          ))}
        </div>

        {/* AI Analysis Section */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-500 rounded-full">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Portfolio Analysis</h2>
                <p className="text-muted-foreground">
                  Intelligent insights powered by advanced AI
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {talent.aiAnalysis.overallScore}/100
                </div>
                <div className="text-sm font-medium text-gray-600">
                  Overall Score
                </div>
                <Progress
                  value={talent.aiAnalysis.overallScore}
                  className="mt-3"
                />
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {talent.aiAnalysis.marketFit}%
                </div>
                <div className="text-sm font-medium text-gray-600">
                  Market Fit
                </div>
                <Progress
                  value={talent.aiAnalysis.marketFit}
                  className="mt-3"
                />
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {talent.aiAnalysis.brandAlignment}%
                </div>
                <div className="text-sm font-medium text-gray-600">
                  Brand Alignment
                </div>
                <Progress
                  value={talent.aiAnalysis.brandAlignment}
                  className="mt-3"
                />
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {talent.aiAnalysis.technicalQuality}%
                </div>
                <div className="text-sm font-medium text-gray-600">
                  Technical Quality
                </div>
                <Progress
                  value={talent.aiAnalysis.technicalQuality}
                  className="mt-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-blue-500" />
                  AI Recommendations
                </h3>
                <div className="space-y-3">
                  {talent.aiAnalysis.recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-white rounded-lg shadow"
                    >
                      <Sparkles className="h-4 w-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-green-500" />
                  Experience Highlights
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-blue-600">
                      {talent.experience.years}+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-green-600">
                      {talent.experience.campaigns}
                    </div>
                    <div className="text-sm text-gray-600">Campaigns</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-purple-600">
                      {talent.experience.magazines}
                    </div>
                    <div className="text-sm text-gray-600">Magazines</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <div className="text-2xl font-bold text-orange-600">
                      {talent.experience.brands}
                    </div>
                    <div className="text-sm text-gray-600">Brands</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">About {talent.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {talent.bio}
                </p>

                <h4 className="font-semibold text-lg mb-4">
                  Skills & Expertise
                </h4>
                <div className="flex flex-wrap gap-3 mb-6">
                  {talent.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-4 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                <h4 className="font-semibold text-lg mb-4">Languages</h4>
                <div className="flex flex-wrap gap-3">
                  {talent.languages.map((language) => (
                    <Badge
                      key={language}
                      variant="outline"
                      className="px-4 py-2"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Social Media Reach
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white">
                    <div className="flex items-center">
                      <Instagram className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-medium">Instagram</div>
                        <div className="text-sm opacity-90">
                          {talent.socialMetrics.instagram.followers.toLocaleString()}{" "}
                          followers
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.instagram.engagementRate}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-black rounded-lg text-white">
                    <div className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-medium">TikTok</div>
                        <div className="text-sm opacity-90">
                          {talent.socialMetrics.tiktok.followers.toLocaleString()}{" "}
                          followers
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.tiktok.engagementRate}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white">
                    <div className="flex items-center">
                      <Youtube className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-medium">YouTube</div>
                        <div className="text-sm opacity-90">
                          {talent.socialMetrics.youtube.followers.toLocaleString()}{" "}
                          subscribers
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.youtube.engagementRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Rating
                    </span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-semibold">4.9</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        (24 reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Response Time
                    </span>
                    <span className="font-semibold text-green-600">
                      2 hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Availability
                    </span>
                    <span className="font-semibold text-blue-600">
                      This Week
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Location
                    </span>
                    <span className="font-semibold">{talent.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Work History Section */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-green-500 rounded-full">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Work History & Reviews</h2>
                <p className="text-muted-foreground">
                  Recent collaborations and client feedback
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {talent.workHistory.map((work) => (
                <div
                  key={work.id}
                  className="border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">
                          {work.company}
                        </h3>
                        <Badge
                          className={`${
                            work.type === "Fashion Campaign"
                              ? "bg-purple-500"
                              : work.type === "Editorial"
                              ? "bg-blue-500"
                              : work.type === "Beauty"
                              ? "bg-pink-500"
                              : "bg-green-500"
                          } text-white`}
                        >
                          {work.type}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          {work.matchScore}% Match
                        </Badge>
                      </div>
                      <p className="text-lg font-medium text-muted-foreground mb-1">
                        {work.project}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(work.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {work.budget}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(work.rating)
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="ml-2 font-semibold">
                          {work.rating}
                        </span>
                      </div>
                      <Badge className="bg-green-500 text-white">
                        Completed
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm italic text-muted-foreground">
                      "{work.review}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Client Satisfaction
                </h3>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {(
                        talent.workHistory.reduce(
                          (acc, work) => acc + work.rating,
                          0
                        ) / talent.workHistory.length
                      ).toFixed(1)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {talent.workHistory.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Projects Completed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {Math.round(
                        talent.workHistory.reduce(
                          (acc, work) => acc + work.matchScore,
                          0
                        ) / talent.workHistory.length
                      )}
                      %
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average Match Score
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to work together?</h3>
            <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              Get in touch to discuss your next project and see how we can
              create something amazing together.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button
                size="lg"
                onClick={handleContactTalent}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Contact {talent.name}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 hover:text-white bg-white/10 font-semibold"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 hover:text-white bg-white/10 font-semibold"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fullscreen Image Modal */}
        <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
          <DialogContent className="max-w-7xl max-h-[90vh] p-0">
            <DialogHeader>
              <DialogTitle className="sr-only">
                Fullscreen Image View
              </DialogTitle>
            </DialogHeader>
            <div className="relative">
              <img
                src={currentImage.url}
                alt={currentImage.description}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const fallbackImages = {
                    Editorial:
                      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&h=1600&fit=crop&crop=face",
                    Commercial:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=1600&fit=crop&crop=face",
                    "Behind Scenes":
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=1600&fit=crop&crop=face",
                    Beauty:
                      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=1200&h=1600&fit=crop&crop=face",
                    Lifestyle:
                      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&h=1600&fit=crop&crop=face",
                    Artistic:
                      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&h=1600&fit=crop&crop=face",
                  };
                  const fallback =
                    fallbackImages[
                      currentImage.category as keyof typeof fallbackImages
                    ] || fallbackImages.Editorial;
                  e.currentTarget.src = fallback;
                }}
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevImage}
                  className="bg-black/50 border-white text-white hover:bg-black/70"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextImage}
                  className="bg-black/50 border-white text-white hover:bg-black/70"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
                <h3 className="font-semibold mb-2">{currentImage.category}</h3>
                <p className="text-sm opacity-90">{currentImage.description}</p>
                <div className="flex items-center justify-between mt-3 text-sm">
                  <span>
                    {currentImageIndex + 1} of {talent.portfolio.length}
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {currentImage.views}
                    </span>
                    <span className="flex items-center">
                      <Heart className="h-3 w-3 mr-1" />
                      {currentImage.likes}%
                    </span>
                    <Badge
                      className={`${
                        currentImage.aiScore >= 90
                          ? "bg-green-500"
                          : currentImage.aiScore >= 80
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {currentImage.aiScore}/100
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share Dialog */}
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Portfolio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Portfolio URL:</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 text-xs bg-background p-2 rounded border">
                    {portfolioUrl}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare("copy")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleShare("linkedin")}
                  className="justify-start"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("twitter")}
                  className="justify-start"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("email")}
                  className="justify-start"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare("copy")}
                  className="justify-start"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Export Dialog */}
        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Portfolio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choose the format you'd like to export your portfolio in:
              </p>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => handleExport("pdf")}
                  className="w-full justify-start"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">PDF Document</div>
                    <div className="text-xs text-muted-foreground">
                      Complete portfolio as a PDF file
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExport("images")}
                  className="w-full justify-start"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Image Archive</div>
                    <div className="text-xs text-muted-foreground">
                      ZIP file with all portfolio images
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleExport("json")}
                  className="w-full justify-start"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">JSON Data</div>
                    <div className="text-xs text-muted-foreground">
                      Portfolio data in JSON format
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Chat Dialog */}
        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          recipientName={talent.name}
          recipientAvatar={talent.avatar}
          currentUserId="business-1"
          currentUserName="Creative Agency Inc."
          currentUserAvatar="/placeholder-user.jpg"
        />
      </div>
    </DashboardLayout>
  );
}
