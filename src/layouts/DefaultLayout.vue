<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- Header -->
    <HeaderWithProfile />

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderWithProfile from '@/components/HeaderWithProfile.vue'
</script>
