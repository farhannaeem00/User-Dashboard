"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminLayout } from "@/components/admin-layout";
import { RoleGuard } from "@/components/role-guard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [appearance, setAppearance] = useState(theme);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const handleSaveSettings = () => {
    setTheme(appearance as "light" | "dark");
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Admin Settings</h1>
            <p className="text-muted-foreground mt-2">Configure system and admin preferences</p>
          </div>

          {/* Success Message */}
          {isSaved && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Settings saved successfully!
            </div>
          )}

          {/* Appearance Settings */}
          <Card className="p-6 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Theme</label>
                <Select value={appearance} onValueChange={setAppearance}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-muted-foreground">
                Choose your preferred theme for the admin panel
              </p>
            </div>
          </Card>

          {/* System Settings */}
          <Card className="p-6 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">System</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable user access
                  </p>
                </div>
                <div>
                  <Button variant="outline" disabled>
                    Disable
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive admin alerts via email
                  </p>
                </div>
                <div>
                  <Button variant="outline" disabled>
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6 max-w-2xl">
            <h2 className="text-lg font-bold mb-4">Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-muted-foreground">
                    Update your admin password
                  </p>
                </div>
                <div>
                  <Button variant="outline">Change</Button>
                </div>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Enable 2FA for additional security
                  </p>
                </div>
                <div>
                  <Button variant="outline" disabled>
                    Enable
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Active Sessions</p>
                  <p className="text-sm text-muted-foreground">
                    Manage your active sessions
                  </p>
                </div>
                <div>
                  <Button variant="outline">Manage</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="max-w-2xl flex justify-end">
            <Button onClick={handleSaveSettings} className="gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </AdminLayout>
    </RoleGuard>
  );
}
