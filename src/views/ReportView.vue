<script setup>
import Gradient from "../components/ui_utils/Gradient.vue";
import ctl from "@netlify/classnames-template-literals";
import { ORDINAL_NUMBERS_LIST } from "../constants/ordinals.js";
import { useReportStore } from "../stores/report";
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
import ReportSection from "../components/ReportSection.vue";
import { REPORT_ONBOARDING_KEY } from "../constants/onboarding";
import Onboarding from "../components/Onboarding.vue";
import { handleIfShowOnboarding } from "../utils/oboardingUtils";
import onboardingData from "../constants/onboarding.js";
import {
  REPORT_BY_LEVELS,
  BY_LEVELS,
  BY_PRINCIPLES_VS_ACTIVITIES,
  REPORT_BY_PRINCIPLES_VS_ACTIVITIES,
  REPORT_ROADMAP,
  BY_ROADMAP,
  REPORT_RECOMENDATIONS,
  BY_RECOMENDATIONS,
} from "../constants/report";
</script>
<template>
  <Onboarding
    v-if="showModal"
    :data="onboardingData.REPORT_ONBOARDING"
    @close="closeModal"
  />
  <Onboarding
    v-if="showPrinciplesModal"
    :data="onboardingData.PRINCIPLES"
    @close="closePrincipleModal"
  />
  <header :class="localStyles.header">
    <Gradient />
    <div
      class="px-4 mt-[-50px] sm:mt-0"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <h1 :class="localStyles.headerTitle">
        ¡Conoce los resultados <br class="hidden sm:inline" />
        de tu
        <span class="custom-text-green font-bold"
          >{{ getOrdinal() }} diagnóstico!</span
        >
      </h1>
      <p :class="localStyles.headerSubtitle">
        Aquí encontrarás la calificación de tu empresa
      </p>
    </div>
  </header>
  <main :class="localStyles.main">
    <section :class="localStyles.info">
      <div :class="localStyles.infoTextContainer">
        <h1 class="font-bold sm:text-lg">Empresa:</h1>
        <p>{{ authStore.user.organization }}</p>
      </div>
      <div :class="localStyles.line"></div>
      <div :class="localStyles.infoTextContainer">
        <h1 class="font-bold sm:text-lg">Contacto:</h1>
        <p>{{ authStore.user.name }}</p>
      </div>
      <div :class="localStyles.line"></div>
      <div :class="localStyles.infoTextContainer">
        <h1 class="font-bold sm:text-lg">Fecha:</h1>
        <p>{{ reportStore.selectedResponse.responseDate.split("T")[0] }}</p>
      </div>
    </section>
    <section :class="localStyles.section">
      <div class="flex flex-col sm:flex-row justify-between w-full">
        <h1 :class="localStyles.title + ' mt-4'">Reporte por niveles</h1>
        <div :class="localStyles.button" @click="showPrincipleOnboarding">
          <p class="text-white py-2">Principios de la EC</p>
          <img src="/eye.svg" class="h-4 ml-2" alt="Eye btn" />
        </div>
      </div>
      <ReportSection :reportConstantMap="REPORT_BY_LEVELS" :type="BY_LEVELS" />
      <h1 :class="localStyles.title + ' mt-16'">
        Reporte principios vs actividades
      </h1>
      <ReportSection
        :reportConstantMap="REPORT_BY_PRINCIPLES_VS_ACTIVITIES"
        :type="BY_PRINCIPLES_VS_ACTIVITIES"
      />
      <h1 :class="localStyles.title + ' mt-16'">
        Recomendaciones para tu empresa
      </h1>
      <ReportSection :reportConstantMap="REPORT_ROADMAP" :type="BY_ROADMAP" />
      <ReportSection
        :reportConstantMap="REPORT_RECOMENDATIONS"
        :type="BY_RECOMENDATIONS"
      />
    </section>
  </main>
</template>
<script>
export default {
  emits: ["toggleHeader", "toggleFooter"],
  mounted() {
    this.$emit("toggleHeader", true);
    this.$emit("toggleFooter", true);
    window.scrollTo(0, 0);
    this.handleOnboarding();
  },
  computed: {
    ...mapStores(useReportStore, useAuthStore),
  },
  data() {
    return {
      showModal: false,
      showPrinciplesModal:false
    };
  },
  methods: {
    getOrdinal() {
      return this.reportStore.currentResponseIndex >= 0
        ? ORDINAL_NUMBERS_LIST[this.reportStore.currentResponseIndex]
        : "";
    },
    handleOnboarding() {
      const currentUserOnboardingPath =
        REPORT_ONBOARDING_KEY + this.authStore.user.id;
      if (handleIfShowOnboarding(currentUserOnboardingPath)) {
        this.showModal = true;
      }
    },
    showPrincipleOnboarding(){
      this.showPrinciplesModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    closePrincipleModal(){
      this.showPrinciplesModal = false;
    }
  },

};
const localStyles = {
  header: ctl(`
      relative
      sm:h-[400px]
      w-full
      bg-amber-200
      pt-[160px]
      pb-[60px]
      sm:pt-[145px]
      sm:pb-[120px]
      bg-[url('/report-header.jpg')]
      bg-cover
      bg-center
      bg-no-repeat
      bg-gradient
    `),
  headerTitle: ctl(`
      text-center
      text-2xl
      sm:text-4xl
      font-bold
      text-white
    `),
  headerSubtitle: ctl(`
      text-white
      text-center
      mt-2
      sm:mt-4
    `),
  main: ctl(`
    flex
    flex-col
    items-center
    min-h-[600px]
    px-5
    sm:px-20
    py-16
    w-full
    bg-[#f8f7f7]
    `),
  info: ctl(`
    w-full
    custom-shadow
    bg-white
    h-fit
    p-5
    custom-border-radius
    sm:mt-[-124px]
    mt-[-100px]
    flex 
    flex-col
    sm:flex-row
    sm:h-[115px]
    `),
  infoTextContainer: ctl(`
    text-center
    sm:w-1/3
    h-full
    sm:flex
    sm:flex-col
    sm:justify-center
    `),
  line: ctl(`
    w-full 
    h-0.5 
    sm:w-0.5
    custom-border-radius
    bg-slate-300 
    my-3
    sm:my-0
    sm:h-full
    `),
  section: ctl(`
    py-12
    flex
    flex-col
    justify-start
    items-start
    w-full
    `),
  title: ctl(`
        font-bold
        sm:text-3xl
        sm:text-left
        text-center
        text-xl
        w-full
    `),
  button: ctl(`
  z-20
  !cursor-pointer
  flex
  items-center
  justify-between
  px-4
  hover:bg-[#6B63F9]
  bg-[#756ef2]
  rounded-3xl
  sm:absolute
  bottom-0
  right-0
  w-fit
  mx-auto
  m-6
  sm:m-0
  sm:mr-6
  `),
};
</script>
