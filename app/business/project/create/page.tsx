"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  Upload,
  X,
  Wand2,
  Brain,
  Sparkles,
  Target,
  Zap,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Globe,
  Briefcase,
  Star,
  TrendingUp,
  Award,
  Crown,
  Rocket,
  Bot,
  MessageSquare,
  Play,
  Loader2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

interface AIProjectIdea {
  id: string;
  title: string;
  description: string;
  campaignType: string;
  industrySector: string;
  budget: string;
  duration: string;
  location: string;
  talentTypes: string[];
  skills: string[];
  styleAndTone: string;
  aiScore: number;
  reasoning: string;
  estimatedMatches: number;
  successProbability: number;
}

export default function CreateProject() {
  const router = useRouter();
  const { showToast } = useToast();

  const [step, setStep] = useState<"prompt" | "ideas" | "details">("prompt");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<AIProjectIdea | null>(null);
  const [showIdeaDetails, setShowIdeaDetails] = useState(false);
  const [selectedIdeaForDetails, setSelectedIdeaForDetails] =
    useState<AIProjectIdea | null>(null);

  const [prompt, setPrompt] = useState("");
  const [aiProjectIdeas, setAiProjectIdeas] = useState<AIProjectIdea[]>([]);

  const [project, setProject] = useState({
    title: "",
    description: "",
    campaignType: "",
    industrySector: "",
    budget: "",
    deadline: undefined as Date | undefined,
    talentTypes: [] as string[],
    skills: [] as string[],
    location: "",
    styleAndTone: "",
    references: [] as File[],
  });

  const [newSkill, setNewSkill] = useState("");

  const talentTypeOptions = [
    "Model",
    "Influencer",
    "Actor",
    "Digital Artist",
    "Photographer",
    "Content Creator",
  ];

  const campaignTypes = [
    "Brand Campaign",
    "Product Launch",
    "Social Media Campaign",
    "Event Promotion",
    "Content Creation",
    "Commercial",
  ];

  const industrySectors = [
    "Fashion",
    "Technology",
    "Beauty",
    "Lifestyle",
    "Food & Beverage",
    "Automotive",
    "Travel",
    "Health & Fitness",
  ];

  const samplePrompts = [
    "I need a fashion campaign for our summer collection targeting Gen Z",
    "Looking for tech influencers to promote our new mobile app",
    "Want to create a beauty campaign for our skincare line",
    "Need lifestyle content creators for our travel brand",
    "Seeking models for a luxury brand editorial shoot",
  ];

  const generateAIProjectIdeas = async () => {
    if (!prompt.trim()) {
      showToast("Please enter a project description", "error");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const ideas: AIProjectIdea[] = [
        {
          id: "1",
          title: "Summer Collection Fashion Campaign",
          description:
            "A vibrant, youth-focused campaign showcasing the latest summer fashion collection with authentic, diverse models that resonate with Gen Z audiences.",
          campaignType: "Brand Campaign",
          industrySector: "Fashion",
          budget: "$8,500",
          duration: "3 days",
          location: "Los Angeles, CA",
          talentTypes: ["Model", "Influencer"],
          skills: [
            "Fashion Photography",
            "Commercial Modeling",
            "Social Media",
            "Lifestyle Content",
          ],
          styleAndTone:
            "Fresh, vibrant, and youthful aesthetic that appeals to millennials and Gen Z. Looking for natural, authentic expressions and diverse representation.",
          aiScore: 94,
          reasoning:
            "High match due to clear target audience, specific fashion focus, and strong social media integration potential.",
          estimatedMatches: 24,
          successProbability: 92,
        },
        {
          id: "2",
          title: "Gen Z Fashion Influencer Collaboration",
          description:
            "Strategic partnership with emerging fashion influencers to create authentic content that drives engagement and brand awareness among young consumers.",
          campaignType: "Social Media Campaign",
          industrySector: "Fashion",
          budget: "$6,200",
          duration: "2 weeks",
          location: "Remote + Los Angeles",
          talentTypes: ["Influencer", "Content Creator"],
          skills: [
            "Social Media Marketing",
            "Content Creation",
            "Fashion Styling",
            "Video Production",
          ],
          styleAndTone:
            "Authentic, relatable content that showcases personal style while highlighting the brand's summer collection.",
          aiScore: 89,
          reasoning:
            "Good match for influencer marketing approach, though budget could be optimized for better ROI.",
          estimatedMatches: 18,
          successProbability: 87,
        },
        {
          id: "3",
          title: "Summer Fashion Editorial Campaign",
          description:
            "High-end editorial shoot featuring professional models in stunning locations to create premium content for brand marketing materials.",
          campaignType: "Content Creation",
          industrySector: "Fashion",
          budget: "$12,000",
          duration: "1 day",
          location: "Miami, FL",
          talentTypes: ["Model", "Photographer"],
          skills: [
            "Editorial Photography",
            "Fashion Modeling",
            "Creative Direction",
            "Post-Production",
          ],
          styleAndTone:
            "Sophisticated, editorial aesthetic with high production value and artistic direction.",
          aiScore: 91,
          reasoning:
            "Excellent for premium brand positioning, though higher budget requirement.",
          estimatedMatches: 12,
          successProbability: 89,
        },
      ];

      setAiProjectIdeas(ideas);
      setIsGenerating(false);
      setStep("ideas");
      showToast("AI has generated 3 project ideas for you!", "success");
    }, 3000);
  };

  const selectIdea = (idea: AIProjectIdea) => {
    setSelectedIdea(idea);
    setProject({
      title: idea.title,
      description: idea.description,
      campaignType: idea.campaignType,
      industrySector: idea.industrySector,
      budget: idea.budget.replace("$", "").replace(",", ""),
      deadline: undefined,
      talentTypes: idea.talentTypes,
      skills: idea.skills,
      location: idea.location,
      styleAndTone: idea.styleAndTone,
      references: [],
    });
    setStep("details");
  };

  const handleTalentTypeChange = (type: string, checked: boolean) => {
    setProject((prev) => ({
      ...prev,
      talentTypes: checked
        ? [...prev.talentTypes, type]
        : prev.talentTypes.filter((t) => t !== type),
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !project.skills.includes(newSkill.trim())) {
      setProject((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProject((prev) => ({
      ...prev,
      references: [...prev.references, ...files],
    }));
  };

  const removeFile = (index: number) => {
    setProject((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();

    if (!project.title.trim() || !project.description.trim()) {
      showToast("Please fill in required fields", "error");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      if (isDraft) {
        showToast("Project saved as draft!", "success");
        router.push("/business/projects");
      } else {
        showToast(
          "Project published successfully! AI is finding matches...",
          "success"
        );
        router.push("/business/project/1/suggestions");
      }
    }, 1000);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    showToast("Prompt copied to clipboard!", "success");
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <Wand2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      AI Project Creator ✨
                    </h1>
                    <p className="text-blue-100 text-lg">
                      Let AI help you create the perfect project in minutes
                    </p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      step === "prompt"
                        ? "bg-white/20 backdrop-blur-sm"
                        : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step === "prompt"
                          ? "bg-white text-indigo-600"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      1
                    </div>
                    <span className="text-sm font-medium">
                      Describe Your Need
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/60" />
                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      step === "ideas"
                        ? "bg-white/20 backdrop-blur-sm"
                        : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step === "ideas"
                          ? "bg-white text-indigo-600"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      2
                    </div>
                    <span className="text-sm font-medium">Choose AI Idea</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/60" />
                  <div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                      step === "details"
                        ? "bg-white/20 backdrop-blur-sm"
                        : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step === "details"
                          ? "bg-white text-indigo-600"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      3
                    </div>
                    <span className="text-sm font-medium">
                      Finalize Project
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: AI Prompt */}
        {step === "prompt" && (
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Brain className="mr-3 h-6 w-6" />
                  Describe Your Project Need
                  <Badge className="ml-auto bg-white/20 text-white">
                    AI Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label
                      htmlFor="prompt"
                      className="text-lg font-semibold mb-3 block"
                    >
                      Tell AI what you need:
                    </Label>
                    <Textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., I need a fashion campaign for our summer collection targeting Gen Z with influencers who have authentic engagement..."
                      rows={6}
                      className="text-lg"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Be specific about your industry, target audience, budget
                      range, and desired outcomes for better AI suggestions.
                    </p>
                  </div>

                  {/* Sample Prompts */}
                  <div>
                    <Label className="text-lg font-semibold mb-3 block">
                      Quick Start Examples:
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {samplePrompts.map((samplePrompt, index) => (
                        <div
                          key={index}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
                          onClick={() => setPrompt(samplePrompt)}
                        >
                          <div className="flex items-start justify-between">
                            <p className="text-sm text-gray-700">
                              {samplePrompt}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyPrompt(samplePrompt);
                              }}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      size="lg"
                      onClick={generateAIProjectIdeas}
                      disabled={isGenerating || !prompt.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          AI is thinking...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-5 w-5" />
                          Generate AI Project Ideas
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: AI Ideas */}
        {step === "ideas" && (
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Lightbulb className="mr-3 h-6 w-6" />
                  AI Generated Project Ideas
                  <Badge className="ml-auto bg-white/20 text-white">
                    {aiProjectIdeas.length} Options
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {aiProjectIdeas.map((idea, index) => (
                    <Card
                      key={idea.id}
                      className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <CardHeader className="relative">
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
                            <Bot className="h-3 w-3 mr-1" />
                            AI Score: {idea.aiScore}%
                          </Badge>
                        </div>
                        <CardTitle className="text-lg pr-20">
                          {idea.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {idea.description}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">
                              {idea.estimatedMatches}
                            </p>
                            <p className="text-xs text-gray-600">
                              Est. Matches
                            </p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                              {idea.successProbability}%
                            </p>
                            <p className="text-xs text-gray-600">
                              Success Rate
                            </p>
                          </div>
                        </div>

                        {/* Key Details */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Budget:</span>
                            <span className="font-semibold text-green-600">
                              {idea.budget}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-semibold">
                              {idea.duration}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-semibold">
                              {idea.location}
                            </span>
                          </div>
                        </div>

                        {/* Talent Types */}
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Talent Types:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {idea.talentTypes.map((type) => (
                              <Badge
                                key={type}
                                variant="outline"
                                className="text-xs"
                              >
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button
                            onClick={() => selectIdea(idea)}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Select This Idea
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedIdeaForDetails(idea);
                              setShowIdeaDetails(true);
                            }}
                            className="w-full"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setStep("prompt")}
                    className="mr-4"
                  >
                    ← Back to Prompt
                  </Button>
                  <Button
                    onClick={() => generateAIProjectIdeas()}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate New Ideas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Project Details */}
        {step === "details" && (
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center text-white">
                  <Target className="mr-3 h-6 w-6" />
                  Finalize Your Project
                  <Badge className="ml-auto bg-white/20 text-white">
                    AI Enhanced
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  {/* Project Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        value={project.title}
                        onChange={(e) =>
                          setProject((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="e.g., Summer Fashion Campaign"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Project Description *</Label>
                      <Textarea
                        id="description"
                        value={project.description}
                        onChange={(e) =>
                          setProject((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe your project, goals, and creative vision..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="campaignType">Campaign Type</Label>
                        <Select
                          value={project.campaignType}
                          onValueChange={(value) =>
                            setProject((prev) => ({
                              ...prev,
                              campaignType: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select campaign type" />
                          </SelectTrigger>
                          <SelectContent>
                            {campaignTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industrySector">Industry Sector</Label>
                        <Select
                          value={project.industrySector}
                          onValueChange={(value) =>
                            setProject((prev) => ({
                              ...prev,
                              industrySector: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {industrySectors.map((sector) => (
                              <SelectItem key={sector} value={sector}>
                                {sector}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget (USD)</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={project.budget}
                          onChange={(e) =>
                            setProject((prev) => ({
                              ...prev,
                              budget: e.target.value,
                            }))
                          }
                          placeholder="5000"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Deadline</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !project.deadline && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {project.deadline
                                ? format(project.deadline, "PPP")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={project.deadline}
                              onSelect={(date) =>
                                setProject((prev) => ({
                                  ...prev,
                                  deadline: date,
                                }))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  {/* Talent Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Talent Requirements
                    </h3>
                    <div className="space-y-3">
                      <Label>Talent Type</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {talentTypeOptions.map((type) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={type}
                              checked={project.talentTypes.includes(type)}
                              onCheckedChange={(checked) =>
                                handleTalentTypeChange(type, checked as boolean)
                              }
                            />
                            <Label htmlFor={type} className="text-sm">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Specific Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), addSkill())
                          }
                        />
                        <Button type="button" onClick={addSkill}>
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Desired Location</Label>
                      <Input
                        id="location"
                        value={project.location}
                        onChange={(e) =>
                          setProject((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        placeholder="e.g., Los Angeles, CA or Remote"
                      />
                    </div>
                  </div>

                  {/* Style & References */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Style & References
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="styleAndTone">
                        Desired Style and Tone
                      </Label>
                      <Textarea
                        id="styleAndTone"
                        value={project.styleAndTone}
                        onChange={(e) =>
                          setProject((prev) => ({
                            ...prev,
                            styleAndTone: e.target.value,
                          }))
                        }
                        placeholder="Describe the aesthetic, mood, and style you're looking for..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="references">
                        Visual Examples/References
                      </Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                          <div className="mt-4">
                            <Label
                              htmlFor="file-upload"
                              className="cursor-pointer"
                            >
                              <span className="mt-2 block text-sm font-medium text-primary hover:text-primary/80">
                                Upload reference images or videos
                              </span>
                            </Label>
                            <Input
                              id="file-upload"
                              type="file"
                              multiple
                              accept="image/*,video/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                            <p className="mt-1 text-xs text-muted-foreground">
                              PNG, JPG, MP4 up to 10MB each
                            </p>
                          </div>
                        </div>
                      </div>

                      {project.references.length > 0 && (
                        <div className="space-y-2">
                          <Label>Uploaded Files</Label>
                          <div className="space-y-2">
                            {project.references.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-2 border rounded"
                              >
                                <span className="text-sm truncate">
                                  {file.name}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("ideas")}
                    >
                      ← Back to Ideas
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => handleSubmit(e, true)}
                    >
                      Save Draft
                    </Button>
                    <Button
                      type="button"
                      onClick={(e) => handleSubmit(e, false)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Publish Project
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Idea Details Dialog */}
        <Dialog open={showIdeaDetails} onOpenChange={setShowIdeaDetails}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                AI Project Idea Details
              </DialogTitle>
            </DialogHeader>
            {selectedIdeaForDetails && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {selectedIdeaForDetails.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedIdeaForDetails.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-600">
                      AI Score
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedIdeaForDetails.aiScore}%
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-600">
                      Success Probability
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {selectedIdeaForDetails.successProbability}%
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">AI Reasoning:</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedIdeaForDetails.reasoning}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Budget</p>
                    <p className="font-semibold">
                      {selectedIdeaForDetails.budget}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Duration
                    </p>
                    <p className="font-semibold">
                      {selectedIdeaForDetails.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Location
                    </p>
                    <p className="font-semibold">
                      {selectedIdeaForDetails.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Estimated Matches
                    </p>
                    <p className="font-semibold">
                      {selectedIdeaForDetails.estimatedMatches}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Talent Types:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIdeaForDetails.talentTypes.map((type) => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIdeaForDetails.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Style & Tone:</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedIdeaForDetails.styleAndTone}
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowIdeaDetails(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      selectIdea(selectedIdeaForDetails);
                      setShowIdeaDetails(false);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Select This Idea
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
