<template>
  <nav class="bg-azure px-32 py-2 text-white flex justify-between items-center">
    <router-link :to="{ name: 'Dashboard' }" class="font-bebas text-3xl">
      SOORA
    </router-link>
    <div role="button" class="relative" @click="toggleMenu">
      <div class="flex items-center">
        <el-avatar
          :src="`https://ui-avatars.com/api/?name=${fullName}&background=random&rounded=true`"
          :size="30"
        />
        <p class="ml-2">{{ fullName }}</p>
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
import getVariables from "../composeables/getVariables";
import axios from "axios";

export default {
  setup() {
    const { userSession } = getVariables();
    const router = useRouter();
    const show = ref(false);

    const firstName = userSession?.user?.first_name;
    const lastName = userSession?.user?.last_name;
    const fullName = `${firstName} ${lastName}`;

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
      fullName,
    };
  },
};
</script>

<style></style>
