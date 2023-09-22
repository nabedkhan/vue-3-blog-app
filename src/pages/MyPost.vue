<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div class="px-3 pb-4 bg-white">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="text"
          id="table-search"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
          placeholder="Search for items"
        />
      </div>
    </div>

    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Body</th>
          <th scope="col" class="px-6 py-3">Status</th>
          <th scope="col" class="px-6 py-3">Created At</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>

      <tbody v-if="posts.length">
        <tr
          v-for="post in posts"
          :key="post.id"
          class="bg-white border-b hover:bg-gray-50"
        >
          <th
            scope="row"
            class="max-w-[15rem] px-6 py-4 font-medium text-gray-900"
          >
            {{ post.title }}
          </th>

          <td class="px-6 py-4 max-w-[20rem]">
            <span class="line-clamp-3">{{ post.body }}</span>
          </td>

          <td class="px-6 py-4">
            {{ post.published ? "Published" : "Draft" }}
          </td>

          <td class="px-6 py-4">10 Sep 2023</td>

          <td class="px-6 py-4 space-x-2">
            <router-link :to="`/my-post/${post.id}`">
              <span class="font-medium text-blue-600 hover:underline">
                Edit
              </span>
            </router-link>

            <button class="font-medium text-blue-600 hover:underline">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { usePostsStore } from "../store/posts";
import { useAuthStore } from "../store/auth";

const posts = ref([]);

const route = useRoute();
const router = useRouter();
const store = usePostsStore();
const authStore = useAuthStore();

onMounted(async () => {
  try {
    const data = await store.getPostsByUser();
    posts.value = data;
  } catch (error) {
    console.log(error);
  }
});

watch(
  () => authStore.isAuthenticated,
  (newValue) => {
    if (!newValue) {
      router.push({
        path: "/login",
        query: { redirect: route.path },
      });
    }
  }
);
</script>
