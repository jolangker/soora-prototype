<template>
  <div class="flex-grow flex flex-col justify-center items-center">
    <h1 class="font-bebas text-6xl text-azure">SOORA</h1>
    <form
      class="mt-3 flex flex-col w-80"
      @submit.prevent="login"
      autocomplete="off"
    >
      <div>
        <input
          id="username"
          type="text"
          placeholder="Username"
          v-model="username"
          class="login__form"
          :class="{ 'border-azure': username }"
        />
        <p v-if="!username" class="login__error mt-1 hidden">
          Username tidak boleh kosong!
        </p>
      </div>
      <div class="mt-5">
        <input
          id="password"
          type="text"
          placeholder="Password"
          v-model="password"
          class="login__form"
          :class="{ 'border-azure': password }"
        />
        <p v-if="!password" class="login__error mt-1 hidden">
          Password tidak boleh kosong!
        </p>
      </div>
      <button class="login__button mt-5">LOGIN</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const username = ref("");
    const password = ref("");

    const validation = () => {
      if (!username.value) {
        const getUsername = document.querySelector("#username");
        const errMsg = getUsername.nextElementSibling;
        getUsername.classList.add("border-red-500");
        errMsg.classList.remove("hidden");
      }
      if (!password.value) {
        const getPassword = document.querySelector("#password");
        const errMsg = getPassword.nextElementSibling;
        getPassword.classList.add("border-red-500");
        errMsg.classList.remove("hidden");
      }
    };

    const login = () => {
      if (!username.value || !password.value) return validation();

      const btnLogin = document.querySelector(".login__button");
      btnLogin.setAttribute("disabled", true);
      btnLogin.classList.add("opacity-50", "cursor-not-allowed");

      setTimeout(() => {
        btnLogin.removeAttribute("disabled");
        btnLogin.classList.remove("opacity-50", "cursor-not-allowed");
      }, 3000);
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>

<style></style>
