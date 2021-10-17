<template>
  <div class="flex flex-col items-center py-5 border-b">
    <el-avatar
      :src="`https://ui-avatars.com/api/?name=${fullName}&background=random&rounded=true`"
      :size="100"
    />
    <div class="mt-2 text-white">
      <p>{{ fullName }}</p>
    </div>
  </div>
  <el-menu
    class="el-menu-vertical"
    :router="true"
    :default-active="activeRoute"
  >
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-document"></i>
        <span>Data Master</span>
      </template>
      <el-menu-item index="MParticipants" :route="{ name: 'MParticipants' }">
        Master Peserta
      </el-menu-item>
      <el-menu-item index="MCompanies" :route="{ name: 'MCompanies' }">
        Master Perusahaan
      </el-menu-item>
      <el-menu-item index="MJobTitle" :route="{ name: 'MJobTitle' }">
        Master Jabatan
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  <div class="mt-auto w-full flex">
    <router-link :to="{ name: 'Login' }" class="flex-grow">
      <el-button type="primary" class="w-full">Logout</el-button>
    </router-link>
    <router-link :to="{ name: 'Dashboard' }" class="flex-grow">
      <el-button type="primary" class="w-full">Dashboard</el-button>
    </router-link>
  </div>
</template>

<script>
import { CaretBottom } from "@element-plus/icons";
import getVariables from "../composeables/getVariables";
import { onMounted, ref, watch } from "vue-demi";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { CaretBottom },
  setup() {
    const { userSession } = getVariables();
    const firstName = userSession?.user?.first_name;
    const lastName = userSession?.user?.last_name;
    const fullName = `${firstName} ${lastName}`;

    const activeRoute = ref(null);
    const route = useRoute();

    onMounted(() => {
      activeRoute.value = route.name;
      console.log(activeRoute.value);
    });

    watch(route, (to, from) => {
      activeRoute.value = to.name;
      console.log(activeRoute.value);
    });

    return {
      fullName,
      activeRoute,
    };
  },
};
</script>

<style lang="scss"></style>
