<template>
  <router-link :to="{ name: 'Upload' }">
    <el-button type="primary" class="text-white font-semibold w-full h-full">
      <el-icon :size="60">
        <upload-filled />
      </el-icon>
      <p class="text-base">Upload Audio</p>
    </el-button>
  </router-link>
</template>

<script>
import { ElIcon, ElButton } from "element-plus";
import { UploadFilled } from "@element-plus/icons";
import { useRouter } from "vue-router";
export default {
  components: { UploadFilled, ElIcon, ElButton },
  setup() {
    const router = useRouter();

    const toUploadPage = () => {
      router.push({ name: "Upload" });
    };

    return {
      toUploadPage,
    };
  },
};
</script>

<style></style>
