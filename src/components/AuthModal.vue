<template>
  <div v-if="props.isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-card rounded-lg shadow-xl w-full max-w-md p-8 relative">
      <!-- Close button -->
      <button @click="closeModal"
        class="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Tab navigation -->
      <div class="flex gap-2 mb-6 border-b border-border">
        <button @click="activeTab = 'login'" :class="[
          'px-4 py-2 font-medium transition-colors border-b-2',
          activeTab === 'login'
            ? 'border-primary text-foreground'
            : 'border-transparent text-muted-foreground hover:text-foreground',
        ]">
          Login
        </button>
        <button @click="activeTab = 'register'" :class="[
          'px-4 py-2 font-medium transition-colors border-b-2',
          activeTab === 'register'
            ? 'border-primary text-foreground'
            : 'border-transparent text-muted-foreground hover:text-foreground',
        ]">
          Register
        </button>
      </div>

      <!-- Error message -->
      <div v-if="error" class="bg-destructive/10 border border-destructive/50 text-destructive px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <!-- Login Tab -->
      <div v-if="activeTab === 'login'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input v-model="loginForm.email" type="email" placeholder="Enter your email"
            class="w-full px-4 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input v-model="loginForm.password" type="password" placeholder="Enter your password"
            class="w-full px-4 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <button @click="handleLogin" :disabled="loading"
          class="w-full bg-primary text-primary-foreground py-2 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </div>

      <!-- Register Tab -->
      <div v-if="activeTab === 'register'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Full Name</label>
          <input v-model="registerForm.name" type="text" placeholder="Enter your name"
            class="w-full px-4 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input v-model="registerForm.email" type="email" placeholder="Enter your email"
            class="w-full px-4 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Password</label>
          <input v-model="registerForm.password" type="password" placeholder="Enter your password"
            class="w-full px-4 py-2 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
        </div>
        <button @click="handleRegister" :disabled="loading"
          class="w-full bg-primary text-primary-foreground py-2 rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useAuth } from "@/hooks/use-auth"

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  "auth-success": []
}>()

const { login, register, loading } = useAuth()
const activeTab = ref<"login" | "register">("login")
const error = ref<string | null>(null)

const loginForm = ref({
  email: "",
  password: "",
})

const registerForm = ref({
  name: "",
  email: "",
  password: "",
})

const closeModal = () => {
  error.value = null
  emit("close")
}

const handleLogin = async () => {
  error.value = null
  if (!loginForm.value.email || !loginForm.value.password) {
    error.value = "Please fill in all fields"
    return
  }
  try {
    await login(loginForm.value)
    emit("auth-success")
    closeModal()
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Login failed"
  }
}

const handleRegister = async () => {
  error.value = null
  if (!registerForm.value.name || !registerForm.value.email || !registerForm.value.password) {
    error.value = "Please fill in all fields"
    return
  }
  try {
    await register(registerForm.value)
    emit("auth-success")
    activeTab.value = "login"
    closeModal()
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Registration failed"
  }
}
</script>

<style scoped></style>
