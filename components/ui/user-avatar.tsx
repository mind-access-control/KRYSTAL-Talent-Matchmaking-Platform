"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserAvatarProps {
  user?: {
    name?: string;
    avatar?: string | null;
  } | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserAvatar({
  user,
  size = "md",
  className = "",
}: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={user?.avatar || undefined} />
      <AvatarFallback className="bg-gray-200 text-gray-700 flex items-center justify-center">
        {user?.name ? (
          <span className={`font-semibold ${textSizes[size]}`}>
            {getInitials(user.name)}
          </span>
        ) : (
          <User className={iconSizes[size]} />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
