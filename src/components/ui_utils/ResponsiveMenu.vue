<script setup>
import ctl from "@netlify/classnames-template-literals";
import {
  HOME,
  QUESTIONNAIRE,
  REPORT_HISTORY,
  REPORT,
} from "../../router/index.js";
import { mapStores } from "pinia";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";
import BaseButton from "./BaseButton.vue";
const route = useRoute();
</script>
<template>
  <div
    :class="[localStyles.backdrop, opacity]"
    @click.self="closeMenu"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <aside
      :class="localStyles.aside"
      data-aos="fade-left"
      data-aos-duration="500"
    >
      <button :class="localStyles.closeBtn" @click="closeMenu">
        <img src="/x.svg" draggable="false" class="!cursor-pointer" />
      </button>
      <div>
        <img src="/purple-logo.svg" class="w-[180px]" />
        <section v-if="isLoggedIn" :class="localStyles.menu">
          <RouterLink
            :to="HOME"
            @click="closeMenu"
            :class="[
              route.path === HOME
                ? 'custom-text-green font-bold underline'
                : '',
              localStyles.link,
            ]"
            >Inicio</RouterLink
          >
          <RouterLink
            :to="QUESTIONNAIRE"
            @click="closeMenu"
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
            @click="closeMenu"
            :class="[
              route.path === REPORT_HISTORY || route.path === REPORT
                ? 'custom-text-green font-bold underline'
                : '',
              localStyles.link,
            ]"
            >Reporte</RouterLink
          >
        </section>
        <section v-else></section>
      </div>

      <BaseButton
        text="Cerrar Sesión"
        @click="logout"
        class="mt-auto mb-10"
        classMod="w-[163px] h-[35px]"
        v-if="isLoggedIn"
      />
      <div v-else class="mt-auto mb-10 flex flex-col">
        <BaseButton
          text="Iniciar Sesión"
          @click="goToLogin"
          class="w-[163px] h-[35px] mb-2"
          :altBtn="true"
        ></BaseButton>
        <BaseButton
          text="Registrarse"
          @click="goToSignUp"
          class="w-[163px] h-[35px]"
        ></BaseButton>
      </div>
    </aside>
  </div>
</template>
<script>
export default {
  emits: ["close"],
  computed: {
    ...mapStores(useAuthStore),
    isLoggedIn() {
      return this.authStore.isLoggedIn;
    },
  },
  methods: {
    closeMenu() {
      this.opacity = "opacity-0";
      setTimeout(() => this.$emit("close"), 500);
    },
    logout() {
      this.$emit("logout");
      this.closeMenu();
    },
    goToLogin(){
        this.$emit("goToLogin");
        this.closeMenu();
    },
    goToSignUp(){
        this.$emit("goToSignUp");
        this.closeMenu();
    }
  },
  data() {
    return {
      opacity: "opacity-100",
    };
  },
};
const localStyles = {
  aside: ctl(`
        h-screen
        w-56
        absolute
        right-0
        bg-white
        custom-shadow
        pl-8
        pt-20
        flex
        flex-col
    `),
  backdrop: ctl(`
        flex
        items-center
        justify-center
        fixed
        h-screen
        w-screen
        top-0
        bottom-0
        left-0
        z-40
        bg-gray/25
        backdrop-blur
        ease-in 
        duration-300
   `),
  closeBtn: ctl(`
        bg-[#34ce8b] 
        hover:bg-[#25C380]
        w-6 
        h-6 
        rounded-full 
        flex 
        items-center 
        justify-center 
        absolute 
        top-6 
        right-6
        !cursor-pointer
    `),
  menu: ctl(`
        flex
        flex-col
        mt-8
    `),
  link: ctl(`
        mt-2 
    `),
};
</script>
