<template>
  <div class="mb-3">
    <el-button type="primary" size="small" @click="toggleAdd">
      TAMBAH PESERTA
    </el-button>
  </div>
  <el-table :data="filteredParticipants" stripe>
    <el-table-column type="index" label="No" />
    <el-table-column prop="full_name" label="Nama" sortable />
    <el-table-column prop="company" label="Perusahaan" sortable />
    <el-table-column prop="title" label="Jabatan" sortable />
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          size="mini"
          placeholder="Cari Peserta"
          prefix-icon="el-icon-search"
        />
      </template>
      <template #default="scope">
        <el-button
          type="primary"
          plain
          size="mini"
          @click="toggleEdit(scope.row.id, scope.$index)"
          >Sunting</el-button
        >
        <el-popconfirm
          confirm-button-text="IYA"
          cancel-button-text="BATAL"
          icon="el-icon-info"
          icon-color="red"
          title="Apakah anda yakin ingin menghapus peserta ini?"
          @confirm="deleteData(scope.row.id, scope.$index)"
        >
          <template #reference>
            <el-button type="danger" plain size="mini">Hapus</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog
    v-model="addDialogVisible"
    title="Tambah Peserta"
    width="40%"
    destroy-on-close
    @close="clearForm"
  >
    <el-form
      ref="participantsForm"
      :model="participantsFormModel"
      :rules="rules"
      status-icon
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item prop="firstName">
            <el-input v-model="firstName" placeholder="Nama Awal" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName">
            <el-input v-model="lastName" placeholder="Nama Akhir" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="email">
        <el-input v-model="email" placeholder="Email" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="company"
          class="w-full"
          placeholder="Pilih perusahaan"
          filterable
          clearable
        >
          <el-option
            v-for="comp in companies"
            :key="comp.id"
            :label="comp.company"
            :value="comp.company"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="jobTitle"
          class="w-full"
          placeholder="Pilih jabatan"
          filterable
          clearable
        >
          <el-option
            v-for="title in jobTitles"
            :key="title.id"
            :label="title.title"
            :value="title.title"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="toggleAdd"> Batal</el-button>
      <el-button type="primary" :loading="isLoading" @click="submitAdd">
        Tambah
      </el-button>
    </template>
  </el-dialog>

  <el-dialog
    v-model="editDialogVisible"
    title="Edit Peserta"
    width="40%"
    destroy-on-close
    @close="clearForm"
  >
    <el-form
      ref="participantsForm"
      :model="participantsFormModel"
      :rules="rules"
      status-icon
    >
      <el-row :gutter="16">
        <el-col :span="12">
          <el-form-item prop="firstName">
            <el-input v-model="firstName" placeholder="Nama Awal" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="lastName">
            <el-input v-model="lastName" placeholder="Nama Akhir" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="email">
        <el-input v-model="email" placeholder="Email" />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="company"
          class="w-full"
          placeholder="Pilih perusahaan"
          filterable
          clearable
        >
          <el-option
            v-for="comp in companies"
            :key="comp.id"
            :label="comp.company"
            :value="comp.company"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="jobTitle"
          class="w-full"
          placeholder="Pilih jabatan"
          filterable
          clearable
        >
          <el-option
            v-for="title in jobTitles"
            :key="title.id"
            :label="title.title"
            :value="title.title"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="editDialogVisible = false"> Batal</el-button>
      <el-button type="primary" :loading="isLoading" @click="submitEdit">
        Simpan
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from "vue-demi";
import axios from "axios";
import { ElMessage } from "element-plus";
import getVariables from "../composeables/getVariables";
import Pusher from "pusher-js";

