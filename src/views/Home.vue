<template>
  <Navbar />
  <main class="py-8">
    <Cards />
  </main>
</template>

<script>
import Cards from "../components/Cards.vue";
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar, Cards },
};

Cards;
</script>

<style></style>
