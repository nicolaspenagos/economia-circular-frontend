<script setup>
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
</script>
<template>
  <div></div>
</template>
<script>
export default {
  computed: {
    ...mapStores(useAuthStore),
  },
  mounted() {
    console.log(this.authStore.user);
    this.$emit("toggleHeader", true);
  },
};
</script>
