"use client";

import React, { useState } from "react";
import { FileItem } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";

interface CreateFileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (file: FileItem) => void;
}

export function CreateFileModal({
  open,
  onOpenChange,
  onCreate,
}: CreateFileModalProps) {
  const [formData, setFormData] = useState({
    file_name: "",
    file_type: "application/pdf",
    file_size: 0,
    linked_to: "Project" as const,
    linked_id: "",
  });

  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.file_name.trim()) newErrors.file_name = "File name is required";
    if (formData.file_size === 0) newErrors.file_size = "Please select a file";
    if (!formData.linked_id.trim()) newErrors.linked_id = "Please link to a project";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileSelect = (file: File) => {
    setFormData({
      ...formData,
      file_name: file.name,
      file_type: file.type || "application/octet-stream",
      file_size: file.size,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newFile: FileItem = {
      file_id: `f${Date.now()}`,
      file_name: formData.file_name,
      file_type: formData.file_type,
      file_size: formData.file_size,
      linked_to: formData.linked_to,
      linked_id: formData.linked_id,
      uploaded_at: new Date().toISOString(),
    };

    onCreate(newFile);
    setFormData({
      file_name: "",
      file_type: "application/pdf",
      file_size: 0,
      linked_to: "Project",
      linked_id: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Upload and manage your project files.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drag & Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Drag and drop your file</p>
            <p className="text-xs text-muted-foreground mb-3">or</p>
            <label>
              <input
                type="file"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />
              <Button type="button" variant="outline" size="sm" asChild>
                <span>Choose File</span>
              </Button>
            </label>
          </div>

          {/* Selected File Info */}
          {formData.file_name && (
            <div className="bg-muted p-3 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm font-medium truncate">
                  {formData.file_name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(formData.file_size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    file_name: "",
                    file_size: 0,
                  })
                }
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {errors.file_size && (
            <p className="text-xs text-destructive">{errors.file_size}</p>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">
              Link To *
            </label>
            <Select
              value={formData.linked_to}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  linked_to: value as "Project" | "Task" | "Note",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Project">Project</SelectItem>
                <SelectItem value="Task">Task</SelectItem>
                <SelectItem value="Note">Note</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {formData.linked_to} ID *
            </label>
            <Input
              placeholder="Enter the linked item ID"
              value={formData.linked_id}
              onChange={(e) =>
                setFormData({ ...formData, linked_id: e.target.value })
              }
              className={errors.linked_id ? "border-destructive" : ""}
            />
            {errors.linked_id && (
              <p className="text-xs text-destructive mt-1">{errors.linked_id}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Upload File
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
