"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { useToast } from "@/components/ui/toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      showToast("Login successful!", "success");

      // Redirect based on email to determine user type
      if (email.includes("admin")) {
        router.push("/admin/dashboard");
      } else if (email.includes("business") || email.includes("marketing")) {
        router.push("/business/dashboard");
      } else {
        router.push("/talent/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      showToast(
        error.message || "Invalid credentials. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

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
              <div className="mb-6 p-4 bg-muted rounded-lg text-sm">
                <p className="font-medium mb-3">
                  🎭 Demo Accounts - Click to use:
                </p>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() =>
                      handleDemoLogin("admin@krystal.com", "admin123")
                    }
                  >
                    👑 Admin: admin@krystal.com / admin123
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() =>
                      handleDemoLogin("business@example.com", "business123")
                    }
                  >
                    🏢 Business: business@example.com / business123
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs bg-transparent"
                    onClick={() =>
                      handleDemoLogin("talent@example.com", "talent123")
                    }
                  >
                    ⭐ Talent: talent@example.com / talent123
                  </Button>
                </div>
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
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t("auth.password")}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      disabled={loading}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("common.loading")}
                    </>
                  ) : (
                    t("auth.login")
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-2 text-center">
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline block"
                >
                  {t("auth.forgotPassword")}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {t("auth.noAccount")}{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    {t("auth.register")}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
