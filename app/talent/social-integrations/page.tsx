"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Instagram,
  Youtube,
  Music,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Facebook,
  Twitter,
  Linkedin,
  Twitch,
  MessageCircle,
  Image,
  MessageSquare,
  Users,
  Send,
  Music2,
  Apple,
  Chrome,
  Plus,
  Search,
  Zap,
  TrendingUp,
  Eye,
  Heart,
  Globe,
  Settings,
  ExternalLink,
  Shield,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

// Lista extensa de redes sociales populares
const allSocialPlatforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "text-pink-500",
    bgColor: "bg-gradient-to-br from-pink-400 to-purple-600",
    description: "Photo and video sharing platform",
    category: "Social Media",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Music,
    color: "text-black dark:text-white",
    bgColor: "bg-gradient-to-br from-black to-gray-800",
    description: "Short-form video platform",
    category: "Social Media",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "text-red-500",
    bgColor: "bg-gradient-to-br from-red-500 to-red-700",
    description: "Video sharing and streaming",
    category: "Video",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-700",
    description: "Social networking platform",
    category: "Social Media",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "text-blue-400",
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    description: "Microblogging and social networking",
    category: "Social Media",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "text-blue-700",
    bgColor: "bg-gradient-to-br from-blue-600 to-blue-800",
    description: "Professional networking platform",
    category: "Professional",
  },
  {
    id: "twitch",
    name: "Twitch",
    icon: Twitch,
    color: "text-purple-500",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-700",
    description: "Live streaming platform",
    category: "Streaming",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: MessageCircle,
    color: "text-yellow-500",
    bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    description: "Multimedia messaging app",
    category: "Social Media",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: Image,
    color: "text-red-600",
    bgColor: "bg-gradient-to-br from-red-500 to-red-700",
    description: "Visual discovery engine",
    category: "Social Media",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: MessageSquare,
    color: "text-orange-500",
    bgColor: "bg-gradient-to-br from-orange-500 to-orange-700",
    description: "Social news and discussion",
    category: "Social Media",
  },
  {
    id: "discord",
    name: "Discord",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-gradient-to-br from-indigo-500 to-indigo-700",
    description: "Communication platform",
    category: "Communication",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    color: "text-blue-500",
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    description: "Messaging and communication",
    category: "Communication",
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: Music2,
    color: "text-green-500",
    bgColor: "bg-gradient-to-br from-green-500 to-green-700",
    description: "Music streaming platform",
    category: "Music",
  },
  {
    id: "apple",
    name: "Apple Music",
    icon: Apple,
    color: "text-gray-800 dark:text-white",
    bgColor: "bg-gradient-to-br from-gray-700 to-gray-900",
    description: "Music streaming service",
    category: "Music",
  },
  {
    id: "google",
    name: "Google+",
    icon: Chrome,
    color: "text-red-500",
    bgColor: "bg-gradient-to-br from-red-500 to-red-700",
    description: "Social networking service",
    category: "Social Media",
  },
];

