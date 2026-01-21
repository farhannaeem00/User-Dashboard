"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProjects, mockTasks, mockNotes, mockPayments, mockNotifications } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { TrendingUp, Clock, FileText, DollarSign, CheckCircle2, Lock } from "lucide-react";

const switchRole = (role) => {
  // Implement role switching logic here
};

export default function HomePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Redirect to login if not authenticated or is admin
  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role === "admin") {
      router.push("/admin");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const completedProjects = mockProjects.filter((p) => p.status === "Completed").length;
  const completedTasks = mockTasks.filter((t) => t.status === "Done").length;
  const unreadNotifications = mockNotifications.filter((n) => !n.is_read).length;

  const totalIncome = mockPayments
    .filter((p) => p.payment_type === "Income" && p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalExpenses = mockPayments
    .filter((p) => p.payment_type === "Expense" && p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const recentTasks = mockTasks.slice(0, 3);
  const recentProjects = mockProjects.slice(0, 3);

  return (
    <DashboardLayout unreadNotifications={unreadNotifications}>
      <div className="space-y-6">
        {/* Welcome Section with Role Switcher */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">
              Here's a quick overview of your productivity and activities.
            </p>
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Current role: <span className="font-semibold">{user.role}</span></span>
              {user.role === "user" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => switchRole("admin")}
                  className="gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Switch to Admin
                </Button>
              )}
              {user.role === "admin" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => switchRole("user")}
                >
                  Switch to User
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Total Projects */}
          <Card
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/projects")}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Projects
              </p>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{mockProjects.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {completedProjects} completed
            </p>
          </Card>

          {/* Pending Tasks */}
          <Card
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/tasks")}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Pending Tasks
              </p>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">
              {mockTasks.filter((t) => t.status !== "Done").length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {completedTasks} completed
            </p>
          </Card>

          {/* Total Notes */}
          <Card
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/notes")}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Notes
              </p>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-bold">{mockNotes.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              All your notes
            </p>
          </Card>

          {/* Total Income */}
          <Card
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/payments")}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total Income
              </p>
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">
              ${totalIncome.toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Completed transactions
            </p>
          </Card>

          {/* Net Balance */}
          <Card
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push("/payments")}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                Net Balance
              </p>
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className={`text-3xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${(totalIncome - totalExpenses).toFixed(0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Income - Expenses
            </p>
          </Card>
        </div>

        {/* Recent Projects & Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Projects */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Projects</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/projects")}
              >
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentProjects.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No projects yet
                </p>
              ) : (
                recentProjects.map((project) => (
                  <div
                    key={project.project_id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted"
                  >
                    <div className="min-w-0">
                      <p className="font-medium line-clamp-1">
                        {project.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(project.start_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      className={
                        project.status === "Active"
                          ? "bg-blue-100 text-blue-800"
                          : project.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Recent Tasks */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Tasks</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/tasks")}
              >
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No tasks yet
                </p>
              ) : (
                recentTasks.map((task) => (
                  <div
                    key={task.task_id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted"
                  >
                    <div className="min-w-0">
                      <p className="font-medium line-clamp-1">
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {task.due_date
                          ? new Date(task.due_date).toLocaleDateString()
                          : "No due date"}
                      </p>
                    </div>
                    <Badge
                      className={
                        task.status === "Done"
                          ? "bg-green-100 text-green-800"
                          : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/projects")}
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/tasks")}
            >
              View Tasks
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/notes")}
            >
              View Notes
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/payments")}
            >
              View Payments
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
