<template>
  <el-upload
    ref="uploadAudio"
    action="#"
    drag
    :on-change="fileValidation"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :limit="1"
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
      <el-select
        v-model="meetingForm.participants"
        multiple
        placeholder="Pilih Peserta"
        class="w-full"
      >
        <el-option
          v-for="participant in participantsList"
          :key="participant"
          :label="participant.full_name"
          :value="participant.full_name"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-button
      type="primary"
      class="w-full"
      :loading="isLoading"
      @click="submitForm('meetingForm')"
    >
      PROSES
    </el-button>
  </el-form>
</template>

<script>
import axios from "axios";
import { ref } from "vue-demi";
import moment from "moment";

export default {
  data() {
    return {
      meetingForm: {
        title: "",
        date: "",
        participants: [],
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

      participantsList: this.getParticipants(),
      isLoading: false,
      transcript: this.getTranscript(),
      meetingDetails: {},

      audioTypes: [
        "audio/mpeg",
        "video/mpeg",
        "audio/vnd.wave",
        "audio/wav",
        "audio/wave",
        "audio/x-wav",
        "audio/mp4",
        "audio/ogg,",
        "audio/webm",
      ],
    };
  },
  methods: {
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.isLoading = !this.isLoading;

          this.meetingDetails = {
            title: this.meetingForm.title,
            meetingDate: moment(this.meetingForm.date).format("DD-MM-YYYY"),
            participants: this.meetingForm.participants,
            totalParticipants: this.meetingForm.participants.length,
            transcript: this.transcript,
            dateCreated: moment(),
            audioDuration: Math.round(Math.random() * 100),
          };

          axios
            .post("http://localhost:3000/reports", this.meetingDetails)
            .then((res) => {
              console.log(res.data);
              this.isLoading = false;
              this.$router.push({
                name: "Meetings",
                params: { id: res.data.id },
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    getTranscript() {
      const ts = ref([]);

      axios.get("http://localhost:3000/transcript").then((res) => {
        ts.value = res.data;
      });

      return ts;
    },
    getParticipants() {
      const par = ref([]);

      axios.get("http://localhost:3000/participants").then((res) => {
        par.value = res.data.map((data) => {
          data.full_name = `${data.first_name} ${data.last_name}`;
          return data;
        });
      });

      return par;
    },
    fileValidation(file, fileList) {
      console.log(file);
      if (!this.audioTypes.includes(file.raw.type)) {
        fileList.splice(0, 1);
        this.$message.warning("Hanya menerima file jenis audio");
      }
    },
    handleExceed() {
      this.$message.warning("File tidak boleh lebih dari 1");
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
