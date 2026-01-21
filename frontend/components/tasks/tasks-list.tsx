"use client";

import React, { useState, useMemo } from "react";
import { Task, Project } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { CreateTaskModal } from "./create-task-modal";
import { EditTaskModal } from "./edit-task-modal";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TasksListProps {
  tasks: Task[];
  projects: Project[];
  onAdd: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TasksList({
  tasks,
  projects,
  onAdd,
  onEdit,
  onDelete,
}: TasksListProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        statusFilter === "All" || task.status === statusFilter;
      const priorityMatch =
        priorityFilter === "All" || task.priority === priorityFilter;
      return statusMatch && priorityMatch;
    });
  }, [tasks, statusFilter, priorityFilter]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });
  }, [filteredTasks]);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditOpen(true);
  };

  const handleMarkComplete = (task: Task) => {
    if (task.status !== "Done") {
      onEdit({ ...task, status: "Done" });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Todo":
        return "bg-gray-100 text-gray-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProjectName = (projectId: string) => {
    return projects.find((p) => p.project_id === projectId)?.title || "No Project";
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="min-w-40">
          <label className="block text-sm font-medium mb-1">Status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Todo">Todo</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-40">
          <label className="block text-sm font-medium mb-1">Priority</label>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Priorities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {sortedTasks.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            {tasks.length === 0
              ? "No tasks yet. Create one to get started!"
              : "No tasks match the selected filters."}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <Card
              key={task.task_id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={task.status === "Done"}
                  onChange={() => handleMarkComplete(task)}
                  className="mt-1"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className={`font-semibold line-clamp-2 ${
                        task.status === "Done"
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                  </div>

                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {task.description}
                    </p>
                  )}

                  <div className="flex gap-2 flex-wrap mb-2">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge variant="outline">
                      {getProjectName(task.project_id)}
                    </Badge>
                  </div>

                  {task.due_date && (
                    <p className="text-xs text-muted-foreground">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(task)}
                    className="gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(task.task_id)}
                    className="gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateTaskModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreate={onAdd}
        projects={projects}
      />

      {editingTask && (
        <EditTaskModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          task={editingTask}
          onEdit={onEdit}
          projects={projects}
        />
      )}

      {deleteId && (
        <DeleteConfirmDialog
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
          onConfirm={() => {
            onDelete(deleteId);
            setDeleteId(null);
          }}
          title="Delete Task"
          description="This action cannot be undone."
        />
      )}
    </div>
  );
}
