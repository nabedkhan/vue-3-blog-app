<template>
  <PostForm v-model="fields" @create="handleSubmit()" :editPost="true" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import { usePostsStore } from "../store/posts";

import PostForm from "../components/PostForm.vue";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const store = usePostsStore();

const loading = ref(false);
const fields = ref({ body: "", title: "", tags: "" });

onMounted(async () => {
  try {
    const data = await store.getPost(route.params.id);

    fields.value.body = data.body;
    fields.value.title = data.title;
    fields.value.tags = data.tags.join(", ");
  } catch (error) {
    console.log(error);
  }
});

const handleSubmit = async () => {
  if (!fields.value.title || !fields.value.body || !fields.value.tags) {
    alert("Filled the all input fields");
    return;
  }

  loading.value = true;

  try {
    const updateTags = fields.value.tags.split(",").map((item) => item.trim());

    await store.updatePost(route.params.id, {
      tags: updateTags,
      body: fields.value.body,
      title: fields.value.title,
    });
    toast.success("Post Edited successfully");
    router.push("/my-post");
  } catch (error) {
    console.dir(error.message);
    toast.error(typeof error === "string" ? error : error.message);
  } finally {
    loading.value = false;
  }
};
</script>
