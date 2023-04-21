<script setup>
import ctl from "@netlify/classnames-template-literals";
import {
  INCREMENTAL_SINGLE_CHOICE,
  SINGLE_CHOICE,
  MULTIPLE_CHOICE,
} from "../stores/questions";
import { mapStores } from "pinia";
import { useReponsesStore } from "../stores/responses";
import { mapMarkedInfoToSring } from "../utils/markOptionUtils.js";
import { useQuestionsStore } from "../stores/questions";
</script>
<template>
  <article :class="localStyles.questionCard">
    <h1 :class="localStyles.questionTitle">
      {{ question.questionOrder + 1 + ". " + question.questionText }}
    </h1>
    <section
      class="mt-6"
      v-if="
        question.type === SINGLE_CHOICE ||
        question.type === INCREMENTAL_SINGLE_CHOICE
      "
    >
      <div
        v-for="(val, index) in question.questionOptions"
        class="flex items-center gap-2"
      >
        <input
          type="radio"
          :name="'qtnOptGroup-' + question.id"
          :id="'opt-' + index"
          v-model="singlePicked"
          :value="mapMarkedInfoToSring(question.id, val.id, question.type)"
        />
        <label :for="'opt-' + index">{{ val.optionValue }}</label>
      </div>
    </section>
    <section class="mt-6" v-if="question.type === MULTIPLE_CHOICE">
      <div
        v-for="(val, index) in question.questionOptions"
        class="flex items-center gap-2"
      >
        <input
          type="checkbox"
          :name="'qtnOptGroup-' + question.id"
          :id="'opt-' + index"
          v-model="multiplePicked"
          :value="mapMarkedInfoToSring(question.id, val.id, question.type)"
        />
        <label :for="'opt-' + index">{{ val.optionValue }}</label>
      </div>
    </section>
    <textarea
      v-model="justifyAnswer"
      placeholder="Por favor justifica tu respuesta"
      :class="localStyles.justify"
      v-if="question.justify"
    >
    </textarea>
  </article>
</template>
<script>
export default {
  props: {
    question: Object,
    default: null,
  },
  data() {
    return {
      justifyAnswer: "",
      singlePicked: null,
      multiplePicked: [],
    };
  },
  watch: {
    singlePicked(newPicked, oldPicked) {
      this.responsesStore.handleMarkSingleAnswer(oldPicked, newPicked);
    },
    multiplePicked(newMultiplePicked, oldMultiplePicked) {
     
      this.responsesStore.handleMarkMultipleAnswers(
        newMultiplePicked,
        oldMultiplePicked
      );
    },
  },
  computed: {
    ...mapStores(useReponsesStore, useQuestionsStore),
  },
  mounted() {
    //console.log(this.responsesStore.getQuestionResponse(this.question.id, this.question.type));

    const questionResponse = this.responsesStore.getQuestionResponse(
      this.question.id,
      this.question.type
    );
    if (this.questionsStore.isSingleChoice(this.question.type))
      this.singlePicked = questionResponse;
    else this.multiplePicked = questionResponse;
  },
};
const localStyles = {
  questionCard: ctl(`
        bg-white
        custom-shadow
        custom-border-radius
        p-4
        sm:px-12
        w-full
        sm:ml-3
        sm:py-12
        `),
  questionTitle: ctl(`
        font-bold
    `),
  justify: ctl(`
        w-full
        sm:w-2/3
        bg-[#F3F2FE]
        custom-border-radius
        p-3
        mt-6
        sm:p-6
        

    `),
};
</script>
