<script setup></script>

<template>
  <main class="flex items-center justify-center">
    <div class="text-white text-xl font-bold mt-32">Hola, esto es el landing page! :)</div>
  </main>
</template>
<script>
export default {
  mounted() {
    this.$emit("toggleHeader", true);
  },
};
</script>
