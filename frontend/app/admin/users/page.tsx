"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { AdminLayout } from "@/components/admin-layout";
import { RoleGuard } from "@/components/role-guard";
import { UsersList } from "@/components/admin/users-list";
import { EditUserModal } from "@/components/admin/edit-user-modal";
import { DashboardUser } from "@/lib/types";
import { mockDashboardUsers } from "@/lib/mock-data";

export default function UsersManagementPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState<DashboardUser[]>(mockDashboardUsers);
  const [editingUser, setEditingUser] = useState<DashboardUser | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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

  const handleEdit = (user: DashboardUser) => {
    setEditingUser(user);
    setIsEditOpen(true);
  };

  const handleSaveUser = (updatedUser: DashboardUser) => {
    setUsers(users.map((u) => (u.user_id === updatedUser.user_id ? updatedUser : u)));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleStatusChange = (userId: string, status: "Active" | "Blocked") => {
    setUsers(
      users.map((u) =>
        u.user_id === userId ? { ...u, status } : u
      )
    );
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Users Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage system users, roles, and permissions
            </p>
          </div>

          {/* Success Message */}
          {isSaved && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              User updated successfully!
            </div>
          )}

          {/* Users List */}
          <UsersList
            users={users}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <EditUserModal
            open={isEditOpen}
            onOpenChange={(open) => {
              setIsEditOpen(open);
              if (!open) setEditingUser(null);
            }}
            user={editingUser}
            onSave={handleSaveUser}
          />
        )}
      </AdminLayout>
    </RoleGuard>
  );
}
