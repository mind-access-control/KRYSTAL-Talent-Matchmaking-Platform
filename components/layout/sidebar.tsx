"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
} from "lucide-react";

const businessNavItems = [
  {
    title: "Dashboard",
    href: "/business/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/business/projects",
    icon: Briefcase,
  },
  {
    title: "Network",
    href: "/business/network",
    icon: Users,
  },
  {
    title: "AI Preferences",
    href: "/business/ai-preferences",
    icon: Brain,
  },
  {
    title: "Messages",
    href: "/business/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/business/settings",
    icon: Settings,
  },
];

const talentNavItems = [
  {
    title: "Dashboard",
    href: "/talent/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/talent/profile/edit",
    icon: User,
  },
  {
    title: "Portfolio",
    href: "/talent/portfolio",
    icon: ImageIcon,
  },
  {
    title: "Network",
    href: "/talent/network",
    icon: Users,
  },
  {
    title: "Favorites",
    href: "/talent/favorites",
    icon: Heart,
  },
  {
    title: "Social Media",
    href: "/talent/social-integrations",
    icon: Share2,
  },
  {
    title: "Messages",
    href: "/talent/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/talent/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLanguage();

  const navItems =
    user?.type === "business" ? businessNavItems : talentNavItems;

  return (
    <div className="pb-12 w-64 h-screen">
      <div className="space-y-4 py-4 h-full">
        <div className="px-3 py-2 h-full flex flex-col">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            KRYSTAL
          </h2>
          <div className="space-y-1 flex-1">
            <ScrollArea className="h-full px-1">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-muted font-medium"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {t(`nav.${item.title.toLowerCase()}`)}
                  </Link>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
