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
      <el-form-item prop="email">
        <el-input v-model="email" placeholder="Email" />
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
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const loginFormModel = reactive({
      email: "",
      password: "",
    });

    const rules = {
      email: [
        {
          required: true,
          message: "Email tidak boleh kosong!",
          trigger: "blur",
        },
        {
          type: "email",
          message: "Harap masukkan email yang valid!",
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

    const { email, password } = toRefs(loginFormModel);
    const loginForm = ref(null);
    const isLoading = ref(false);
    const router = useRouter();

    const login = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          isLoading.value = true;

          axios
            .post("https://soora-shollu.herokuapp.com/api/auth/login/", {
              email: email.value,
              password: password.value,
            })
            .then((res) => {
              sessionStorage.setItem("userSession", JSON.stringify(res.data));
              router.push({ name: "Home" });
            })
            .catch((err) => {
              if (err.response.status === 400) {
                ElMessage({
                  message:
                    "Login gagal. Harap periksa kembail email/password anda",
                  type: "warning",
                });
              } else {
                ElMessage({
                  message: err,
                  type: "error",
                });
              }
            })
            .then(() => {
              isLoading.value = false;
            });
        } else {
          return false;
        }
      });
    };

    return {
      loginFormModel,
      loginForm,
      email,
      password,
      rules,
      login,
      isLoading,
    };
  },
};
</script>

<style></style>
