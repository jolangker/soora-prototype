<template>
  <div class="flex flex-col space-y-4">
    <div v-for="(transcript, index) in meetingDetails.transcript" :key="index">
      <div class="flex items-start">
        <img
          :src="`https://ui-avatars.com/api/?name=${transcript.talker}&background=random&rounded=true&size=40`"
        />
        <div
          class="ml-2 bg-azure py-2 px-4 text-white rounded relative"
          @mouseenter="handleHover(index)"
        >
          <div class="mr-8">
            <div class="flex items-center">
              <h2 class="font-semibold">{{ transcript.talker }}</h2>
              <small
                v-show="editModeIndex === index"
                class="ml-3 font-bold text-yellow-300"
                >EDITING
              </small>
            </div>
            <textarea
              v-if="editModeIndex === index"
              v-model="editMessage"
              class="text-sm bg-transparent focus:outline-none"
              autofocus
            />
            <p v-else class="text-sm">{{ transcript.message }}</p>
          </div>
          <div class="absolute top-3 right-4" v-if="hoveringIndex === index">
            <el-icon v-if="isLoading" class="is-loading" :size="18">
              <loading />
            </el-icon>
            <div
              class="flex items-stretch space-x-1"
              v-else-if="editModeIndex === index"
            >
              <el-icon
                :size="18"
                role="button"
                title="Batalkan Perubahan"
                class="transform hover:scale-125"
                @click="cancelChanges"
              >
                <close />
              </el-icon>
              <div class="relative">
                <el-collapse-transition>
                  <div
                    class="
                      top-6
                      right-0
                      absolute
                      bg-white
                      py-2
                      px-6
                      rounded
                      z-50
                    "
                    v-if="listVisibility"
                  >
                    <el-radio
                      v-model="chooseParticipant"
                      v-for="participant in meetingDetails.participants"
                      :key="participant"
                      :label="participant"
                    >
                      {{ participant }}</el-radio
                    >
                  </div>
                </el-collapse-transition>
                <el-icon
                  id="listToggler"
                  :size="18"
                  role="button"
                  title="Pilih Peserta"
                  class="transform hover:scale-125"
                  @click="toggleList()"
                >
                  <user-filled />
                </el-icon>
              </div>
              <el-icon
                :size="18"
                role="button"
                title="Simpan Perubahan"
                class="transform hover:scale-125"
                @click="submitEdit(index)"
              >
                <check />
              </el-icon>
            </div>
            <div v-else class="flex items-center space-x-1">
              <el-icon
                :size="18"
                role="button"
                title="Edit Item Ini"
                class="transform hover:scale-125"
                @click="editMode(transcript, index)"
              >
                <edit />
              </el-icon>
            </div>
          </div>
        </div>
      </div>
      <small
        class="text-nickel font-semibold ml-12"
        v-if="transcript.lastUpdate.time"
      >
        Disunting Oleh
        <span class="italic font-bold">{{
          transcript.lastUpdate.updatedBy
        }}</span>
        -
        {{
          moment(transcript.lastUpdate.time).format(
            "dddd, MMMM Do YYYY, h:mm:ss"
          )
        }}
      </small>
    </div>
  </div>
</template>

<script>
import { Edit, Check, Loading, UserFilled, Close } from "@element-plus/icons";
import { ref } from "vue-demi";
import axios from "axios";
import moment from "moment";
import { ElMessage } from "element-plus";

export default {
  props: {
    id: String,
    meetingDetails: Object,
  },
  components: { Edit, Check, Loading, UserFilled, Close },
  setup(props) {
    const hoveringIndex = ref(null);
    const editModeIndex = ref(null);
    const editMessage = ref("");
    const isLoading = ref(false);
    const participantsList = ref(null);
    const listVisibility = ref(false);
    const chooseParticipant = ref("Unregistered");
    const infoIndex = ref(null);

    const handleHover = (index) => {
      hoveringIndex.value = index;
    };

    const editMode = (item, index) => {
      editModeIndex.value = index;
      editMessage.value = item.message;
      listVisibility.value = false;
      chooseParticipant.value = item.talker;
    };

    const toggleList = () => {
      listVisibility.value = !listVisibility.value;
    };

    const cancelChanges = () => {
      editModeIndex.value = null;
    };

    const submitEdit = (index) => {
      const tsData = props.meetingDetails.transcript;

      tsData[index].talker = chooseParticipant.value;
      tsData[index].message = editMessage.value;
      tsData[index].lastUpdate.time = moment();
      tsData[index].lastUpdate.updatedBy = "Admin";
      isLoading.value = true;

      axios
        .patch(`http://localhost:3000/reports/${props.id}/`, {
          transcript: tsData,
          lastUpdate: {
            time: moment(),
            updatedBy: "Admin",
          },
        })
        .then((res) => {
          ElMessage({
            message: "Perubahan berhasil disimpan",
            type: "success",
          });
        })
        .catch((err) => {
          ElMessage({
            message: "Gagal menyimpan perubahan",
            type: "error",
          });
        })
        .then(() => {
          isLoading.value = false;
          editModeIndex.value = null;
          infoIndex.value = index;
        });
    };

    return {
      hoveringIndex,
      handleHover,
      editModeIndex,
      editMode,
      editMessage,
      submitEdit,
      isLoading,
      toggleList,
      participantsList,
      listVisibility,
      chooseParticipant,
      moment,
      infoIndex,
      cancelChanges,
    };
  },
};
</script>

<style></style>
