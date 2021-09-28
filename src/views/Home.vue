<template>
  <Navbar />
  <main class="px-32 py-8">
    <router-view />
  </main>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  components: { Navbar },
};
</script>
