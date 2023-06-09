<script setup>
import { RouterLink, RouterView } from "vue-router";
import ctl from "@netlify/classnames-template-literals";
import { mapStores } from "pinia";
import BaseButton from "./components/ui_utils/BaseButton.vue";
import { useAuthStore } from "./stores/auth";
import { useReponsesStore } from "./stores/responses";
import router from "./router";
import { useRoute } from "vue-router";
import { HOME, QUESTIONNAIRE, REPORT_HISTORY, REPORT } from "./router/index.js";
import Modal from "./components/ui_utils/Modal.vue";
import modalMsgs from "./constants/modal.js";
import AOS from 'aos';
import Footer from "./components/Footer.vue";
import ResponsiveMenu from "./components/ui_utils/ResponsiveMenu.vue";
const route = useRoute();
</script>
<template>
  <ResponsiveMenu @logout="openModal" @close="closeResponsiveMenu" v-if="showResponsiveMenu" @goToLogin="goToLogin" @goToSignUp="goToSignUp"/>
  <Modal
    v-if="showModal"
    :msg="modalMsgs.LOGOUT_STATEMENT"
    imgPath="/logout-icon.svg"
    @close="closeModal"
    @accept="logout"
  />
  <main class="h-full">
    <header :class="localStyles.header" v-if="showHeader">
      <img
        src="/horizontal-logo.svg"
        :class="localStyles.logo"
        draggable="false"
        alt="logo"
      />
      <nav v-if="isLoggedIn" :class="localStyles.link" role="navigation" aria-labelledby="mainnavheading">
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
          :to="REPORT_HISTORY"
          :class="[
            route.path === REPORT_HISTORY || route.path === REPORT
              ? 'custom-text-green font-bold underline'
              : '',
            localStyles.link,
          ]"
          >Reporte</RouterLink
        >
        <BaseButton text="Cerrar Sesión" @click="openModal" />
      </nav>
      <nav v-else :class="localStyles.link" role="navigation" aria-labelledby="secondarynavheading">
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
      <nav class="flex sm:hidden">
        <img
          src="/menu.svg"
          :class="localStyles.mobileMenu"
          @click="handleShowResponsiveMenu"
          alt="menu btn"
        />
      </nav>
    </header>
    <RouterView @toggleHeader="toggleHeader" @toggleFooter="toggleFooter" />
  </main>
  <Footer v-if="showFooter" />
</template>
<script>
export default {
  computed: {
    ...mapStores(useAuthStore, useReponsesStore),
    isLoggedIn() {
      return this.authStore.isLoggedIn;
    },
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    openModal() {
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
    goToQuestionnaire() {
      router.push("/report_history");
    },
    toggleHeader(newVal) {
      this.showHeader = newVal;
    },
    toggleFooter(newVal){
      this.showFooter = newVal;
    },
    handleShowResponsiveMenu(){
      this.showResponsiveMenu = true;
    },
    closeResponsiveMenu(){
      this.showResponsiveMenu = false;
    }
  },
  data() {
    return {
      showHeader: true,
      currentView: "home",
      showModal: false,
      showFooter:true,
      showResponsiveMenu:false
    };
  },
  mounted() {
    this.authStore.checkIfLogged();
    AOS.init();
    //
  },
};
const localStyles = {
  header: ctl(`
        flex
        px-6
        sm:px-20
        py-16
        justify-between
        items-center
        absolute
        w-full
        z-30
        h-[160px]
        sm-h-[176px]

    `),
  logo: ctl(`
       h-8
       sm:h-12
    `),
  link: ctl(`
    hidden
    sm:flex
    text-white
    mr-4
    hover:text-[#38f0a2]
    items-center
    `),
  nav: ctl(`
    gap-2
    `),
  mobileMenu: ctl(`
      
      h-6
    `),
};
</script>
