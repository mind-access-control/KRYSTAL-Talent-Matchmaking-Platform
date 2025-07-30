"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Search, Filter, MapPin, DollarSign, Calendar, Trash2, MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/toast"
import { ChatDialog } from "@/components/ui/chat-dialog"

interface FavoriteProject {
  id: string
  title: string
  company: string
  companyLogo: string
  description: string
  budget: string
  location: string
  deadline: string
  matchScore: number
  savedDate: string
  status: "active" | "expired" | "filled"
}

export default function TalentFavorites() {
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [chatOpen, setChatOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<string>("")

  const [favorites, setFavorites] = useState<FavoriteProject[]>([
    {
      id: "1",
      title: "Summer Fashion Campaign",
      company: "StyleCo Fashion",
      companyLogo: "/placeholder.svg?height=60&width=60",
      description:
        "Looking for fashion models for our summer collection campaign. Great opportunity to work with a leading fashion brand.",
      budget: "$5,000",
      location: "Los Angeles, CA",
      deadline: "2024-02-15",
      matchScore: 92,
      savedDate: "2024-01-20",
      status: "active",
    },
    {
      id: "2",
      title: "Tech Product Launch",
      company: "InnovateTech",
      companyLogo: "/placeholder.svg?height=60&width=60",
      description: "Seeking influencers for our new tech product launch. Perfect for tech-savvy content creators.",
      budget: "$3,500",
      location: "San Francisco, CA",
      deadline: "2024-02-20",
      matchScore: 87,
      savedDate: "2024-01-18",
      status: "active",
    },
    {
      id: "3",
      title: "Beauty Brand Campaign",
      company: "GlowCo",
      companyLogo: "/placeholder.svg?height=60&width=60",
      description: "Beauty campaign for our new skincare line. Looking for diverse models and influencers.",
      budget: "$4,000",
      location: "New York, NY",
      deadline: "2024-01-30",
      matchScore: 85,
      savedDate: "2024-01-15",
      status: "expired",
    },
  ])

  const filteredFavorites = favorites.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleRemoveFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((project) => project.id !== id))
    showToast("Project removed from favorites", "success")
  }

  const handleContactCompany = (companyName: string) => {
    setSelectedCompany(companyName)
    setChatOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "filled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Favorite Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your saved projects and opportunities.</p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="filled">Filled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Favorites List */}
        <div className="space-y-4">
          {filteredFavorites.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No favorite projects found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Start saving projects you're interested in to see them here."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFavorites.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start space-x-4 flex-1">
                      <img
                        src={project.companyLogo || "/placeholder.svg"}
                        alt={project.company}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="text-muted-foreground">{project.company}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {project.matchScore}% Match
                            </Badge>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{project.budget}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Due: {project.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 lg:w-48">
                      <p className="text-xs text-muted-foreground">
                        Saved on {new Date(project.savedDate).toLocaleDateString()}
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className="w-full" disabled={project.status !== "active"}>
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full bg-transparent"
                          onClick={() => handleContactCompany(project.company)}
                          disabled={project.status !== "active"}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-destructive hover:text-destructive bg-transparent"
                          onClick={() => handleRemoveFavorite(project.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Chat Dialog */}
        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          recipientName={selectedCompany}
          recipientAvatar="/placeholder.svg?height=40&width=40"
          currentUserId="talent-1"
          currentUserName="Sofia Rodriguez"
          currentUserAvatar="/placeholder.svg?height=40&width=40"
        />
      </div>
    </DashboardLayout>
  )
}
