<template>
  <header class="px-4 py-6 bg-gray-900 text-slate-400">
    <div class="container flex items-center justify-between mx-auto">
      <RouterLink to="/">
        <div class="text-lg font-bold tracking-widest hover:underline">
          <span>VUE-BLOG</span>
        </div>
      </RouterLink>

      <ul class="flex items-center gap-6">
        <li
          :key="menuItem"
          v-for="menuItem in filteredMenus"
          class="text-sm font-medium tracking-wider uppercase transition-all hover:text-slate-300"
          :class="{ 'text-slate-400 underline': active === menuItem.path }"
        >
          <RouterLink :to="menuItem.path">{{ menuItem.title }}</RouterLink>
        </li>

        <li
          v-if="store.isAuthenticated"
          @click="store.handleLogout()"
          class="text-sm font-medium tracking-wider uppercase transition-all cursor-pointer hover:text-slate-300"
        >
          Logout
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { useAuthStore } from "../store/auth";

const menu = ref([
  { title: "Home", path: "/", public: true },
  { title: "Login", path: "/login", private: false },
  { title: "Register", path: "/register", private: false },
  { title: "My Post", path: "/my-post", private: true },
  { title: "Create Post", path: "/create-post", private: true },
]);

const route = useRoute();
const store = useAuthStore();

const active = computed(() => route.path);

const filteredMenus = computed(() => {
  if (store.isAuthenticated) {
    return menu.value.filter((item) => item?.private || item?.public);
  } else {
    return menu.value.filter((item) => !item?.private || item?.public);
  }
});
</script>
