<template>
  <div class="font-semibold text-nickel">
    <h1 class="text-center text-4xl">{{ meetingDetails.title }}1</h1>
    <div class="flex justify-start space-x-3 mt-2 text-sm">
      <div class="flex flex-col space-y-3">
        <h2>Tanggal Laporan Dibuat</h2>
        <h2>Tanggal Meeting</h2>
        <h2>Peserta</h2>
      </div>
      <div class="flex flex-col space-y-3">
        <p>: {{ moment(meetingDetails.dateCreated).format("DD-MM-YYYY") }}</p>
        <p>: {{ meetingDetails.meetingDate }}</p>
        <p>
          : {{ meetingDetails.participants?.join(", ") }} ({{
            meetingDetails.participants?.length
          }})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    meetingDetails: Object,
  },
  setup(props) {
    return {
      moment,
    };
  },
};
</script>

<style></style>
