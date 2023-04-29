<script setup>
import ctl from "@netlify/classnames-template-literals";
import Question from "./Question.vue";
import { useQuestionsStore } from "../stores/questions";
import { useReponsesStore } from "../stores/responses";
import { mapStores } from "pinia";
import BaseButton from "./ui_utils/BaseButton.vue";
import Modal from "./ui_utils/Modal.vue";
import modalMsgs from "../constants/modal.js";
import { useActivitiesStore } from "../stores/activities";
</script>
<template>
  <Modal
    v-if="showModal"
    :msg="modalMsg"
    :imgPath="modalImgPath"
    @accept="closeModal"
    :onlyAccept="true"
  />
  <main class="flex flex-col w-full" ref="activityMain">
    <section
      :class="[
        localStyles.card,
        ' cursor-pointer',
        getPadding(),
        show ? '  ' : ' mb-10 sm:mb-16',
      ]"
      @click="toggleDisplay"
    >
      <img
        src="/polygon.svg"
        :class="localStyles.cardTriangle"
        draggable="false"
      />
      <h1
        :class="[
          localStyles.cardTitle,
          this.isIndexAble() ? 'opacity-100' : 'opacity-50',
        ]"
      >
        {{ activity.name }}
      </h1>
      <h2
        :class="[
          localStyles.subtitle,
          this.isIndexAble() ? 'opacity-100' : 'opacity-50',
        ]"
      >
        {{ activity.title }}
      </h2>
      <p :class="[localStyles.description, displayClassMod()]">
        {{ activity.description }}
      </p>
      <img
        src="/purple-v.svg"
        :class="[localStyles.showBtn, getAbleClassMod()]"
        draggable="false"
      />
    </section>
    <article
      v-for="(val, index) in activityQuestions"
      :key="index"
      :class="[
        getQuestionSectionClass(),
        index === activityQuestions.length - 1 ? 'mb-12' : '',
      ]"
    >
      <div :class="localStyles.line" v-if="shouldRender(val)"></div>
      <Question
        :loaded="loaded"
        :question="val"
        v-if="shouldRender(val)"
        :class="'question' + this.activity.name.replaceAll(' ', '')"
      />
    </article>
    <BaseButton
      text="Guardar progreso"
      @click="saveAndContinue"
      v-if="this.show"
      :class="localStyles.saveButton"
    />
  </main>
</template>
<script>
const alertImg = "/alert.svg";
const savedImg = "/saved.svg";
export default {
  emits: ["updateLastActivity"],
  setup() {
    const activityMain = ref(null);
    return {
      activityMain,
    };
  },
  props: {
    activity: {
      type: Object,
      default: null,
    },
    lastActivityCompleted: {
      type: Number,
      default: -1,
    },
    index: {
      type: Number,
      default: Infinity,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      renderedQuestions: new Map(),
      numberOfRendered: 0,
      showModal: false,
      rendredCounterMap: new Map(),
      modalMsg: modalMsgs.INCOMPLETE_ANSWERS,
      modalImgPath: alertImg,
    };
  },
  methods: {
    openActivity() {
      this.show = true;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    displayClassMod() {
      if (this.show) return "!flex";
      else return "!hidden";
    },
    toggleDisplay() {
      if (this.isAble()) this.show = !this.show;
    },
    getPadding() {
      if (this.show) return "sm:py-12";
      else return "";
    },
    isAble() {
      if (this.index === 0) {
        return true;
      }

      if (this.isIndexAble()) {
        return true;
      }
      return false;
    },
    getAbleClassMod() {
      if (this.isAble()) {
        return this.show ? " rotate-180" : "";
      }
      if (this.index <= this.responsesStore.lastActivityCompleted + 1)
        return "";
      return " !opacity-50";
    },
    getQuestionSectionClass() {
      return this.show ? "flex flex-col" : "hidden";
    },
    shouldRender(question) {
      if (question.mandatory) {
        return true;
      }
      if (this.responsesStore.searchSelectedDependentQuestionId(question.id)) {
        return true;
      }

      return false;
    },
    async saveAndContinue() {
      if (this.readyToSave()) {
        await this.responsesStore.saveResponse(false);
   
        this.modalMsg = modalMsgs.ANSWERS_SAVED;
        this.modalImgPath = savedImg;
        this.openModal();
        this.$emit("updateLastActivity", this.index);
      
      } else {
        this.modalMsg = modalMsgs.INCOMPLETE_ANSWERS;
        this.modalImgPath = alertImg;
        this.openModal();
      }
    },
    readyToSave() {
      return (
        this.rendredCounterMap.get(this.activity.name) ===
        this.responsesStore.getCounterByActivity(this.activity.name)
      );
    },
    showToggle() {
      if (this.index === 0) return true;
    },
    isIndexAble() {
      return this.index <= this.responsesStore.lastActivityCompleted + 1;
    },
  },

  mounted() {
    if (this.responsesStore.lastActivityCompleted + 1 === this.index) {
      this.show = true;
      if(this.index>=1)
      if (this.$refs.activityMain) {
        this.$refs.activityMain.scrollIntoView({ behavior: "smooth" });
      }
    }
  },
  computed: {
    ...mapStores(useQuestionsStore, useReponsesStore, useActivitiesStore),
    activityQuestions() {
      return this.questionsStore.questionsByActivity.get(this.activity.name);
    },
  },
  updated() {
    this.rendredCounterMap = new Map();
    this.activitiesStore.activities.forEach((a) => {
      const currentActivityName = a.name;
      const currentActivityQuestions = document.querySelectorAll(
        ".question" + currentActivityName.replaceAll(" ", "")
      );
      this.rendredCounterMap.set(
        currentActivityName,
        currentActivityQuestions.length
      );
    });
  },
  watch: {
    "responsesStore.lastActivityCompleted": {
      handler(newVal) {
        if (this.responsesStore.lastActivityCompleted + 1 === this.index) {
          setTimeout(() => (this.show = true), 1200);
        }
        if (this.responsesStore.lastActivityCompleted === this.index) {
          if (this.$refs.activityMain) {
            this.$refs.activityMain.scrollIntoView({ behavior: "smooth" });
          }
          setTimeout(() => (this.show = false), 1200);
        }
      },
      immediate: true,
    },
  },
};
const localStyles = {
  card: ctl(`
        bg-white
        custom-border-radius
        custom-shadow
        relative
        p-4
        sm:px-14
        w-full
        sm:ml-3
        sm:mt-[-10px]
    `),
  cardTriangle: ctl(`
        absolute
        h-6
        left-[-18.5px]
        mt-4
        left-drop-shadow
        top-[1px]
        hidden
        sm:flex
    `),
  cardTitle: ctl(`
        text-md
        font-bold
        sm:text-xl
        text-[#756ef2]
    `),
  subtitle: ctl(`
        text-[#756ef2]
        italic
        mt-1
        mb-1
    `),
  description: ctl(`

    `),
  showBtn: ctl(`
        absolute
        top-6
        right-6
        cursor-pointer
        h-3
        ease-out
        duration-300
    `),
  line: ctl(`
        w-0.5
        custom_bg
        custom_bg_purple
        h-10
        ml-6
        sm:ml-10

    `),
  saveButton: ctl(`
      min-w-[120px]
      w-fit
      sm:min-w-[150px]
      ml-4
      mb-6
      mt-[-20px]
      sm:mb-[40px]

    `),
};
</script>
