<script setup>
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
</script>

<template>
  <main class="flex flex-col items-center justify-center bg-black">
    <div class="text-white text-xl font-bold mt-32" v-if="!isLoggedIn">
      Hola, esto es el landing page! :)
    </div>
    <div class="text-white text-xl font-bold mt-32" v-else>
      Hola, {{ userName }}
    </div>
    <div class="flex">
      <div class="bg-red-400 h-20 w-[92.34px]">

      </div>
      <div class="bg-amber-300 w-24 h-32">

      </div>
      <div class="bg-cyan-50 h-20 w-32">

      </div>
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
