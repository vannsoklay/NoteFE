<template>
  <div class="bg-card flex justify-between gap-4 border border-border rounded-lg p-4 space-y-4 mb-6">
    <!-- Search -->
    <div class="w-[80%]">
      <label class="block text-sm font-medium mb-2 text-foreground">Search</label>
      <input v-model="searchQuery" type="text" placeholder="Search notes by title or content..."
        class="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm" />
    </div>

    <!-- Sort -->
    <div class="w-[20%]">
      <label class="block text-sm font-medium mb-2 text-foreground">Sort by</label>
      <select v-model="sortBy"
        class="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="title_asc">Title (A-Z)</option>
        <option value="title_desc">Title (Z-A)</option>
      </select>
    </div>
  </div>
  <div class="flex justify-start pb-2">
    <!-- Results count -->
    <p class="text-xs text-muted-foreground">
      {{ resultsCount }} note<span v-if="resultsCount !== 1">s</span> found
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  searchQuery: string
  sortBy: "newest" | "oldest" | "title_asc" | "title_desc"
  notesCount: number
}

interface Emits {
  'update:searchQuery': [value: string]
  'update:sortBy': [value: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const searchQuery = computed({
  get: () => props.searchQuery,
  set: (value: string) => emit('update:searchQuery', value)
})

const sortBy = computed({
  get: () => props.sortBy,
  set: (value: string) => emit('update:sortBy', value)
})


const resultsCount = computed(() => props.notesCount)


</script>
