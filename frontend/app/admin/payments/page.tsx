"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminLayout } from "@/components/admin-layout";
import { RoleGuard } from "@/components/role-guard";
import { Card } from "@/components/ui/card";
import { mockPayments, mockDashboardUsers } from "@/lib/mock-data";
import { Payment } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function AdminPaymentsPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "Pending" | "Completed" | "Failed">("all");
  const [filterType, setFilterType] = useState<"all" | "Income" | "Expense">("all");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const filteredPayments = mockPayments.filter((payment) => {
    const statusMatch = filterStatus === "all" || payment.status === filterStatus;
    const typeMatch = filterType === "all" || payment.payment_type === filterType;
    return statusMatch && typeMatch;
  });

  const totalIncome = filteredPayments
    .filter((p) => p.payment_type === "Income" && p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalExpense = filteredPayments
    .filter((p) => p.payment_type === "Expense" && p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const netRevenue = totalIncome - totalExpense;

  const stats = [
    {
      label: "Total Income",
      value: `$${totalIncome.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Expense",
      value: `$${totalExpense.toLocaleString()}`,
      icon: TrendingDown,
      color: "bg-red-100 text-red-600",
    },
    {
      label: "Net Revenue",
      value: `$${netRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Payments Overview</h1>
            <p className="text-muted-foreground mt-2">System-wide payment visibility and monitoring</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          {/* Filters */}
          <Card className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Filters</h2>
              
              <div className="flex gap-4">
                <div className="min-w-48">
                  <label className="text-sm font-medium mb-2 block">Filter by Status</label>
                  <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="min-w-48">
                  <label className="text-sm font-medium mb-2 block">Filter by Type</label>
                  <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Income">Income</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Payments Table */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4">All Payments</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Payment ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.payment_id} className="border-b hover:bg-muted/50 transition">
                      <td className="py-3 px-4 font-medium">{payment.payment_id}</td>
                      <td className="py-3 px-4 font-semibold">
                        {payment.currency} {payment.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            payment.payment_type === "Income"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {payment.payment_type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{payment.category}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            payment.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : payment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(payment.payment_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPayments.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No payments found matching the selected filters.
              </div>
            )}
          </Card>
        </div>
      </AdminLayout>
    </RoleGuard>
  );
}
