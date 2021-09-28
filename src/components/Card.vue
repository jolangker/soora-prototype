<template>
  <div class="flex-grow bg-white rounded shadow p-5 text-azure relative">
    <div class="flex items-end">
      <p class="text-5xl font-semibold">
        <slot name="value" />
      </p>
    </div>
    <h2 class="mt-1 text-lg font-semibold">
      <slot name="title" />
    </h2>
    <slot name="icon" />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
