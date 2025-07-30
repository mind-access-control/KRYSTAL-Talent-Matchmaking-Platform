"use client"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Calendar, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/toast"

export default function BusinessProjects() {
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const projects = [
    {
      id: "1",
      title: "Summer Fashion Campaign",
      description: "Looking for fashion models for our summer collection campaign",
      status: "Active",
      budget: "$5,000",
      deadline: "2024-02-15",
      matches: 12,
      category: "Fashion",
    },
    {
      id: "2",
      title: "Tech Product Launch",
      description: "Need tech influencers for product launch campaign",
      status: "Draft",
      budget: "$3,500",
      deadline: "2024-02-20",
      matches: 0,
      category: "Technology",
    },
    {
      id: "3",
      title: "Lifestyle Brand Collaboration",
      description: "Seeking lifestyle influencers for brand partnership",
      status: "Completed",
      budget: "$2,000",
      deadline: "2024-01-30",
      matches: 8,
      category: "Lifestyle",
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const handlePublish = (projectId: string) => {
    // Simulate API call
    setTimeout(() => {
      showToast("Project published successfully! Finding matches...", "success")
      // Update project status in the projects array
      // In a real app, this would update the backend
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Projects</h1>
            <p className="text-muted-foreground mt-1">Manage and track all your talent search projects.</p>
          </div>
          <Button asChild>
            <Link href="/business/project/create">
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                  <Badge
                    variant={
                      project.status === "Active" ? "default" : project.status === "Draft" ? "secondary" : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.budget}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.deadline}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.matches} matches</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {project.status === "Active" && (
                    <Button asChild>
                      <Link href={`/business/project/${project.id}/suggestions`}>View Suggestions</Link>
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link href={`/business/project/${project.id}/edit`}>Edit Project</Link>
                  </Button>
                  {project.status === "Draft" && (
                    <Button variant="secondary" onClick={() => handlePublish(project.id)}>
                      Publish Project
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first project to start finding talent"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button asChild>
                  <Link href="/business/project/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Project
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
