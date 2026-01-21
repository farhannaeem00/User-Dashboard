"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bell, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

interface AdminNavbarProps {
  adminName: string;
}

export function AdminNavbar({ adminName }: AdminNavbarProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="h-16 bg-card border-b border-border px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">Admin Dashboard - {adminName}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Button */}
        <button
          onClick={() => router.push("/admin/notifications")}
          className="relative p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
        </button>

        {/* Profile Button */}
        <button
          onClick={() => router.push("/admin/profile")}
          className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <User className="w-5 h-5" />
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors text-destructive"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
