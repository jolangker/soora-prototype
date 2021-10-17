<template>
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
</template>

<script>
import getVariables from "../composeables/getVariables";
import { onMounted, ref, watch } from "vue-demi";
import { useRoute } from "vue-router";

export default {
  setup() {
    const { userSession } = getVariables();
    const firstName = userSession?.user?.first_name;
    const lastName = userSession?.user?.last_name;
    const fullName = `${firstName} ${lastName}`;

    const activeRoute = ref(null);
    const route = useRoute();

    onMounted(() => {
      activeRoute.value = route.name;
    });

    watch(route, (to, from) => {
      activeRoute.value = to.name;
    });

    return {
      fullName,
      activeRoute,
    };
  },
};
</script>

<style lang="scss">
.el-menu {
  --el-menu-text-color: black;
  --el-menu-background-color: white;
  --el-menu-border-color: none;
}
</style>
