<template>
  <div
    class="bg-white flex-grow flex flex-col justify-center items-center px-16"
  >
    <h2 class="font-bebas text-azure text-6xl mb-3">SOORA</h2>
    <el-form
      ref="loginForm"
      :model="loginFormModel"
      :rules="rules"
      status-icon
      class="w-full"
    >
      <el-form-item prop="username">
        <el-input v-model="username" placeholder="Username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="password" show-password placeholder="Password" />
      </el-form-item>
      <el-button
        type="primary"
        @click="login"
        :loading="isLoading"
        class="w-full"
      >
        LOGIN
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue-demi";
import { useRouter } from "vue-router";
export default {
  setup() {
    const loginFormModel = reactive({
      username: "",
      password: "",
    });

    const rules = {
      username: [
        {
          required: true,
          message: "Username tidak boleh kosong!",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Password tidak boleh kosong!",
          trigger: "blur",
        },
      ],
    };

    const { username, password } = toRefs(loginFormModel);
    const loginForm = ref(null);
    const isLoading = ref(false);
    const router = useRouter();

    const login = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          isLoading.value = true;
          setTimeout(() => {
            isLoading.value = false;
            router.push({ name: "Home" });
          }, 3000);
        } else {
          return false;
        }
      });
    };

    return {
      loginFormModel,
      loginForm,
      username,
      password,
      rules,
      login,
      isLoading,
    };
  },
};
</script>

<style></style>
