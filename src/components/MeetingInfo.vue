<template>
  <div class="font-semibold text-nickel">
    <div class="text-center text-4xl">
      <h1 v-if="!isEditing3" @click="changeMode3">
        {{ meetingDetails.title }}
      </h1>
      <div v-else class="flex justify-center items-center">
        <el-input v-model="title" size="medium" class="w-40" />
        <el-icon class="ml-2" :size="20" role="button" @click="closeEdit3">
          <circle-close-filled />
        </el-icon>
        <el-icon class="ml-1" :size="20" role="button" @click="submitChange3">
          <circle-check-filled />
        </el-icon>
      </div>
    </div>
    <div class="flex justify-start space-x-3 mt-5 text-sm">
      <div class="flex flex-col space-y-3 w-64">
        <h2>Tanggal Laporan Dibuat</h2>
        <h2>Tanggal Meeting</h2>
        <h2>Peserta</h2>
      </div>
      <div class="flex flex-col space-y-3">
        <div class="flex items-center">
          <span class="mr-1">:</span>
          <p v-if="!isEditing1" @click="changeMode1">
            {{ moment(meetingDetails.dateCreated).format("DD-MM-YYYY") }}
          </p>
          <div v-else class="flex items-center">
            <el-date-picker v-model="dateCreated" type="date" size="mini" />
            <el-icon class="ml-2" :size="18" role="button" @click="closeEdit1">
              <circle-close-filled />
            </el-icon>
            <el-icon
              class="ml-1"
              :size="18"
              role="button"
              @click="submitChange1"
            >
              <circle-check-filled />
            </el-icon>
          </div>
        </div>
        <div class="flex items-center">
          <span class="mr-1">:</span>
          <p v-if="!isEditing2" @click="changeMode2">
            {{ meetingDetails.meetingDate }}
          </p>
          <div v-else class="flex items-center">
            <el-date-picker v-model="meetingDate" type="date" size="mini" />
            <el-icon class="ml-2" :size="18" role="button" @click="closeEdit2">
              <circle-close-filled />
            </el-icon>
            <el-icon
              class="ml-1"
              :size="18"
              role="button"
              @click="submitChange2"
            >
              <circle-check-filled />
            </el-icon>
          </div>
        </div>
        <div class="flex">
          <span class="mr-1">:</span>
          <p v-if="!isEditing4" @click="changeMode4">
            {{ meetingDetails.participants?.join(", ") }} ({{
              meetingDetails.participants?.length
            }})
          </p>
          <div v-else class="flex items-center">
            <el-select
              v-model="participants"
              multiple
              placeholder="Select"
              collapse-tags
              filterable
              size="mini"
            >
              <el-option
                v-for="participant in participantsList"
                :key="participant.full_name"
                :label="participant.full_name"
                :value="participant.full_name"
              >
              </el-option>
            </el-select>
            <el-icon class="ml-2" :size="18" role="button" @click="closeEdit4">
              <circle-close-filled />
            </el-icon>
            <el-icon
              class="ml-1"
              :size="18"
              role="button"
              @click="submitChange4"
            >
              <circle-check-filled />
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  Edit,
  CircleCloseFilled,
  CircleCheckFilled,
} from "@element-plus/icons";
import { reactive, ref, toRefs } from "vue-demi";
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  props: {
    meetingDetails: Object,
  },
  components: { Edit, CircleCloseFilled, CircleCheckFilled },
  setup(props) {
    const { id, title, dateCreated, meetingDate, participants } = toRefs(
      props.meetingDetails
    );
    const participantsList = reactive([]);

    axios.get("http://localhost:3000/participants/").then((res) => {
      participantsList.push(...res.data);
      participantsList.map((data) => {
        data.full_name = `${data.first_name} ${data.last_name}`;
        return data;
      });
    });

    const isEditing1 = ref(false);
    const changeMode1 = () => {
      isEditing1.value = true;
    };
    const closeEdit1 = () => {
      if (!dateCreated.value) return;
      isEditing1.value = false;
    };
    const submitChange1 = () => {
      if (!dateCreated.value) {
        ElMessage({
          type: "warning",
          message: "Input tidak boleh kosong",
        });
      } else {
        axios
          .patch(`http://localhost:3000/reports/${id.value}/`, {
            dateCreated: dateCreated.value,
          })
          .then((res) => {
            ElMessage({
              type: "success",
              message: "Perubahan berhasil disimpan",
            });
            isEditing1.value = false;
          })
          .catch((err) => {
            ElMessage({
              type: "error",
              message: `Gagal penyimpan perubahan, harap coba lagi. (${err})`,
            });
          });
      }
    };

    const isEditing2 = ref(false);
    const changeMode2 = () => {
      isEditing2.value = true;
    };
    const closeEdit2 = () => {
      if (!meetingDate.value) return;
      isEditing2.value = false;
    };
    const submitChange2 = () => {
      if (!meetingDate.value) {
        ElMessage({
          type: "warning",
          message: "Input tidak boleh kosong",
        });
      } else {
        meetingDate.value = moment(meetingDate.value).format("DD-MM-YYYY");

        axios
          .patch(`http://localhost:3000/reports/${id.value}/`, {
            meetingDate: meetingDate.value,
          })
          .then((res) => {
            ElMessage({
              type: "success",
              message: "Perubahan berhasil disimpan",
            });
            isEditing2.value = false;
          })
          .catch((err) => {
            ElMessage({
              type: "error",
              message: `Gagal penyimpan perubahan, harap coba lagi. (${err})`,
            });
          });
      }
    };

    const isEditing3 = ref(false);
    const changeMode3 = () => {
      isEditing3.value = true;
    };
    const closeEdit3 = () => {
      if (!title.value) return;
      isEditing3.value = false;
    };
    const submitChange3 = () => {
      if (!title.value) {
        ElMessage({
          type: "warning",
          message: "Input tidak boleh kosong",
        });
      } else {
        axios
          .patch(`http://localhost:3000/reports/${id.value}/`, {
            title: title.value,
          })
          .then((res) => {
            ElMessage({
              type: "success",
              message: "Perubahan berhasil disimpan",
            });
            isEditing3.value = false;
          })
          .catch((err) => {
            ElMessage({
              type: "error",
              message: `Gagal penyimpan perubahan, harap coba lagi. (${err})`,
            });
          });
      }
    };

    const isEditing4 = ref(false);
    const changeMode4 = () => {
      isEditing4.value = true;
    };
    const closeEdit4 = () => {
      if (!participants.value.length) return;
      isEditing4.value = false;
    };
    const submitChange4 = () => {
      if (!participants.value.length) {
        ElMessage({
          type: "warning",
          message: "Input tidak boleh kosong",
        });
      } else {
        axios
          .patch(`http://localhost:3000/reports/${id.value}/`, {
            participants: participants.value,
            totalParticipants: participants.value.length,
          })
          .then((res) => {
            ElMessage({
              type: "success",
              message: "Perubahan berhasil disimpan",
            });
            isEditing4.value = false;
          })
          .catch((err) => {
            ElMessage({
              type: "error",
              message: `Gagal penyimpan perubahan, harap coba lagi. (${err})`,
            });
          });
      }
    };

    return {
      moment,
      title,
      dateCreated,
      meetingDate,
      participants,
      participantsList,
      isEditing1,
      changeMode1,
      closeEdit1,
      submitChange1,
      isEditing2,
      changeMode2,
      closeEdit2,
      submitChange2,
      isEditing3,
      changeMode3,
      closeEdit3,
      submitChange3,
      isEditing4,
      changeMode4,
      closeEdit4,
      submitChange4,
    };
  },
};
</script>

<style></style>
