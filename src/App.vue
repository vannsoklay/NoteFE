<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import DefaultLayout from "@/layouts/DefaultLayout.vue"

const route = useRoute()

const layout = computed(() => {
  const name = route.meta.layout || "default"
  return name === "default" && DefaultLayout
})
</script>
