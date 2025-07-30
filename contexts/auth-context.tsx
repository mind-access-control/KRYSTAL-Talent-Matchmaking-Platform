"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  type: "talent" | "business" | "admin"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: "talent" | "business") => Promise<void>
  register: (email: string, password: string, type: "talent" | "business") => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo
const mockUsers = [
  {
    id: "1",
    email: "talent@demo.com",
    password: "demo123",
    name: "Sofia Rodriguez",
    type: "talent" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    email: "business@demo.com",
    password: "demo123",
    name: "Creative Agency",
    type: "business" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    email: "admin@demo.com",
    password: "demo123",
    name: "Admin User",
    type: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("krystal_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, type: "talent" | "business") => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password && u.type === type)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("krystal_user", JSON.stringify(userWithoutPassword))
    } else {
      throw new Error("Invalid credentials")
    }

    setLoading(false)
  }

  const register = async (email: string, password: string, type: "talent" | "business") => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = {
      id: Date.now().toString(),
      email,
      name: type === "talent" ? "New Talent" : "New Business",
      type,
      avatar: `/placeholder.svg?height=40&width=40&query=${type}`,
    }

    setUser(newUser)
    localStorage.setItem("krystal_user", JSON.stringify(newUser))
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("krystal_user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
