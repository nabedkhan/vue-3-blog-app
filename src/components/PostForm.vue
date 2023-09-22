<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
      >
        {{ editPost ? "Update or Edit Your Post" : "Create a New Post" }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
      <form class="space-y-6" @submit.prevent="$emit('create')">
        <div>
          <label
            for="title"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Title
          </label>

          <div class="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              :value="modelValue.title"
              @input="
                $emit('update:modelValue', {
                  ...modelValue,
                  title: $event.target.value,
                })
              "
              autocomplete="title"
              class="block w-full py-3 text-gray-800 border-0 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="description"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Description
          </label>

          <div class="mt-2">
            <textarea
              rows="6"
              id="description"
              name="description"
              type="text"
              :value="modelValue.body"
              @input="
                $emit('update:modelValue', {
                  ...modelValue,
                  body: $event.target.value,
                })
              "
              autocomplete="description"
              class="block w-full py-3 text-gray-800 border-0 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="tags"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Tags
          </label>

          <div class="mt-2">
            <input
              id="tags"
              name="tags"
              autocomplete="tags"
              class="block w-full py-3 text-gray-800 border-0 rounded-lg shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
              :value="modelValue.tags"
              @input="
                $emit('update:modelValue', {
                  ...modelValue,
                  tags: $event.target.value,
                })
              "
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex justify-center w-full px-3 py-2.5 text-sm font-semibold leading-6 tracking-widest text-white bg-gray-900 rounded-md shadow-sm hover:bg-gray-800"
          >
            {{ editPost ? "Update Post" : "Create Post" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: { body: "", title: "", tags: "" },
  },
  editPost: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>
