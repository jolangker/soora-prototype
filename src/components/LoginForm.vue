<template>
  <div
    class="bg-white flex-grow flex flex-col justify-center items-center px-16"
  >
    <h2 class="font-bebas text-azure text-6xl mb-3">SOORA</h2>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      status-icon
      class="w-full"
    >
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="Username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          show-password
          placeholder="Password"
        />
      </el-form-item>
      <el-button
        type="primary"
        @click="login('ruleForm')"
        :loading="isLoading"
        class="w-full"
        >LOGIN</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { ref } from "vue-demi";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },

      rules: {
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
      },

      isLoading: false,
    };
  },
  methods: {
    login(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isLoading = true;

          setTimeout(() => {
            this.isLoading = false;
            this.$router.push({ name: "Home" });
          }, 3000);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style></style>
