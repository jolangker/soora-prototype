<template>
  <div class="flex-grow flex flex-col justify-center items-center">
    <h1 class="font-bebas text-6xl text-azure">SOORA</h1>
    <form class="mt-3 flex flex-col w-96">
      <input
        type="text"
        placeholder="Username"
        class="
          px-3
          py-2
          border-b-2 border-azure
          text-lg
          border-opacity-50
          font-semibold
          focus:border-opacity-100 focus:outline-none
        "
      />
      <input
        type="text"
        placeholder="Password"
        class="
          mt-5
          px-3
          py-2
          border-b-2 border-azure
          text-lg
          border-opacity-50
          font-semibold
          focus:border-opacity-100 focus:outline-none
        "
      />
      <button
        class="
          mt-8
          bg-azure
          py-3
          rounded
          text-white
          font-semibold
          text-lg
          bg-opacity-80
          hover:bg-opacity-100
        "
      >
        LOGIN
      </button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
