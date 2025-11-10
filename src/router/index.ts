import NoteHome from "@/pages/NoteHome.vue"
import NoteDetail from "@/pages/NoteDetail.vue"
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: NoteHome,
    meta: { layout: "default" },
  },
  {
    path: "/home",
    name: "home-list",
    component: NoteHome,
    meta: { layout: "default" },
  },
  {
    path: "/notes/:id",
    name: "note-detail",
    component: NoteDetail,
    meta: { layout: "default" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
