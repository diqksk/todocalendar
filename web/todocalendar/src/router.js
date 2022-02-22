import { createWebHistory, createRouter } from "vue-router";

const Login = () =>
  import(
    /* webpackChunkName: "login" */ "./components/view/login/LoginLayout.vue"
  );
const Calendar = () =>
  import(
    /* webpackChunkName: "calendar" */ "./components/view/todo/CalendarLayout.vue"
  );
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
