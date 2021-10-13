<template>
  <div class="flex flex-col items-center py-5 border-b">
    <el-avatar icon="el-icon-user-solid" :size="100" />
    <div class="mt-2 text-white">
      <p>Paqutio Tzy</p>
    </div>
  </div>
  <el-menu class="el-menu-vertical" :router="true">
    <el-sub-menu index="1">
      <template #title>
        <i class="el-icon-document"></i>
        <span>Data Master</span>
      </template>
      <el-menu-item index="1-1" :route="{ name: 'MParticipants' }">
        Master Peserta
      </el-menu-item>
      <el-menu-item index="1-2" :route="{ name: 'MCompanies' }">
        Master Perusahaan
      </el-menu-item>
      <el-menu-item index="1-3" :route="{ name: 'MJobTitle' }">
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
import { ref } from "vue-demi";
import { useRouter } from "vue-router";

export default {
  components: { CaretBottom },
};
</script>

<style lang="scss">
.el-menu {
  --el-menu-active-color: rgba(250, 250, 250, 1);
  --el-menu-text-color: rgba(250, 250, 250, 0.7);
  --el-menu-background-color: var(--el-color-primary);
  --el-menu-hover-background-color: #005eb6;
  --el-menu-border-color: none;

  :hover {
    color: white;
  }

  .el-menu--inline {
    --el-menu-background-color: #007dda;
  }
}
</style>
