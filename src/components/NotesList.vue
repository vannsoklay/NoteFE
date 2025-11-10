<template>
  <div>
    <div v-if="isLoading" class="text-center py-12">
      <p class="text-muted-foreground">Loading notes...</p>
    </div>

    <div v-else-if="notes.length === 0" class="text-center py-12 bg-card border border-border rounded-lg">
      <p class="text-muted-foreground">No notes yet. Create your first note!</p>
    </div>

    <div v-else class="space-y-4">
      <NoteCard v-for="note in notes" :key="note.id" :note="note" @edit="handleEdit" @delete="handleDelete" />
    </div>

    <div v-if="error" class="p-4 bg-destructive/10 border border-destructive rounded-md text-sm text-destructive mt-4">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Note } from '@/services/notes.service'
import NoteCard from './NoteCard.vue'

interface Props {
  notes: Note[]
  isLoading: boolean
  error: string | null
}

interface Emits {
  edit: [note: Note]
  delete: [id: string]
}

withDefaults(defineProps<Props>(), {
  isLoading: false,
  error: null,
})

const emit = defineEmits<Emits>()

const handleEdit = (note: Note) => emit('edit', note)
const handleDelete = (id: string) => emit('delete', id)
</script>
