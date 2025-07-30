"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Share2,
  Download,
  ExternalLink,
  Play,
  MapPin,
  Star,
  TrendingUp,
  Copy,
  FileText,
  ImageIcon,
  LinkIcon,
} from "lucide-react"
import { useToast } from "@/components/ui/toast"
import { ChatDialog } from "@/components/ui/chat-dialog"
import Link from "next/link"

export default function PortfolioPreview() {
  const { showToast } = useToast()
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [exportDialogOpen, setExportDialogOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [isPublicView, setIsPublicView] = useState(false)

  const talent = {
    name: "Sofia Rodriguez",
    category: "Fashion Model",
    location: "Los Angeles, CA",
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Professional fashion model with 5+ years of experience in commercial and editorial photography. I specialize in lifestyle and beauty campaigns, bringing authenticity and creativity to every project.",
    skills: ["Fashion Photography", "Commercial Modeling", "Editorial", "Beauty", "Lifestyle", "Runway"],
    languages: ["English", "Spanish", "French"],
    rates: 500,
    socialMetrics: {
      instagram: { followers: 150000, engagementRate: 4.5 },
      tiktok: { followers: 89000, engagementRate: 6.2 },
      youtube: { followers: 25000, engagementRate: 3.8 },
    },
    portfolio: [
      {
        id: "1",
        type: "photo",
        url: "/placeholder.svg?height=400&width=400",
        description: "Editorial fashion shoot for Vogue",
      },
      {
        id: "2",
        type: "photo",
        url: "/placeholder.svg?height=400&width=400",
        description: "Commercial campaign for luxury brand",
      },
      {
        id: "3",
        type: "video",
        url: "/placeholder.svg?height=400&width=400",
        description: "Behind the scenes fashion video",
      },
      {
        id: "4",
        type: "photo",
        url: "/placeholder.svg?height=400&width=400",
        description: "Beauty campaign for cosmetics brand",
      },
      {
        id: "5",
        type: "photo",
        url: "/placeholder.svg?height=400&width=400",
        description: "Lifestyle brand collaboration",
      },
      {
        id: "6",
        type: "photo",
        url: "/placeholder.svg?height=400&width=400",
        description: "Artistic portrait session",
      },
    ],
  }

  const portfolioUrl = `https://krystal.talent/portfolio/${talent.name.toLowerCase().replace(" ", "-")}`

  const handleShare = (platform: string) => {
    const url = portfolioUrl
    const text = `Check out ${talent.name}'s portfolio on KRYSTAL Talent`

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(url)
        showToast("Portfolio link copied to clipboard!", "success")
        break
      case "linkedin":
        window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank")
        showToast("Opening LinkedIn share...", "info")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        )
        showToast("Opening Twitter share...", "info")
        break
      case "email":
        window.open(`mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`)
        showToast("Opening email client...", "info")
        break
    }
    setShareDialogOpen(false)
  }

  const handleExport = (format: string) => {
    switch (format) {
      case "pdf":
        showToast("Generating PDF export... Download will start shortly.", "success")
        // Simulate PDF generation
        setTimeout(() => {
          const link = document.createElement("a")
          link.href = "#"
          link.download = `${talent.name.replace(" ", "_")}_Portfolio.pdf`
          showToast("PDF export ready for download!", "success")
        }, 2000)
        break
      case "images":
        showToast("Preparing image archive... Download will start shortly.", "success")
        setTimeout(() => {
          showToast("Image archive ready for download!", "success")
        }, 2000)
        break
      case "json":
        const portfolioData = {
          talent,
          exportDate: new Date().toISOString(),
          format: "json",
        }
        const blob = new Blob([JSON.stringify(portfolioData, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${talent.name.replace(" ", "_")}_Portfolio.json`
        link.click()
        showToast("JSON export downloaded!", "success")
        break
    }
    setExportDialogOpen(false)
  }

  const handlePublicView = () => {
    setIsPublicView(true)
    showToast("Switched to public view - this is how visitors see your portfolio", "info")
  }

  const handleContactTalent = () => {
    setChatOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/talent/portfolio">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                Portfolio Preview{" "}
                {isPublicView && (
                  <Badge variant="secondary" className="ml-2">
                    Public View
                  </Badge>
                )}
              </h1>
              <p className="text-muted-foreground">
                {isPublicView
                  ? "This is how your portfolio appears to the public"
                  : "This is how your portfolio appears to potential clients"}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShareDialogOpen(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => setExportDialogOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={handlePublicView}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Public View
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
          <CardContent className="relative pt-0">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
              <img
                src={talent.avatar || "/placeholder.svg"}
                alt={talent.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <div className="flex-1 md:pb-4">
                <h1 className="text-3xl font-bold mb-2">{talent.name}</h1>
                <p className="text-xl text-muted-foreground mb-2">{talent.category}</p>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {talent.location}
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">4.9</span>
                    <span className="text-muted-foreground ml-1">(24 reviews)</span>
                  </div>
                  <div>
                    <span className="font-medium">${talent.rates}</span>
                    <span className="text-muted-foreground">/day</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About & Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-muted-foreground mb-4">{talent.bio}</p>

                <h4 className="font-medium mb-2">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {talent.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <h4 className="font-medium mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {talent.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Social Media Reach</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">Instagram</div>
                      <div className="text-sm text-muted-foreground">
                        {talent.socialMetrics.instagram.followers.toLocaleString()} followers
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.instagram.engagementRate}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">TikTok</div>
                      <div className="text-sm text-muted-foreground">
                        {talent.socialMetrics.tiktok.followers.toLocaleString()} followers
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.tiktok.engagementRate}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div>
                      <div className="font-medium">YouTube</div>
                      <div className="text-sm text-muted-foreground">
                        {talent.socialMetrics.youtube.followers.toLocaleString()} subscribers
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {talent.socialMetrics.youtube.engagementRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio Gallery */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Portfolio ({talent.portfolio.length} items)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {talent.portfolio.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-3 relative">
                    <img
                      src={item.url || "/placeholder.svg"}
                      alt={item.description}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-3 group-hover:bg-black/70 transition-colors">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                  </div>
                  <p className="text-sm font-medium line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to work together?</h3>
            <p className="text-muted-foreground mb-4">
              Get in touch to discuss your next project and see how we can create something amazing together.
            </p>
            <Button size="lg" onClick={handleContactTalent}>
              Contact {talent.name}
            </Button>
          </CardContent>
        </Card>

        {/* Share Dialog */}
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Portfolio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Portfolio URL:</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 text-xs bg-background p-2 rounded border">{portfolioUrl}</code>
                  <Button size="sm" variant="outline" onClick={() => handleShare("copy")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleShare("linkedin")} className="justify-start">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" onClick={() => handleShare("twitter")} className="justify-start">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" onClick={() => handleShare("email")} className="justify-start">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" onClick={() => handleShare("copy")} className="justify-start">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Export Dialog */}
        <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Export Portfolio</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Choose the format you'd like to export your portfolio in:</p>
              <div className="space-y-3">
                <Button variant="outline" onClick={() => handleExport("pdf")} className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">PDF Document</div>
                    <div className="text-xs text-muted-foreground">Complete portfolio as a PDF file</div>
                  </div>
                </Button>
                <Button variant="outline" onClick={() => handleExport("images")} className="w-full justify-start">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">Image Archive</div>
                    <div className="text-xs text-muted-foreground">ZIP file with all portfolio images</div>
                  </div>
                </Button>
                <Button variant="outline" onClick={() => handleExport("json")} className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">JSON Data</div>
                    <div className="text-xs text-muted-foreground">Portfolio data in JSON format</div>
                  </div>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Chat Dialog */}
        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          recipientName={talent.name}
          recipientAvatar={talent.avatar}
          currentUserId="business-1"
          currentUserName="Creative Agency Inc."
          currentUserAvatar="/placeholder.svg?height=40&width=40"
        />
      </div>
    </DashboardLayout>
  )
}
