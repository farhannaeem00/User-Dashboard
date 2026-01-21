"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { TasksList } from "@/components/tasks/tasks-list";
import { Task, Project } from "@/lib/types";
import { mockTasks, mockProjects, mockNotifications } from "@/lib/mock-data";

export default function TasksPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [projects] = useState<Project[]>(mockProjects);
  const unreadNotifications = mockNotifications.filter((n) => !n.is_read).length;

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

  const handleAdd = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleEdit = (updatedTask: Task) => {
    setTasks(
      tasks.map((t) =>
        t.task_id === updatedTask.task_id ? updatedTask : t
      )
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter((t) => t.task_id !== taskId));
  };

  return (
    <DashboardLayout unreadNotifications={unreadNotifications}>
      <TasksList
        tasks={tasks}
        projects={projects}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}
