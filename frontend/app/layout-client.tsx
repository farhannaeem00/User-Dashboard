"use client";

import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/lib/theme-context";
import { AuthProvider } from "@/lib/auth-context";

export function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Analytics />
      </AuthProvider>
    </ThemeProvider>
  );
}
