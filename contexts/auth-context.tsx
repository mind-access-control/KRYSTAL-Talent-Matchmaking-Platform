"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  user_type: "talent" | "business" | "admin";
  company_name: string | null;
  company_logo_url: string | null;
  bio: string | null;
  skills: string[] | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  type: "talent" | "business" | "admin";
  avatar: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, metadata: any) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

// Demo users data
const DEMO_USERS = [
  {
    id: "demo-admin-1",
    email: "admin@krystal.com",
    password: "admin123",
    name: "Admin User",
    type: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
    profile: {
      id: "demo-admin-1",
      email: "admin@krystal.com",
      full_name: "Admin User",
      avatar_url: "/placeholder.svg?height=40&width=40",
      user_type: "admin" as const,
      company_name: null,
      company_logo_url: null,
      bio: "System Administrator",
      skills: null,
      location: "New York, NY",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "demo-business-1",
    email: "business@example.com",
    password: "business123",
    name: "Sarah Johnson",
    type: "business" as const,
    avatar: "/placeholder.svg?height=40&width=40",
    profile: {
      id: "demo-business-1",
      email: "business@example.com",
      full_name: "Sarah Johnson",
      avatar_url: "/placeholder.svg?height=40&width=40",
      user_type: "business" as const,
      company_name: "Creative Studios Inc",
      company_logo_url: "/placeholder.svg?height=60&width=60",
      bio: "Creative Director at Creative Studios Inc. Passionate about finding the perfect talent for our campaigns.",
      skills: null,
      location: "Los Angeles, CA",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
  {
    id: "demo-talent-1",
    email: "talent@example.com",
    password: "talent123",
    name: "Emma Rodriguez",
    type: "talent" as const,
    avatar: "/placeholder.svg?height=40&width=40",
    profile: {
      id: "demo-talent-1",
      email: "talent@example.com",
      full_name: "Emma Rodriguez",
      avatar_url: "/placeholder.svg?height=40&width=40",
      user_type: "talent" as const,
      company_name: null,
      company_logo_url: null,
      bio: "Professional model and content creator with 5+ years of experience in fashion and lifestyle photography.",
      skills: [
        "Fashion Modeling",
        "Content Creation",
        "Photography",
        "Social Media",
      ],
      location: "Miami, FL",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    },
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("demo-user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const demoUser = DEMO_USERS.find((u) => u.id === userData.id);
      if (demoUser) {
        setUser({
          id: demoUser.id,
          email: demoUser.email,
          name: demoUser.name,
          type: demoUser.type,
          avatar: demoUser.avatar,
        });
        setProfile(demoUser.profile);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const demoUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!demoUser) {
      throw new Error("Invalid credentials. Try one of the demo accounts.");
    }

    const authUser = {
      id: demoUser.id,
      email: demoUser.email,
      name: demoUser.name,
      type: demoUser.type,
      avatar: demoUser.avatar,
    };

    setUser(authUser);
    setProfile(demoUser.profile);
    localStorage.setItem("demo-user", JSON.stringify(authUser));
  };

  const register = async (email: string, password: string, metadata: any) => {
    // For demo purposes, create a new user
    const newId = `demo-${metadata.user_type}-${Date.now()}`;
    const newUser = {
      id: newId,
      email,
      name: metadata.full_name,
      type: metadata.user_type,
      avatar: `/placeholder.svg?height=40&width=40&query=${metadata.user_type}`,
    };

    const newProfile: Profile = {
      id: newId,
      email,
      full_name: metadata.full_name,
      avatar_url: `/placeholder.svg?height=40&width=40&query=${metadata.user_type}`,
      user_type: metadata.user_type,
      company_name: metadata.company_name || null,
      company_logo_url: null,
      bio: null,
      skills: null,
      location: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setUser(newUser);
    setProfile(newProfile);
    localStorage.setItem("demo-user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("demo-user");
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return { error: "No user logged in" };

    const updatedProfile = {
      ...profile,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    setProfile(updatedProfile);
    return { error: null };
  };

  const value = {
    user,
    profile,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
