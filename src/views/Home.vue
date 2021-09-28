<template>
  <Navbar />
  <main class="px-32 py-8">
    <Cards :recordList="recordList" />
    <div class="h-px bg-azure mt-8 opacity-30"></div>
    <Datatable :recordList="recordList" />
  </main>
</template>

<script>
import Cards from "../components/Cards.vue";
import Navbar from "../components/Navbar.vue";
import Datatable from "../components/Datatable.vue";
import axios from "axios";
import { ref } from "vue-demi";

export default {
  components: { Navbar, Cards, Datatable },
  setup() {
    const recordList = ref([]);

    axios
      .get("https://my-json-server.typicode.com/jolangker/data/records")
      .then((res) => {
        recordList.value = res.data;
      });

    return {
      recordList,
    };
  },
};
</script>