export default function SocialIntegrations() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [platforms, setPlatforms] = useState([
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      bgColor: "bg-gradient-to-br from-pink-400 to-purple-600",
      connected: true,
      metrics: {
        followers: 150000,
        engagementRate: 4.5,
        averageReach: 80000,
        lastSync: "2 hours ago",
      },
      autoSync: true,
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Music,
      color: "text-black dark:text-white",
      bgColor: "bg-gradient-to-br from-black to-gray-800",
      connected: true,
      metrics: {
        followers: 89000,
        engagementRate: 6.2,
        averageReach: 120000,
        lastSync: "5 hours ago",
      },
      autoSync: false,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "text-red-500",
      bgColor: "bg-gradient-to-br from-red-500 to-red-700",
      connected: false,
      metrics: null,
      autoSync: false,
    },
  ]);

  const handleConnect = (platformId: string) => {
    const platformData = allSocialPlatforms.find((p) => p.id === platformId);
    if (!platformData) return;

    setPlatforms((prev) => [
      ...prev,
      {
        id: platformId,
        name: platformData.name,
        icon: platformData.icon,
        color: platformData.color,
        bgColor: platformData.bgColor,
        connected: true,
        metrics: {
          followers: Math.floor(Math.random() * 100000) + 10000,
          engagementRate: Math.round((Math.random() * 5 + 2) * 10) / 10,
          averageReach: Math.floor(Math.random() * 50000) + 5000,
          lastSync: "Just now",
        },
        autoSync: true,
      },
    ]);
    showToast(`${platformData.name} connected successfully!`, "success");
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms((prev) =>
      prev.filter((platform) => platform.id !== platformId)
    );
    showToast(
      `${platforms.find((p) => p.id === platformId)?.name} disconnected`,
      "info"
    );
  };

  const handleSync = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId && platform.metrics
          ? {
              ...platform,
              metrics: {
                ...platform.metrics,
                lastSync: "Just now",
                followers:
                  platform.metrics.followers + Math.floor(Math.random() * 1000),
                engagementRate:
                  Math.round(
                    (platform.metrics.engagementRate + (Math.random() - 0.5)) *
                      10
                  ) / 10,
              },
            }
          : platform
      )
    );
    showToast("Metrics synced successfully!", "success");
  };

  const handleAutoSyncToggle = (platformId: string, enabled: boolean) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId
          ? { ...platform, autoSync: enabled }
          : platform
      )
    );
    showToast(`Auto-sync ${enabled ? "enabled" : "disabled"}`, "info");
  };

  const connectedPlatforms = platforms.filter((p) => p.connected);
  const availablePlatforms = allSocialPlatforms.filter(
    (p) => !platforms.find((connected) => connected.id === p.id)
  );

  const filteredPlatforms = availablePlatforms.filter((platform) => {
    const matchesSearch =
      platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || platform.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...Array.from(new Set(allSocialPlatforms.map((p) => p.category))),
  ];

  const totalFollowers = connectedPlatforms.reduce(
    (sum, p) => sum + (p.metrics?.followers || 0),
    0
  );
  const avgEngagement =
    connectedPlatforms.length > 0
      ? (
          connectedPlatforms.reduce(
            (sum, p) => sum + (p.metrics?.engagementRate || 0),
            0
          ) / connectedPlatforms.length
        ).toFixed(1)
      : "0.0";

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header con diseño mejorado */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Social Media Integration
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect your social media accounts to showcase your reach and
            engagement metrics to potential clients.
          </p>
        </div>

        {/* Overview Stats con iconos llamativos */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold">
              Your Social Reach Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
                <div className="flex justify-center mb-3">
                  <Users className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">
                  {connectedPlatforms.length}
                </div>
                <div className="text-blue-100">Connected Platforms</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white">
                <div className="flex justify-center mb-3">
                  <Eye className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">
                  {totalFollowers.toLocaleString()}
                </div>
                <div className="text-green-100">Total Followers</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
                <div className="flex justify-center mb-3">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">{avgEngagement}%</div>
                <div className="text-purple-100">Avg Engagement</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl text-white">
                <div className="flex justify-center mb-3">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold">
                  {connectedPlatforms
                    .reduce((sum, p) => sum + (p.metrics?.averageReach || 0), 0)
                    .toLocaleString()}
                </div>
                <div className="text-pink-100">Total Reach</div>
              </div>
            </div>

            {/* Iconos de redes conectadas */}
            {connectedPlatforms.length > 0 && (
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">
                  Your Connected Networks
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {connectedPlatforms.map((platform) => {
                    const IconComponent = platform.icon;
                    return (
                      <div
                        key={platform.id}
                        className={`p-4 rounded-2xl ${platform.bgColor} text-white shadow-lg hover:scale-105 transition-transform cursor-pointer`}
                        onClick={() => handleSync(platform.id)}
                      >
                        <IconComponent className="h-8 w-8" />
                        <div className="text-xs mt-1 font-medium">
                          {platform.name}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Plataformas conectadas */}
        {connectedPlatforms.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span>Connected Platforms</span>
            </h2>
            <div className="grid gap-4">
              {connectedPlatforms.map((platform) => {
                const IconComponent = platform.icon;
                return (
                  <Card
                    key={platform.id}
                    className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-3 rounded-xl ${platform.bgColor} text-white shadow-lg`}
                          >
                            <IconComponent className="h-8 w-8" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">
                              {platform.name}
                            </CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <Badge
                                variant="secondary"
                                className="text-green-600 bg-green-50"
                              >
                                Connected
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSync(platform.id)}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sync
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(platform.id)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {platform.metrics && (
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-xl">
                            <div className="text-xl font-bold text-blue-600">
                              {platform.metrics.followers.toLocaleString()}
                            </div>
                            <div className="text-xs text-blue-600/70">
                              Followers
                            </div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-xl">
                            <div className="text-xl font-bold text-green-600">
                              {platform.metrics.engagementRate}%
                            </div>
                            <div className="text-xs text-green-600/70">
                              Engagement Rate
                            </div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-xl">
                            <div className="text-xl font-bold text-purple-600">
                              {platform.metrics.averageReach.toLocaleString()}
                            </div>
                            <div className="text-xs text-purple-600/70">
                              Average Reach
                            </div>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 rounded-xl">
                            <div className="text-lg font-bold text-orange-600">
                              {platform.metrics.lastSync}
                            </div>
                            <div className="text-xs text-orange-600/70">
                              Last Sync
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`auto-sync-${platform.id}`}
                              checked={platform.autoSync}
                              onCheckedChange={(checked) =>
                                handleAutoSyncToggle(platform.id, checked)
                              }
                            />
                            <Label
                              htmlFor={`auto-sync-${platform.id}`}
                              className="text-sm"
                            >
                              Auto-sync metrics daily
                            </Label>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Last updated: {platform.metrics.lastSync}
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Conectar nuevas plataformas */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Plus className="h-6 w-6 text-blue-500" />
              <span>Connect More Platforms</span>
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search platforms..."
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <Card
                  key={platform.id}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div
                        className={`mx-auto p-4 rounded-2xl ${platform.bgColor} text-white shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="h-10 w-10" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {platform.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {platform.description}
                        </p>
                        <Badge variant="outline" className="mt-2">
                          {platform.category}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => handleConnect(platform.id)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredPlatforms.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No platforms found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filter.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Help Section mejorado */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <span>Why Connect Your Social Media?</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="mx-auto p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full w-fit">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold">Better Matches</h4>
                <p className="text-sm text-muted-foreground">
                  Your social metrics help businesses understand your reach and
                  engagement, leading to better project matches.
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="mx-auto p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold">Data Privacy</h4>
                <p className="text-sm text-muted-foreground">
                  We only access public metrics and never post on your behalf.
                  You can disconnect at any time.
                </p>
              </div>
              <div className="text-center space-y-2">
                <div className="mx-auto p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full w-fit">
                  <RefreshCw className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold">Auto-Sync</h4>
                <p className="text-sm text-muted-foreground">
                  Enable auto-sync to keep your metrics up-to-date
                  automatically. Manual sync is always available.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
