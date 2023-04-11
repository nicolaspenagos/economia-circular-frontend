<script setup>
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
</script>

<template>
  <main class="flex items-center justify-center">
    <div class="text-white text-xl font-bold mt-32" v-if="!isLoggedIn">
      Hola, esto es el landing page! :)
    </div>
    <div class="text-white text-xl font-bold mt-32" v-else>
      Hola, {{ userName }}
    </div>
  </main>
</template>
<script>
export default {
  mounted() {
    this.$emit("toggleHeader", true);
  },
  computed: {
    ...mapStores(useAuthStore),
    isLoggedIn() {
      return this.authStore.isLoggedIn;
    },
    userName() {
      if (this.authStore.user && this.authStore.user.name)
        return this.authStore.user.name;
      else return "";
    },
  },
};
</script>
