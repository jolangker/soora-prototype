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
          <template #default>
            <el-button size="mini">Edit</el-button>
            <el-button size="mini" type="danger">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  <add-participant-modal
    :modalVisiblity="addModalVisible"
    @updateVisible="closeModal"
  />
</template>

<script>
import { computed, ref } from "vue-demi";
import Header from "../components/Header.vue";
import AddParticipantModal from "../components/AddParticipantModal.vue";
import axios from "axios";

export default {
  components: { Header, AddParticipantModal },
  setup() {
    const participants = ref([]);
    const search = ref("");
    const addModalVisible = ref(false);

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
      addModalVisible.value = false;
    };

    return {
      participants,
      search,
      filteredData,
      addModalVisible,
      toggleAddModal,
      closeModal,
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
