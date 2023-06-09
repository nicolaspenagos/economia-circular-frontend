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
import QuestionnaireActivity from "../components/QuestionnaireActivity.vue";
import BaseButton from "../components/ui_utils/BaseButton.vue";
import Modal from "../components/ui_utils/Modal.vue";
import modalMsgs from "../constants/modal.js";
import router from "../router";
import { REPORT_HISTORY, HOME } from "../router/index.js";
import PopUp from "../components/ui_utils/PopUp.vue";
import {handleIfShowOnboarding} from "../utils/oboardingUtils.js";
import { QUESTIONNAIRE_ONBOARDING_KEY } from "../constants/onboarding.js";
</script>
<template>
  <PopUp
    data-aos="fade-left"
    data-aos-duration="1000"
    v-if="showPopup"
    :class="[localStyles.popUp, opacityClassMod]"
    :activityNo="currentActivity"
    @closePopUpBtn="closePopUp"
  ></PopUp>
  <Onboarding v-if="showModal" :data="dataArray" @close="closeModal" />
  <header :class="localStyles.header">
    <Gradient />
    <div class="px-4" data-aos="fade-right" data-aos-duration="1000">
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
      v-for="(val, index) in activities"
      :class="localStyles.activitySection"
    >
      <aside :class="localStyles.aside">
        <div :class="[localStyles.activityNumber, isActive(index + 1, BALL)]">
          {{ index + 1 }}
        </div>
        <div
          :class="[localStyles.line, isActive(index + 1, LINE)]"
          v-if="index < activities.length - 1"
        ></div>
      </aside>
      <QuestionnaireActivity
        :loaded="loaded"
        :activity="val"
        :lastActivityCompleted="lastActivityCompleted"
        :index="index"
        @updateLastActivity="updateLastActivity"
        @showSavedPopup="showSavedPopup"
        v-if="loaded"
      />
    </section>
    <BaseButton
      text="Enviar respuestas"
      :class="[
        responsesStore.lastActivityCompleted + 1 < activities.length
          ? 'opacity-50'
          : '',
      ]"
      @click="openAnswersModal"
    />
    <Modal
      :msg="modalMsgs.SEND_ANSWERS"
      imgPath="/stats.svg"
      @accept="sendAnswers"
      @close="closeAnswersModal"
      v-if="answersModal"
    />
  </main>
</template>
<script>
export default {
  emits: ["toggleHeader", "toggleFooter"],
  data() {
    return {
      showModal: false,
      dataArray: onboardingData.QUESTIONNAIRE_ONBOARDING,
      lastActivityCompleted: -1,
      activities: [],
      loaded: false,
      answersModal: false,
      showPopup: false,
      opacityClassMod: "!opacity-1",
      currentActivity: 1,
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
    closeAnimPopUp() {
      setTimeout(this.closePopUp, POPUP_DURATION);
    },
    closePopUp() {
      if (this.showPopup) {
        this.opacityClassMod = "!opacity-0";
        setTimeout(() => (this.showPopup = false), ANIM_DURATION);
      }
    },
    showSavedPopup(currentActivity) {
      if (!this.showPopup) {
        this.opacityClassMod = "!opacity-1";
        this.showPopup = true;
        this.currentActivity = currentActivity + 1;
        this.closeAnimPopUp();
      }
    },
    async sendAnswers() {
      this.closeAnswersModal();
      await this.responsesStore.saveResponse(true);
      router.push(REPORT_HISTORY);
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    openAnswersModal() {
      if (
        this.responsesStore.lastActivityCompleted + 1 ===
        this.activities.length
      )
        this.answersModal = true;
    },
    closeAnswersModal() {
      this.answersModal = false;
    },
    async loadData() {
      if (
        this.activitiesStore.activities.length === 0 ||
        this.questionsStore.questions.length === 0
      ) {
        const tempActivities = await this.activitiesStore.loadActivities();
        await this.questionsStore.loadQuestions(tempActivities);
        this.activities = tempActivities;
        if (!this.responsesStore.activeResponse) {
          this.responsesStore.loadUserActiveResponse(this.authStore.user.id);
        }
      } else {
        this.activities = this.activitiesStore.activities;
        if (!this.responsesStore.activeResponse) {
          this.responsesStore.loadUserActiveResponse(this.authStore.user.id);
        }
      }
    },
    handleOnboarding() {
    
      const currentUserOnboardingPath =
      QUESTIONNAIRE_ONBOARDING_KEY + this.authStore.user.id;

      if(handleIfShowOnboarding(currentUserOnboardingPath)){
        this.showModal = true;
      }
    },
    isActive(index, type) {
      if (index - 1 <= this.responsesStore.lastActivityCompleted)
        return " custom_bg_purple ";
      else if (
        index - 2 <= this.responsesStore.lastActivityCompleted &&
        type == BALL
      )
        return " !bg-white border-2 border-[#766EF2] !text-[#766EF2]";
      else return " !bg-slate-300";
    },
    updateLastActivity(activityIndex) {
      if (activityIndex > this.responsesStore.lastActivityCompleted) {
        this.lastActivityCompleted = activityIndex;
        this.responsesStore.lastActivityCompleted = activityIndex;
      }
    },
  },
  async mounted() {
    if (!this.authStore.isLoggedIn) {
      router.push(HOME);
    }
    this.$emit("toggleHeader", true);
    this.handleOnboarding();
    this.$emit("toggleFooter", true);

    await this.loadData();
    this.loaded = true;
  },
  components: { Gradient, BaseButton },
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
  popUp: ctl(`
    ease-in 
    duration-300
  `),
};
const BALL = "isBall";
const LINE = "isLine";
const ANIM_DURATION = 500;
const POPUP_DURATION = 6000;

</script>
