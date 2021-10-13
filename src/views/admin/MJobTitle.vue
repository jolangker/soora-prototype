<template>
  <div class="flex justify-between items-center mb-3">
    <h1 class="text-nickel text-3xl font-semibold">Daftar Jabatan</h1>
    <el-button type="primary" size="small" @click="dialogVisible = true">
      TAMBAH JABATAN
    </el-button>
  </div>
  <el-table :data="filteredTitles" stripe class="w-full">
    <el-table-column type="index" align="center">
      <template #header> No </template>
    </el-table-column>
    <el-table-column label="Jabatan" prop="title_name" sortable>
      <template #default="scope">
        <el-input
          v-if="scope.$index === editIndex"
          v-model="editTitleName"
          size="mini"
          class="inline__edit"
        />
        <div v-else>{{ scope.row.title_name }}</div>
      </template>
    </el-table-column>
    <el-table-column align="right" width="300px">
      <template #header>
        <el-input v-model="search" size="mini" prefix-icon="el-icon-search" />
      </template>
      <template #default="scope">
        <div v-if="scope.$index !== editIndex">
          <el-button type="primary" size="mini" plain @click="editMode(scope)">
            Sunting
          </el-button>
          <el-popconfirm
            confirm-button-text="IYA"
            cancel-button-text="BATAL"
            icon="el-icon-info"
            icon-color="red"
            title="Apakah anda yakin ingin menghapus jabatan ini?"
            @confirm="deleteData(scope.row.id)"
          >
            <template #reference>
              <el-button type="danger" plain size="mini">Hapus</el-button>
            </template>
          </el-popconfirm>
        </div>
        <div v-else>
          <el-button size="mini" plain @click="editIndex = null">
            Batal
          </el-button>
          <el-button
            type="success"
            size="mini"
            :loading="isLoading"
            @click="saveChange(scope.row.id)"
          >
            Simpan
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="dialogVisible"
    title="Tambah Jabatan"
    width="30%"
    destroy-on-close
  >
    <el-form ref="titleForm" :model="titleFormModel" :rules="rules" status-icon>
      <el-form-item prop="titleName">
        <el-input v-model="titleName" placeholder="Jabatan" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="small" @click="dialogVisible = false">Batal</el-button>
      <el-button
        size="small"
        type="primary"
        :loading="isLoading"
        @click="addTitle"
      >
        Tambah
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue-demi";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const title = ref({});
    const titles = reactive([]);
    const search = ref("");
    const dialogVisible = ref(false);
    const isLoading = ref(false);
    const editIndex = ref(null);

    axios.get("http://localhost:3000/titles/").then((res) => {
      titles.push(...res.data);
    });

    const filteredTitles = computed(() => {
      return titles.filter((data) => {
        return data.title_name
          ?.toLowerCase()
          ?.includes(search.value.toLowerCase());
      });
    });

    const titleForm = ref(null);
    const titleFormModel = reactive({
      titleName: "",
    });
    const { titleName } = toRefs(titleFormModel);
    const rules = {
      titleName: [
        {
          required: true,
          message: "Nama Perushaan Harus Diisi",
          trigger: "blur",
        },
      ],
    };

    const addTitle = () => {
      titleForm.value.validate((valid) => {
        if (valid) {
          isLoading.value = true;
          axios
            .post("http://localhost:3000/titles/", {
              title_name: titleName.value,
            })
            .then((res) => {
              ElMessage({
                message: "Jabatan berhasil ditambah",
                type: "success",
              });
              dialogVisible.value = false;
            })
            .catch((err) => {
              ElMessage({
                message: `Gagal menambah jabatan. ${err}`,
                type: "error",
              });
            })
            .then(() => {
              isLoading.value = false;
            });
        } else {
          return false;
        }
      });
    };

    const editTitleName = ref("");
    const saveChangeVisible = ref(false);

    const editMode = (scope) => {
      editIndex.value = scope.$index;
      saveChangeVisible.value = true;

      axios.get(`http://localhost:3000/titles/${scope.row.id}/`).then((res) => {
        title.value = res.data;
        editTitleName.value = title.value.title_name;
      });
    };

    const saveChange = (id) => {
      isLoading.value = true;
      axios
        .patch(`http://localhost:3000/titles/${id}/`, {
          title_name: editTitleName.value,
        })
        .then((res) => {
          ElMessage({
            message: "Perubahan berhasil disimpan",
            type: "success",
          });
          editIndex.value = null;
        })
        .catch((err) => {
          ElMessage({
            message: `Perubahan gagal disimpan. ${err}`,
            type: "error",
          });
        })
        .then(() => {
          isLoading.value = false;
        });
    };

    const deleteData = (id) => {
      isLoading.value = true;

      axios
        .delete(`http://localhost:3000/titles/${id}/`)
        .then((res) => {
          ElMessage({
            message: "Item berhasil dihapus",
            type: "success",
          });
          editIndex.value = null;
        })
        .catch((err) => {
          ElMessage({
            message: `Item gagal dihapus. ${err}`,
            type: "error",
          });
        })
        .then(() => {
          isLoading.value = false;
        });
    };

    return {
      search,
      filteredTitles,
      dialogVisible,
      isLoading,
      titleForm,
      titleFormModel,
      titleName,
      rules,
      addTitle,
      editIndex,
      editMode,
      editTitleName,
      saveChange,
      deleteData,
    };
  },
};
</script>

<style lang="scss">
.el-table {
  --el-table-header-font-color: white;
  --el-table-header-background-color: var(--el-color-primary);
}

.el-dialog {
  --el-dialog-padding-primary: 15px;
}

.el-input.inline__edit {
  --el-input-background-color: transparent;
}
</style>
