"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  LogOut,
  User,
  Settings as SettingsIcon,
} from "lucide-react";

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Users, label: "Users Management", href: "/admin/users" },
  { icon: CreditCard, label: "Payments Overview", href: "/admin/payments" },
  { icon: User, label: "Profile", href: "/admin/profile" },
  { icon: SettingsIcon, label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-background border-r flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b">
        <div className="font-bold text-lg">Admin Panel</div>
        <div className="text-xs text-muted-foreground mt-1">System Control</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {adminMenuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-3"
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          onClick={logout}
          variant="outline"
          className="w-full justify-start gap-3 bg-transparent"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}
