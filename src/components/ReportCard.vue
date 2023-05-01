<script setup>
import ctl from "@netlify/classnames-template-literals";
import { ORDINAL_NUMBERS_LIST } from "../constants/ordinals.js";
</script>
<template>
  <article
    :class="[localStyles.reportCard, getColor()]"
    data-aos-duration="1000"
    data-aos="flip-left"
  >
    <div>
      <h1 :class="localStyles.title">
        Resultados del {{ ORDINAL_NUMBERS_LIST[index] }} diagnóstico
      </h1>
      <p class="text-white">{{ report.val }}</p>
    </div>
    <img src="/stats-repor-card.svg" class="mr-auto" />
  </article>
</template>
<script>
const NUMBER_OF_COLUMNS = 4;

export default {
  props: {
    report: {
      type: Object,
      default: null,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getColor() {
      const rowIndex = Math.floor(this.index / NUMBER_OF_COLUMNS);
      console.log(rowIndex);
      if (rowIndex % 2 == 0) {
        return this.index % 2 == 0
          ? "sm:bg-[#756EF2] bg-[#756EF2]"
          : "sm:bg-[#34ce8b] bg-[#34ce8b]";
      } else {
        return this.index % 2 == 0
          ? "sm:bg-[#34ce8b]  bg-[#756EF2]"
          : "sm:bg-[#756EF2] bg-[#34ce8b]";
      }
    },
  },
};
const localStyles = {
  reportCard: ctl(`
        h-60
        w-64
        custom-border-radius
        items-center
        justify-center
        p-6
        custom-shadow
        cursor-pointer
        hover:translate-y-[-15px]
        ease-in-out
        !duration-300
        hover:drop-shadow-xl
        flex
        flex-col
        justify-between
    `),
  title: ctl(`
  text-white
  font-white
  font-bold
  text-lg
    `),
};
</script>
