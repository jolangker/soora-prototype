<template>
  <div class="px-32 flex space-x-8">
    <Card class="flex-grow" v-for="card in cards" :key="card">
      <template v-slot:value>{{ card.value }}</template>
      <template v-slot:info>{{ card.info }}</template>
      <template v-slot:title>{{ card.title }}</template>
      <template v-slot:icon>
        <img
          :src="card.icon"
          :alt="card.title + ' icon'"
          class="absolute w-16 h-20 right-0 bottom-0 opacity-20"
        />
      </template>
    </Card>
    <upload-card class="flex-grow" />
  </div>
</template>

<script>
import Card from "./Card.vue";
import UploadCard from "./UploadCard.vue";
export default {
  components: { Card, UploadCard },
  setup() {
    const cards = [
      {
        title: "Jumlah Rekaman",
        value: "5",
        icon: "src/assets/microphone.svg",
      },
      {
        title: "Jumlah Peserta",
        value: "17",
        icon: "src/assets/users.svg",
      },
      {
        title: "Total Durasi",
        value: "67",
        info: "Menit",
        icon: "src/assets/clock.svg",
      },
    ];

    return {
      cards,
    };
  },
};
</script>

<style></style>