export default {
  setup() {
    const { urlParticipants, urlCompanies, urlTitles, headers } =
      getVariables();
    const participants = ref([]);
    const isLoading = ref(false);
    const participantsIdx = ref(null);

    onMounted(() => {
      const pusher = new Pusher("881f5a1bf4d80a7ba60f", {
        cluster: "ap1",
      });

      const channel = pusher.subscribe("soora-shollu");
      channel.bind("participant", fetchData);
    });

    const fetchData = () => {
      axios.get(urlParticipants, headers).then((res) => {
        participants.value = res.data;
        participants.value.map((data) => {
          data.full_name = `${data.first_name} ${data.last_name}`;
        });
      });
    };

    fetchData();

    const search = ref("");
    const filteredParticipants = computed(() => {
      return participants.value.filter((data) => {
        return data?.full_name
          .toLowerCase()
          .includes(search.value.toLowerCase());
      });
    });

    const addDialogVisible = ref(false);
    const toggleAdd = () => {
      addDialogVisible.value = !addDialogVisible.value;
    };

    const participantsForm = ref(null);
    const participantsFormModel = reactive({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      jobTitle: "",
    });
    const { firstName, lastName, email, company, jobTitle } = toRefs(
      participantsFormModel
    );
    const rules = {
      firstName: [
        {
          required: true,
          message: "Nama awal tidak boleh kosong",
          trigger: "blur",
        },
      ],
      lastName: [
        {
          required: true,
          message: "Nama akhir tidak boleh kosong",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          message: "Email akhir tidak boleh kosong",
          trigger: "blur",
        },
        {
          type: "email",
          message: "Masukkan email yang valid",
          trigger: "blur",
        },
      ],
    };

    const companies = reactive([]);
    axios.get(urlCompanies, headers).then((res) => {
      companies.push(...res.data);
    });

    const jobTitles = reactive([]);
    axios.get(urlTitles, headers).then((res) => {
      jobTitles.push(...res.data);
    });

    const submitAdd = () => {
      participantsForm.value.validate((valid) => {
        if (valid) {
          const data = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            company: company.value,
            title: jobTitle.value,
          };
          isLoading.value = true;

          axios
            .post(
              "https://soora-shollu.herokuapp.com/api/rtparticipants/",
              data,
              headers
            )
            .then((res) => {
              ElMessage({
                message: "Peserta berhasil ditambah.",
                type: "success",
              });
              addDialogVisible.value = false;
            })
            .catch((err) => {
              ElMessage({
                message: `Gagal menambah peserta. ${err}`,
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

    const participantId = ref(null);
    const editDialogVisible = ref(false);

    const toggleEdit = (id, idx) => {
      participantId.value = id;
      editDialogVisible.value = !editDialogVisible.value;
      axios
        .get(`${urlParticipants}${id}/`, headers)
        .then((res) => {
          firstName.value = res.data.first_name;
          lastName.value = res.data.last_name;
          email.value = res.data.email;
          company.value = res.data.company;
          jobTitle.value = res.data.title;
        })
        .catch((err) => {
          ElMessage({
            message: `Data peserta gagal dimuat. ${err}`,
            type: "error",
          });
        });

      participantsIdx.value = idx;
    };

    const submitEdit = () => {
      participantsForm.value.validate((valid) => {
        if (valid) {
          const data = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            company: company.value,
            title: jobTitle.value,
          };
          isLoading.value = true;

          axios
            .patch(`${urlParticipants}${participantId.value}/`, data, headers)
            .then((res) => {
              ElMessage({
                message: "Perubahan berhasil disimpan",
                type: "success",
              });
              participants.value[participantsIdx.value].first_name =
                firstName.value;
              participants.value[participantsIdx.value].last_name =
                lastName.value;
              participants.value[participantsIdx.value].email = email.value;
              participants.value[participantsIdx.value].company = company.value;
              participants.value[participantsIdx.value].title = jobTitle.value;
              editDialogVisible.value = false;
            })
            .catch((err) => {
              ElMessage({
                message: `Perubahan tidak disimpan. ${err}`,
                type: "error",
              });
            })
            .then(() => {
              isLoading.value = false;
            });
        }
      });
    };

    const clearForm = () => {
      participantsForm.value.resetFields();
      company.value = "";
      jobTitle.value = "";
    };

    const deleteData = (id, idx) => {
      isLoading.value = true;

      axios
        .delete(`${urlParticipants}${id}/`, headers)
        .then((res) => {
          ElMessage({
            message: "Peserta berhasil dihapus",
            type: "success",
          });
          participants.value.splice(idx, 1);
        })
        .catch((err) => {
          ElMessage({
            message: `Gagal menghapus peserta. ${err}`,
            type: "error",
          });
        })
        .then(() => {
          isLoading.value = false;
        });
    };

    return {
      isLoading,
      search,
      filteredParticipants,
      addDialogVisible,
      toggleAdd,
      participantsForm,
      participantsFormModel,
      firstName,
      lastName,
      email,
      company,
      jobTitle,
      rules,
      companies,
      jobTitles,
      submitAdd,
      editDialogVisible,
      toggleEdit,
      clearForm,
      submitEdit,
      deleteData,
    };
  },
};
</script>

<style lang="scss">
.el-dialog {
  --el-dialog-padding-primary: 15px;
}
</style>
