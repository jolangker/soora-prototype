<template>
  <nav class="h-full text-white flex justify-between items-center">
    <router-link :to="{ name: 'Dashboard' }" class="font-bebas text-3xl">
      SOORA
    </router-link>
    <div role="button" class="relative" @click="toggleMenu">
      <div class="flex items-center">
        <el-avatar
          :src="`https://ui-avatars.com/api/?name=${user.full_name}&background=random&rounded=true`"
          :size="30"
        />
        <p class="ml-2">{{ user.full_name }}</p>
      </div>
      <el-collapse-transition>
        <div
          v-if="show"
          class="
            z-50
            absolute
            w-full
            px-2
            bg-white
            top-11
            rounded
            text-lg
            shadow
          "
        >
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
    const { headers } = getVariables();
    const router = useRouter();
    const show = ref(false);
    const user = ref({});

    axios
      .get("https://soora-shollu.herokuapp.com/api/auth/user/", headers)
      .then((res) => {
        user.value = res.data;
        user.value.full_name = `${user.value.first_name} ${user.value.last_name}`;
        console.log(user.value);
      });

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
      user,
    };
  },
};
</script>

<style></style>
