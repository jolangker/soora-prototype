<template>
  <div class="mt-6">
    <el-table
      :data="tableData"
      class="w-full"
      :default-sort="{ prop: 'date', order: 'descending' }"
      :strip="true"
    >
      <el-table-column
        prop="title"
        label="Nama"
        width="600"
        sortable
        class="text-center"
      />
      <el-table-column prop="participants" label="Jumlah Peserta" sortable />
      <el-table-column prop="duration" label="Durasi" sortable />
      <el-table-column prop="date" label="Tanggal" sortable />
    </el-table>
  </div>
</template>

<script>
import { ElTable, ElTableColumn } from "element-plus";
export default {
  components: { ElTable, ElTableColumn },
  setup() {
    const tableData = [
      {
        title: "Rekaman 1",
        participants: "12",
        duration: "23 Menit",
        date: "23/09/2021",
      },
      {
        title: "Rekaman 2",
        participants: "5",
        duration: "40 Menit",
        date: "25/09/2021",
      },
      {
        title: "Rekaman 3",
        participants: "17",
        duration: "20 Menit",
        date: "21/09/2021",
      },
    ];

    return {
      tableData,
    };
  },
};
</script>

<style lang="scss">
.el-table {
  th.el-table__cell.is-leaf {
    background-color: #f3f4f6;
    border-bottom: #909399 1.5px solid;
  }
  tbody {
    .el-table__cell {
      background: #f3f4f6;
      border: none;
      padding: 6px 0;
    }

    .cell {
      background: white;
      padding: 12px;
      border-bottom: #409eff 1px solid;
    }
  }
}
</style>
