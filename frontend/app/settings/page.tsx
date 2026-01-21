"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings as SettingsType } from "@/lib/types";
import { mockSettings, mockNotifications } from "@/lib/mock-data";
import { useTheme } from "@/lib/theme-context";
import { Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [settings, setSettings] = useState<SettingsType>(mockSettings);
  const [isSaved, setIsSaved] = useState(false);
  const { setTheme } = useTheme();
  const unreadNotifications = mockNotifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role === "admin") {
      router.push("/admin");
    }
  }, [user, router]);

  if (!user || user.role === "admin") {
    return null;
  }

  const handleSave = () => {
    // Apply theme change
    setTheme(settings.theme as "light" | "dark");
    
    // Show saved message
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <DashboardLayout unreadNotifications={unreadNotifications}>
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl font-bold">Settings</h1>

        {/* Theme Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <Select
                value={settings.theme}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    theme: value as "light" | "dark",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Choose your preferred color scheme
              </p>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="font-medium">Notification Alerts</p>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for important updates
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.notifications_enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications_enabled: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-gray-300"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              You can enable or disable all notifications at once
            </p>
          </div>
        </Card>

        {/* Language Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Language</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Language
              </label>
              <Select defaultValue="English" disabled>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Choose the language for the dashboard
              </p>
            </div>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Privacy & Security</h2>

          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground mb-2">
                Change your account password
              </p>
              <Button variant="outline" size="sm" disabled>
                Change Password (Coming Soon)
              </Button>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground mb-2">
                Add an extra layer of security to your account
              </p>
              <Button variant="outline" size="sm" disabled>
                Enable 2FA (Coming Soon)
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-destructive/30">
          <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>

          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Delete Account</p>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data
              </p>
              <Button variant="destructive" size="sm" disabled>
                Delete Account (Coming Soon)
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex gap-2">
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
          {isSaved && (
            <p className="text-sm text-green-600 flex items-center">
              ✓ Settings saved successfully
            </p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
