<script setup>
import ctl from "@netlify/classnames-template-literals";
import {
  INCREMENTAL_SINGLE_CHOICE,
  SINGLE_CHOICE,
  MULTIPLE_CHOICE,
  SINGLE_CHOICE_DEPENDENT,
} from "../stores/questions";
import { mapStores } from "pinia";
import { useReponsesStore } from "../stores/responses";
import {
  mapMarkedInfoToSring,
  isExlusive,
  replaceNumbersWithWords,
} from "../utils/markOptionUtils.js";
import { useQuestionsStore } from "../stores/questions";
import Hint from "./ui_utils/Hint.vue";
</script>
<template>
  <article :class="localStyles.questionCard">
    <div class="flex items-center">
      <h1 :class="localStyles.questionTitle">
        {{ question.questionOrder + 1 + ". " + question.questionText }}
      </h1>
      <Hint v-if="question.hint !== ''" :hintText="question.hint" />
    </div>
    <section
      class="mt-6"
      v-if="
        question.type === SINGLE_CHOICE ||
        question.type === INCREMENTAL_SINGLE_CHOICE ||
        question.type === SINGLE_CHOICE_DEPENDENT
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
          :value="
            mapMarkedInfoToSring(
              question.id,
              val.id,
              question.type,
              val.dependentQuestionId,
              val.exclusive
            )
          "
        />
        <label :for="'opt-' + index">{{ val.optionValue }}</label>
      </div>
    </section>
    <section class="mt-6" v-if="question.type === MULTIPLE_CHOICE" ref="inputs">
      <div
        v-for="(val, index) in question.questionOptions"
        class="flex items-center gap-2"
      >
        <input
          type="checkbox"
          :name="'qtnOptGroup-' + question.id"
          :id="'opt-' + index"
          v-model="multiplePicked"
          :class="replaceNumbersWithWords(val.id)"
          @click="
            handleExclusive(
              mapMarkedInfoToSring(
                question.id,
                val.id,
                question.type,
                val.dependentQuestionId,
                val.exclusive
              ),
              val.exclusive,
              val.id
            )
          "
          :value="
            mapMarkedInfoToSring(
              question.id,
              val.id,
              question.type,
              val.dependentQuestionId,
              val.exclusive
            )
          "
        />
        <label :for="'opt-' + index">{{ val.optionValue }}</label>
        <Hint v-if="val.hint !== ''" :hintText="val.hint" />
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
  emits: ["optionMarked"],
  props: {
    question: {
      type: Object,
      default: null,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
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
    justifyAnswer(newJustify) {
      this.responsesStore.handleUpdateJustify(this.question.id, newJustify);
    },
  },
  computed: {
    ...mapStores(useReponsesStore, useQuestionsStore),
  },
  methods: {
    handleExclusive(optStr, exclusive, id) {
      const checked = this.$refs.inputs.querySelector(
        "." + replaceNumbersWithWords(id)
      ).checked;

      if (exclusive) {
        if (checked) {
          this.multiplePicked = [optStr];
        }
      } else {
        const exclusiveIndex = this.multiplePicked.findIndex(isExlusive);
        if (exclusiveIndex >= 0) {
          this.multiplePicked.splice(exclusiveIndex, 1);
          this.multiplePicked.push(optStr);
          this.multiplePicked = JSON.parse(JSON.stringify(this.multiplePicked));
        }
      }
    },
  },

  mounted() {
    const questionResponse = this.responsesStore.getQuestionResponse(
      this.question.id,
      this.question.type
    );
    if (this.questionsStore.isSingleChoice(this.question.type))
      this.singlePicked = questionResponse;
    else this.multiplePicked = questionResponse;

    this.justifyAnswer = this.responsesStore.getJustifyAnswer(this.question.id);
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
        mr-1
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
