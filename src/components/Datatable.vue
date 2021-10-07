<template>
  <div class="mt-6">
    <el-table
      :data="reports"
      class="w-full"
      :default-sort="{ prop: 'meetingDate', order: 'descending' }"
      @row-click="handleClick"
      row-class-name="custom-row"
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

    const tableHeaderClassName = ({ row, rowIndex }) => {
      return "custom-header";
    };

    const tableRowClassName = ({ row, rowIndex }) => {
      return "custom-row";
    };

    return {
      handleClick,
      tableRowClassName,
      tableHeaderClassName,
    };
  },
};
</script>

<style>
.el-table {
  border-bottom: 1px solid var(--el-color-primary);
}

.el-table .sort-caret.ascending {
  border-bottom-color: white;
}

.el-table .sort-caret.descending {
  border-top-color: white;
}

.custom-header {
  background-color: var(--el-color-primary) !important;
  color: white !important;
}

.custom-row {
  --el-table-border: 1px solid var(--el-color-primary);
  cursor: pointer;
}

.custom-row:hover {
  --el-table-row-hover-background-color: rgb(224, 224, 224);
}
</style>
