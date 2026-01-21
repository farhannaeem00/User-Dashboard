"use client";

import React from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminNavbar } from "./admin-navbar";
import { useAuth } from "@/lib/auth-context";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar adminName={user?.name || "Admin"} />
      <AdminSidebar />
      <div className="ml-64 min-h-screen">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
