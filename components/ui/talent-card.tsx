import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, TrendingUp } from "lucide-react"

interface TalentCardProps {
  talent: {
    id: string
    name: string
    category: string
    location: string
    avatar: string
    bio: string
    matchScore?: number
    followers?: number
    engagementRate?: number
    skills: string[]
  }
  showMatchScore?: boolean
  viewUrl?: string
}

export function TalentCard({ talent, showMatchScore = false, viewUrl }: TalentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <img
            src={talent.avatar || "/placeholder.svg"}
            alt={talent.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{talent.name}</h3>
            <p className="text-sm text-muted-foreground">{talent.category}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {talent.location}
            </div>
          </div>
          {showMatchScore && talent.matchScore && (
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{talent.matchScore}%</div>
              <div className="text-xs text-muted-foreground">Match</div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{talent.bio}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {talent.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {talent.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{talent.skills.length - 3}
            </Badge>
          )}
        </div>

        {(talent.followers || talent.engagementRate) && (
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            {talent.followers && (
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {talent.followers >= 1000 ? `${(talent.followers / 1000).toFixed(1)}K` : talent.followers}
              </div>
            )}
            {talent.engagementRate && (
              <div className="flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {talent.engagementRate}%
              </div>
            )}
          </div>
        )}

        <Button asChild className="w-full">
          <Link href={viewUrl || `/business/talent/${talent.id}`}>View Full Profile</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
