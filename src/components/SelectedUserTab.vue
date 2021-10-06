<template>
  <div class="px-8 py-2">
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
    <div>
      <p v-for="msg in filteredMessage" :key="msg">
        {{ msg.message }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUpdate, ref } from "vue-demi";
export default {
  props: {
    meetingDetails: Object,
  },
  setup(props) {
    const selectedUser = ref("");

    onBeforeUpdate(() => {
      selectedUser.value = props.meetingDetails.participants[0];
    });

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
