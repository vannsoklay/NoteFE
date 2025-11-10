import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import debounce from "lodash.debounce";

import notesService, { type Note, type CreateNoteDTO, type FilterParams } from "@/services/notes.service";

type SortByType = "newest" | "oldest" | "title_asc" | "title_desc";

export function useNotes() {
  const router = useRouter();
  const route = useRoute();

  const notes = ref<Note[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const editingId = ref<string | null>(null);

  const parseSortBy = (value: unknown): SortByType => {
    if (value === "newest" || value === "oldest" || value === "title_asc" || value === "title_desc") {
      return value;
    }
    return "newest";
  };

  const parseSearchQuery = (value: unknown): string => {
    return typeof value === "string" ? value : "";
  };

  const searchQuery = ref(parseSearchQuery(route.query.search));
  const sortBy = ref<SortByType>(parseSortBy(route.query.sortBy));

  const fetchNotes = async () => {
    loading.value = true;
    error.value = null;
    try {
      const params: FilterParams = {
        search: searchQuery.value,
        sortBy: sortBy.value,
      };
      notes.value = await notesService.getAllNotes(params);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to fetch notes";
    } finally {
      loading.value = false;
    }
  };

  const updateFilters = debounce(() => {
    router.push({
      path: "/home",
      query: {
        search: searchQuery.value || "",
        sortBy: sortBy.value,
      },
    });
    fetchNotes();
  }, 500);

  watch([searchQuery, sortBy], updateFilters, { deep: true });

  const saveNote = async (noteData: CreateNoteDTO) => {
    loading.value = true;
    error.value = null;
    try {
      if (editingId.value) {
        await notesService.updateNote(editingId.value, noteData);
      } else {
        await notesService.createNote(noteData);
      }
      await fetchNotes();
      editingId.value = null;
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to save note";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const deleteNote = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      await notesService.deleteNote(id);
      await fetchNotes();
      return true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to delete note";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const startEdit = (note: Note) => {
    editingId.value = note.id;
  };

  const cancelEdit = () => {
    editingId.value = null;
  };

  const editingNote = computed(() => {
    return editingId.value ? notes.value.find((n) => n.id === editingId.value) ?? null : null;
  });

  return {
    notes,
    loading,
    error,
    editingId,
    editingNote,
    searchQuery,
    sortBy,
    fetchNotes,
    saveNote,
    deleteNote,
    startEdit,
    cancelEdit,
  };
}
