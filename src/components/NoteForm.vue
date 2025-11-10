<template>
  <div class="sticky top-8 bg-card border border-border rounded-lg p-6 space-y-4">
    <div>
      <label class="block text-sm font-medium mb-2">
        {{ editingId ? 'Edit Note' : 'New Note' }}
      </label>
      <input v-model="formData.title" type="text" placeholder="Note title..."
        class="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
    </div>

    <div>
      <textarea v-model="formData.content" placeholder="Note content..." rows="6"
        class="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm resize-none" />
    </div>

    <div class="flex gap-2 pt-2">
      <button @click="handleSubmit" :disabled="isLoading"
        class="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
        {{ isLoading ? 'Saving...' : editingId ? 'Update' : 'Create' }}
      </button>
      <button v-if="editingId" @click="handleCancel"
        class="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity">
        Cancel
      </button>
    </div>

    <div v-if="error" class="p-3 bg-destructive/10 border border-destructive rounded-md text-sm text-destructive">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Note } from '@/services/notes.service'
import { ref, watch, computed } from 'vue'

interface Props {
  editingId: string | null
  editingNote: Note | null
  isLoading: boolean
  error: string | null
}

interface Emits {
  submit: [data: { title: string; content: string }]
  cancel: []
}

const props = withDefaults(defineProps<Props>(), {
  editingId: null,
  editingNote: null,
  isLoading: false,
  error: null,
})

const emit = defineEmits<Emits>()

const formData = ref({ title: '', content: '' })

watch(
  () => props.editingNote,
  (newNote) => {
    if (newNote) {
      formData.value = { title: newNote.title, content: newNote.content }
    }
  },
  { immediate: true }
)

const isFormValid = computed(() => formData.value.title.trim() && formData.value.content.trim())

const handleSubmit = () => {
  if (!isFormValid.value) {
    alert('Please fill in both title and content')
    return
  }
  emit('submit', formData.value)
  if (!props.isLoading) {
    formData.value = { title: '', content: '' }
  }
}

const handleCancel = () => {
  formData.value = { title: '', content: '' }
  emit('cancel')
}
</script>
