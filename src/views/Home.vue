<template>
  <Navbar />
  <main class="px-32 py-8">
    <Cards />
    <div class="h-px bg-azure mt-8 opacity-30"></div>
    <Datatable />
  </main>
</template>

<script>
import Cards from "../components/Cards.vue";
import Navbar from "../components/Navbar.vue";
import Datatable from "../components/Datatable.vue";
export default {
  components: { Navbar, Cards, Datatable },
};
</script>
