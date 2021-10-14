<template>
  <div>
    <el-skeleton v-if="loading" animated>
      <template #template>
        <div class="flex justify-center">
          <el-skeleton-item variant="h1" class="w-40 h-10" />
        </div>
        <div class="mt-5 flex flex-col space-y-4">
          <el-skeleton-item variant="p" class="w-80" />
          <el-skeleton-item variant="p" class="w-80" />
          <el-skeleton-item variant="p" />
        </div>
      </template>
    </el-skeleton>
    <meeting-info v-else :meetingDetails="meetingDetails" />
  </div>

  <el-tabs type="border-card" class="mt-8 z-0">
    <el-tab-pane label="Kronologi" class="px-8 py-6">
      <el-skeleton v-if="loading" :count="count" animated>
        <template #template>
          <div class="flex items-start">
            <el-skeleton-item variant="circle" class="w-10 h-10" />
            <div class="ml-2 flex-grow">
              <el-skeleton-item variant="rect" class="h-16" />
              <el-skeleton-item variant="p" class="mb-3" />
            </div>
          </div>
        </template>
      </el-skeleton>
      <chronology-tab
        v-else
        :meetingDetails="meetingDetails"
        :id="route.params.id"
      />
    </el-tab-pane>
    <el-tab-pane label="Paragraf" class="px-8 py-2">
      <el-skeleton v-if="loading" :rows="10" animated />
      <paragraph-tab v-else :meetingDetails="meetingDetails" />
    </el-tab-pane>
    <el-tab-pane label="Peserta" class="px-8 py-2">
      <el-skeleton v-if="loading" animated>
        <template #template>
          <el-skeleton-item variant="button" class="w-full" />
          <el-skeleton-item variant="p" />
          <el-skeleton-item variant="p" />
          <el-skeleton-item variant="p" />
        </template>
      </el-skeleton>
      <selected-user-tab v-else :meetingDetails="meetingDetails" />
    </el-tab-pane>
  </el-tabs>

  <el-popconfirm
    confirm-button-text="IYA"
    cancel-button-text="BATALKAN"
    icon="el-icon-info"
    icon-color="red"
    title="Apakah anda yakin ingin menghapus ini?"
    class="mt-5"
    @confirm="deleteReport"
  >
    <template #reference>
      <el-button type="danger" size="mini">Hapus Laporan</el-button>
    </template>
  </el-popconfirm>
</template>

<script>
import { ref } from "vue-demi";
import axios from "axios";
import MeetingInfo from "../components/MeetingInfo.vue";
import ChronologyTab from "../components/ChronologyTab.vue";
import ParagraphTab from "../components/ParagraphTab.vue";
import SelectedUserTab from "../components/SelectedUserTab.vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import getVariables from "../composeables/getVariables";

export default {
  components: {
    MeetingInfo,
    ChronologyTab,
    ParagraphTab,
    SelectedUserTab,
  },
  props: ["id"],
  setup(props) {
    const { urlReports } = getVariables();
    const meetingDetails = ref({});
    const loading = ref(true);
    const route = useRoute();
    const count = ref(0);
    const router = useRouter();

    axios
      .get(urlReports + props.id)
      .then((res) => {
        meetingDetails.value = res.data;
        count.value = res.data.transcript.length;
        setTimeout(() => {
          loading.value = false;
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });

    const deleteReport = () => {
      axios
        .delete(`${urlReports}${meetingDetails.value.id}`)
        .then((res) => {
          ElMessage({
            message: `${meetingDetails.value.title} berhasil dihapus`,
            type: "success",
          });
          router.push({ name: "Dashboard" });
        })
        .catch((err) => {
          ElMessage({
            message: `Gagal menghapus ${meetingDetails.value.title}`,
            type: "error",
          });
        });
    };

    return {
      meetingDetails,
      loading,
      route,
      count,
      deleteReport,
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
.el-tabs__content {
  overflow: visible;
}
textarea {
  resize: none;
  width: 905px;
}
</style>
