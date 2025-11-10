<template>
  <div class="bg-card border border-border rounded-lg p-6 hover:border-ring transition-colors">
    <div class="flex items-start justify-between mb-3">
      <router-link :to="`/notes/${note.id}`"
        class="text-lg font-semibold line-clamp-2 flex-1 hover:text-primary transition-colors">
        {{ note.title }}
      </router-link>
      <div class="flex gap-2 ml-4 flex-shrink-0">
        <button @click="handleEdit"
          class="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded hover:opacity-80 transition-opacity">
          Edit
        </button>
        <button @click="handleDelete"
          class="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded hover:opacity-80 transition-opacity">
          Delete
        </button>
      </div>
    </div>

    <p class="text-foreground line-clamp-4 mb-3">{{ note.content }}</p>
    <p class="text-xs text-muted-foreground">{{ formatDate(note.createdAt) }}</p>
  </div>
</template>

<script setup lang="ts">
import { type Note } from '@/services/notes.service'
import { useDateFormat } from '@/composables/use-date-format'

interface Props {
  note: Note
}

interface Emits {
  edit: [note: Note]
  delete: [id: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { formatDate } = useDateFormat()

const handleEdit = () => emit('edit', props.note)
const handleDelete = () => {
  if (confirm('Are you sure you want to delete this note?')) {
    emit('delete', props.note.id)
  }
}
</script>
