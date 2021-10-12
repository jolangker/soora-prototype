<template>
  <el-container>
    <el-aside class="min-h-screen flex flex-col">
      <Sidebar />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";

export default {
  components: { Sidebar },
};
</script>

<style lang="scss">
.el-container {
  .el-aside {
    background-color: var(--el-color-primary);
    box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }
  .el-main {
    --el-main-padding: 40px;
  }
}
</style>
