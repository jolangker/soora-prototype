<template>
  <el-container>
    <el-aside class="z-50 h-screen flex flex-col fixed">
      <Sidebar />
    </el-aside>
    <el-aside class="z-0" />
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
    background-color: white;
    box-shadow: 2px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>
