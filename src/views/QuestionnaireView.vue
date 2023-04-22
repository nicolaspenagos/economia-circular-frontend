<script setup>
import ctl from "@netlify/classnames-template-literals";
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
import { useQuestionsStore } from "../stores/questions";
import { useActivitiesStore } from "../stores/activities";
import { useReponsesStore } from "../stores/responses";
import Onboarding from "../components/Onboarding.vue";
import onboardingData from "../constants/onboarding.js";
import Gradient from "../components/ui_utils/Gradient.vue";
import Footer from "../components/Footer.vue";
import QuestionnaireActivity from "../components/QuestionnaireActivity.vue";

</script>
<template>
  <Onboarding v-if="showModal" :data="dataArray" @close="closeModal" />
  <header :class="localStyles.header">
    <Gradient />
    <div class="px-4">
      <h1 :class="localStyles.headerTitle">
        ¡Es momento de
        <span class="custom-text-green font-bold">autoevaluar</span> las
        <br class="hidden sm:inline" />
        <span class="custom-text-green font-bold">actividades </span>que realiza
        tu empresa!
      </h1>
      <p :class="localStyles.headerSubtitle">
        Contesta las siguientes preguntas y obtén tu diagnóstico
      </p>
    </div>
  </header>
  <main class="custom-bg-gray p-6 sm:py-20 sm:px-20">
    <section
      v-for="(val, index) in this.activities"
      :class="localStyles.activitySection"
    >
      <aside :class="localStyles.aside">
        <div :class="[localStyles.activityNumber, isActive(index)]">
          {{ index + 1 }}
        </div>
        <div :class="[localStyles.line, isActive(index+1)]"></div>
      </aside>
      <QuestionnaireActivity
        :activity="val"
        :lastActivityCompleted="lastActivityCompleted"
        :index="index"
        @updateLastActivity="updateLastActivity"
      />
    </section>
  </main>
  <Footer/>
</template>
<script>
export default {
  emits: ["toggleHeader"],
  setup(){

  },
  data() {
    return {
      showModal: false,
      dataArray: onboardingData.QUESTIONNAIRE_ONBOARDING,
      lastActivityCompleted: -1,
      activities: [],
    };
  },
  computed: {
    ...mapStores(
      useAuthStore,
      useActivitiesStore,
      useQuestionsStore,
      useReponsesStore
    ),
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    async loadData() {
      await this.responsesStore.loadUserActiveResponse(this.authStore.user.id);
      if (
        this.activitiesStore.activities.length === 0 ||
        this.questionsStore.questions.length === 0
      ) {
        const tempActivities = await this.activitiesStore.loadActivities();
        await this.questionsStore.loadQuestions(tempActivities);
        this.activities = tempActivities;
      } else {
        this.activities = this.activitiesStore.activities;
      }
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
    isActive(index) {
   
      if (index-1 <= this.responsesStore.lastActivityCompleted) return " custom_bg_purple";
      else return " !bg-slate-300";
    },
    updateLastActivity(activityIndex) {
      if (activityIndex > this.lastActivityCompleted) {
        this.lastActivityCompleted = activityIndex;
        this.responsesStore.lastActivityCompleted = activityIndex;
    

      }
    },
 
  },
  mounted() {
    this.$emit("toggleHeader", true);
    this.handleOnboarding();
    this.loadData();
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
  headerSubtitle: ctl(`  
      text-white
      text-center
      mt-2
      sm:mt-4
    
    `),
  activitySection: ctl(`
      flex
    `),
  activityNumber: ctl(`
      hidden
      sm:flex
      justify-center
      items-center
      custom_bg_purple
      flex
      h-10
      w-10
      rounded-full
      font-bold
      text-white
      sm:text-xl
    `),
  line: ctl(`
      hidden
      sm:flex
      w-0.5 
      grow

    `),
  aside: ctl(`
    sm:flex 
    flex-col 
    items-center 
    mr-6 
    hidden
    `),
};
</script>
