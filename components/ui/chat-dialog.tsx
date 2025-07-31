"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Smile, User } from "lucide-react"; // Asegúrate de que 'User' esté importado
import { useToast } from "@/components/ui/toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string | null;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName: string;
  recipientAvatar?: string | null;
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string | null;
}

export function ChatDialog({
  open,
  onOpenChange,
  recipientName,
  recipientAvatar,
  currentUserId,
  currentUserName,
  currentUserAvatar,
}: ChatDialogProps) {
  const { showToast } = useToast();

  // Función auxiliar mejorada para normalizar la URL del avatar
  const normalizeAvatarSrc = (avatarUrl?: string | null) => {
    // Define las cadenas de placeholder comunes que deben activar el fallback
    const placeholderStrings = [
      "/placeholder.svg",
      "/placeholder.svg?height=200&width=200", // Ejemplo de tu mock de talent
      "/placeholder.svg?height=40&width=40", // Ejemplo de tu mock de mensajes
      // Agrega cualquier otra ruta de placeholder específica que uses en tu proyecto
    ];

    // Si avatarUrl es nulo/indefinido, está vacío, o es una de las cadenas de placeholder,
    // entonces retorna undefined para activar el AvatarFallback.
    if (
      !avatarUrl ||
      avatarUrl.length === 0 ||
      placeholderStrings.includes(avatarUrl)
    ) {
      return undefined;
    }
    return avatarUrl;
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "other",
      senderName: recipientName,
      senderAvatar: normalizeAvatarSrc(recipientAvatar),
      content:
        "Hi! I'm interested in discussing this project opportunity with you.",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
    },
    {
      id: "2",
      senderId: currentUserId,
      senderName: currentUserName,
      senderAvatar: normalizeAvatarSrc(currentUserAvatar),
      content:
        "Hello! I'd be happy to discuss the details. What would you like to know?",
      timestamp: new Date(Date.now() - 1800000),
      type: "text",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  // CAMBIO: Corregido de HTMLDivLement a HTMLDivElement
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderAvatar: normalizeAvatarSrc(currentUserAvatar),
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: "other",
        senderName: recipientName,
        senderAvatar: normalizeAvatarSrc(recipientAvatar),
        content:
          "Thanks for your message! I'll review this and get back to you soon.",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, response]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md h-[600px] flex flex-col p-0"
        description={`Chat conversation with ${recipientName}`}
      >
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={normalizeAvatarSrc(recipientAvatar)} />
              <AvatarFallback className="bg-gray-200 text-gray-700 flex items-center justify-center">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-lg">{recipientName}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                {isTyping ? "Typing..." : "Active now"}
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.senderId === currentUserId
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={normalizeAvatarSrc(message.senderAvatar)}
                    />
                    <AvatarFallback className="bg-gray-200 text-gray-700 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.senderId === currentUserId
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === currentUserId
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={normalizeAvatarSrc(recipientAvatar)} />
                    <AvatarFallback className="bg-gray-200 text-gray-700 flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button variant="ghost" size="sm">
              <Smile className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage} size="sm">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
