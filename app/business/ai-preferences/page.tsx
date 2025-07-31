"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Brain,
  Target,
  TrendingUp,
  Users,
  Star,
  MapPin,
  FolderOpen,
  Copy,
  Plus,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { TalentCard } from "@/components/ui/talent-card";

// Mock projects data
const mockProjects = [
  { id: "1", title: "Summer Fashion Campaign", status: "Active" },
  { id: "2", title: "Tech Product Launch", status: "Draft" },
  { id: "3", title: "Beauty Brand Campaign", status: "Planning" },
  { id: "4", title: "Lifestyle Content Series", status: "Active" },
];

// Default preferences template
const defaultPreferences = {
  // Matching Criteria Weights
  skillsWeight: [85],
  locationWeight: [70],
  experienceWeight: [80],
  socialMetricsWeight: [60],
  availabilityWeight: [75],
  ratesWeight: [50],

  // Social Media Preferences
  minFollowers: [10000],
  minEngagementRate: [2.5],
  preferredPlatforms: ["instagram", "tiktok"],

  // Geographic Preferences
  locationFlexibility: "preferred", // strict, preferred, flexible
  maxDistance: [100], // miles
  remoteWork: true,

  // Experience Preferences
  minExperience: [2], // years
  portfolioQuality: [4], // 1-5 stars
  clientRating: [4.5], // 1-5 stars

  // AI Behavior Settings
  autoMatch: true,
  smartNotifications: true,
  learningMode: true,
  diversityBoost: true,

  // Industry Specific
  industryExperience: ["fashion", "beauty", "lifestyle"],
  campaignTypes: ["brand", "product", "social"],
};

