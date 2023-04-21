<script setup>
import ctl from "@netlify/classnames-template-literals";
import Question from "./Question.vue";
import { useQuestionsStore } from "../stores/questions";
import { useReponsesStore } from "../stores/responses";
import { mapStores } from "pinia";
</script>
<template>
  <main class="flex flex-col w-full">
    <section
      :class="[localStyles.card, getPadding(), show ? '  ' : ' mb-10 sm:mb-16']"
    >
      <img
        src="/polygon.svg"
        :class="localStyles.cardTriangle"
        draggable="false"
      />
      <h1 :class="localStyles.cardTitle">{{ activity.name }}</h1>
      <h2 :class="localStyles.subtitle">{{ activity.title }}</h2>
      <p :class="[localStyles.description, displayClassMod()]">
        {{ activity.description }}
      </p>
      <img
        src="/purple-v.svg"
        :class="[localStyles.showBtn, getAbleClassMod()]"
        draggable="false"
        @click="toggleDisplay"
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
      <Question :question="val" v-if="shouldRender(val)" />
    </article>
  </main>
</template>
<script>
export default {
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
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
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

      if (this.index <= this.lastActivityCompleted) {
        return true;
      }
      return false;
    },
    getAbleClassMod() {
      if (this.isAble()) {
        return this.show ? " rotate-180" : "";
      }
      return " !opacity-50";
    },
    getQuestionSectionClass() {
      return this.show ? "flex flex-col" : "hidden";
    },
    shouldRender(question){

      if(question.mandatory){
        return true;
      }
      return this.responsesStore.searchSelectedDependentQuestionId(question.id);
  
    }
  },
  mounted() {
  
  },
  computed: {
    ...mapStores(useQuestionsStore, useReponsesStore),
    activityQuestions() {
      return this.questionsStore.questionsByActivity.get(this.activity.name);
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
        sm:px-12
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
};
</script>
