<template>
  <div class="flex space-x-8">
    <card>
      <template v-slot:value>
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="recordList.length"
          :duration="1"
          :autoinit="true"
        />
      </template>
      <template v-slot:title>Jumlah Rekaman</template>
      <template v-slot:icon>
        <img
          src="../assets/microphone.svg"
          alt="microphone"
          class="absolute w-16 h-16 bottom-0 right-0 opacity-20"
        />
      </template>
    </card>
    <card>
      <template v-slot:value>
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="totalMember"
          :duration="1"
          :autoinit="true"
        />
      </template>
      <template v-slot:title>Jumlah Anggota</template>
      <template v-slot:icon>
        <img
          src="../assets/users.svg"
          alt="microphone"
          class="absolute w-16 h-16 bottom-0 right-0 opacity-20"
        />
      </template>
    </card>
    <card>
      <template v-slot:value>
        <vue3-autocounter
          ref="counter"
          :startAmount="0"
          :endAmount="totalDuration"
          :duration="1"
          :autoinit="true"
        />
        <span class="text-base ml-1">Jam</span>
      </template>
      <template v-slot:title>Total Durasi</template>
      <template v-slot:icon>
        <img
          src="../assets/clock.svg"
          alt="microphone"
          class="absolute w-16 h-16 bottom-0 right-0 opacity-20"
        />
      </template>
    </card>
    <upload-card class="flex-grow" />
  </div>
</template>

<script>
import { onBeforeUpdate, ref } from "vue-demi";
import Card from "./Card.vue";
import UploadCard from "./UploadCard.vue";
import Vue3Autocounter from "vue3-autocounter";

export default {
  components: { Card, UploadCard, Vue3Autocounter },
  props: {
    recordList: Array,
  },
  setup(props) {
    const totalDuration = ref(0);
    const totalMember = ref(0);

    onBeforeUpdate(() => {
      const duration = props.recordList
        .map((data) => data.duration)
        .reduce((prev, curr) => prev + curr);

      totalDuration.value = Math.floor(duration / 60);

      totalMember.value = props.recordList
        .map((data) => data.participants)
        .reduce((prev, curr) => (prev > curr ? prev : curr));
    });

    return {
      totalDuration,
      totalMember,
    };
  },
};
</script>

<style></style>
