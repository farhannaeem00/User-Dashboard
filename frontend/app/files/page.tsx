"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { FilesList } from "@/components/files/files-list";
import { FileItem } from "@/lib/types";
import { mockFiles, mockNotifications } from "@/lib/mock-data";

export default function FilesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [files, setFiles] = useState<FileItem[]>(mockFiles);
  const unreadNotifications = mockNotifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role === "admin") {
      router.push("/admin");
    }
  }, [user, router]);

  const handleAdd = (file: FileItem) => {
    setFiles([...files, file]);
  };

  const handleDelete = (fileId: string) => {
    setFiles(files.filter((f) => f.file_id !== fileId));
  };

  if (!user || user.role === "admin") {
    return null;
  }

  return (
    <DashboardLayout unreadNotifications={unreadNotifications}>
      <FilesList
        files={files}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}
