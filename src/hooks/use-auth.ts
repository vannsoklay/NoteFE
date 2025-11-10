import { ref, computed } from "vue"
import authService, { type User, type LoginDTO, type RegisterDTO } from "@/services/auth.service"

export function useAuth() {
  const user = ref<User | null>(authService.getUser())
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  const getProfile = async () => {
    loading.value = true
    error.value = null
    try {
      const profile = await authService.getProfile()
      user.value = profile
      return profile
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to load profile"
      user.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (data: RegisterDTO) => {
    loading.value = true
    error.value = null
    try {
      const newUser = await authService.register(data)
      user.value = newUser
      return newUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Registration failed"
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = async (data: LoginDTO) => {
    loading.value = true
    error.value = null
    try {
      const response = await authService.login(data)
      user.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Login failed"
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    authService.logout()
    user.value = null
    error.value = null
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    getProfile
  }
}
