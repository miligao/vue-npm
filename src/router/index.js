import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/Index.vue"),
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: () =>
      import(/* webpackChunkName: "Transfer" */ "@/views/Transfer.vue"),
  },
  {
    path: "/popover",
    name: "Popover",
    component: () =>
      import(/* webpackChunkName: "Popover" */ "@/views/Popover.vue"),
  },
  {
    path: "/clip",
    name: "Clip",
    component: () => import(/* webpackChunkName: "Clip" */ "@/views/Clip.vue"),
  },
  {
    path: "/viewer",
    name: "ImageViewer",
    component: () =>
      import(/* webpackChunkName: "ImageViewer" */ "@/views/ImageViewer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
