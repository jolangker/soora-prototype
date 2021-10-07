<template>
  <div class="mt-6">
    <el-table
      :data="reports"
      class="w-full"
      :default-sort="{ prop: 'meetingDate', order: 'descending' }"
      @row-click="handleClick"
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

<style lang="scss">
.el-table {
  th.el-table__cell.is-leaf {
    background-color: #f3f4f6;
    border-bottom: #909399 1.5px solid;
    text-align: center;
  }

  th.el-table__cell.is-leaf:first-child {
    text-align: left;
  }

  tbody {
    .el-table__cell {
      background: #f3f4f6;
      border: none;
      padding: 6px 0;
      text-align: center;
      cursor: pointer;
    }

    .el-table__cell:first-child {
      text-align: left;
    }

    .cell {
      background: white;
      padding: 12px;
      border-bottom: #409eff 1px solid;
    }
  }
}
</style>
