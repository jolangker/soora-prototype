<template>
  <el-dialog
    v-model="modalVisiblity"
    title="EDIT PESERTA"
    width="30%"
    top="10vh"
    @close="onClose"
  >
    <el-form ref="editForm" :model="editFormModel" :rules="rules" status-icon>
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
        <el-button type="primary" :loading="isLoading" @click="editParticipant">
          SIMPAN
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { onMounted, onUpdated, reactive, ref, toRefs, watch } from "vue-demi";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  props: {
    modalVisiblity: Boolean,
  },
  emits: ["updateEditVisible"],
  setup(props, { emit }) {
    const editFormModel = reactive({
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      job_title: "",
    });
    const editForm = ref(null);
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

    const onClose = () => {
      emit("updateEditVisible", false);
    };

    const { first_name, last_name, email, company, job_title } =
      toRefs(editFormModel);

    const editParticipant = () => {
      editForm.value.validate((valid) => {
        if (valid) {
          isLoading.value = true;
          setTimeout(() => {
            isLoading.value = false;
            emit("updateEditVisible", false);
            ElMessage({
              type: "success",
              message: "Peserta Berhasil Ditambahkan!",
            });
          }, 3000);
        } else {
          return false;
        }
      });
    };

    return {
      editFormModel,
      editForm,
      last_name,
      email,
      company,
      job_title,
      first_name,
      onClose,
      editParticipant,
      rules,
      isLoading,
    };
  },
};
</script>

<style></style>
