"use client";

import React, { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  userName?: string;
  unreadNotifications?: number;
}

export function DashboardLayout({
  children,
  userName = "User",
  unreadNotifications = 0,
}: DashboardLayoutProps) {
  const handleLogout = () => {
    // In a real app, this would handle logout
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          userName={userName}
          unreadNotifications={unreadNotifications}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
