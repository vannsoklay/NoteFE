<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Create/Edit Form Component -->
    <div class="lg:col-span-1">
      <NoteForm :editing-id="editingId" :editing-note="editingNote" :is-loading="loading" :error="error"
        @submit="handleSaveNote" @cancel="cancelEdit" />
    </div>

    <!-- Notes List with Toolbar -->
    <div class="lg:col-span-2">
      <!-- Toolbar Component -->
      <NotesToolbar :search-query="searchQuery" :sort-by="sortBy" :notes-count="notes.length"
        @update:search-query="searchQuery = $event" @update:sort-by="sortBy = $event" />
      <NotesList :notes="notes" :sorted-notes="notes" :is-loading="loading" :error="error" @edit="startEdit"
        @delete="handleDeleteNote" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotes } from '@/hooks/use-notes'
import NoteForm from '@/components/NoteForm.vue'
import NotesList from '@/components/NotesList.vue'
import NotesToolbar from '@/components/NotesToolbar.vue'

const {
  notes,
  loading,
  error,
  editingId,
  editingNote,
  searchQuery,
  sortBy,
  fetchNotes,
  saveNote,
  deleteNote,
  startEdit,
  cancelEdit
} = useNotes()

onMounted(() => {
  fetchNotes()
})

const handleSaveNote = async (noteData: { title: string; content: string; }) => {
  await saveNote(noteData)
}

const handleDeleteNote = async (id: string) => {
  await deleteNote(id)
}
</script>
