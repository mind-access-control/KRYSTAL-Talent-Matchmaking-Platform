"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatDialog } from "@/components/ui/chat-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  User,
  MapPin,
  Users,
  TrendingUp,
  MessageSquare,
  Plus,
  Filter,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Talent {
  id: string;
  name: string;
  category: string;
  location: string;
  avatar?: string | null;
  bio: string;
  skills: string[];
  followers?: number;
  engagementRate?: number;
  isConnected?: boolean;
  matchScore?: number;
}

// Mock data for available talent in network
const availableTalent: Talent[] = [
  {
    id: "talent-1",
    name: "Emma Rodriguez",
    category: "Fashion Model",
    location: "Los Angeles, CA",
    avatar: null,
    bio: "Professional fashion model with 5+ years of experience in commercial and editorial photography.",
    skills: [
      "Fashion Photography",
      "Commercial Modeling",
      "Editorial",
      "Beauty",
    ],
    followers: 150000,
    engagementRate: 4.5,
    isConnected: false,
    matchScore: 95,
  },
  {
    id: "talent-2",
    name: "James Wilson",
    category: "Actor",
    location: "New York, NY",
    avatar: null,
    bio: "Versatile actor with experience in film, television, and theater productions.",
    skills: ["Acting", "Voice Over", "Commercial", "Theater"],
    followers: 89000,
    engagementRate: 5.2,
    isConnected: true,
    matchScore: 88,
  },
  {
    id: "talent-3",
    name: "Sophia Kim",
    category: "Influencer",
    location: "Miami, FL",
    avatar: null,
    bio: "Lifestyle and beauty influencer with a strong social media presence.",
    skills: [
      "Content Creation",
      "Social Media",
      "Brand Partnerships",
      "Photography",
    ],
    followers: 250000,
    engagementRate: 6.8,
    isConnected: false,
    matchScore: 92,
  },
  {
    id: "talent-4",
    name: "Michael Chen",
    category: "Photographer",
    location: "San Francisco, CA",
    avatar: null,
    bio: "Professional photographer specializing in portrait and commercial photography.",
    skills: [
      "Portrait Photography",
      "Commercial Photography",
      "Photo Editing",
      "Lighting",
    ],
    followers: 45000,
    engagementRate: 3.2,
    isConnected: false,
    matchScore: 78,
  },
  {
    id: "talent-5",
    name: "Isabella Martinez",
    category: "Dancer",
    location: "Chicago, IL",
    avatar: null,
    bio: "Professional dancer with expertise in contemporary and commercial dance styles.",
    skills: [
      "Contemporary Dance",
      "Commercial Dance",
      "Choreography",
      "Performance",
    ],
    followers: 75000,
    engagementRate: 4.1,
    isConnected: true,
    matchScore: 85,
  },
  {
    id: "talent-6",
    name: "Alex Johnson",
    category: "Musician",
    location: "Nashville, TN",
    avatar: null,
    bio: "Multi-instrumentalist and composer with experience in various genres.",
    skills: ["Guitar", "Piano", "Composition", "Production"],
    followers: 120000,
    engagementRate: 5.5,
    isConnected: false,
    matchScore: 82,
  },
  {
    id: "talent-7",
    name: "Maria Garcia",
    category: "Chef",
    location: "Austin, TX",
    avatar: null,
    bio: "Celebrity chef specializing in fusion cuisine and food content creation.",
    skills: [
      "Cooking",
      "Food Photography",
      "Recipe Development",
      "Video Content",
    ],
    followers: 180000,
    engagementRate: 7.2,
    isConnected: false,
    matchScore: 89,
  },
  {
    id: "talent-8",
    name: "David Park",
    category: "Fitness Trainer",
    location: "Denver, CO",
    avatar: null,
    bio: "Certified personal trainer and fitness influencer helping people achieve their goals.",
    skills: ["Personal Training", "Nutrition", "Motivation", "Workout Videos"],
    followers: 95000,
    engagementRate: 6.1,
    isConnected: false,
    matchScore: 76,
  },
];

const categories = [
  "All Categories",
  "Fashion Model",
  "Actor",
  "Influencer",
  "Photographer",
  "Dancer",
  "Musician",
  "Chef",
  "Fitness Trainer",
];

export default function NetworkPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("match");
  const [talentList, setTalentList] = useState<Talent[]>(availableTalent);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);

  const filteredTalent = talentList.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All Categories" ||
      talent.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedTalent = [...filteredTalent].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return (b.matchScore || 0) - (a.matchScore || 0);
      case "followers":
        return (b.followers || 0) - (a.followers || 0);
      case "engagement":
        return (b.engagementRate || 0) - (a.engagementRate || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleConnect = (talentId: string) => {
    setTalentList((prev) =>
      prev.map((talent) =>
        talent.id === talentId ? { ...talent, isConnected: true } : talent
      )
    );

    toast({
      title: "Connection Request Sent",
      description: "The talent will be notified of your connection request.",
    });
  };

  const handleMessage = (talent: Talent) => {
    setSelectedTalent(talent);
    setIsChatOpen(true);
  };

  const connectedCount = talentList.filter(
    (talent) => talent.isConnected
  ).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserAvatar user={user} size="md" />
            <div>
              <h1 className="text-3xl font-bold">Network</h1>
              <p className="text-muted-foreground">
                Discover and connect with talented professionals
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              {connectedCount} Connected
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Total Talent</p>
                  <p className="text-2xl font-bold">{talentList.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">High Match</p>
                  <p className="text-2xl font-bold">
                    {talentList.filter((t) => (t.matchScore || 0) >= 90).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">Available</p>
                  <p className="text-2xl font-bold">
                    {talentList.filter((t) => !t.isConnected).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Find Talent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, category, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Match Score</SelectItem>
                  <SelectItem value="followers">Followers</SelectItem>
                  <SelectItem value="engagement">Engagement Rate</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTalent.map((talent) => (
            <Card key={talent.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage
                      src={talent.avatar || undefined}
                      alt={talent.name}
                    />
                    <AvatarFallback className="bg-gray-200 text-gray-700 flex items-center justify-center">
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-lg truncate">
                        {talent.name}
                      </h3>
                      {talent.matchScore && (
                        <Badge variant="secondary" className="text-xs">
                          {talent.matchScore}% Match
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {talent.category}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {talent.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {talent.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {talent.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {talent.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{talent.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  {talent.followers && (
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {talent.followers >= 1000
                          ? `${(talent.followers / 1000).toFixed(1)}K`
                          : talent.followers}
                      </div>
                    </div>
                  )}
                  {talent.engagementRate && (
                    <div className="text-sm text-muted-foreground">
                      {talent.engagementRate}% engagement
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  {talent.isConnected ? (
                    <Button variant="outline" className="flex-1" disabled>
                      Connected
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleConnect(talent.id)}
                      className="flex-1"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleMessage(talent)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedTalent.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No talent found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== "All Categories"
                  ? "Try adjusting your search criteria"
                  : "No talent available at the moment"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Chat Dialog */}
        {selectedTalent && (
          <ChatDialog
            open={isChatOpen}
            onOpenChange={setIsChatOpen}
            recipientName={selectedTalent.name}
            recipientAvatar={selectedTalent.avatar}
            currentUserId={user?.id || "current-user"}
            currentUserName={user?.name || user?.email || "You"}
            currentUserAvatar={user?.avatar}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
