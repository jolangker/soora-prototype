<template>
  <el-container v-if="isLogin">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside>
        <Sidebar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { ref } from "vue-demi";

export default {
  components: { Header, Sidebar },
  setup() {
    const router = useRouter();
    const isLogin = ref(false);
    const loginValidation = () => {
      if (!sessionStorage.length) {
        ElMessage({
          message: "Anda belum login. Harap login terlebih dahulu.",
          type: "warning",
        });
        router.push({ name: "Login" });
      } else {
        isLogin.value = true;
      }
    };

    window.onload = loginValidation();

    return {
      isLogin,
    };
  },
};
</script>

<style lang="scss">
.el-container {
  .el-header {
    background-color: var(--el-color-primary);
    height: 50px;
  }
  .el-aside {
    background-color: white;
    box-shadow: 4px 0px 8px 0 rgba($color: #000000, $alpha: 0.1);
    min-height: 100vh;
    width: auto;
  }
}
</style>
