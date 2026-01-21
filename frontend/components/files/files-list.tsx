"use client";

import React, { useState } from "react";
import { FileItem } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Trash2, File, FileImage, FileText } from "lucide-react";
import { CreateFileModal } from "./create-file-modal";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";

interface FilesListProps {
  files: FileItem[];
  onAdd: (file: FileItem) => void;
  onDelete: (fileId: string) => void;
}

export function FilesList({
  files,
  onAdd,
  onDelete,
}: FilesListProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return <FileImage className="w-6 h-6" />;
    if (fileType.includes("pdf")) return <FileText className="w-6 h-6" />;
    if (fileType.includes("text")) return <FileText className="w-6 h-6" />;
    return <File className="w-6 h-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const handleDownload = (file: FileItem) => {
    // Mock download - in real app would trigger actual download
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(`File: ${file.file_name}`)
    );
    element.setAttribute("download", file.file_name);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Files</h1>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Upload File
        </Button>
      </div>

      {files.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No files yet. Upload one to get started!
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <Card
              key={file.file_id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  {getFileIcon(file.file_type)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-2">
                    {file.file_name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatFileSize(file.file_size)}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Uploaded: {new Date(file.uploaded_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file)}
                    className="gap-1"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(file.file_id)}
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

      <CreateFileModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreate={onAdd}
      />

      {deleteId && (
        <DeleteConfirmDialog
          open={deleteId !== null}
          onOpenChange={(open) => !open && setDeleteId(null)}
          onConfirm={() => {
            onDelete(deleteId);
            setDeleteId(null);
          }}
          title="Delete File"
          description="This action cannot be undone."
        />
      )}
    </div>
  );
}
