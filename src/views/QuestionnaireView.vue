<script setup>
import ctl from "@netlify/classnames-template-literals";
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
import Onboarding from "../components/Onboarding.vue";
import onboardingData from "../constants/onboarding.js";
import Gradient from "../components/ui_utils/Gradient.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <Onboarding v-if="showModal" :data="dataArray" @close="closeModal" />
  <header :class="localStyles.header">
    <Gradient />
    <div class="px-4">
      <h1 :class="localStyles.headerTitle">
        ¡Es momento de
        <span class="custom-text-green font-bold">autoevaluar</span> las <br class="hidden sm:inline">
        <span class="custom-text-green font-bold">actividades </span>que realiza
        tu empresa!
      </h1>
      <p :class="localStyles.headerSubtitle">Contesta las siguientes preguntas y obtén tu diagnóstico</p>
    </div>
  </header>
  <main>

  </main>
  <Footer/>
</template>
<script>
export default {
  emits: ["toggleHeader"],
  data() {
    return {
      showModal: true,
      dataArray: onboardingData.QUESTIONNAIRE_ONBOARDING,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    handleOnboarding() {
      const userId = this.authStore.user.id;
      const currentUserOnboardingPath =
        "questionnaireOnboardingCompleted" + userId;
      if (!localStorage.getItem(currentUserOnboardingPath)) {
        localStorage.setItem(currentUserOnboardingPath, "true");
        this.openModal();
      }
    },
  },
  mounted() {
    this.$emit("toggleHeader", true);
    this.handleOnboarding();
  },
  components: { Gradient },
};
const localStyles = {
  header: ctl(`
      relative
      h-fit
      w-full
      bg-amber-200
      pt-[160px]
      pb-[60px]
      sm:pt-[160px]
      sm:pb-[120px]
      bg-[url('/questionnaire-background.jpg')]
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
    headerSubtitle:ctl(`  
      text-white
      text-center
      mt-2
      sm:mt-4
    
    `)
};
</script>
