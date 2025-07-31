"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TalentCard } from "@/components/ui/talent-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown } from "lucide-react";
import { useState } from "react";

export default function TalentSuggestions({
  params,
}: {
  params: { id: string };
}) {
  const [sortBy, setSortBy] = useState("match");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const projectTitle = "Summer Fashion Campaign";

  const talentSuggestions = [
    {
      id: "1",
      name: "Sofia Rodriguez",
      category: "Model",
      location: "Los Angeles, CA",
      avatar: null,
      bio: "Professional fashion model with 5+ years experience in commercial and editorial photography. Specializes in lifestyle and beauty campaigns.",
      matchScore: 95,
      followers: 150000,
      engagementRate: 4.5,
      skills: [
        "Fashion Photography",
        "Commercial Modeling",
        "Editorial",
        "Beauty",
        "Lifestyle",
      ],
    },
    {
      id: "2",
      name: "Isabella Chen",
      category: "Model",
      location: "New York, NY",
      avatar: null,
      bio: "Versatile model experienced in high fashion and commercial work. Featured in major fashion magazines and brand campaigns.",
      matchScore: 92,
      followers: 89000,
      engagementRate: 5.2,
      skills: ["High Fashion", "Commercial", "Runway", "Print", "Digital"],
    },
    {
      id: "3",
      name: "Marcus Thompson",
      category: "Model",
      location: "Miami, FL",
      avatar: null,
      bio: "Male fashion model specializing in fitness and lifestyle brands. Strong social media presence and professional portfolio.",
      matchScore: 88,
      followers: 125000,
      engagementRate: 3.8,
      skills: [
        "Fitness Modeling",
        "Lifestyle",
        "Commercial",
        "Social Media",
        "Brand Ambassador",
      ],
    },
    {
      id: "4",
      name: "Emma Williams",
      category: "Influencer",
      location: "Los Angeles, CA",
      avatar: null,
      bio: "Fashion and lifestyle influencer with a focus on sustainable fashion. Creates engaging content for millennial and Gen Z audiences.",
      matchScore: 85,
      followers: 280000,
      engagementRate: 6.1,
      skills: [
        "Fashion Content",
        "Sustainable Fashion",
        "Lifestyle",
        "Photography",
        "Video Content",
      ],
    },
    {
      id: "5",
      name: "David Park",
      category: "Photographer",
      location: "San Francisco, CA",
      avatar: null,
      bio: "Creative fashion photographer with a unique artistic vision. Experienced in both studio and location shoots.",
      matchScore: 82,
      followers: 45000,
      engagementRate: 4.2,
      skills: [
        "Fashion Photography",
        "Creative Direction",
        "Studio Lighting",
        "Post-Production",
        "Art Direction",
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Talent Suggestions</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered matches for:{" "}
            <span className="font-medium">{projectTitle}</span>
          </p>
        </div>

        {/* Project Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Matches</p>
                <p className="text-2xl font-bold">{talentSuggestions.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Match Score</p>
                <p className="text-2xl font-bold">88%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="text-2xl font-bold">$5,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="text-2xl font-bold">Feb 15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search talent by name or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full md:w-[180px]">
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
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Highest Match</SelectItem>
                  <SelectItem value="followers">Most Followers</SelectItem>
                  <SelectItem value="engagement">Best Engagement</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredAndSortedTalent.length} of{" "}
            {talentSuggestions.length} matches
          </p>
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Sorted by {sortBy}
            </span>
          </div>
        </div>

        {/* Talent Grid */}
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

        {filteredAndSortedTalent.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No matches found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find more talent.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
