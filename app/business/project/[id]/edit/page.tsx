"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/toast"

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { showToast } = useToast()

  // Mock project data based on ID
  const [project, setProject] = useState({
    title: "Summer Fashion Campaign",
    description:
      "Looking for fashion models for our summer collection campaign. We need versatile talent who can showcase our new line with authenticity and style.",
    campaignType: "Brand Campaign",
    industrySector: "Fashion",
    budget: "5000",
    deadline: new Date("2024-02-15"),
    talentTypes: ["Model", "Influencer"],
    skills: ["Fashion Photography", "Commercial Modeling", "Social Media"],
    location: "Los Angeles, CA",
    styleAndTone:
      "Fresh, vibrant, and youthful aesthetic that appeals to millennials and Gen Z. Looking for natural, authentic expressions.",
    references: [] as File[],
  })

  const [newSkill, setNewSkill] = useState("")

  const talentTypeOptions = ["Model", "Influencer", "Actor", "Digital Artist", "Photographer", "Content Creator"]

  const campaignTypes = [
    "Brand Campaign",
    "Product Launch",
    "Social Media Campaign",
    "Event Promotion",
    "Content Creation",
    "Commercial",
  ]

  const industrySectors = [
    "Fashion",
    "Technology",
    "Beauty",
    "Lifestyle",
    "Food & Beverage",
    "Automotive",
    "Travel",
    "Health & Fitness",
  ]

  const handleTalentTypeChange = (type: string, checked: boolean) => {
    setProject((prev) => ({
      ...prev,
      talentTypes: checked ? [...prev.talentTypes, type] : prev.talentTypes.filter((t) => t !== type),
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !project.skills.includes(newSkill.trim())) {
      setProject((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProject((prev) => ({
      ...prev,
      references: [...prev.references, ...files],
    }))
  }

  const removeFile = (index: number) => {
    setProject((prev) => ({
      ...prev,
      references: prev.references.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()

    if (!project.title.trim() || !project.description.trim()) {
      showToast("Please fill in required fields", "error")
      return
    }

    // Simulate API call
    setTimeout(() => {
      if (isDraft) {
        showToast("Project saved as draft!", "success")
        router.push("/business/projects")
      } else {
        showToast("Project updated successfully!", "success")
        router.push(`/business/project/${params.id}/suggestions`)
      }
    }, 1000)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      setTimeout(() => {
        showToast("Project deleted successfully", "success")
        router.push("/business/projects")
      }, 1000)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Edit Project</h1>
            <p className="text-muted-foreground mt-1">Update your project requirements and preferences.</p>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Project
          </Button>
        </div>

        <form className="space-y-6">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={project.title}
                  onChange={(e) => setProject((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Summer Fashion Campaign"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={project.description}
                  onChange={(e) => setProject((prev) => ({ ...prev, description: e.target.value }))}
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
                    onValueChange={(value) => setProject((prev) => ({ ...prev, campaignType: value }))}
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
                    onValueChange={(value) => setProject((prev) => ({ ...prev, industrySector: value }))}
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
                    onChange={(e) => setProject((prev) => ({ ...prev, budget: e.target.value }))}
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
                          !project.deadline && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {project.deadline ? format(project.deadline, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={project.deadline}
                        onSelect={(date) => setProject((prev) => ({ ...prev, deadline: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Talent Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Talent Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Talent Type</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {talentTypeOptions.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={project.talentTypes.includes(type)}
                        onCheckedChange={(checked) => handleTalentTypeChange(type, checked as boolean)}
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
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
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
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
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
                  onChange={(e) => setProject((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Los Angeles, CA or Remote"
                />
              </div>
            </CardContent>
          </Card>

          {/* Style & References */}
          <Card>
            <CardHeader>
              <CardTitle>Style & References</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="styleAndTone">Desired Style and Tone</Label>
                <Textarea
                  id="styleAndTone"
                  value={project.styleAndTone}
                  onChange={(e) => setProject((prev) => ({ ...prev, styleAndTone: e.target.value }))}
                  placeholder="Describe the aesthetic, mood, and style you're looking for..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="references">Visual Examples/References</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="file-upload" className="cursor-pointer">
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
                      <p className="mt-1 text-xs text-muted-foreground">PNG, JPG, MP4 up to 10MB each</p>
                    </div>
                  </div>
                </div>

                {project.references.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="space-y-2">
                      {project.references.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm truncate">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/business/projects")}>
              Cancel
            </Button>
            <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, true)}>
              Save Draft
            </Button>
            <Button type="button" onClick={(e) => handleSubmit(e, false)}>
              Update Project
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
