<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit()">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model="fields.email"
              autocomplete="email"
              class="block w-full py-3 text-gray-800 border-0 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>

          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="fields.password"
              autocomplete="current-password"
              class="block w-full py-3 text-gray-800 border-0 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex justify-center w-full px-3 py-2.5 text-sm font-semibold leading-6 tracking-widest text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-800"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import { useAuthStore } from "../store/auth";

const toast = useToast();
const store = useAuthStore();
const router = useRouter();
const route = useRoute();

const loading = ref(false);
const fields = reactive({ email: "", password: "" });

const handleSubmit = async () => {
  if (!fields.email || !fields.password) {
    alert("Filled the all input fields");
    return;
  }

  loading.value = true;

  try {
    await store.handleLogin({ email: fields.email, password: fields.password });
    toast.success("Login successfully");
    router.push(route.query.redirect || "/");
  } catch (error) {
    toast.error(error.response.data || error.response.data.message);
  } finally {
    loading.value = false;
  }
};
</script>
