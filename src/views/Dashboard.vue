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
import { reactive, ref } from "vue-demi";
import moment from "moment";
import getVariables from "../composeables/getVariables";

export default {
  components: { Cards, Datatable },
  setup() {
    const { urlReports, urlParticipants } = getVariables();
    const reports = reactive([]);
    const totalParticipants = ref(0);
    const totalDurations = ref(0);

    axios.get(urlReports).then((res) => {
      reports.push(...res.data);
      reports.map((data) => {
        data.meetingDate = moment(data.meetingDate).format("DD-MM-YYYY");
        return data;
      });

      if (reports.length) {
        totalDurations.value = res.data
          .map((data) => data.audioDuration)
          .reduce((prev, curr) => prev + curr);
      }
    });

    axios.get(urlParticipants).then((res) => {
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
