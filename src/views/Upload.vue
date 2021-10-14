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
    :model="meetingFormModel"
    :rules="rules"
    label-width="150px"
  >
    <el-form-item label="Judul Meeting" prop="title">
      <el-input v-model="title" placeholder="Masukan Judul Meeting"></el-input>
    </el-form-item>
    <el-form-item label="Tanggal Meeting" prop="date">
      <el-date-picker
        v-model="date"
        type="date"
        class="w-full"
        placeholder="Pilih Tanggal"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="Peserta Meeting" prop="participants">
      <el-select
        v-model="participants"
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
import { reactive, ref, toRefs } from "vue-demi";
import moment from "moment";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import getVariables from "../composeables/getVariables";

export default {
  setup() {
    const { urlParticipants, urlReports, urlTransript } = getVariables();
    const meetingForm = ref(null);
    const meetingFormModel = reactive({
      title: "",
      date: "",
      participants: [],
    });

    const rules = {
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
    };

    const audioTypes = [
      "audio/mpeg",
      "video/mpeg",
      "audio/vnd.wave",
      "audio/wav",
      "audio/wave",
      "audio/x-wav",
      "audio/mp4",
      "audio/ogg,",
      "audio/webm",
    ];

    const { title, date, participants } = toRefs(meetingFormModel);
    const participantsList = reactive([]);
    const transcript = reactive([]);
    const meetingDetails = reactive({});
    const isLoading = ref(false);
    const router = useRouter();

    axios.get(urlParticipants).then((res) => {
      participantsList.push(...res.data);
      participantsList.map((data) => {
        data.full_name = `${data.first_name} ${data.last_name}`;
        return data;
      });
    });

    axios.get(urlTransript).then((res) => {
      transcript.push(...res.data);
    });

    const submitForm = () => {
      meetingForm.value.validate((valid) => {
        if (valid) {
          isLoading.value = true;

          meetingDetails.title = title.value;
          meetingDetails.meetingDate = moment(date.value);
          meetingDetails.participants = participants.value;
          meetingDetails.totalParticipants = participants.value.length;
          meetingDetails.transcript = transcript;
          meetingDetails.dateCreated = moment();
          meetingDetails.audioDuration = Math.round(Math.random() * 100);

          axios
            .post(urlReports, meetingDetails)
            .then((res) => {
              router.push({ name: "Meetings", params: { id: res.data.id } });
            })
            .catch((err) => {
              console.log(err);
            })
            .then(() => {
              isLoading.value = false;
            });
        } else {
          return false;
        }
      });
    };

    const fileValidation = (file, fileList) => {
      if (!audioTypes.includes(file.raw.type)) {
        fileList.splice(0, 1);
        ElMessage({
          message: "File tidak valid. Harap masukkan file audio.",
          type: "warning",
        });
      }
    };

    const handleExceed = () => {
      ElMessage({
        message: "File tidak boleh lebih dari 1",
        type: "warning",
      });
    };

    return {
      meetingForm,
      meetingFormModel,
      rules,
      audioTypes,
      title,
      date,
      participants,
      participantsList,
      isLoading,
      submitForm,
      fileValidation,
      handleExceed,
    };
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
