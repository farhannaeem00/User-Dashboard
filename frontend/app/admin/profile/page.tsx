"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin-layout";
import { RoleGuard } from "@/components/role-guard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { Save } from "lucide-react";

export default function AdminProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: user?.name || "",
    email: user?.email || "",
    timezone: "UTC",
    language: "English",
  });

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

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Admin Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your admin account settings</p>
          </div>

          {/* Success Message */}
          {isSaved && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Profile updated successfully!
            </div>
          )}

          {/* Profile Card */}
          <Card className="p-8 max-w-2xl">
            <div className="space-y-6">
              {/* Profile Info Section */}
              <div>
                <h2 className="text-lg font-bold mb-4">Basic Information</h2>
                
                {/* Full Name */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Full Name</label>
                  <Input
                    value={profileData.full_name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, full_name: e.target.value })
                    }
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Email Address</label>
                  <Input
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Role (Read-only) */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Role</label>
                  <Input
                    value="Administrator"
                    disabled
                    placeholder="Role"
                  />
                </div>
              </div>

              {/* Preferences Section */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-bold mb-4">Preferences</h2>
                
                {/* Timezone */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Timezone</label>
                  <Input
                    value={profileData.timezone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, timezone: e.target.value })
                    }
                    placeholder="Enter timezone"
                  />
                </div>

                {/* Language */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Input
                    value={profileData.language}
                    onChange={(e) =>
                      setProfileData({ ...profileData, language: e.target.value })
                    }
                    placeholder="Enter language"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-3 border-t pt-6">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </AdminLayout>
    </RoleGuard>
  );
}
