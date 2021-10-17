<template>
  <el-menu
    class="el-menu-vertical"
    :router="true"
    :default-active="activeRoute"
    @select="handleSelect"
    :collapse="true"
  >
    <el-menu-item index="Dashboard" :route="{ name: 'Dashboard' }">
      <i class="el-icon-menu"></i>
      <span>Dashboard</span>
    </el-menu-item>
    <el-sub-menu index="master">
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
      <el-menu-item index="MJobTitles" :route="{ name: 'MJobTitles' }">
        Master Jabatan
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import getVariables from "../composeables/getVariables";
import { onMounted, ref } from "vue-demi";
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
      console.log(activeRoute.value);
    });

    const handleSelect = (index, indexPath, item, routeResult) => {
      activeRoute.value = index;
    };

    return {
      fullName,
      activeRoute,
      handleSelect,
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
