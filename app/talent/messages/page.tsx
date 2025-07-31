"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatDialog } from "@/components/ui/chat-dialog";
import { TalentSelectorDialog } from "@/components/ui/talent-selector-dialog";
import { Search, MessageSquare, Plus, Clock, User } from "lucide-react";

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    type: "business" | "talent";
    company?: string;
  };
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
  };
  projectTitle?: string;
  unreadCount: number;
}

// Mock data for business conversations
const mockConversations: Conversation[] = [
  {
    id: "1",
    participant: {
      id: "talent-1",
      name: "Emma Rodriguez",
      avatar: null,
      type: "talent",
    },
    lastMessage: {
      content:
        "I'm very interested in this project! When can we schedule a call?",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      isRead: false,
      senderId: "talent-1",
    },
    projectTitle: "Fashion Photography Campaign",
    unreadCount: 1,
  },
  {
    id: "2",
    participant: {
      id: "talent-2",
      name: "James Wilson",
      avatar: null,
      type: "talent",
    },
    lastMessage: {
      content:
        "Thank you for considering me for this role. I've sent over my portfolio.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
      isRead: true,
      senderId: "talent-2",
    },
    projectTitle: "Brand Ambassador Campaign",
    unreadCount: 0,
  },
  {
    id: "3",
    participant: {
      id: "talent-3",
      name: "Sophia Kim",
      avatar: null,
      type: "talent",
    },
    lastMessage: {
      content:
        "The shoot went great! Looking forward to working together again.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      senderId: "talent-3",
    },
    projectTitle: "Product Launch Event",
    unreadCount: 0,
  },
];

export default function BusinessMessagesPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTalentSelectorOpen, setIsTalentSelectorOpen] = useState(false);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);

    // Mark as read
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversation.id
          ? {
              ...conv,
              unreadCount: 0,
              lastMessage: { ...conv.lastMessage, isRead: true },
            }
          : conv
      )
    );
  };

  const totalUnreadCount = conversations.reduce(
    (sum, conv) => sum + conv.unreadCount,
    0
  );

  const handleNewMessage = () => {
    setIsTalentSelectorOpen(true);
  };

  const handleTalentSelect = (talent: any) => {
    // Create a new conversation with the selected talent
    const newConversation: Conversation = {
      id: `new-${Date.now()}`,
      participant: {
        id: talent.id,
        name: talent.name,
        avatar: talent.avatar || null,
        type: "talent",
      },
      lastMessage: {
        content: "New conversation started",
        timestamp: new Date(),
        isRead: true,
        senderId: user?.id || "current-user",
      },
      unreadCount: 0,
    };

    // Add to conversations list
    setConversations((prev) => [newConversation, ...prev]);

    // Open chat with the new conversation
    setSelectedConversation(newConversation);
    setIsChatOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserAvatar user={user} size="md" />
            <div>
              <h1 className="text-3xl font-bold">{t("messages.title")}</h1>
              <p className="text-muted-foreground">{t("messages.subtitle")}</p>
            </div>
            {totalUnreadCount > 0 && (
              <Badge variant="destructive">
                {totalUnreadCount} {t("messages.unread")}
              </Badge>
            )}
          </div>
          <Button onClick={handleNewMessage}>
            <Plus className="h-4 w-4 mr-2" />
            {t("messages.newMessage")}
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t("messages.searchConversations")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Conversations List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              {t("messages.conversations")} ({filteredConversations.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {t("messages.noConversations")}
                  </h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? t("messages.tryAdjusting")
                      : t("messages.startConnecting")}
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleConversationClick(conversation)}
                    >
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={conversation.participant.avatar || undefined}
                          />
                          <AvatarFallback className="bg-gray-200 text-gray-700 flex items-center justify-center">
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-sm">
                                {conversation.participant.name}
                              </h3>
                              <Badge variant="outline" className="text-xs">
                                {t("messages.talent")}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTimestamp(
                                  conversation.lastMessage.timestamp
                                )}
                              </span>
                              {conversation.unreadCount > 0 && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {conversation.projectTitle && (
                            <div className="mb-1">
                              <Badge variant="secondary" className="text-xs">
                                Re: {conversation.projectTitle}
                              </Badge>
                            </div>
                          )}

                          <p
                            className={`text-sm truncate ${
                              !conversation.lastMessage.isRead &&
                              conversation.lastMessage.senderId !== user?.id
                                ? "font-semibold text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {conversation.lastMessage.senderId === user?.id &&
                              "You: "}
                            {conversation.lastMessage.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Dialog */}
        {selectedConversation && (
          <ChatDialog
            open={isChatOpen}
            onOpenChange={setIsChatOpen}
            recipientName={selectedConversation.participant.name}
            recipientAvatar={selectedConversation.participant.avatar}
            currentUserId={user?.id || "current-user"}
            currentUserName={user?.name || user?.email || "You"}
            currentUserAvatar={user?.avatar}
          />
        )}

        {/* Talent Selector Dialog */}
        <TalentSelectorDialog
          open={isTalentSelectorOpen}
          onOpenChange={setIsTalentSelectorOpen}
          onTalentSelect={handleTalentSelect}
        />
      </div>
    </DashboardLayout>
  );
}
