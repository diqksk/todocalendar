import { createWebHistory, createRouter } from "vue-router";

const Login = () =>
  import(
    /* webpackChunkName: "login" */ "./components/view/login/LoginLayout.vue"
  );
const Calendar = () =>
  import(
    /* webpackChunkName: "calendar" */ "./components/view/calendar/CalendarLayout.vue"
  );
const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    // meta: { authRequired: true },
  },
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
    // meta: { authRequired: false },
    // beforeEnter: function (to, from, next) {
    //   if (
    //     to.matched.some(function (routeInfo) {
    //       return routeInfo.meta.authRequired;
    //     })
    //   ) {
    //     return;
    //   } else {
    //     console.log(`routing success + ${to.path} `);
    //     next();
    //   }
    // },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
