import { createRouter, createWebHistory } from "vue-router";

//static load
//@ oznacza katalog /src

import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PromotionView from "@/views/PromotionView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";

//lazy load - renderuje się tylko gdy jest potrzebny a nie z gory

const NotFoundView = () => import("@/views/NotFoundView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/promotion/:id",
      name: "promotion",
      component: PromotionView,
    },
    {
      path: "/register",
      name: "RegisterView",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "LoginView",
      component: LoginView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundView",
      component: NotFoundView,
    },
  ],
});

export default router;
