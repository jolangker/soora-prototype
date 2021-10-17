<template>
  <div class="mt-6">
    <el-table
      :data="filteredReports"
      class="w-full"
      :default-sort="{ prop: 'meetingDate', order: 'descending' }"
    >
      <el-table-column
        prop="title"
        label="Nama"
        width="300"
        sortable
        class="text-center"
      />
      <el-table-column
        prop="totalParticipants"
        label="Jumlah Peserta"
        sortable
      />
      <el-table-column prop="audioDuration" label="Durasi (menit)" sortable />
      <el-table-column prop="meetingDate" label="Tanggal" sortable />
      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="mini"
            placeholder="Cari judul meeting..."
          />
        </template>
        <template #default="scope">
          <el-button
            type="primary"
            size="mini"
            plain
            @click="toReport(scope.row.id)"
            >Lihat</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { computed, ref } from "vue-demi";
import { useRouter } from "vue-router";
export default {
  props: {
    reports: Array,
  },
  setup(props) {
    const router = useRouter();
    const search = ref("");

    const filteredReports = computed(() => {
      return props.reports?.filter((data) => {
        return data?.title?.toLowerCase()?.includes(search.value.toLowerCase());
      });
    });

    const toReport = (id) => {
      router.push({ name: "Meetings", params: { id: id } });
    };

    return {
      toReport,
      search,
      filteredReports,
    };
  },
};
</script>

<style lang="scss"></style>
