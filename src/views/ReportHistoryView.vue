<script setup>
import { useReportStore } from "../stores/report";
import { mapStores } from "pinia";
import Gradient from "../components/ui_utils/Gradient.vue";
import ctl from "@netlify/classnames-template-literals";
import Modal from "../components/ui_utils/Modal.vue";
import modalMsg from "../constants/modal.js";
import router, { QUESTIONNAIRE } from "../router";
import ReportCardContainer from "../components/ReportCardContainer.vue";
</script>
<template>
  <Modal
    :msg="modalMsg.NO_RESPONSE_COMPLETED"
    imgPath="/modal-file.svg"
    :onlyAccept="true"
    acceptMsg="ir a cuestionario"
    @accept="goToQuestionnaire"
    v-if="showModal"
  />
  <header :class="localStyles.header">
    <Gradient />
    <div class="px-4" data-aos="fade-up" data-aos-duration="1000">
      <h1 :class="localStyles.headerTitle">
        En esta
        <span class="custom-text-green font-bold">sección</span> encontrarás el
        <br class="hidden sm:inline" />
        el historial de tus
        <span class="custom-text-green font-bold"> reportes </span>
      </h1>
      <p :class="localStyles.headerSubtitle">
        Podrás acceder a los resultados y obtener una Hoja de Ruta que
        <br class="hidden sm:inline" />
        ayudará a tu empresa a fortalecer su circularidad
      </p>
    </div>
  </header>
  <main :class="localStyles.main">
    <ReportCardContainer/>
  </main>
</template>
<script>
export default {
  emits: ["toggleHeader", "toggleFooter"],
  async mounted() {
    if (!this.authStore||!this.authStore.isLoggedIn) {
      router.push(HOME);
    }
    this.$emit("toggleHeader", true);
    this.$emit("toggleFooter", true);
 
    await this.reportStore.loadCompletedResponses();
    this.handleShowModal();
  
  },
  data() {
    return {
      showModal: false,
    
    };
  },
  computed: {
    ...mapStores(useReportStore),
  },
  methods: {
    goToQuestionnaire() {
      router.push(QUESTIONNAIRE);
    },
    handleShowModal() {
      if (this.reportStore.completedResponses.length > 0) {
        this.showModal = false;
      } else {
        this.showModal = true;
      }
    },
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
      sm:pt-[160px]
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
    justify-center
    min-h-[600px]
    px-10
    sm:px-20
    py-16
    sm:grid-cols-4
    sm:inline-grid
    w-full
    `),
};
</script>