export default function AIPreferences() {
  const { showToast } = useToast();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [showApplyToAllDialog, setShowApplyToAllDialog] = useState(false);
  const [showCopyFromDialog, setShowCopyFromDialog] = useState(false);

  // Project selection state
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [projectPreferences, setProjectPreferences] = useState<
    Record<string, typeof defaultPreferences>
  >({
    all: defaultPreferences,
    "1": { ...defaultPreferences, skillsWeight: [90], locationWeight: [80] }, // Summer Fashion Campaign
    "2": {
      ...defaultPreferences,
      socialMetricsWeight: [80],
      minFollowers: [50000],
    }, // Tech Product Launch
    "3": {
      ...defaultPreferences,
      industryExperience: ["beauty"],
      minExperience: [3],
    }, // Beauty Brand Campaign
    "4": {
      ...defaultPreferences,
      locationFlexibility: "flexible",
      remoteWork: true,
    }, // Lifestyle Content Series
  });

  // Get current preferences based on selection
  const preferences = projectPreferences[selectedProject] || defaultPreferences;

  // Mock preview matches based on current preferences
  const previewMatches = [
    {
      id: "1",
      name: "Sofia Rodriguez",
      category: "Model",
      location: "Los Angeles, CA",
      avatar: null,
      bio: "Professional fashion model with 5+ years experience in commercial and editorial photography.",
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
      name: "Marcus Chen",
      category: "Influencer",
      location: "New York, NY",
      avatar: null,
      bio: "Tech lifestyle influencer and content creator with strong engagement rates.",
      matchScore: 88,
      followers: 250000,
      engagementRate: 6.2,
      skills: [
        "Tech",
        "Lifestyle",
        "Video Content",
        "Social Media",
        "Brand Partnerships",
      ],
    },
  ];

  const handleSliderChange = (key: string, value: number[]) => {
    setProjectPreferences((prev) => ({
      ...prev,
      [selectedProject]: { ...prev[selectedProject], [key]: value },
    }));
  };

  const handleSwitchChange = (key: string, value: boolean) => {
    setProjectPreferences((prev) => ({
      ...prev,
      [selectedProject]: { ...prev[selectedProject], [key]: value },
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setProjectPreferences((prev) => ({
      ...prev,
      [selectedProject]: { ...prev[selectedProject], [key]: value },
    }));
  };

  const handleArrayToggle = (key: string, value: string) => {
    setProjectPreferences((prev) => ({
      ...prev,
      [selectedProject]: {
        ...prev[selectedProject],
        [key]: prev[selectedProject][
          key as keyof (typeof prev)[selectedProject]
        ].includes(value)
          ? (
              prev[selectedProject][
                key as keyof (typeof prev)[selectedProject]
              ] as string[]
            ).filter((item) => item !== value)
          : [
              ...(prev[selectedProject][
                key as keyof (typeof prev)[selectedProject]
              ] as string[]),
              value,
            ],
      },
    }));
  };

  const handleSave = () => {
    showToast("AI preferences updated successfully!", "success");
  };

  const handleReset = () => {
    setProjectPreferences((prev) => ({
      ...prev,
      [selectedProject]: defaultPreferences,
    }));
    setShowResetDialog(false);
    showToast("Preferences reset to default values", "info");
  };

  const handleApplyToAll = () => {
    const currentPrefs = projectPreferences[selectedProject];
    setProjectPreferences((prev) => {
      const newPrefs = { ...prev };
      Object.keys(newPrefs).forEach((key) => {
        if (key !== selectedProject) {
          newPrefs[key] = { ...currentPrefs };
        }
      });
      return newPrefs;
    });
    setShowApplyToAllDialog(false);
    showToast("Preferences applied to all projects!", "success");
  };

  const handleCopyFromProject = (sourceProjectId: string) => {
    const sourcePrefs = projectPreferences[sourceProjectId];
    setProjectPreferences((prev) => ({
      ...prev,
      [selectedProject]: { ...sourcePrefs },
    }));
    setShowCopyFromDialog(false);
    showToast(
      `Preferences copied from ${
        mockProjects.find((p) => p.id === sourceProjectId)?.title
      }!`,
      "success"
    );
  };

  const getProjectTitle = (projectId: string) => {
    if (projectId === "all") return "All Projects";
    return (
      mockProjects.find((p) => p.id === projectId)?.title || "Unknown Project"
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Matching Preferences</h1>
          <p className="text-muted-foreground mt-1">
            Customize how our AI matches talent to your projects for better
            results.
          </p>
        </div>

        {/* Project Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderOpen className="mr-2 h-5 w-5" />
              Project Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label>Select Project</Label>
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects (Default)</SelectItem>
                    {mockProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title} ({project.status})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowCopyFromDialog(true)}
                  disabled={selectedProject === "all"}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy From
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowApplyToAllDialog(true)}
                  disabled={selectedProject === "all"}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Apply to All
                </Button>
              </div>
            </div>

            {selectedProject !== "all" && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Note:</strong> These preferences will only apply to "
                  {getProjectTitle(selectedProject)}". Use "Apply to All" to use
                  these settings for all projects.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Brain className="h-8 w-8 text-blue-500" />
                </div>
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">
                  Match Accuracy
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  How precise our AI matching is
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-8 w-8 text-green-500" />
                </div>
                <div className="text-2xl font-bold">127</div>
                <div className="text-sm text-muted-foreground">
                  Successful Matches
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Total successful connections made
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm text-muted-foreground">
                  Response Rate
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Talent response to your projects
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Average satisfaction rating
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matching Criteria Weights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Matching Criteria Weights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Skills Match</Label>
                  <span className="text-sm font-medium">
                    {preferences.skillsWeight[0]}%
                  </span>
                </div>
                <Slider
                  value={preferences.skillsWeight}
                  onValueChange={(value) =>
                    handleSliderChange("skillsWeight", value)
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How important is it that talent has the exact skills you're
                  looking for?
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Location Preference</Label>
                  <span className="text-sm font-medium">
                    {preferences.locationWeight[0]}%
                  </span>
                </div>
                <Slider
                  value={preferences.locationWeight}
                  onValueChange={(value) =>
                    handleSliderChange("locationWeight", value)
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How important is geographic proximity to your projects?
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Experience Level</Label>
                  <span className="text-sm font-medium">
                    {preferences.experienceWeight[0]}%
                  </span>
                </div>
                <Slider
                  value={preferences.experienceWeight}
                  onValueChange={(value) =>
                    handleSliderChange("experienceWeight", value)
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How much do you value years of experience and portfolio
                  quality?
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Social Media Metrics</Label>
                  <span className="text-sm font-medium">
                    {preferences.socialMetricsWeight[0]}%
                  </span>
                </div>
                <Slider
                  value={preferences.socialMetricsWeight}
                  onValueChange={(value) =>
                    handleSliderChange("socialMetricsWeight", value)
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How important are follower count and engagement rates?
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Availability</Label>
                  <span className="text-sm font-medium">
                    {preferences.availabilityWeight[0]}%
                  </span>
                </div>
                <Slider
                  value={preferences.availabilityWeight}
                  onValueChange={(value) =>
                    handleSliderChange("availabilityWeight", value)
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How important is immediate availability for your projects?
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Rate Compatibility</Label>
                  <span className="text-sm font-medium">
                    {preferences.ratesWeight[0]}%
                  </span>
                </div>
                <Slider
                  value={preferences.ratesWeight}
                  onValueChange={(value) =>
                    handleSliderChange("ratesWeight", value)
                  }
                  max={100}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How important is it that talent rates fit within your budget?
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Social Media Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Minimum Followers</Label>
                <span className="text-sm font-medium">
                  {preferences.minFollowers[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={preferences.minFollowers}
                onValueChange={(value) =>
                  handleSliderChange("minFollowers", value)
                }
                min={1000}
                max={1000000}
                step={5000}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Minimum Engagement Rate</Label>
                <span className="text-sm font-medium">
                  {preferences.minEngagementRate[0]}%
                </span>
              </div>
              <Slider
                value={preferences.minEngagementRate}
                onValueChange={(value) =>
                  handleSliderChange("minEngagementRate", value)
                }
                min={0.5}
                max={10}
                step={0.1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <Label>Preferred Platforms</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["instagram", "tiktok", "youtube", "twitter"].map(
                  (platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={platform}
                        checked={preferences.preferredPlatforms.includes(
                          platform
                        )}
                        onCheckedChange={() =>
                          handleArrayToggle("preferredPlatforms", platform)
                        }
                      />
                      <Label htmlFor={platform} className="text-sm capitalize">
                        {platform}
                      </Label>
                    </div>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geographic Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Geographic Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Location Flexibility</Label>
              <Select
                value={preferences.locationFlexibility}
                onValueChange={(value) =>
                  handleSelectChange("locationFlexibility", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strict">
                    Strict - Same city only
                  </SelectItem>
                  <SelectItem value="preferred">
                    Preferred - Nearby locations
                  </SelectItem>
                  <SelectItem value="flexible">
                    Flexible - Any location
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Maximum Distance (miles)</Label>
                <span className="text-sm font-medium">
                  {preferences.maxDistance[0]}
                </span>
              </div>
              <Slider
                value={preferences.maxDistance}
                onValueChange={(value) =>
                  handleSliderChange("maxDistance", value)
                }
                min={10}
                max={500}
                step={10}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Accept Remote Work</Label>
                <p className="text-sm text-muted-foreground">
                  Allow talent to work remotely on projects
                </p>
              </div>
              <Switch
                checked={preferences.remoteWork}
                onCheckedChange={(checked) =>
                  handleSwitchChange("remoteWork", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Behavior Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              AI Behavior Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Match</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically find matches when you create projects
                </p>
              </div>
              <Switch
                checked={preferences.autoMatch}
                onCheckedChange={(checked) =>
                  handleSwitchChange("autoMatch", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Smart Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about high-quality matches only
                </p>
              </div>
              <Switch
                checked={preferences.smartNotifications}
                onCheckedChange={(checked) =>
                  handleSwitchChange("smartNotifications", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Learning Mode</Label>
                <p className="text-sm text-muted-foreground">
                  AI learns from your selections to improve matches
                </p>
              </div>
              <Switch
                checked={preferences.learningMode}
                onCheckedChange={(checked) =>
                  handleSwitchChange("learningMode", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Diversity Boost</Label>
                <p className="text-sm text-muted-foreground">
                  Promote diverse talent in recommendations
                </p>
              </div>
              <Switch
                checked={preferences.diversityBoost}
                onCheckedChange={(checked) =>
                  handleSwitchChange("diversityBoost", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setShowResetDialog(true)}>
            Reset to Defaults
          </Button>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowPreviewDialog(true)}
            >
              Preview Matches
            </Button>
            <Button onClick={handleSave}>Save Preferences</Button>
          </div>
        </div>

        {/* Reset Confirmation Dialog */}
        <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset AI Preferences</DialogTitle>
              <DialogDescription>
                Are you sure you want to reset preferences for "
                {getProjectTitle(selectedProject)}" to default values? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowResetDialog(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReset}>
                Reset to Defaults
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Apply to All Dialog */}
        <Dialog
          open={showApplyToAllDialog}
          onOpenChange={setShowApplyToAllDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply to All Projects</DialogTitle>
              <DialogDescription>
                Are you sure you want to apply the current preferences from "
                {getProjectTitle(selectedProject)}" to all your projects? This
                will override existing project-specific settings.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApplyToAllDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleApplyToAll}>Apply to All Projects</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Copy From Dialog */}
        <Dialog open={showCopyFromDialog} onOpenChange={setShowCopyFromDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Copy Preferences From</DialogTitle>
              <DialogDescription>
                Select a project to copy its AI preferences to "
                {getProjectTitle(selectedProject)}".
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              {mockProjects
                .filter((project) => project.id !== selectedProject)
                .map((project) => (
                  <Button
                    key={project.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleCopyFromProject(project.id)}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    {project.title} ({project.status})
                  </Button>
                ))}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCopyFromDialog(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Preview Matches Dialog */}
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview Matches</DialogTitle>
              <DialogDescription>
                Based on your current preferences for "
                {getProjectTitle(selectedProject)}", here are some example
                matches you might receive:
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {previewMatches.map((talent) => (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                  showMatchScore={true}
                />
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowPreviewDialog(false)}>
                Close Preview
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
