"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Bell, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

interface NavbarProps {
  userName: string;
  unreadNotifications: number;
}

export function Navbar({ userName, unreadNotifications }: NavbarProps) {
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
        <h2 className="text-xl font-semibold">Welcome, {userName}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Button */}
        <button
          onClick={() => router.push("/notifications")}
          className="relative p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifications > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full" />
          )}
        </button>

        {/* Profile Button */}
        <button
          onClick={() => router.push("/profile")}
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
