"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AccessDeniedPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-destructive" />
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">
          You do not have permission to access this page. Your current role is:{" "}
          <span className="font-semibold">{user?.role || "unknown"}</span>
        </p>

        <div className="space-y-3">
          {isAdmin ? (
            <Link href="/admin" className="block">
              <Button className="w-full">Go to Admin Dashboard</Button>
            </Link>
          ) : (
            <Link href="/dashboard" className="block">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          )}
          <Link href="/" className="block">
            <Button variant="outline" className="w-full bg-transparent">
              Return Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
