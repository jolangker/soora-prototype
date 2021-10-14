<template>
  <div class="text-nickel">
    <div class="text-center text-4xl font-bold">
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
    <div class="flex flex-col space-y-2 mt-3 text-sm font-semibold">
      <el-row class="items-center">
        <el-col :span="6">Tanggal Laporan Dibuat</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="17">
          <p v-if="!isEditing1" @click="changeMode1">
            {{ moment(meetingDetails?.dateCreated)?.format("DD-MM-YYYY") }}
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
        </el-col>
      </el-row>
      <el-row class="items-center">
        <el-col :span="6">Tanggal Meeting</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="17">
          <p v-if="!isEditing2" @click="changeMode2">
            {{ moment(meetingDetails?.meetingDate)?.format("DD-MM-YYYY") }}
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
        </el-col>
      </el-row>
      <el-row class="items-center">
        <el-col :span="6">Peserta Meeting</el-col>
        <el-col :span="1">:</el-col>
        <el-col :span="17">
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
              filterable
              size="mini"
              class="w-full"
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
        </el-col>
      </el-row>
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
import getVariables from "../composeables/getVariables";

export default {
  props: {
    meetingDetails: Object,
  },
  components: { Edit, CircleCloseFilled, CircleCheckFilled },
  setup(props) {
    const { urlParticipants, urlReports } = getVariables();
    const { id, title, dateCreated, meetingDate, participants } = toRefs(
      props.meetingDetails
    );
    const participantsList = reactive([]);

    axios.get(urlParticipants).then((res) => {
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
          .patch(`${urlReports}${id.value}/`, {
            dateCreated: moment(dateCreated.value),
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
        meetingDate.value = moment(meetingDate.value);

        axios
          .patch(`${urlReports}${id.value}/`, {
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
          .patch(`${urlReports}${id.value}/`, {
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
          .patch(`${urlReports}${id.value}/`, {
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
