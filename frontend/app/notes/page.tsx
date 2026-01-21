"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { NotesList } from "@/components/notes/notes-list";
import { Note } from "@/lib/types";
import { mockNotes, mockNotifications } from "@/lib/mock-data";

export default function NotesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>(mockNotes);
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

  const handleAdd = (note: Note) => {
    setNotes([...notes, note]);
  };

  const handleEdit = (updatedNote: Note) => {
    setNotes(
      notes.map((n) =>
        n.note_id === updatedNote.note_id ? updatedNote : n
      )
    );
  };

  const handleDelete = (noteId: string) => {
    setNotes(notes.filter((n) => n.note_id !== noteId));
  };

  return (
    <DashboardLayout unreadNotifications={unreadNotifications}>
      <NotesList
        notes={notes}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  );
}
