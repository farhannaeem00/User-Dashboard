"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect based on role
  React.useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      // Redirect will happen via useEffect
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Productivity Dashboard</h1>
          <p className="text-muted-foreground">
            Login to access your personalized dashboard
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 border-2">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !email || !password}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Card>

        {/* Demo Credentials Section */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            Demo Credentials:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("user@example.com")}
              className="text-xs"
            >
              User Login
              <br />
              <span className="text-[10px] text-muted-foreground">user@example.com</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("admin@example.com")}
              className="text-xs"
            >
              Admin Login
              <br />
              <span className="text-[10px] text-muted-foreground">admin@example.com</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("jane@example.com")}
              className="text-xs"
            >
              User (Jane)
              <br />
              <span className="text-[10px] text-muted-foreground">jane@example.com</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("bob@example.com")}
              className="text-xs"
            >
              User (Bob)
              <br />
              <span className="text-[10px] text-muted-foreground">bob@example.com</span>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Password: any text (min 6 characters)
          </p>
        </div>
      </div>
    </div>
  );
}
