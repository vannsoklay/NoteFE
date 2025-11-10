import axios from "axios"

const apiClient = axios.create({
  baseURL: "http://localhost:5250/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Global error interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[v0] API Error:", error.response?.status, error.response?.data)
    return Promise.reject(error)
  },
)

export default apiClient
