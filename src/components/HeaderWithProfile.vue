<template>
  <header class="border-b border-border bg-card">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Notes</h1>
          <p class="text-sm text-muted-foreground mt-1">Capture your thoughts effortlessly</p>
        </div>

        <!-- Profile/auth button section -->
        <div class="flex items-center gap-4">
          <div v-if="!loading">
            <div v-if="isAuthenticated" class="flex items-center gap-3">
              <div class="text-right">
                <p class="font-medium text-sm">{{ user?.name }}</p>
                <p class="text-xs text-muted-foreground">{{ user?.email }}</p>
              </div>
              <button @click="showMenu = !showMenu"
                class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold hover:opacity-90 transition-opacity relative">
                {{ user?.name?.charAt(0).toUpperCase() }}

                <!-- Profile menu dropdown -->
                <div v-if="showMenu"
                  class="absolute right-0 mt-2 top-full bg-card border border-border rounded shadow-lg min-w-max z-40">
                  <button @click="handleLogout"
                    class="w-full text-left px-4 py-2 hover:bg-muted text-sm text-foreground hover:text-foreground transition-colors">
                    Logout
                  </button>
                </div>
              </button>
            </div>

            <div v-else class="flex gap-2">
              <button @click="openAuthModal"
                class="px-4 py-2 text-sm font-medium text-foreground border border-border rounded hover:bg-muted transition-colors">
                Login
              </button>
              <button @click="openAuthModal"
                class="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
                Register
              </button>
            </div>
          </div>
          <div v-else class="flex gap-2">
            laoding...
          </div>
        </div>
      </div>
    </div>

    <!-- Auth Modal -->
    <AuthModal :is-open="authModalOpen" @close="authModalOpen = false" @auth-success="handleAuthSuccess" />
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuth } from "@/hooks/use-auth"
import AuthModal from "./AuthModal.vue"

const { user, isAuthenticated, logout, loading, getProfile } = useAuth()
const authModalOpen = ref(false)
const showMenu = ref(false)

const openAuthModal = () => {
  authModalOpen.value = true
}

const handleLogout = () => {
  logout()
  showMenu.value = false
}

const handleAuthSuccess = async () => {
  showMenu.value = false
  try {
    await getProfile() // fetch the latest user after login/register
  } catch (err) {
    console.warn("Could not load profile after auth:", err)
  }
}

</script>

<style scoped></style>
