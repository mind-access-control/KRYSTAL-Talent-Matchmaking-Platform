"use client";

import type React from "react";
import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Users,
  TrendingUp,
  Star,
  MessageSquare,
  Heart,
  Share2,
  Calendar,
  Copy,
  LinkIcon,
  ArrowLeft,
  Eye,
  Award,
  Crown,
  Trophy,
  Medal,
  CheckCircle,
  Clock,
  Tag,
  Hash,
  DollarSign,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  ExternalLink,
  Check,
  AlertCircle,
  Info,
  Lightbulb,
  Rocket,
  Sparkles,
  Zap,
  Target,
  Brain,
  Activity,
  BarChart3,
  PieChart,
  TrendingDown,
  Plus,
  Minus,
  X,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Download,
  Bookmark,
  BookmarkPlus,
  Send,
  Phone,
  Mail,
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
  Settings,
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
import { useToast } from "@/components/ui/toast";
import { ChatDialog } from "@/components/ui/chat-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/auth-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TalentProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { id } = use(params);

  // Estado para controlar la visibilidad del modal de chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  // Estado para controlar la visibilidad del modal de compartir
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  // Estado para controlar si el talento está en favoritos
  const [isFavorited, setIsFavorited] = useState(false);
  // Estado para controlar la vista de portfolio
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<
    number | null
  >(null);

  // Mock talent data based on ID
  const talent = {
    id: id,
    name: "Sofia Rodriguez",
    category: "Fashion Model",
    location: "Los Angeles, CA",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Professional fashion model with 5+ years of experience in commercial and editorial photography. I specialize in lifestyle and beauty campaigns, bringing authenticity and creativity to every project. My passion for sustainable fashion and diverse representation drives my work in the industry.",
    matchScore: 95,
    skills: [
      "Fashion Photography",
      "Commercial Modeling",
      "Editorial",
      "Beauty",
      "Lifestyle",
      "Runway",
    ],
    languages: ["English", "Spanish", "French"],
    rates: 500,
    availability: "Available weekdays and weekends",
    verified: true,
    featured: true,
    experience: "5+ years",
    hourlyRate: 250,
    socialMetrics: {
      instagram: {
        followers: 150000,
        engagementRate: 4.5,
        averageReach: 80000,
        handle: "@sofia_rodriguez",
      },
      tiktok: {
        followers: 89000,
        engagementRate: 6.2,
        averageReach: 120000,
        handle: "@sofia_rodriguez",
      },
      youtube: {
        followers: 25000,
        engagementRate: 3.8,
        averageReach: 15000,
        handle: "@sofia_rodriguez",
      },
    },
    portfolio: [
      {
        id: "1",
        type: "photo",
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
        description: "Editorial fashion shoot for Vogue",
        category: "Editorial",
        date: "2024-01",
      },
      {
        id: "2",
        type: "photo",
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
        description: "Commercial campaign for luxury brand",
        category: "Commercial",
        date: "2023-12",
      },
      {
        id: "3",
        type: "video",
        url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop",
        description: "Behind the scenes fashion video",
        category: "Behind the Scenes",
        date: "2023-11",
      },
      {
        id: "4",
        type: "photo",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
        description: "Beauty campaign for cosmetics brand",
        category: "Beauty",
        date: "2023-10",
      },
    ],
    projectHistory: [
      {
        id: "1",
        title: "Spring Collection Campaign",
        client: "Fashion House Co.",
        date: "2024-01-15",
        rating: 5,
        type: "Campaign",
        budget: "$15,000",
        duration: "2 weeks",
      },
      {
        id: "2",
        title: "Beauty Product Launch",
        client: "Cosmetics Brand",
        date: "2023-12-10",
        rating: 5,
        type: "Launch",
        budget: "$8,000",
        duration: "1 week",
      },
      {
        id: "3",
        title: "Lifestyle Magazine Feature",
        client: "Vogue Magazine",
        date: "2023-11-20",
        rating: 5,
        type: "Editorial",
        budget: "$12,000",
        duration: "3 days",
      },
    ],
    achievements: [
      "Featured in Vogue Magazine",
      "Top 10 Fashion Models 2023",
      "Sustainable Fashion Advocate",
      "Diversity in Fashion Award",
    ],
    certifications: [
      "Professional Modeling Certification",
      "Fashion Photography Course",
      "Social Media Marketing",
      "Sustainable Fashion Workshop",
    ],
  };

  // Función para obtener las iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleContact = () => {
    setIsChatOpen(true);
  };

  const handleSaveToFavorites = () => {
    setIsFavorited((prev) => !prev);
    if (isFavorited) {
      showToast("Removed from favorites!", "info");
    } else {
      showToast("Added to favorites!", "success");
    }
  };

  const portfolioUrl = `https://krystal.talent/portfolio/${talent.id}`;

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

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                      {talent.name} ✨
                    </h1>
                    <p className="text-green-100 text-lg">
                      Professional {talent.category} • {talent.location}
                    </p>
                  </div>
                </div>

                {/* Talent Stats */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-medium shadow-lg">
                    <Target className="h-4 w-4" />
                    <span>Match Score: {talent.matchScore}%</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white text-sm font-medium shadow-lg">
                    <Star className="h-4 w-4" />
                    <span>4.9 Rating (24 reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-400 to-red-500 text-white text-sm font-medium shadow-lg">
                    <DollarSign className="h-4 w-4" />
                    <span>${talent.rates}/day</span>
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
                  onClick={() => setShareDialogOpen(true)}
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Talent Overview Stats */}
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
                  +{talent.matchScore}%
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Match Score</p>
                <p className="text-3xl font-bold">{talent.matchScore}%</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Star className="h-5 w-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="text-xs font-bold bg-green-500 text-white"
                >
                  +0.2
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Rating</p>
                <p className="text-3xl font-bold">4.9</p>
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
                  +12K
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Total Reach</p>
                <p className="text-3xl font-bold">264K</p>
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
                  +3
                </Badge>
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">Projects</p>
                <p className="text-3xl font-bold">
                  {talent.projectHistory.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <User className="mr-3 h-6 w-6" />
                  About {talent.name}
                  <Badge className="ml-auto bg-white/20 text-white">
                    {talent.experience}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-gray-700">
                    {talent.bio}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Tag className="mr-2 h-5 w-5 text-blue-600" />
                        Skills & Expertise
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {talent.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-green-600" />
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {talent.languages.map((language) => (
                          <Badge
                            key={language}
                            variant="outline"
                            className="px-3 py-1"
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-sm text-blue-600 font-medium">
                        Availability
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {talent.availability}
                      </p>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <DollarSign className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-sm text-green-600 font-medium">
                        Hourly Rate
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ${talent.hourlyRate}/hr
                      </p>
                    </div>

                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <MapPin className="h-8 w-8 text-purple-600" />
                      </div>
                      <p className="text-sm text-purple-600 font-medium">
                        Location
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        {talent.location}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Metrics */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="mr-3 h-6 w-6" />
                  Social Media Metrics
                  <Badge className="ml-auto bg-white/20 text-white">
                    AI Analyzed
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white shadow-lg">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <Instagram className="h-8 w-8 mr-3" />
                        <div>
                          <h3 className="text-lg font-bold">Instagram</h3>
                          <p className="text-pink-100 text-sm">
                            {talent.socialMetrics.instagram.handle}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Followers</span>
                          <span className="font-bold">
                            {talent.socialMetrics.instagram.followers.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Engagement</span>
                          <span className="font-bold">
                            {talent.socialMetrics.instagram.engagementRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg Reach</span>
                          <span className="font-bold">
                            {talent.socialMetrics.instagram.averageReach.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-black to-gray-800 p-6 text-white shadow-lg">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 mr-3 flex items-center justify-center bg-white rounded">
                          <span className="text-black font-bold text-xs">
                            Tik
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">TikTok</h3>
                          <p className="text-gray-300 text-sm">
                            {talent.socialMetrics.tiktok.handle}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Followers</span>
                          <span className="font-bold">
                            {talent.socialMetrics.tiktok.followers.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Engagement</span>
                          <span className="font-bold">
                            {talent.socialMetrics.tiktok.engagementRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg Reach</span>
                          <span className="font-bold">
                            {talent.socialMetrics.tiktok.averageReach.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-500 to-red-600 p-6 text-white shadow-lg">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <Youtube className="h-8 w-8 mr-3" />
                        <div>
                          <h3 className="text-lg font-bold">YouTube</h3>
                          <p className="text-red-100 text-sm">
                            {talent.socialMetrics.youtube.handle}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Subscribers</span>
                          <span className="font-bold">
                            {talent.socialMetrics.youtube.followers.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Engagement</span>
                          <span className="font-bold">
                            {talent.socialMetrics.youtube.engagementRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Avg Views</span>
                          <span className="font-bold">
                            {talent.socialMetrics.youtube.averageReach.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Image className="mr-3 h-6 w-6" />
                  Portfolio
                  <Badge className="ml-auto bg-white/20 text-white">
                    {talent.portfolio.length} Items
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {talent.portfolio.map((item, index) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedPortfolioItem(index)}
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={item.url}
                          alt={item.description}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-white/20 text-white"
                          >
                            {item.category}
                          </Badge>
                          <span className="text-sm opacity-80">
                            {item.date}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg">
                          {item.description}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project History */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Trophy className="mr-3 h-6 w-6" />
                  Recent Project History
                  <Badge className="ml-auto bg-white/20 text-white">
                    {talent.projectHistory.length} Projects
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {talent.projectHistory.map((project) => (
                    <div
                      key={project.id}
                      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-50 to-white p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="text-lg font-semibold">
                              {project.title}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {project.type}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-blue-600" />
                              <span>{project.client}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-green-600" />
                              <span>{project.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-purple-600" />
                              <span>{project.duration}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">
                                Budget:
                              </span>
                              <span className="text-lg font-bold text-green-600">
                                {project.budget}
                              </span>
                            </div>
                            <div className="flex items-center">
                              {[...Array(project.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-5 h-5 text-yellow-500 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <User className="mr-3 h-6 w-6" />
                  Profile
                  <Badge className="ml-auto bg-white/20 text-white">
                    {talent.verified ? "Verified" : "Unverified"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage
                        src={talent.avatar}
                        alt={talent.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl font-semibold bg-gray-200 text-gray-700">
                        {getInitials(talent.name)}
                      </AvatarFallback>
                    </Avatar>
                    {talent.verified && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                    {talent.featured && (
                      <div className="absolute -top-1 -left-1 bg-yellow-500 rounded-full p-1">
                        <Crown className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">{talent.name}</h2>
                    <p className="text-gray-600">{talent.category}</p>
                    <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {talent.location}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      onClick={handleContact}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleSaveToFavorites}
                      className={isFavorited ? "border-red-300 bg-red-50" : ""}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorited ? "text-red-500 fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-500 fill-current mr-2" />
                        <span className="font-semibold">4.9</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        (24 reviews)
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-semibold">${talent.rates}</span>
                      </div>
                      <span className="text-sm text-gray-600">/day</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Award className="mr-3 h-6 w-6" />
                  Achievements
                  <Badge className="ml-auto bg-white/20 text-white">
                    {talent.achievements.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {talent.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg"
                    >
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Shield className="mr-3 h-6 w-6" />
                  Certifications
                  <Badge className="ml-auto bg-white/20 text-white">
                    {talent.certifications.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {talent.certifications.map((certification, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm font-medium">
                        {certification}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio Modal */}
        <Dialog
          open={selectedPortfolioItem !== null}
          onOpenChange={() => setSelectedPortfolioItem(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center text-xl">
                <Image className="mr-3 h-6 w-6" />
                Portfolio Item
              </DialogTitle>
            </DialogHeader>
            {selectedPortfolioItem !== null && (
              <div className="space-y-4">
                <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={talent.portfolio[selectedPortfolioItem].url}
                    alt={talent.portfolio[selectedPortfolioItem].description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">
                    {talent.portfolio[selectedPortfolioItem].description}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <Badge variant="outline">
                      {talent.portfolio[selectedPortfolioItem].category}
                    </Badge>
                    <span>{talent.portfolio[selectedPortfolioItem].date}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modal de Chat */}
        {isChatOpen && (
          <ChatDialog
            open={isChatOpen}
            onOpenChange={setIsChatOpen}
            recipientName={talent.name}
            recipientAvatar={talent.avatar}
            currentUserId={user?.id || "current-user-mock-id"}
            currentUserName={user?.name || user?.email || "You"}
            currentUserAvatar={user?.avatar}
          />
        )}

        {/* Modal de Compartir */}
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-xl">
                <Share2 className="mr-3 h-6 w-6" />
                Share Profile
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={talent.avatar} alt={talent.name} />
                    <AvatarFallback>{getInitials(talent.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{talent.name}</h3>
                    <p className="text-sm text-gray-600">{talent.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Check out this amazing talent on KRYSTAL
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Profile Link</label>
                <div className="flex space-x-2">
                  <input
                    value={portfolioUrl}
                    readOnly
                    className="flex-1 text-sm p-2 border rounded"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleShare("copy")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Share via</label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center space-x-2"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("twitter")}
                    className="flex items-center space-x-2"
                  >
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("email")}
                    className="flex items-center space-x-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("copy")}
                    className="flex items-center space-x-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Link</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
