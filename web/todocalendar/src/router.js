import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LoginLayout",
    component: () => import("@/components/view/login/LoginLayout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
