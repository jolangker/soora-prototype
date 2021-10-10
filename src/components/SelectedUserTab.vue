<template>
  <el-radio-group v-model="selectedUser">
    <el-scrollbar>
      <div class="flex h-14">
        <el-radio-button
          v-for="participant in meetingDetails.participants"
          :key="participant"
          :label="participant"
          class="flex-grow"
        />
      </div>
    </el-scrollbar>
  </el-radio-group>
  <div v-if="filteredMessage.length">
    <p
      v-for="msg in filteredMessage"
      :key="msg"
      class="px-1 py-2 border-b border-azure border-opacity-30"
    >
      {{ msg.message }}
    </p>
    <small class="font-semibold text-nickel">
      TOTAL PERCAKAPAN : {{ filteredMessage.length }}
    </small>
  </div>
  <div v-else class="text-center italic">
    <p>Tidak ada percakapan</p>
  </div>
</template>

<script>
import { computed, ref } from "vue-demi";
export default {
  props: {
    meetingDetails: Object,
  },
  setup(props) {
    const selectedUser = ref("");

    const filteredMessage = computed(() => {
      return props.meetingDetails.transcript?.filter((data) => {
        return data.talker.includes(selectedUser.value);
      });
    });

    return {
      selectedUser,
      filteredMessage,
    };
  },
};
</script>

<style></style>
