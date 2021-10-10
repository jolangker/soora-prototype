<template>
  <Cards
    :reports="reports"
    :totalParticipants="totalParticipants"
    :totalDurations="totalDurations"
  />
  <div class="h-px bg-azure mt-8 opacity-30"></div>
  <Datatable :reports="reports" />
</template>

<script>
import Cards from "../components/Cards.vue";
import Datatable from "../components/Datatable.vue";
import axios from "axios";
import { ref } from "vue-demi";

export default {
  components: { Cards, Datatable },
  setup() {
    const reports = ref([]);
    const totalParticipants = ref(0);
    const totalDurations = ref(0);

    axios.get("http://localhost:3000/reports").then((res) => {
      reports.value = res.data;

      if (reports.value.length) {
        totalDurations.value = res.data
          .map((data) => data.audioDuration)
          .reduce((prev, curr) => prev + curr);
      }
    });

    axios.get("http://localhost:3000/participants").then((res) => {
      totalParticipants.value = res.data.length;
    });

    return {
      reports,
      totalParticipants,
      totalDurations,
    };
  },
};
</script>
