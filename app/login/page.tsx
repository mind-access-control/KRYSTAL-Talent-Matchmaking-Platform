"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/components/ui/toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accountType, setAccountType] = useState<"talent" | "business">("talent")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const { t } = useLanguage()
  const { showToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await login(email, password, accountType)
      showToast("Login successful!", "success")
      router.push(`/${accountType}/dashboard`)
    } catch (error) {
      showToast("Invalid credentials. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{t("auth.login")}</CardTitle>
              <CardDescription>Welcome back to KRYSTAL</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-3 bg-muted rounded-lg text-sm">
                <p className="font-medium mb-2">Demo Accounts:</p>
                <p>Talent: talent@demo.com / demo123</p>
                <p>Business: business@demo.com / demo123</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("auth.email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountType">{t("auth.accountType")}</Label>
                  <Select value={accountType} onValueChange={(value: "talent" | "business") => setAccountType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="talent">{t("auth.talent")}</SelectItem>
                      <SelectItem value="business">{t("auth.business")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t("common.loading") : t("auth.login")}
                </Button>
              </form>

              <div className="mt-6 space-y-2 text-center">
                <Link href="#" className="text-sm text-primary hover:underline block">
                  {t("auth.forgotPassword")}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {t("auth.noAccount")}{" "}
                  <Link href="/register" className="text-primary hover:underline">
                    {t("auth.register")}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
