import axios from "axios"
import apiClient from "./api/axios-instance"

export interface User {
  id: string
  email: string
  phone: string
  name: string
}

export interface UserResponse {
  message: boolean,
  data: User
}

export interface LoginDTO {
  email: string
  password: string
}

export interface RegisterDTO {
  email: string
  password: string
  name: string
}

class AuthService {
  private handleError(error: unknown): never {
    // Check if error is an AxiosError
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || "An error occurred"
      throw new Error(message)
    }

    // Fallback for unexpected errors
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("An unknown error occurred")
  }

  async register(data: RegisterDTO): Promise<User> {
    try {
      const response = await apiClient.post<UserResponse>("/auth/register", data)
      if (response.status) {
        localStorage.setItem("auth_id", response.data.data.id)
        localStorage.setItem("user", JSON.stringify(response.data.data))
      }
      return response.data.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async login(data: LoginDTO): Promise<User> {
    try {
      const response = await apiClient.post<UserResponse>("/auth/login", data)
      if (response.data) {
        localStorage.setItem("auth_id", response.data.data.id)
        localStorage.setItem("user", JSON.stringify(response.data.data))
      }
      return response.data.data
    } catch (error) {
      this.handleError(error)
    }
  }

  logout(): void {
    localStorage.removeItem("auth_id")
    localStorage.removeItem("user")
  }

  getUser(): User | null {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }

  getToken(): string | null {
    return localStorage.getItem("auth_id")
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  async getProfile(): Promise<User> {
    try {
      const userId = this.getToken()
      if (!userId) throw new Error("User ID not found")

      const response = await apiClient.get<UserResponse>("/auth/profile", {
        headers: {
          "X-User-Id": userId,
        },
      })

      // Update localStorage with latest profile
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data))
      }

      return response.data.data
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default new AuthService()
