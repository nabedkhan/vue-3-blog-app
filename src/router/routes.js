import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/auth";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import MyPost from "../pages/MyPost.vue";
import EditPost from "../pages/EditPost.vue";
import Register from "../pages/Register.vue";
import CreatePost from "../pages/CreatePost.vue";
import NotFound from "../components/NotFound.vue";
import PostDetails from "../pages/PostDetails.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      name: "Login",
      path: "/login",
      component: Login,
      meta: { hideForAuth: true },
    },
    {
      name: "Register",
      path: "/register",
      component: Register,
      meta: { hideForAuth: true },
    },
    {
      name: "CreatePost",
      path: "/create-post",
      component: CreatePost,
      meta: { requiresAuth: true },
    },
    {
      name: "MyPost",
      path: "/my-post",
      component: MyPost,
      meta: { requiresAuth: true },
    },
    {
      name: "MyPostEdit",
      component: EditPost,
      path: "/my-post/:id(\\d+)",
      meta: { requiresAuth: true },
    },
    {
      path: "/posts/:id(\\d+)",
      name: "Post",
      component: PostDetails,
    },
    {
      name: "NotFound",
      component: NotFound,
      path: "/:pathMatch(.*)*",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuthStore();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({
      path: "/login",
      query: { redirect: to.path },
    });
  } else if (to.meta.hideForAuth && isAuthenticated) {
    next({ path: "/" });
  } else {
    next();
  }
});
