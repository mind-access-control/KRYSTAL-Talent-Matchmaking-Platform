"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  User,
  MapPin,
  Users,
  TrendingUp,
  MessageSquare,
  Plus,
  Filter,
  Building2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  avatar?: string | null;
  description: string;
  specialties: string[];
  projectCount?: number;
  isConnected?: boolean;
  matchScore?: number;
}

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

// Mock data for companies
const availableCompanies: Company[] = [
  {
    id: "company-1",
    name: "Fashion Forward Studios",
    industry: "Fashion & Beauty",
    location: "Los Angeles, CA",
    avatar: null,
    description:
      "Leading fashion photography studio specializing in editorial and commercial shoots.",
    specialties: [
      "Fashion Photography",
      "Editorial",
      "Commercial",
      "Brand Campaigns",
    ],
    projectCount: 45,
    isConnected: false,
    matchScore: 92,
  },
  {
    id: "company-2",
    name: "Digital Dreams Agency",
    industry: "Digital Marketing",
    location: "New York, NY",
    avatar: null,
    description:
      "Full-service digital marketing agency focused on influencer partnerships and content creation.",
    specialties: [
      "Influencer Marketing",
      "Content Creation",
      "Social Media",
      "Brand Partnerships",
    ],
    projectCount: 78,
    isConnected: true,
    matchScore: 88,
  },
  {
    id: "company-3",
    name: "Creative Productions Co.",
    industry: "Entertainment",
    location: "Miami, FL",
    avatar: null,
    description:
      "Production company specializing in music videos, commercials, and branded content.",
    specialties: [
      "Music Videos",
      "Commercials",
      "Branded Content",
      "Event Production",
    ],
    projectCount: 32,
    isConnected: false,
    matchScore: 85,
  },
  {
    id: "company-4",
    name: "Lifestyle Brands Inc.",
    industry: "Lifestyle",
    location: "Austin, TX",
    avatar: null,
    description:
      "Lifestyle brand company creating authentic content for wellness and fitness markets.",
    specialties: ["Wellness", "Fitness", "Lifestyle", "Health Content"],
    projectCount: 56,
    isConnected: false,
    matchScore: 79,
  },
];

// Mock data for other talent
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
];

const industries = [
  "All Industries",
  "Fashion & Beauty",
  "Digital Marketing",
  "Entertainment",
  "Lifestyle",
  "Technology",
  "Food & Beverage",
  "Fitness & Health",
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

export default function TalentNetworkPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("match");
  const [companies, setCompanies] = useState<Company[]>(availableCompanies);
  const [talentList, setTalentList] = useState<Talent[]>(availableTalent);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<
    Company | Talent | null
  >(null);
  const [contactType, setContactType] = useState<"company" | "talent">(
    "company"
  );

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesIndustry =
      selectedIndustry === "All Industries" ||
      company.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

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

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return (b.matchScore || 0) - (a.matchScore || 0);
      case "projects":
        return (b.projectCount || 0) - (a.projectCount || 0);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
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

  const handleConnect = (type: "company" | "talent", id: string) => {
    if (type === "company") {
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === id ? { ...company, isConnected: true } : company
        )
      );
    } else {
      setTalentList((prev) =>
        prev.map((talent) =>
          talent.id === id ? { ...talent, isConnected: true } : talent
        )
      );
    }

    toast({
      title: t("network.connected"),
      description: t("network.connectionRequestSent"),
    });
  };

  const handleMessage = (
    type: "company" | "talent",
    contact: Company | Talent
  ) => {
    setSelectedContact(contact);
    setContactType(type);
    setIsChatOpen(true);
  };

  const connectedCompaniesCount = companies.filter(
    (company) => company.isConnected
  ).length;
  const connectedTalentCount = talentList.filter(
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
              <h1 className="text-3xl font-bold">{t("network.title")}</h1>
              <p className="text-muted-foreground">{t("network.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              {connectedCompaniesCount + connectedTalentCount}{" "}
              {t("network.connected")}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">
                    {t("network.companies")}
                  </p>
                  <p className="text-2xl font-bold">{companies.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">{t("network.talent")}</p>
                  <p className="text-2xl font-bold">{talentList.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">
                    {t("network.highMatch")}
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      [...companies, ...talentList].filter(
                        (item) => (item.matchScore || 0) >= 90
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">
                    {t("network.available")}
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      [...companies, ...talentList].filter(
                        (item) => !item.isConnected
                      ).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="companies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="companies">
              {t("network.companies")}
            </TabsTrigger>
            <TabsTrigger value="talent">{t("network.talent")}</TabsTrigger>
          </TabsList>

          <TabsContent value="companies" className="space-y-6">
            {/* Company Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  {t("network.findCompanies")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder={t("network.searchCompanies")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={selectedIndustry}
                    onValueChange={setSelectedIndustry}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("network.selectIndustry")} />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("network.sortBy")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">
                        {t("network.matchScore")}
                      </SelectItem>
                      <SelectItem value="projects">
                        {t("network.projectCount")}
                      </SelectItem>
                      <SelectItem value="name">{t("network.name")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Companies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedCompanies.map((company) => (
                <Card
                  key={company.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={company.avatar || undefined}
                          alt={company.name}
                        />
                        <AvatarFallback className="bg-gray-200 text-gray-700 flex items-center justify-center">
                          <Building2 className="h-8 w-8" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-lg truncate">
                            {company.name}
                          </h3>
                          {company.matchScore && (
                            <Badge variant="secondary" className="text-xs">
                              {company.matchScore}% {t("network.matchScore")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {company.industry}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {company.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {company.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {company.specialties.slice(0, 3).map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="outline"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                      {company.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{company.specialties.length - 3} {t("common.more")}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      {company.projectCount && (
                        <div className="text-sm text-muted-foreground">
                          {company.projectCount} {t("common.projects")}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      {company.isConnected ? (
                        <Button variant="outline" className="flex-1" disabled>
                          {t("network.connected")}
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleConnect("company", company.id)}
                          className="flex-1"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          {t("network.connect")}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleMessage("company", company)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="talent" className="space-y-6">
            {/* Talent Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Find Talent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search talent..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
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
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Match Score</SelectItem>
                      <SelectItem value="followers">Followers</SelectItem>
                      <SelectItem value="engagement">
                        Engagement Rate
                      </SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Talent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTalent.map((talent) => (
                <Card
                  key={talent.id}
                  className="hover:shadow-lg transition-shadow"
                >
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
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
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
                          onClick={() => handleConnect("talent", talent.id)}
                          className="flex-1"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleMessage("talent", talent)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {sortedCompanies.length === 0 && sortedTalent.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                {searchQuery ||
                selectedIndustry !== "All Industries" ||
                selectedCategory !== "All Categories"
                  ? "Try adjusting your search criteria"
                  : "No connections available at the moment"}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Chat Dialog */}
        {selectedContact && (
          <ChatDialog
            open={isChatOpen}
            onOpenChange={setIsChatOpen}
            recipientName={selectedContact.name}
            recipientAvatar={selectedContact.avatar}
            currentUserId={user?.id || "current-user"}
            currentUserName={user?.name || user?.email || "You"}
            currentUserAvatar={user?.avatar}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
