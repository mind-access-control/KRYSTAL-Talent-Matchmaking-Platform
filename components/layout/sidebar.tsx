"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import {
  LayoutDashboard,
  User,
  Briefcase,
  MessageSquare,
  Settings,
  Brain,
  Heart,
  ImageIcon,
  Share2,
  Users,
  Shield,
  Database,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

const businessNavItems = [
  {
    title: "Dashboard",
    href: "/business/dashboard",
    icon: LayoutDashboard,
    badge: "Live",
    color: "from-blue-500 to-purple-600",
  },
  {
    title: "Projects",
    href: "/business/projects",
    icon: Briefcase,
    badge: "3 Active",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Network",
    href: "/business/network",
    icon: Users,
    badge: "47",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "AI Preferences",
    href: "/business/ai-preferences",
    icon: Brain,
    badge: "AI",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Messages",
    href: "/business/messages",
    icon: MessageSquare,
    badge: "12",
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "Settings",
    href: "/business/settings",
    icon: Settings,
    color: "from-gray-500 to-gray-600",
  },
];

const talentNavItems = [
  {
    title: "Dashboard",
    href: "/talent/dashboard",
    icon: LayoutDashboard,
    badge: "Live",
    color: "from-blue-500 to-purple-600",
  },
  {
    title: "Profile",
    href: "/talent/profile/edit",
    icon: User,
    badge: "95%",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Portfolio",
    href: "/talent/portfolio",
    icon: ImageIcon,
    badge: "24 Items",
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Network",
    href: "/talent/network",
    icon: Users,
    badge: "156",
    color: "from-orange-500 to-red-600",
  },
  {
    title: "Favorites",
    href: "/talent/favorites",
    icon: Heart,
    badge: "8",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Social Media",
    href: "/talent/social-integrations",
    icon: Share2,
    badge: "Connected",
    color: "from-indigo-500 to-blue-600",
  },
  {
    title: "Messages",
    href: "/talent/messages",
    icon: MessageSquare,
    badge: "5",
    color: "from-teal-500 to-cyan-600",
  },
  {
    title: "Settings",
    href: "/talent/settings",
    icon: Settings,
    color: "from-gray-500 to-gray-600",
  },
];

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    badge: "Admin",
    color: "from-red-500 to-pink-600",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    badge: "1.2K",
    color: "from-blue-500 to-purple-600",
  },
  {
    title: "AI Monitor",
    href: "/admin/ai-monitor",
    icon: Database,
    badge: "Live",
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    color: "from-gray-500 to-gray-600",
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLanguage();

  const getNavItems = () => {
    switch (user?.type) {
      case "admin":
        return adminNavItems;
      case "business":
        return businessNavItems;
      case "talent":
        return talentNavItems;
      default:
        return talentNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div
      className={cn(
        "relative h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -right-3 top-6 h-6 w-6 rounded-full border-2 border-white bg-white shadow-lg hover:bg-gray-50 z-10",
          isCollapsed ? "rotate-180" : ""
        )}
      >
        <ChevronLeft className="h-3 w-3" />
      </Button>

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div
            className={cn(
              "flex items-center space-x-3",
              isCollapsed ? "justify-center" : "justify-start"
            )}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  KRYSTAL
                </h2>
                <p className="text-xs text-gray-500">AI Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "group relative flex items-center space-x-3 rounded-xl p-3 transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "hover:bg-gray-100 hover:shadow-sm"
                    )}
                  >
                    {/* Icon with gradient background */}
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-white/20 backdrop-blur-sm"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                      )}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>

                    {/* Text and Badge */}
                    {!isCollapsed && (
                      <div className="flex-1 flex items-center justify-between">
                        <span
                          className={cn(
                            "font-medium transition-colors",
                            isActive
                              ? "text-white"
                              : "text-gray-600 group-hover:text-gray-800"
                          )}
                        >
                          {item.title === "AI Preferences"
                            ? t("nav.aiPreferences")
                            : item.title === "AI Monitor"
                            ? t("nav.aiMonitor")
                            : item.title === "Social Media"
                            ? t("nav.socialMedia")
                            : t(`nav.${item.title.toLowerCase()}`)}
                        </span>

                        {item.badge && (
                          <Badge
                            variant={isActive ? "secondary" : "outline"}
                            className={cn(
                              "text-xs font-medium",
                              isActive
                                ? "bg-white/20 text-white border-white/30"
                                : "bg-gray-100 text-gray-600 border-gray-200"
                            )}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Active indicator */}
                    {isActive && !isCollapsed && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full shadow-sm" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">
                  AI Status
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600">System Online</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
