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
    <el-table-column label="Jabatan" prop="title" sortable>
      <template #default="scope">
        <el-input
          v-if="scope.$index === editIndex"
          v-model="editTitleName"
          size="mini"
          class="inline__edit"
        />
        <div v-else>{{ scope.row.title }}</div>
      </template>
    </el-table-column>
    <el-table-column align="right" width="300px">
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          prefix-icon="el-icon-search"
          placeholder="Cari Jabatan"
        />
      </template>
      <template #default="scope">
        <div v-if="scope.$index !== editIndex">
          <el-button
            type="primary"
            size="mini"
            plain
            @click="editMode(scope.row.id, scope)"
          >
            Sunting
          </el-button>
          <el-popconfirm
            confirm-button-text="IYA"
            cancel-button-text="BATAL"
            icon="el-icon-info"
            icon-color="red"
            title="Apakah anda yakin ingin menghapus jabatan ini?"
            @confirm="deleteData(scope.$index, scope.row.id)"
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
            @click="saveChange(scope.$index, scope.row.id)"
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
import getVariables from "../../composeables/getVariables";

export default {
  setup() {
    const { urlTitles, headers } = getVariables();
    const title = ref({});
    const titles = reactive([]);
    const search = ref("");
    const dialogVisible = ref(false);
    const isLoading = ref(false);
    const editIndex = ref(null);

    axios.get(urlTitles, headers).then((res) => {
      titles.push(...res.data);
    });

    const filteredTitles = computed(() => {
      return titles.filter((data) => {
        return data.title?.toLowerCase()?.includes(search.value.toLowerCase());
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
          const data = { title: titleName.value };
          isLoading.value = true;

          axios
            .post(urlTitles, data, headers)
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

    const editMode = (id, scope) => {
      axios
        .get(`${urlTitles}${id}/`, headers)
        .then((res) => {
          editTitleName.value = res.data.title;
        })
        .then(() => {
          editIndex.value = scope.$index;
          saveChangeVisible.value = true;
        });
    };

    const saveChange = (index, id) => {
      const data = { title: editTitleName.value };
      isLoading.value = true;

      axios
        .patch(`${urlTitles}${id}/`, data, headers)
        .then((res) => {
          ElMessage({
            message: "Perubahan berhasil disimpan",
            type: "success",
          });
          editIndex.value = null;
          titles[index].title = editTitleName.value;
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

    const deleteData = (index, id) => {
      isLoading.value = true;

      axios
        .delete(`${urlTitles}${id}/`, headers)
        .then((res) => {
          ElMessage({
            message: "Item berhasil dihapus",
            type: "success",
          });
          editIndex.value = null;
          titles.splice(index, 1);
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

<style lang="scss"></style>
