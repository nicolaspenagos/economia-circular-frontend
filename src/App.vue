<script setup>
import { RouterLink, RouterView, routerKey } from "vue-router";
import ctl from "@netlify/classnames-template-literals";
import { mapStores } from "pinia";
import BaseButton from "./components/ui_utils/BaseButton.vue";
import { useAuthStore } from "./stores/auth";
import router from "./router";
import { storeToRefs } from 'pinia'
</script>

<template>
  <main class="bg-black h-full">
    <header :class="localStyles.header" v-if="showHeader">
      <img src="/horizontal-logo.svg" :class="localStyles.logo" />
      <nav v-if="isLoggedIn" :class="localStyles.link">
        <RouterLink to="/" :class="localStyles.link">Inicio</RouterLink>
        <RouterLink to="/" :class="localStyles.link">Cuestionario</RouterLink>
        <RouterLink to="/" :class="localStyles.link">Reporte</RouterLink>
        <BaseButton
          text="Cerrar Sesión"
          :altBtn="true"
          @click="logout"
          classMod="text-white"
          class="w-36"
        />
      </nav>
      <nav v-else>
        <BaseButton
          text="Iniciar Sesión"
          @click="goToLogin"
          class="w-36"
          :altBtn="true"
          classMod="text-white"
        ></BaseButton>
        <BaseButton
          text="Registrarse"
          @click="goToSignUp"
          class="w-36 ml-4"
        ></BaseButton>
      </nav>
    </header>
    <RouterView @toggleHeader="toggleHeader" />
  </main>
</template>
<script>
export default {
  computed: {
    ...mapStores(useAuthStore),
    isLoggedIn(){
      return this.authStore.isLoggedIn;
    }
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    goToLogin() {
      router.push("/auth/loggingIn");
    },
    goToSignUp() {
      router.push("/auth/signingUp");
    },
    toggleHeader(newVal) {
      this.showHeader = newVal;
    },
  },
  data() {
    return {
      showHeader: true,
    };
  },
  mounted(){
    this.authStore.checkIfLogged();
  }
};
const localStyles = {
  header: ctl(`
        flex
        px-20
        py-16
        justify-between
        items-center

    `),
  logo: ctl(`
        h-12
    `),
  link: ctl(`
    text-white
    mr-4
    `),
  nav: ctl(`
    gap-2
    `),
};
</script>
