"use client";
import Link from "next/link";
import { ArrowRight, Zap, Users, Target, CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: t("features.ai"),
      description:
        "Advanced AI algorithms match talent with projects based on skills, style, and compatibility",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: t("features.portfolio"),
      description:
        "Comprehensive profiles showcasing work, social metrics, and professional achievements",
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: t("features.collaboration"),
      description:
        "Streamlined communication and project management tools for efficient collaboration",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Talent" },
    { number: "500+", label: "Businesses" },
    { number: "95%", label: "Match Success" },
    { number: "24/7", label: "AI Matching" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/20 dark:via-background dark:to-pink-950/20">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t("hero.title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/register">
                  {t("hero.cta")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 bg-transparent"
              >
                <Link href="/login">{t("nav.login")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Revolutionizing Talent Discovery
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform connects creative professionals with
              businesses, making talent discovery more efficient and effective
              than ever before.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How KRYSTAL Works
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">For Talent</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Create Your Profile</h4>
                    <p className="text-muted-foreground">
                      Build a comprehensive portfolio showcasing your work and
                      skills
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Connect Social Media</h4>
                    <p className="text-muted-foreground">
                      Sync your social accounts to showcase your reach and
                      engagement
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Get Matched</h4>
                    <p className="text-muted-foreground">
                      Our AI finds projects that perfectly match your skills and
                      style
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">For Businesses</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Post Your Project</h4>
                    <p className="text-muted-foreground">
                      Describe your campaign needs and target audience
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">AI-Powered Matching</h4>
                    <p className="text-muted-foreground">
                      Get ranked suggestions based on compatibility scores
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Connect & Collaborate</h4>
                    <p className="text-muted-foreground">
                      Work directly with talent through our platform
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Creative Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of creative professionals and businesses already
            using KRYSTAL to discover amazing opportunities and talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8"
            >
              <Link href="/register">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <span className="font-bold text-xl">KRYSTAL</span>
              </div>
              <p className="text-muted-foreground">
                Revolutionizing talent discovery through AI-powered matching.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Talent</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/register" className="hover:text-foreground">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Portfolio Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Success Stories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Businesses</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/register" className="hover:text-foreground">
                    Post Projects
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 KRYSTAL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
