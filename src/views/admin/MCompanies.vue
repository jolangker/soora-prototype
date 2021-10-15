<template>
  <div class="flex justify-between items-center mb-3">
    <h1 class="text-nickel text-3xl font-semibold">Daftar Perusahaan</h1>
    <el-button type="primary" size="small" @click="dialogVisible = true">
      TAMBAH PERUSAHAAN
    </el-button>
  </div>
  <el-table :data="filteredCompanies" stripe class="w-full">
    <el-table-column type="index" align="center">
      <template #header> No </template>
    </el-table-column>
    <el-table-column label="Nama Perusahaan" prop="company" sortable>
      <template #default="scope">
        <el-input
          v-if="scope.$index === editIndex"
          v-model="editCompanyName"
          size="mini"
          class="inline__edit"
        />
        <div v-else>{{ scope.row.company }}</div>
      </template>
    </el-table-column>
    <el-table-column align="right" width="300px">
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          prefix-icon="el-icon-search"
          placeholder="Cari Perusahaan"
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
            title="Apakah anda yakin ingin menghapus perusahaan ini?"
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
    title="Tambah Perusahaan"
    width="30%"
    destroy-on-close
  >
    <el-form ref="compForm" :model="compFormModel" :rules="rules" status-icon>
      <el-form-item prop="companyName">
        <el-input v-model="companyName" placeholder="Nama Perusahaan" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="small" @click="dialogVisible = false">Batal</el-button>
      <el-button
        size="small"
        type="primary"
        :loading="isLoading"
        @click="addCompany"
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
    const { urlCompanies, headers } = getVariables();
    const companies = reactive([]);
    const search = ref("");
    const dialogVisible = ref(false);
    const isLoading = ref(false);
    const editIndex = ref(null);

    axios.get(urlCompanies, headers).then((res) => {
      companies.push(...res.data);
    });

    const filteredCompanies = computed(() => {
      return companies.filter((data) => {
        return data.company
          ?.toLowerCase()
          ?.includes(search.value.toLowerCase());
      });
    });

    const compForm = ref(null);
    const compFormModel = reactive({
      companyName: "",
    });
    const { companyName } = toRefs(compFormModel);
    const rules = {
      companyName: [
        {
          required: true,
          message: "Nama Perushaan Harus Diisi",
          trigger: "blur",
        },
      ],
    };

    const addCompany = () => {
      compForm.value.validate((valid) => {
        if (valid) {
          const data = { company: companyName.value };
          isLoading.value = true;

          axios
            .post(urlCompanies, data, headers)
            .then((res) => {
              ElMessage({
                message: "Perusahaan berhasil ditambah",
                type: "success",
              });
              dialogVisible.value = false;
            })
            .catch((err) => {
              ElMessage({
                message: `Gagal menambah perusaahan. ${err}`,
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

    const editCompanyName = ref("");
    const saveChangeVisible = ref(false);

    const editMode = (id, scope) => {
      editIndex.value = scope.$index;
      saveChangeVisible.value = true;

      axios.get(`${urlCompanies}${id}/`, headers).then((res) => {
        editCompanyName.value = res.data.company;
      });
    };

    const saveChange = (id) => {
      const data = { company: editCompanyName.value };
      isLoading.value = true;

      axios
        .patch(`${urlCompanies}${id}/`, data, headers)
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
        .delete(`${urlCompanies}${id}/`, headers)
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
      filteredCompanies,
      dialogVisible,
      isLoading,
      compForm,
      compFormModel,
      companyName,
      rules,
      addCompany,
      editIndex,
      editMode,
      editCompanyName,
      saveChange,
      deleteData,
    };
  },
};
</script>

<style lang="scss"></style>
