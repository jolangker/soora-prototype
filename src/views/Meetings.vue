<template>
  <div class="flex flex-col items-center font-semibold text-nickel">
    <h1 class="text-4xl">{{ meetingDetails.title }}1</h1>
    <div class="flex items-center space-x-3 mt-2 text-sm">
      <div class="flex items-center">
        <el-icon>
          <calendar />
        </el-icon>
        <span class="ml-1">{{ meetingDetails.meetingDate }}</span>
      </div>
      <div>
        <el-icon>
          <user-filled />
        </el-icon>
        <span class="ml-1">{{ meetingDetails.participants?.length }}</span>
      </div>
    </div>
  </div>
  <el-tabs type="border-card" class="mt-8">
    <el-tab-pane label="Kronologi">
      <div class="flex flex-col px-8 py-6 space-y-4">
        <div
          v-for="(transcript, index) in meetingDetails.transcript"
          :key="index"
        >
          <div class="flex">
            <img
              :src="`https://ui-avatars.com/api/?name=${transcript.talker}&background=random&rounded=true&size=40`"
            />
            <div
              class="ml-2 bg-azure py-2 px-4 text-white rounded relative"
              style="min-width: 200px"
              @mouseenter="handleHover(index)"
            >
              <div>
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
              <div
                class="absolute top-3 right-4"
                v-if="hoveringIndex === index"
              >
                <el-icon v-if="isLoading" class="is-loading" :size="18">
                  <loading />
                </el-icon>
                <div
                  class="flex items-center space-x-1"
                  v-else-if="editModeIndex === index"
                >
                  <div class="relative z-50">
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
                      @click="toggleList"
                    >
                      <user />
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
                  <el-icon
                    :size="18"
                    role="button"
                    title="Hapus Item Ini"
                    class="transform hover:scale-125"
                  >
                    <remove />
                  </el-icon>
                </div>
              </div>
            </div>
          </div>
          <small
            class="text-nickel font-semibold ml-12"
            v-if="infoIndex === index"
          >
            Disunting Oleh
            <span class="italic">{{ transcript.lastUpdate.updatedBy }}</span> -
            {{
              moment(transcript.lastUpdate.time).format(
                "dddd, MMMM Do YYYY, h:mm:ss"
              )
            }}
          </small>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Paragraf">
      <!-- <span v-for="chat in chats" :key="chat">{{ chat.message }}</span> -->
    </el-tab-pane>
    <el-tab-pane label="Peserta">
      <!-- <el-radio-group v-model="selectedUser">
        <el-scrollbar>
          <div class="flex h-14">
            <el-radio-button
              v-for="participant in meetingDetails.participants"
              :key="participant"
              :label="participant"
              class="flex-grow"
            />
          </div>
        </el-scrollbar>
      </el-radio-group>
      <div>
        <p>{{ filteredChat[0]?.message }}</p>
      </div> -->
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {
  Calendar,
  Edit,
  Remove,
  Check,
  User,
  Loading,
  UserFilled,
} from "@element-plus/icons";
import { computed, ref } from "vue-demi";
import axios from "axios";
import moment from "moment";

export default {
  components: { Calendar, Edit, Remove, Check, User, Loading, UserFilled },
  props: ["id"],
  setup(props) {
    const meetingDetails = ref({});
    const hoveringIndex = ref(null);
    const editModeIndex = ref(null);
    const editMessage = ref("");
    const isLoading = ref(false);
    const participantsList = ref(null);
    const listVisibility = ref(false);
    const chooseParticipant = ref("");
    const infoIndex = ref(null);

    axios
      .get("http://localhost:3000/reports/" + props.id)
      .then((res) => {
        meetingDetails.value = res.data;
        console.log(meetingDetails.value);
      })
      .catch((err) => {
        console.log(err);
      });

    const handleHover = (index) => {
      hoveringIndex.value = index;
    };

    const editMode = (item, index) => {
      editModeIndex.value = index;
      editMessage.value = item.message;
    };

    const transcriptData = computed(() => {
      return meetingDetails.value.transcript;
    });

    const submitEdit = (index) => {
      transcriptData.value[index].message = editMessage.value;
      transcriptData.value[index].talker = chooseParticipant.value;
      transcriptData.value[index].lastUpdate.time = moment();
      transcriptData.value[index].lastUpdate.updatedBy = "Admin";
      isLoading.value = true;

      axios
        .patch(`http://localhost:3000/reports/${props.id}/`, {
          transcript: transcriptData.value,
          lastUpdate: {
            time: moment(),
            updatedBy: "Admin",
          },
        })
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            isLoading.value = false;
            editModeIndex.value = null;
            infoIndex.value = index;
          }, 2000);
        });
    };

    const toggleList = () => {
      listVisibility.value = !listVisibility.value;
    };
    return {
      meetingDetails,
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
    };
  },
};
</script>

<style>
.el-tabs__nav {
  display: flex;
  width: 100%;
  text-align: center;
}

.el-tabs__item {
  flex-grow: 1;
  font-weight: 700;
}
.el-radio-button__inner {
  width: 100%;
}

textarea {
  resize: none;
  width: 905px;
}
</style>
