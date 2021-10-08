<template>
  <Header />
  <el-container>
    <el-main>
      <h1 class="text-4xl mb-3 text-gray-500 text-center">DAFTAR PESERTA</h1>
      <el-button
        type="primary"
        size="small"
        class="font-semibold mb-2"
        @click="toggleAddModal"
      >
        TAMBAH PESERTA
      </el-button>
      <el-table
        :data="filteredData"
        stripe
        class="w-full"
        header-cell-class-name="custom-header"
      >
        <el-table-column prop="full_name" label="Nama" sortable />
        <el-table-column prop="email" label="Email" sortable />
        <el-table-column prop="company" label="Perusahaan" sortable />
        <el-table-column prop="job_title" label="Jabatan" sortable />
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="Cari dengan nama"
            />
          </template>
          <template #default="scope">
            <el-button size="mini" @click="toggleEditModal(scope.row.id)"
              >Edit</el-button
            >
            <el-popconfirm
              confirm-button-text="YA"
              cancel-button-text="BATAL"
              icon="el-icon-info"
              icon-color="red"
              @confirm="deleteParticipant(scope.row.id)"
              title="Apakah anda yakin ingin menghapus peserta ini?"
            >
              <template #reference>
                <el-button size="mini" type="danger">Hapus</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  <add-participant-modal
    :modalVisiblity="addModalVisible"
    @updateVisible="closeModal"
  />

  <edit-participant-modal
    :modalVisiblity="editModalVisible"
    @updateEditVisible="closeEditModal"
  />
</template>

<script>
import { computed, ref } from "vue-demi";
import Header from "../components/Header.vue";
import AddParticipantModal from "../components/AddParticipantModal.vue";
import EditParticipantModal from "../components/EditParticipantModal.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

export default {
  components: { Header, AddParticipantModal, EditParticipantModal },
  setup() {
    const participants = ref([]);
    const search = ref("");
    const addModalVisible = ref(false);
    const editModalVisible = ref(false);
    const participant = ref({});
    const router = useRouter();

    axios.get("http://localhost:3000/participants").then((res) => {
      participants.value = res.data.map((data) => {
        data.full_name = `${data.first_name} ${data.last_name}`;
        return data;
      });
    });

    const filteredData = computed(() => {
      return participants.value.filter((data) => {
        return (
          data.full_name.toLowerCase().includes(search.value.toLowerCase()) ||
          data.email.toLowerCase().includes(search.value.toLowerCase()) ||
          data.company.toLowerCase().includes(search.value.toLowerCase()) ||
          data.job_title.toLowerCase().includes(search.value.toLowerCase())
        );
      });
    });

    const toggleAddModal = () => {
      addModalVisible.value = true;
    };

    const closeModal = (val) => {
      addModalVisible.value = val;
    };

    const toggleEditModal = (id) => {
      editModalVisible.value = true;
    };

    const closeEditModal = (val) => {
      editModalVisible.value = val;
    };

    const deleteParticipant = (id) => {
      axios.delete(`http://localhost:3000/participants/${id}/`).then((res) => {
        ElMessage({
          type: "success",
          message: "Peserta Berhasil Dihapus",
        });
        router.go();
      });
    };

    return {
      participants,
      search,
      filteredData,
      addModalVisible,
      toggleAddModal,
      closeModal,
      editModalVisible,
      toggleEditModal,
      closeEditModal,
      participant,
      deleteParticipant,
    };
  },
};
</script>

<style>
.el-container {
  padding: 2rem 8rem;
}

.el-main {
  padding: 0;
}

.custom-header {
  --el-table-header-background-color: var(--el-color-primary);
  color: white !important;
}

.el-table .descending .sort-caret.descending {
  border-top-color: white !important;
}

.el-table .ascending .sort-caret.ascending {
  border-bottom-color: white !important;
}
</style>
