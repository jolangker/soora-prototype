<template>
  <div class="flex">
    <login-intro />
    <login-form />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import LoginIntro from "../components/LoginIntro.vue";

export default {
  components: { LoginForm, LoginIntro },
  setup() {
    sessionStorage.clear();
  },
};
</script>

<style></style>
