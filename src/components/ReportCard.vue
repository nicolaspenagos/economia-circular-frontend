<script setup>
import ctl from "@netlify/classnames-template-literals";
import { ORDINAL_NUMBERS_LIST } from "../constants/ordinals.js";
import { useReportStore } from "../stores/report";
import { mapStores } from "pinia";
import router, { REPORT } from "../router";
</script>
<template>
  <article
    :class="[localStyles.reportCard, getColor(), isLoading?'!cursor-wait': 'cursor-pointer' ]"
    data-aos-duration="1000"
    data-aos="flip-left"
    @click="getReport"
  >
    <div :class="localStyles.counter">
        <h1 class="text-white font-bold opacity-100">{{ index+1 }}</h1>
    </div>
    <div>
      <h1 :class="localStyles.title">
        Resultados del {{ ORDINAL_NUMBERS_LIST[index] }} diagnóstico
      </h1>
      <p class="text-white mt-1">{{ getDate() }}</p>
    </div>
  </article>
</template>
<script>
const NUMBER_OF_COLUMNS = 4;

export default {
  computed:{
    ...mapStores(useReportStore)
  },
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
    getDate(){
      return this.report.responseDate.split('T')[0];
    },
    async getReport(){
      this.isLoading = true;
      await this.reportStore.getReport(this.index);
      this.isLoading = false;
      router.push(REPORT); 
    }
  },
  data(){
    return {
      isLoading:false
    }
  }


};
const localStyles = {
  reportCard: ctl(`
        h-60
        w-64
        custom-border-radius
        items-center
        justify-center
        p-7
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
  counter:ctl(`
    text-4xl
    bg-white
    bg-opacity-30
    h-[70px]
    w-[70px]
    flex
    justify-center
    items-center
    rounded-full
    mr-auto
  `)
};
</script>
