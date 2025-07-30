"use client"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, TrendingUp, Star, MessageSquare, Heart, Share2, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function TalentProfile({ params }: { params: { id: string } }) {
  const { showToast } = useToast()

  // Mock talent data based on ID
  const talent = {
    id: params.id,
    name: "Sofia Rodriguez",
    category: "Fashion Model",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Professional fashion model with 5+ years of experience in commercial and editorial photography. I specialize in lifestyle and beauty campaigns, bringing authenticity and creativity to every project. My passion for sustainable fashion and diverse representation drives my work in the industry.",
    matchScore: 95,
    skills: ["Fashion Photography", "Commercial Modeling", "Editorial", "Beauty", "Lifestyle", "Runway"],
    languages: ["English", "Spanish", "French"],
    rates: 500,
    availability: "Available weekdays and weekends",
    socialMetrics: {
      instagram: {
        followers: 150000,
        engagementRate: 4.5,
        averageReach: 80000,
      },
      tiktok: {
        followers: 89000,
        engagementRate: 6.2,
        averageReach: 120000,
      },
      youtube: {
        followers: 25000,
        engagementRate: 3.8,
        averageReach: 15000,
      },
    },
    portfolio: [
      {
        id: "1",
        type: "photo",
        url: "/placeholder.svg?height=300&width=300",
        description: "Editorial fashion shoot for Vogue",
      },
      {
        id: "2",
        type: "photo",
        url: "/placeholder.svg?height=300&width=300",
        description: "Commercial campaign for luxury brand",
      },
      {
        id: "3",
        type: "video",
        url: "/placeholder.svg?height=300&width=300",
        description: "Behind the scenes fashion video",
      },
      {
        id: "4",
        type: "photo",
        url: "/placeholder.svg?height=300&width=300",
        description: "Beauty campaign for cosmetics brand",
      },
    ],
    projectHistory: [
      {
        id: "1",
        title: "Spring Collection Campaign",
        client: "Fashion House Co.",
        date: "2024-01-15",
        rating: 5,
      },
      {
        id: "2",
        title: "Beauty Product Launch",
        client: "Cosmetics Brand",
        date: "2023-12-10",
        rating: 5,
      },
    ],
  }

  const handleContact = () => {
    showToast("Message sent to Sofia Rodriguez!", "success")
  }

  const handleSaveToFavorites = () => {
    showToast("Added to favorites!", "success")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header with Match Score */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-1">{talent.matchScore}%</div>
                <div className="text-sm text-muted-foreground">Match Score</div>
                <div className="text-xs text-green-600 font-medium mt-1">Excellent Match</div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold mb-2">Why this match?</h2>
                <p className="text-sm text-muted-foreground">
                  Sofia's fashion modeling expertise, strong social media presence, and Los Angeles location make her an
                  ideal candidate for your Summer Fashion Campaign. Her portfolio demonstrates experience with similar
                  lifestyle and beauty projects.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <img
                    src={talent.avatar || "/placeholder.svg"}
                    alt={talent.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h1 className="text-2xl font-bold mb-1">{talent.name}</h1>
                  <p className="text-muted-foreground mb-2">{talent.category}</p>
                  <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {talent.location}
                  </div>

                  <div className="flex space-x-2 mb-4">
                    <Button onClick={handleContact} className="flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Talent
                    </Button>
                    <Button variant="outline" onClick={handleSaveToFavorites}>
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">4.9</span>
                      <span className="text-sm text-muted-foreground">(24 reviews)</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">${talent.rates}</span>
                      <span className="text-muted-foreground">/day</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-2/3 space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{talent.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {talent.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {talent.languages.map((language) => (
                        <Badge key={language} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium mb-2">Availability</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {talent.availability}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-pink-500 font-bold text-lg mb-1">Instagram</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center text-sm">
                        <Users className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.instagram.followers.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.instagram.engagementRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg Reach: {talent.socialMetrics.instagram.averageReach.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-black font-bold text-lg mb-1">TikTok</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center text-sm">
                        <Users className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.tiktok.followers.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.tiktok.engagementRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg Reach: {talent.socialMetrics.tiktok.averageReach.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-red-500 font-bold text-lg mb-1">YouTube</div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-center text-sm">
                        <Users className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.youtube.followers.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.youtube.engagementRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Avg Reach: {talent.socialMetrics.youtube.averageReach.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio */}
        <Card>
          <CardHeader>
            <CardTitle>Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {talent.portfolio.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.description}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Project History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {talent.projectHistory.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                    <p className="text-xs text-muted-foreground">{project.date}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(project.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
