<template>
  <!-- Back Button -->
  <router-link to="/"
    class="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded hover:bg-secondary transition-colors">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    Back to Notes
  </router-link>

  <!-- Loading State -->
  <div v-if="loading" class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4">
    {{ error }}
  </div>

  <!-- Note Detail -->
  <div v-else-if="note" class="bg-card border border-border rounded-lg p-8">
    <!-- Header -->
    <div class="flex items-start justify-between mb-6 pb-6 border-b border-border">
      <div class="flex-1">
        <h1 class="text-4xl font-bold mb-2">{{ note.title }}</h1>
        <p class="text-sm text-muted-foreground">
          Created {{ formatDate(note.createdAt) }}
          <span v-if="note.updatedAt !== note.createdAt">
            • Updated {{ formatDate(note.updatedAt) }}
          </span>
        </p>
      </div>
      <div class="flex gap-2 ml-4 flex-shrink-0">
        <button @click="handleEdit"
          class="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-80 transition-opacity">
          Edit
        </button>
        <button @click="handleDelete"
          class="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:opacity-80 transition-opacity">
          Delete
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="prose prose-invert max-w-none mb-8">
      <p class="text-lg text-foreground leading-relaxed whitespace-pre-wrap">{{ note.content }}</p>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="text-center py-12">
    <p class="text-muted-foreground">Note not found</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import notesService, { type Note } from "@/services/notes.service"
import { useDateFormat } from "@/composables/use-date-format"

const route = useRoute()
const router = useRouter()
const note = ref<Note | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const { formatDate } = useDateFormat()

const fetchNote = async () => {
  loading.value = true
  error.value = null
  try {
    const id = route.params.id as string
    note.value = await notesService.getNoteById(id)
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to fetch note"
  } finally {
    loading.value = false
  }
}

const handleEdit = () => {
  if (note.value) {
    sessionStorage.setItem("editNote", JSON.stringify(note.value))
    router.push("/")
  }
}

const handleDelete = async () => {
  if (confirm("Are you sure you want to delete this note?")) {
    try {
      await notesService.deleteNote(note.value!.id)
      router.push("/")
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to delete note"
    }
  }
}

onMounted(() => {
  fetchNote()
})
</script>
