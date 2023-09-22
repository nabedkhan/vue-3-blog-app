<template>
  <Loading v-if="loading" />

  <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" v-else>
    <div
      :key="post.id"
      v-for="post in posts"
      class="px-5 py-4 border border-gray-200 shadow-md rounded-xl shadow-slate-100"
    >
      <h3
        class="text-lg font-medium tracking-wider uppercase text-slate-900 hover:cursor-pointer hover:underline"
      >
        <RouterLink :to="`/posts/${post.id}`">
          {{ post.title.substring(0, 25) }}
          {{ post.title.length > 25 ? "..." : "" }}
        </RouterLink>
      </h3>

      <p class="mt-2 text-justify text-slate-600">
        {{ post.body.substring(0, 150) }}...
      </p>

      <div class="mt-4">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="inline-flex items-center px-2 py-1 mr-2 text-sm font-medium leading-none rounded bg-slate-800 text-slate-200"
        >
          #{{ tag }}
        </span>
      </div>

      <div class="flex items-center gap-4 mt-4">
        <div
          class="inline-flex items-center gap-1 text-sm font-medium text-slate-800"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z"
              fill="currentColor"
            />
          </svg>

          <span class="pt-1 text-base">{{ post.createdBy }}</span>
        </div>

        <div
          class="inline-flex items-center gap-1 pt-1 text-sm font-medium text-slate-800"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <span class="text-base">
            {{
              new Date(post.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                day: "numeric",
                month: "short",
              })
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
// CUSTOM COMPONENT
import Loading from "../components/Loading.vue";
// STORE
import { usePostsStore } from "../store/posts";

const loading = ref(false);

const store = usePostsStore();
const { posts } = storeToRefs(store);

onMounted(async () => {
  try {
    await store.getPosts();
  } catch (error) {
    console.log(error.response.data);
  } finally {
    loading.value = false;
  }
});
</script>
