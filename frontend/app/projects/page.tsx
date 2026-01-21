"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { ProjectsList } from "@/components/projects/projects-list";
import { Project } from "@/lib/types";
import { mockProjects, mockNotifications } from "@/lib/mock-data";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const unreadNotifications = mockNotifications.filter((n) => !n.is_read).length;
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else if (user.role === "admin") {
      router.push("/admin");
    }
  }, [user, router]);

  if (!user || user.role === "admin") {
    return null;
  }

  const handleAdd = (project: Project) => {
    setProjects([...projects, project]);
  };

  const handleEdit = (updatedProject: Project) => {
    setProjects(
      projects.map((p) =>
        p.project_id === updatedProject.project_id ? updatedProject : p
      )
    );
  };

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter((p) => p.project_id !== projectId));
  };

  return (
    <DashboardLayout unreadNotifications={unreadNotifications}>
      <ProjectsList
        projects={projects}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}
