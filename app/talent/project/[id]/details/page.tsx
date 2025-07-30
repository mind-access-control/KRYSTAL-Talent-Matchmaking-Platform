"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Clock,
  Star,
  MessageSquare,
  Heart,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { ChatDialog } from "@/components/ui/chat-dialog";

export default function ProjectDetails() {
  const { showToast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const params = useParams();
  const projectId = params.id as string;

  // Mock project data
  const project = {
    id: projectId,
    title: "Summer Fashion Campaign",
    company: "StyleCo Fashion",
    companyLogo: "/placeholder.svg?height=80&width=80",
    description:
      "We're looking for fashion models for our summer collection campaign. This is an exciting opportunity to work with a leading fashion brand and showcase our new line to a global audience. The campaign will feature both studio and outdoor shoots in Los Angeles.",
    budget: "$5,000",
    deadline: "2024-02-15",
    location: "Los Angeles, CA",
    campaignType: "Brand Campaign",
    industry: "Fashion",
    matchScore: 92,
    requirements: {
      talentTypes: ["Model", "Influencer"],
      skills: ["Fashion Photography", "Commercial Modeling", "Social Media"],
      experience: "3+ years",
      languages: ["English"],
    },
    projectDetails: {
      duration: "3 days",
      shootDates: ["2024-02-10", "2024-02-11", "2024-02-12"],
      deliverables: [
        "20 high-res photos",
        "5 social media posts",
        "Behind-the-scenes content",
      ],
      usage: "Global digital and print advertising",
    },
    companyInfo: {
      name: "StyleCo Fashion",
      industry: "Fashion & Retail",
      size: "100-500 employees",
      website: "https://styleco.com",
      description:
        "Leading fashion brand specializing in contemporary women's clothing with a focus on sustainable and ethical fashion practices.",
      rating: 4.8,
      reviewCount: 24,
    },
    similarProjects: [
      {
        id: "2",
        title: "Spring Collection Launch",
        company: "TrendSet",
        matchScore: 88,
        budget: "$3,500",
      },
      {
        id: "3",
        title: "Beauty Campaign",
        company: "GlowCo",
        matchScore: 85,
        budget: "$4,000",
      },
    ],
  };

  const handleApply = () => {
    showToast(
      "Application submitted successfully! The client will review your profile.",
      "success"
    );
  };

  const handleSaveProject = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      showToast("Project saved to your favorites!", "success");
    } else {
      showToast("Project removed from favorites", "success");
    }
  };

  const handleContactClient = () => {
    setChatOpen(true);
  };

  const handleViewCompanyProfile = () => {
    showToast("Redirecting to company profile...", "info");
    // In a real app, this would navigate to the company profile page
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Match Score Header */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-1">
                  {project.matchScore}%
                </div>
                <div className="text-sm text-muted-foreground">Match Score</div>
                <div className="text-xs text-green-600 font-medium mt-1">
                  Excellent Match
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">
                  Why this is a great match for you
                </h2>
                <p className="text-sm text-muted-foreground">
                  This project aligns perfectly with your fashion modeling
                  expertise, Los Angeles location, and social media presence.
                  Your portfolio demonstrates strong experience with similar
                  lifestyle and beauty campaigns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Header */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <Card>
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <img
                    src={project.companyLogo || "/placeholder.svg"}
                    alt={project.company}
                    className="w-20 h-20 rounded-lg object-cover border shadow-sm"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
                    <p className="text-lg text-muted-foreground mb-2">
                      {project.company}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{project.campaignType}</Badge>
                      <Badge variant="outline">{project.industry}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{project.budget}</div>
                      <div className="text-xs text-muted-foreground">
                        Budget
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{project.deadline}</div>
                      <div className="text-xs text-muted-foreground">
                        Deadline
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{project.location}</div>
                      <div className="text-xs text-muted-foreground">
                        Location
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">
                        {project.projectDetails.duration}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Duration
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Project Description</h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">
                          Talent Types
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {project.requirements.talentTypes.map((type) => (
                            <Badge
                              key={type}
                              variant="secondary"
                              className="text-xs"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">
                          Required Skills
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {project.requirements.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Project Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium mb-1">Shoot Dates</h4>
                        <ul className="text-muted-foreground">
                          {project.projectDetails.shootDates.map((date) => (
                            <li key={date}>{date}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Deliverables</h4>
                        <ul className="text-muted-foreground">
                          {project.projectDetails.deliverables.map((item) => (
                            <li key={item}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-1/3 space-y-6">
            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button onClick={handleApply} className="w-full" size="lg">
                    Apply for This Project
                  </Button>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleSaveProject}
                      className={`flex-1 ${
                        isFavorited ? "text-red-500 border-red-200" : ""
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          isFavorited ? "fill-current" : ""
                        }`}
                      />
                      {isFavorited ? "Saved" : "Save"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleContactClient}
                      className="flex-1 bg-transparent"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <img
                    src={project.companyLogo || "/placeholder.svg"}
                    alt={project.companyInfo.name}
                    className="w-8 h-8 rounded mr-2"
                  />
                  About {project.companyInfo.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{project.companyInfo.size}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span>{project.companyInfo.industry}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>
                    {project.companyInfo.rating} (
                    {project.companyInfo.reviewCount} reviews)
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.companyInfo.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={handleViewCompanyProfile}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Company Profile
                </Button>
              </CardContent>
            </Card>

            {/* Similar Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.similarProjects.map((similar) => (
                  <div key={similar.id} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm">{similar.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {similar.company}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {similar.matchScore}% Match
                      </Badge>
                      <span className="text-xs font-medium">
                        {similar.budget}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Dialog */}
        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          recipientName={project.company}
          recipientAvatar={project.companyLogo}
          currentUserId="talent-1"
          currentUserName="Sofia Rodriguez"
          currentUserAvatar="/placeholder.svg?height=40&width=40"
        />
      </div>
    </DashboardLayout>
  );
}
