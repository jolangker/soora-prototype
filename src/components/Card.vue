<template>
  <div class="bg-white rounded-xl shadow-card p-5 text-azure relative">
    <div class="flex items-end">
      <p class="text-5xl font-semibold">
        <slot name="value" />
      </p>
      <small class="text-sm font-semibold">
        <slot name="info" />
      </small>
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

<style>
.shadow-card {
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
}
</style>
