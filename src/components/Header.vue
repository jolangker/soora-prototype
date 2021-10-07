<template>
  <nav class="bg-azure px-32 py-2 text-white flex justify-between items-center">
    <router-link :to="{ name: 'Dashboard' }" class="font-bebas text-3xl">
      SOORA
    </router-link>
    <div role="button" class="relative" @click="toggleMenu">
      <div class="flex items-center">
        <div
          class="
            w-10
            h-10
            border-2 border-white
            rounded-full
            relative
            overflow-hidden
          "
        >
          <img
            src="../assets/user.png"
            alt="user picture"
            class="absolute inset-0"
          />
        </div>
        <h3 class="ml-2">Paquito Tzy</h3>
      </div>
      <el-collapse-transition>
        <div
          v-if="show"
          class="absolute w-full px-2 bg-white top-11 rounded text-lg shadow"
        >
          <el-link icon="el-icon-setting" :underline="false" @click="toAdmin">
            Adminsitrator
          </el-link>
          <el-link icon="el-icon-back" :underline="false" @click="logout">
            Logout
          </el-link>
        </div>
      </el-collapse-transition>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue-demi";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const show = ref(false);

    const toggleMenu = () => {
      show.value = !show.value;
    };

    const logout = () => {
      router.push({ name: "Login" });
    };

    const toAdmin = () => {
      router.push({ name: "Admin" });
    };

    return {
      show,
      toggleMenu,
      logout,
      toAdmin,
    };
  },
};
</script>

<style></style>
