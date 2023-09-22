<template>
  <!--  HEADER SECTION -->
  <Header />

  <!--  MAIN CONTENT SECTION -->
  <main class="px-4 py-8">
    <div class="container mx-auto">
      <slot />
    </div>
  </main>

  <!--  FOOTER SECTION -->
  <Footer />
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>
