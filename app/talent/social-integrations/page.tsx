"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Instagram, Youtube, Music, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function SocialIntegrations() {
  const { showToast } = useToast()

  const [platforms, setPlatforms] = useState([
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-500",
      connected: true,
      metrics: {
        followers: 150000,
        engagementRate: 4.5,
        averageReach: 80000,
        lastSync: "2 hours ago",
      },
      autoSync: true,
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Music,
      color: "text-black dark:text-white",
      connected: true,
      metrics: {
        followers: 89000,
        engagementRate: 6.2,
        averageReach: 120000,
        lastSync: "5 hours ago",
      },
      autoSync: false,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      color: "text-red-500",
      connected: false,
      metrics: null,
      autoSync: false,
    },
  ])

  const handleConnect = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId
          ? {
              ...platform,
              connected: true,
              metrics: {
                followers: Math.floor(Math.random() * 100000) + 10000,
                engagementRate: Math.round((Math.random() * 5 + 2) * 10) / 10,
                averageReach: Math.floor(Math.random() * 50000) + 5000,
                lastSync: "Just now",
              },
            }
          : platform,
      ),
    )
    showToast(`${platforms.find((p) => p.id === platformId)?.name} connected successfully!`, "success")
  }

  const handleDisconnect = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId ? { ...platform, connected: false, metrics: null, autoSync: false } : platform,
      ),
    )
    showToast(`${platforms.find((p) => p.id === platformId)?.name} disconnected`, "info")
  }

  const handleSync = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId && platform.metrics
          ? {
              ...platform,
              metrics: {
                ...platform.metrics,
                lastSync: "Just now",
                followers: platform.metrics.followers + Math.floor(Math.random() * 1000),
                engagementRate: Math.round((platform.metrics.engagementRate + (Math.random() - 0.5)) * 10) / 10,
              },
            }
          : platform,
      ),
    )
    showToast("Metrics synced successfully!", "success")
  }

  const handleAutoSyncToggle = (platformId: string, enabled: boolean) => {
    setPlatforms((prev) =>
      prev.map((platform) => (platform.id === platformId ? { ...platform, autoSync: enabled } : platform)),
    )
    showToast(`Auto-sync ${enabled ? "enabled" : "disabled"}`, "info")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Social Media Integration</h1>
          <p className="text-muted-foreground mt-1">
            Connect your social media accounts to showcase your reach and engagement metrics.
          </p>
        </div>

        {/* Overview Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{platforms.filter((p) => p.connected).length}</div>
                <div className="text-sm text-muted-foreground">Connected Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {platforms
                    .filter((p) => p.connected && p.metrics)
                    .reduce((sum, p) => sum + (p.metrics?.followers || 0), 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {platforms
                    .filter((p) => p.connected && p.metrics)
                    .reduce((sum, p, _, arr) => sum + (p.metrics?.engagementRate || 0), 0)
                    .toFixed(1)}
                  %
                </div>
                <div className="text-sm text-muted-foreground">Avg Engagement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Cards */}
        <div className="grid gap-6">
          {platforms.map((platform) => {
            const IconComponent = platform.icon

            return (
              <Card key={platform.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted ${platform.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{platform.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          {platform.connected ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <Badge variant="secondary" className="text-green-600">
                                Connected
                              </Badge>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-muted-foreground" />
                              <Badge variant="outline">Not Connected</Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {platform.connected ? (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleSync(platform.id)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Sync
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDisconnect(platform.id)}>
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => handleConnect(platform.id)}>Connect</Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {platform.connected && platform.metrics && (
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{platform.metrics.followers.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{platform.metrics.engagementRate}%</div>
                        <div className="text-xs text-muted-foreground">Engagement Rate</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{platform.metrics.averageReach.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Average Reach</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-lg font-bold">{platform.metrics.lastSync}</div>
                        <div className="text-xs text-muted-foreground">Last Sync</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`auto-sync-${platform.id}`}
                          checked={platform.autoSync}
                          onCheckedChange={(checked) => handleAutoSyncToggle(platform.id, checked)}
                        />
                        <Label htmlFor={`auto-sync-${platform.id}`} className="text-sm">
                          Auto-sync metrics daily
                        </Label>
                      </div>
                      <div className="text-xs text-muted-foreground">Last updated: {platform.metrics.lastSync}</div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Why connect social media?</strong> Your social media metrics help businesses understand your
                reach and engagement, leading to better project matches.
              </p>
              <p>
                <strong>Data privacy:</strong> We only access public metrics and never post on your behalf. You can
                disconnect at any time.
              </p>
              <p>
                <strong>Auto-sync:</strong> Enable auto-sync to keep your metrics up-to-date automatically. Manual sync
                is always available.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
