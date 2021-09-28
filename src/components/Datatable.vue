<template>
  <div class="mt-6">
    <el-table
      :data="recordList"
      class="w-full"
      :default-sort="{ prop: 'recordDate', order: 'descending' }"
    >
      <el-table-column
        prop="title"
        label="Nama"
        width="600"
        sortable
        class="text-center"
      />
      <el-table-column prop="participants" label="Jumlah Peserta" sortable />
      <el-table-column prop="duration" label="Durasi (menit)" sortable />
      <el-table-column prop="recordDate" label="Tanggal" sortable />
    </el-table>
  </div>
</template>

<script>
import { ElTable, ElTableColumn } from "element-plus";

export default {
  components: { ElTable, ElTableColumn },
  props: {
    recordList: Array,
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
