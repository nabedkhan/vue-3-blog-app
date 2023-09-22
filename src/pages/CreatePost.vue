<template>
  <PostForm v-model="fields" @create="handleSubmit()" />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import PostForm from "../components/PostForm.vue";

import { usePostsStore } from "../store/posts";

const toast = useToast();
const router = useRouter();
const store = usePostsStore();

const loading = ref(false);
const fields = ref({ body: "", title: "", tags: "" });

const handleSubmit = async () => {
  if (!fields.value.title || !fields.value.body || !fields.value.tags) {
    alert("Filled the all input fields");
    return;
  }

  loading.value = true;

  try {
    const updatedTags = fields.value.tags.split(",").map((item) => item.trim());
    await store.createPost({
      tags: updatedTags,
      body: fields.value.body,
      title: fields.value.title,
    });
    toast.success("Post Created successfully");
    router.push("/");
  } catch (error) {
    console.dir(error.message);
    toast.error(typeof error === "string" ? error : error.message);
  } finally {
    loading.value = false;
  }
};
</script>
