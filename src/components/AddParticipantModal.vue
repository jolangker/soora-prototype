<template>
  <el-dialog
    v-model="modalVisiblity"
    title="TAMBAH PESERTA"
    width="30%"
    top="10vh"
    @close="onClose"
  >
    <el-form ref="addForm" :model="addFormModel" :rules="rules" status-icon>
      <el-form-item prop="first_name">
        <el-input v-model="first_name" placeholder="Nama Depan" />
      </el-form-item>
      <el-form-item prop="last_name">
        <el-input v-model="last_name" placeholder="Nama Belakang" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="email" placeholder="Email" />
      </el-form-item>
      <el-form-item prop="company">
        <el-input v-model="company" placeholder="Perusahaan" />
      </el-form-item>
      <el-form-item prop="job_title">
        <el-input v-model="job_title" placeholder="Jabatan" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onClose">BATALKAN</el-button>
        <el-button type="primary" :loading="isLoading" @click="addParticipant">
          TAMBAH
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, toRefs } from "vue-demi";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default {
  props: {
    modalVisiblity: Boolean,
  },
  emits: ["updateVisible"],
  setup(props, { emit }) {
    const addFormModel = reactive({
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      job_title: "",
    });
    const addForm = ref(null);
    const rules = {
      first_name: [
        {
          required: true,
          message: "Nama Depan tidak boleh kosong",
          trigger: "blur",
        },
      ],
      last_name: [
        {
          required: true,
          message: "Nama Belakang tidak boleh kosong",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          message: "Nama Belakang tidak boleh kosong",
          trigger: "blur",
        },
        {
          type: "email",
          message: "Harap masukkan email yang valid",
          trigger: "blur",
        },
      ],
    };
    const isLoading = ref(false);
    const router = useRouter();

    const onClose = () => {
      emit("updateVisible", false);
      addForm.value.resetFields();
    };

    const { first_name, last_name, email, company, job_title } =
      toRefs(addFormModel);

    const addParticipant = () => {
      addForm.value.validate((valid) => {
        if (valid) {
          isLoading.value = true;
          setTimeout(() => {
            axios
              .post("http://localhost:3000/participants", addFormModel)
              .then((res) => {
                emit("updateVisible", false);
                ElMessage({
                  type: "success",
                  message: "Peserta Berhasil Ditambahkan!",
                });
                router.go();
              })
              .catch((err) => {
                ElMessage({
                  type: "error",
                  message: err,
                });
              })
              .then(() => {
                isLoading.value = false;
              });
          }, 3000);
        } else {
          return false;
        }
      });
    };

    return {
      addFormModel,
      addForm,
      last_name,
      email,
      company,
      job_title,
      first_name,
      onClose,
      addParticipant,
      rules,
      isLoading,
    };
  },
};
</script>

<style></style>
