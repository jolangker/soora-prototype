<template>
  <nav class="bg-azure px-32 py-2 text-white flex justify-between items-center">
    <router-link :to="{ name: 'Home' }" class="font-bebas text-3xl"
      >SOORA</router-link
    >
    <div class="flex items-center">
      <div
        class="
          w-10
          h-10
          border-2 border-white
          rounded-full
          relative
          overflow-hidden
        "
      >
        <img
          src="../assets/user.png"
          alt="user picture"
          class="absolute inset-0"
        />
      </div>
      <h3 class="ml-2">Paquito Tzy</h3>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style></style>
