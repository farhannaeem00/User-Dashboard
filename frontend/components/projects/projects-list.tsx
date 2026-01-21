"use client";

import React, { useState } from "react";
import { Project } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { CreateProjectModal } from "./create-project-modal";
import { EditProjectModal } from "./edit-project-modal";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";

interface ProjectsListProps {
  projects: Project[];
  onAdd: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onView?: (project: Project) => void;
}

export function ProjectsList({
  projects,
  onAdd,
  onEdit,
  onDelete,
  onView,
}: ProjectsListProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsEditOpen(true);
  };

  const handleDelete = (projectId: string) => {
    setDeleteId(projectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "On-Hold":
        return "bg-yellow-100 text-yellow-800";
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No projects yet. Create one to get started!</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.project_id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                <div className="flex gap-2 flex-wrap">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority}
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Start: {new Date(project.start_date).toLocaleDateString()}</p>
                  {project.end_date && (
                    <p>End: {new Date(project.end_date).toLocaleDateString()}</p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {onView && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(project)}
                      className="flex-1 gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(project)}
                    className="flex-1 gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(project.project_id)}
                    className="flex-1 gap-1 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateProjectModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreate={onAdd}
      />

      {editingProject && (
        <EditProjectModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          project={editingProject}
          onEdit={onEdit}
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
          title="Delete Project"
          description="This action cannot be undone."
        />
      )}
    </div>
  );
}
