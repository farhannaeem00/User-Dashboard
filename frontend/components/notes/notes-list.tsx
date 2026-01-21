"use client";

import React, { useState, useMemo } from "react";
import { Note } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { CreateNoteModal } from "./create-note-modal";
import { EditNoteModal } from "./edit-note-modal";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";

interface NotesListProps {
  notes: Note[];
  onAdd: (note: Note) => void;
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

export function NotesList({
  notes,
  onAdd,
  onEdit,
  onDelete,
}: NotesListProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach((note) => {
      note.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || note.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [notes, searchTerm, selectedTag]);

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setIsEditOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Notes</h1>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          New Note
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Filter by tag:</p>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      )}

      {filteredNotes.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            {notes.length === 0
              ? "No notes yet. Create one to get started!"
              : "No notes match your search or filter."}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.note_id} className="p-4 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-4">
                  {note.content}
                </p>

                {note.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-3">
                    {note.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-xs text-muted-foreground mb-3 pt-2 border-t">
                <p>Updated: {new Date(note.updated_at).toLocaleDateString()}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(note)}
                  className="flex-1 gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteId(note.note_id)}
                  className="flex-1 gap-1 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreateNoteModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onCreate={onAdd}
      />

      {editingNote && (
        <EditNoteModal
          open={isEditOpen}
          onOpenChange={(open) => {
            setIsEditOpen(open);
            if (!open) {
              setEditingNote(null);
            }
          }}
          note={editingNote}
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
          title="Delete Note"
          description="This action cannot be undone."
        />
      )}
    </div>
  );
}
