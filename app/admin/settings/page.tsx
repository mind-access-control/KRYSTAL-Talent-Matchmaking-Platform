"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  Shield,
  Database,
  Globe,
  Mail,
  Bell,
  Key,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    emailNotifications: true,
    maxFileSize: "10",
    sessionTimeout: "30",
    language: "en",
    timezone: "UTC",
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorRequired: true,
    passwordMinLength: "8",
    sessionMaxAge: "24",
    rateLimitEnabled: true,
    ipWhitelist: "",
  });

  // AI settings state
  const [aiSettings, setAiSettings] = useState({
    aiEnabled: true,
    modelProvider: "openai",
    maxTokens: "4000",
    temperature: "0.7",
    embeddingModel: "text-embedding-ada-002",
  });

  const handleSaveSettings = async (section: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    showToast(`${section} settings saved successfully`, "success");
    setIsLoading(false);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    showToast("Database connection test successful", "success");
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure platform settings and system preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                General system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable platform access
                  </p>
                </div>
                <Switch
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setSystemSettings({
                      ...systemSettings,
                      maintenanceMode: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable detailed logging and debugging
                  </p>
                </div>
                <Switch
                  checked={systemSettings.debugMode}
                  onCheckedChange={(checked) =>
                    setSystemSettings({ ...systemSettings, debugMode: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically backup database daily
                  </p>
                </div>
                <Switch
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) =>
                    setSystemSettings({
                      ...systemSettings,
                      autoBackup: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Max File Size (MB)</Label>
                <Input
                  type="number"
                  value={systemSettings.maxFileSize}
                  onChange={(e) =>
                    setSystemSettings({
                      ...systemSettings,
                      maxFileSize: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={systemSettings.sessionTimeout}
                  onChange={(e) =>
                    setSystemSettings({
                      ...systemSettings,
                      sessionTimeout: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Default Language</Label>
                <Select
                  value={systemSettings.language}
                  onValueChange={(value) =>
                    setSystemSettings({ ...systemSettings, language: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => handleSaveSettings("System")}
                disabled={isLoading}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Save System Settings
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all users
                  </p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorRequired}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      twoFactorRequired: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Rate Limiting</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable API rate limiting
                  </p>
                </div>
                <Switch
                  checked={securitySettings.rateLimitEnabled}
                  onCheckedChange={(checked) =>
                    setSecuritySettings({
                      ...securitySettings,
                      rateLimitEnabled: checked,
                    })
                  }
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Minimum Password Length</Label>
                <Input
                  type="number"
                  value={securitySettings.passwordMinLength}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      passwordMinLength: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Session Max Age (hours)</Label>
                <Input
                  type="number"
                  value={securitySettings.sessionMaxAge}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      sessionMaxAge: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>IP Whitelist (comma-separated)</Label>
                <Input
                  placeholder="192.168.1.1, 10.0.0.1"
                  value={securitySettings.ipWhitelist}
                  onChange={(e) =>
                    setSecuritySettings({
                      ...securitySettings,
                      ipWhitelist: e.target.value,
                    })
                  }
                />
              </div>

              <Button
                onClick={() => handleSaveSettings("Security")}
                disabled={isLoading}
                className="w-full"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              AI Configuration
            </CardTitle>
            <CardDescription>
              Configure AI models and processing settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>AI Processing Enabled</Label>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered features
                </p>
              </div>
              <Switch
                checked={aiSettings.aiEnabled}
                onCheckedChange={(checked) =>
                  setAiSettings({ ...aiSettings, aiEnabled: checked })
                }
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Model Provider</Label>
                <Select
                  value={aiSettings.modelProvider}
                  onValueChange={(value) =>
                    setAiSettings({ ...aiSettings, modelProvider: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="anthropic">Anthropic</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Max Tokens</Label>
                <Input
                  type="number"
                  value={aiSettings.maxTokens}
                  onChange={(e) =>
                    setAiSettings({ ...aiSettings, maxTokens: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Temperature</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={aiSettings.temperature}
                  onChange={(e) =>
                    setAiSettings({
                      ...aiSettings,
                      temperature: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Embedding Model</Label>
                <Select
                  value={aiSettings.embeddingModel}
                  onValueChange={(value) =>
                    setAiSettings({ ...aiSettings, embeddingModel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-embedding-ada-002">
                      text-embedding-ada-002
                    </SelectItem>
                    <SelectItem value="text-embedding-3-small">
                      text-embedding-3-small
                    </SelectItem>
                    <SelectItem value="text-embedding-3-large">
                      text-embedding-3-large
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={() => handleSaveSettings("AI")}
              disabled={isLoading}
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Save AI Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>Current system health and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Database</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">AI Services</p>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="font-medium">Storage</p>
                  <p className="text-sm text-muted-foreground">75% Used</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Button
                variant="outline"
                onClick={handleTestConnection}
                disabled={isLoading}
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Test Database Connection
              </Button>
              <Button variant="outline">
                <Database className="mr-2 h-4 w-4" />
                Run System Backup
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
