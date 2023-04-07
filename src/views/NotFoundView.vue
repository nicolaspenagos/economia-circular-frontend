<template>
  <h1 class="text-white text-3xl font-bold">404 not found</h1>
</template>
<script>
export default {
  mounted() {
    this.$emit("toggleHeader", false);
  },
};
</script>
