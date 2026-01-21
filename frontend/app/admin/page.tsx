"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminLayout } from "@/components/admin-layout";
import { RoleGuard } from "@/components/role-guard";
import { Card } from "@/components/ui/card";
import { mockAdminStats, mockDashboardUsers, mockPayments } from "@/lib/mock-data";
import { Users, CreditCard, TrendingUp, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Redirect if not logged in or not admin
  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null;
  }
  const completedPayments = mockPayments.filter((p) => p.status === "Completed");
  const totalRevenue = completedPayments.reduce((sum, p) => sum + (p.payment_type === "Income" ? p.amount : -p.amount), 0);

  const stats = [
    {
      label: "Total Users",
      value: mockAdminStats.total_users,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Users",
      value: mockAdminStats.active_users,
      icon: Activity,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Transactions",
      value: mockAdminStats.total_transactions,
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">System overview and monitoring</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recent Users */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Users</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDashboardUsers.slice(0, 5).map((user) => (
                    <tr key={user.user_id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{user.full_name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-muted">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </AdminLayout>
    </RoleGuard>
  );
}
