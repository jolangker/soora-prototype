<template>
  <el-button type="primary" class="text-white font-semibold">
    <el-icon :size="60">
      <upload-filled />
    </el-icon>
    <p class="text-base">Upload Audio</p>
  </el-button>
</template>

<script>
import { ElIcon, ElButton } from "element-plus";
import { UploadFilled } from "@element-plus/icons";
export default {
  components: { UploadFilled, ElIcon, ElButton },
};
</script>

<style></style>
