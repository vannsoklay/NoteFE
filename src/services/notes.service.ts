import axios from "axios"
import apiClient from "./api/axios-instance"

export interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface FilterParams {
  search?: string
  sortBy?: "newest" | "oldest" | "title_asc" | "title_desc"
}

export interface NotesResponse {
  message: boolean;
  data: Note[]
}

export interface NoteResponse {
  message: boolean;
  data: Note
}

export interface CreateNoteDTO {
  title: string
  content: string
}

class NotesService {
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

  async getAllNotes(params?: FilterParams): Promise<Note[]> {
    try {
      const { data } = await apiClient.get<NotesResponse>("/notes", { params })
      return data.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async getNoteById(id: string): Promise<Note> {
    try {
      const response = await apiClient.get<NoteResponse>(`/notes/${id}`)
      return response.data.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async createNote(note: CreateNoteDTO): Promise<Note> {
    try {
      const response = await apiClient.post<Note>("/notes", note)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async updateNote(id: string, note: CreateNoteDTO): Promise<Note> {
    try {
      const response = await apiClient.put<Note>(`/notes/${id}`, note)
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  async deleteNote(id: string): Promise<void> {
    try {
      await apiClient.delete(`/notes/${id}`)
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default new NotesService()
