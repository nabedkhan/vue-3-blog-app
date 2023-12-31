<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
      >
        Register with an email
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit()">
        <div>
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>

          <div class="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              v-model="fields.name"
              autocomplete="name"
              class="block w-full py-3 text-gray-800 border-0 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

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
          <label
            for="confirm-password"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirm Password
          </label>

          <div class="mt-2">
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              v-model="fields.confirmPassword"
              autocomplete="current-password"
              class="block w-full py-3 text-gray-800 border-0 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex justify-center w-full px-3 py-2.5 text-sm font-semibold leading-6 tracking-widest text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-800"
            :disabled="loading"
          >
            <svg
              v-if="loading"
              aria-hidden="true"
              role="status"
              class="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>

            {{ loading ? "Loading..." : "Register" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../store/auth";

const toast = useToast();
const router = useRouter();
const store = useAuthStore();

const loading = ref(false);

const fields = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleSubmit = async () => {
  if (fields.password !== fields.confirmPassword) {
    alert("Password does not match!");
    return;
  }

  if (
    !fields.name ||
    !fields.email ||
    !fields.password ||
    !fields.confirmPassword
  ) {
    alert("Filled the all input fields");
    return;
  }

  loading.value = true;

  try {
    await store.handleRegister({
      name: fields.name,
      email: fields.email,
      password: fields.password,
    });

    toast.success("Registered successfully");
    router.push("/");
  } catch (error) {
    toast.error(error.response.data || error.response.data.message);
  } finally {
    loading.value = false;
  }
};
</script>
