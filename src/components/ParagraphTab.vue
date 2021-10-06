<template>
  <p>
    {{ paragraph?.join(" ") }}
  </p>
</template>

<script>
import { computed } from "vue-demi";
export default {
  props: {
    meetingDetails: Object,
  },
  setup(props) {
    const paragraph = computed(() => {
      return props.meetingDetails.transcript?.map((data) => {
        return data.message;
      });
    });

    return {
      paragraph,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  text-indent: 40px;
  text-align: justify;
}
</style>
