"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, User, MapPin, Users } from "lucide-react";

interface Talent {
  id: string;
  name: string;
  category: string;
  location: string;
  avatar?: string | null;
  bio: string;
  skills: string[];
  followers?: number;
  engagementRate?: number;
}

interface TalentSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTalentSelect: (talent: Talent) => void;
}

// Mock data for available talent (connected talent only)
const availableTalent: Talent[] = [
  {
    id: "talent-2",
    name: "James Wilson",
    category: "Actor",
    location: "New York, NY",
    avatar: null,
    bio: "Versatile actor with experience in film, television, and theater productions.",
    skills: ["Acting", "Voice Over", "Commercial", "Theater"],
    followers: 89000,
    engagementRate: 5.2,
  },
  {
    id: "talent-5",
    name: "Isabella Martinez",
    category: "Dancer",
    location: "Chicago, IL",
    avatar: null,
    bio: "Professional dancer with expertise in contemporary and commercial dance styles.",
    skills: [
      "Contemporary Dance",
      "Commercial Dance",
      "Choreography",
      "Performance",
    ],
    followers: 75000,
    engagementRate: 4.1,
  },
];

export function TalentSelectorDialog({
  open,
  onOpenChange,
  onTalentSelect,
}: TalentSelectorDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTalent = availableTalent.filter(
    (talent) =>
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleTalentSelect = (talent: Talent) => {
    onTalentSelect(talent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Talent to Message</DialogTitle>
          <DialogDescription>
            Choose a talent from your network to start a conversation
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name, category, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Talent List */}
        <ScrollArea className="flex-1">
          <div className="space-y-3">
            {filteredTalent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No talent found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "No talent available in your network"}
                </p>
              </div>
            ) : (
              filteredTalent.map((talent) => (
                <Card
                  key={talent.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleTalentSelect(talent)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={talent.avatar || undefined} />
                        <AvatarFallback className="bg-gray-200 text-gray-700 flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-sm">
                              {talent.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {talent.category}
                            </Badge>
                          </div>
                          {talent.followers && (
                            <div className="text-xs text-muted-foreground">
                              {talent.followers.toLocaleString()} followers
                            </div>
                          )}
                        </div>

                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3 mr-1" />
                          {talent.location}
                        </div>

                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {talent.bio}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {talent.skills.slice(0, 3).map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {talent.skills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{talent.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
