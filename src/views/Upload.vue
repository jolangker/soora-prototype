<template>
  <el-upload
    ref="uploadAudio"
    action="https://jsonplaceholder.typicode.com/posts/"
    drag
    :auto-upload="false"
    prop="file"
    status-icon
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
  </el-upload>

  <div class="h-px bg-azure my-3"></div>

  <el-form
    ref="meetingForm"
    :model="meetingForm"
    :rules="rules"
    label-width="150px"
  >
    <el-form-item label="Judul Meeting" prop="title">
      <el-input v-model="meetingForm.title"></el-input>
    </el-form-item>
    <el-form-item label="Tanggal Meeting" prop="date">
      <el-date-picker
        v-model="meetingForm.date"
        type="date"
        class="w-full"
        placeholder="Pilih Tanggal"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="Peserta Meeting" prop="participants">
      <el-input v-model="meetingForm.participants"></el-input>
      <el-button type="primary" class="ml-2" icon="el-icon-plus"></el-button>
    </el-form-item>

    <el-button
      type="primary"
      class="w-full"
      :loading="isLoading"
      @click="submitForm('meetingForm')"
      >PROSES</el-button
    >
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      meetingForm: {
        title: "",
        date: "",
        participants: "",
      },

      rules: {
        title: [
          {
            required: true,
            message: "Judul Meeting tidak boleh kosong",
            trigger: "blur",
          },
        ],
        date: [
          {
            required: true,
            message: "Tanggal Meeting tidak boleh kosong",
            trigger: "blur",
          },
        ],
        participants: [
          {
            required: true,
            message: "Peserta Meeting tidak boleh kosong",
            trigger: "blur",
          },
        ],
        file: [
          {
            required: true,
            message: "Harap upload file terlebih dahulu",
            trigger: "blur",
          },
        ],
      },

      isLoading: false,
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isLoading = !this.isLoading;

          console.log(this.meetingForm.title);
          console.log(this.meetingForm.date);
          console.log(this.meetingForm.participants);

          setTimeout(() => {
            this.isLoading = false;
          }, 3000);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.el-upload {
  width: 100%;
}
.el-upload-dragger {
  width: 100%;
  height: auto;
  padding: 30px 0 70px 0;
  z-index: -99;
}
.el-form-item__label {
  text-align: left;
}
.el-date-editor.el-input {
  width: 100%;
}
.el-form-item__content {
  display: flex;
}
</style>
