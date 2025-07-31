"use client";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Briefcase, Users, TrendingUp, Calendar, Plus } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

export default function BusinessDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const recentSuggestions = [
    {
      id: "1",
      name: "Sofia Rodriguez",
      category: "Model",
      location: "Los Angeles, CA",
      avatar: null,
      bio: "Professional fashion model with 5+ years experience",
      matchScore: 92,
      followers: 150000,
      engagementRate: 4.5,
      skills: ["Fashion", "Commercial", "Editorial"],
    },
    {
      id: "2",
      name: "Marcus Chen",
      category: "Influencer",
      location: "New York, NY",
      avatar: null,
      bio: "Tech lifestyle influencer and content creator",
      matchScore: 87,
      followers: 250000,
      engagementRate: 6.2,
      skills: ["Tech", "Lifestyle", "Video Content"],
    },
  ];

  const activeProjects = [
    {
      id: "1",
      title: "Summer Fashion Campaign",
      status: "Active",
      matches: 12,
      deadline: "2024-02-15",
    },
    {
      id: "2",
      title: "Tech Product Launch",
      status: "Draft",
      matches: 0,
      deadline: "2024-02-20",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground mt-1">
              Manage your projects and discover amazing talent.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild>
              <Link href="/business/project/create">
                <Plus className="mr-2 h-4 w-4" />
                Create New Project
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Active Projects"
            value="3"
            description="Currently running"
            icon={<Briefcase className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: 1, isPositive: true }}
          />
          <StatsCard
            title="Total Matches"
            value="47"
            description="Talent suggestions"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Response Rate"
            value="89%"
            description="Talent acceptance"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
          <StatsCard
            title="Projects Completed"
            value="12"
            description="This year"
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5" />
                  My Projects
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/business/projects">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Due: {project.deadline}
                        </p>
                      </div>
                      <Badge
                        variant={
                          project.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{project.matches} matches found</span>
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <Link
                        href={`/business/project/${project.id}/suggestions`}
                      >
                        View Suggestions
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Talent Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Recent Talent Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSuggestions.map((talent) => (
                  <div key={talent.id} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <UserAvatar
                        user={{ name: talent.name, avatar: talent.avatar }}
                        size="md"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">
                            {talent.name}
                          </h4>
                          <Badge variant="secondary" className="text-green-600">
                            {talent.matchScore}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {talent.category}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {talent.bio}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3" asChild>
                      <Link href={`/business/talent/${talent.id}`}>
                        View Profile
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
