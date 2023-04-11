<script setup>
import { RouterLink, RouterView } from "vue-router";
import ctl from "@netlify/classnames-template-literals";
import { mapStores } from "pinia";
import BaseButton from "./components/ui_utils/BaseButton.vue";
import { useAuthStore } from "./stores/auth";
import router from "./router";
import { useRoute } from "vue-router";
import { HOME, QUESTIONNAIRE, REPORT } from "./router/index.js";
import Modal from "./components/ui_utils/Modal.vue";
import modalMsgs from "./constants/modal.js";
const route = useRoute();
</script>
<template>
  <Modal
    v-if="showModal"
    :msg="modalMsgs.LOGOUT_STATEMENT"
    imgPath="/logout-icon.svg"
    @close="closeModal"
    @accept="logout"
  />
  <main class="bg-black h-full">
    <header :class="localStyles.header" v-if="showHeader">
      <img
        src="/horizontal-logo.svg"
        :class="localStyles.logo"
        draggable="false"
      />
      <nav v-if="isLoggedIn" :class="localStyles.link">
        <RouterLink
          :to="HOME"
          :class="[
            route.path === HOME ? 'custom-text-green font-bold underline' : '',
            localStyles.link,
          ]"
          >Inicio</RouterLink
        >
        <RouterLink
          :to="QUESTIONNAIRE"
          :class="[
            route.path === QUESTIONNAIRE
              ? 'custom-text-green font-bold underline'
              : '',
            localStyles.link,
          ]"
          >Cuestionario</RouterLink
        >
        <RouterLink
      
          :to="REPORT"
          :class="[
            route.path === REPORT
              ? 'custom-text-green font-bold underline'
              : '',
            localStyles.link,
          ]"
          >Reporte</RouterLink
        >
        <BaseButton text="Cerrar Sesión" @click="openModal" class="w-36" />
      </nav>
      <nav v-else>
        <BaseButton
          text="Iniciar Sesión"
          @click="goToLogin"
          class="w-36"
          :altBtn="true"
          classMod="!text-white"
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
    isLoggedIn() {
      return this.authStore.isLoggedIn;
    },
  },
  methods: {
    closeModal(){
      this.showModal = false;
    },
    openModal(){
      this.showModal = true;
    },
    logout() {
      this.closeModal();
      this.authStore.logout();
      router.push(HOME);
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
      currentView: "home",
      showModal:false
    };
  },
  mounted() {
    this.authStore.checkIfLogged();
  },
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
    hover:text-[#38f0a2]
    `),
  nav: ctl(`
    gap-2
    `),
};
</script>

