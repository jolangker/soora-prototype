<template>
  <div class="mt-6">
    <el-table
      :data="reports"
      class="w-full"
      :default-sort="{ prop: 'meetingDate', order: 'descending' }"
      @row-click="handleClick"
      header-cell-class-name="custom-header"
    >
      <el-table-column
        prop="title"
        label="Nama"
        width="600"
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
    </el-table>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    reports: Array,
  },
  setup() {
    const router = useRouter();
    const handleClick = (row) => {
      router.push({ name: "Meetings", params: { id: row.id } });
    };

    return {
      handleClick,
    };
  },
};
</script>

<style>
.custom-header {
  --el-table-header-background-color: var(--el-color-primary);
  color: white !important;
}

.el-table .descending .sort-caret.descending {
  border-top-color: white !important;
}

.el-table .ascending .sort-caret.ascending {
  border-bottom-color: white !important;
}
</style>
