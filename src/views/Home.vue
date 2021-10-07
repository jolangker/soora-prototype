<template>
  <Header />
  <main class="px-32 py-8">
    <router-view />
  </main>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: { Header },
};
</script>
