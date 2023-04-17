<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <article :class="localStyles.questionCard">
    <h1 :class="localStyles.questionTitle">
      {{ question.questionOrder + 1 + ". " + question.questionText }}
    </h1>
    <section class="mt-6">
      <div v-for="(val, index) in question.questionOptions" class="flex items-center gap-2">
        <input  type="radio" :name="'qtnOptGroup-' + question.id" :id="'opt-'+index"/>
        <label :for="'opt-' + index">{{ val.optionValue }}</label>
      </div>
    </section>
    <textarea
      v-model="justifyAnswer"
      placeholder="Por favor justifica tu respuesta"
      :class="localStyles.justify"
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
   
    }
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
