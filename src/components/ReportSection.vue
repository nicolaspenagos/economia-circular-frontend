<script setup>
import ctl from "@netlify/classnames-template-literals";
import ReportByLevels from "./ReportByLevels.vue";
import ReportPrinciplesActivities from "./ReportPrinciplesActivities.vue";
import { BY_LEVELS, BY_PRINCIPLES_VS_ACTIVITIES} from "../constants/report";
</script>
<template>
  <section :class="localStyles.section">
    <nav :class="localStyles.nav">
      <div
        :class="[localStyles.navBtn, getSelectedClassMod(val)]"
        v-for="(val, index) in Array.from(reportConstantMap.keys())"
        v-html="val"
        :key="index"
        @click="setSlectedTab(val)"
      ></div>
    </nav>
    <article :class="localStyles.card">
      <ReportByLevels :selectedTab="selectedTab" v-if="type === BY_LEVELS" />
      <ReportPrinciplesActivities  :selectedTab="selectedTab" v-if="type=== BY_PRINCIPLES_VS_ACTIVITIES"/>
      
    </article>
  </section>
</template>
<script>
export default {
  props: {
    reportConstantMap: {
      type: Object,
      default: null,
    },
    type: {
      type: String,
      default: "",
    },
  },
  methods: {
    getNavTitle(str) {
      const parts = str.split(" ");

      if (parts.length === 0) {
        return str;
      }

      let title = "";

      for (let i = 0; i < parts.length; i++) {
        if (!i + 2 < parts.length) {
          title += '<br class="sm:hidden inline">';
        }
        title += parts[i];
      }

      return title;
    },
    setSlectedTab(newVal) {
      this.selectedTab = newVal;
    },
    getSelectedClassMod(val) {
      return this.selectedTab === val ? "bg-[#9995ff]" : "";
    },
  },
  data() {
    return {
      selectedTab: Array.from(this.reportConstantMap.keys())[0],
    };
  },
  mounted(){

  }

};
const localStyles = {
  section: ctl(`
        mt-16
        w-full
    `),
  nav: ctl(`
        flex
    `),
  navBtn: ctl(`
        bg-[#766ef2]
        hover:bg-[#9995ff]
        custom-border-radius
        !rounded-b-none
        mr-2
        px-1
        py-1
        sm:mr-6
        sm:h-10
        font-bold
        text-white
        w-[105px]
        sm:w-64
        flex
        justify-center
        items-center
        cursor-pointer
        text-center
    
    `),
  card: ctl(`
        custom-shadow
        bg-white
        w-full
        h-fit
        custom-border-radius
        !rounded-tl-none
        p-4
        sm:p-12
    `),
  title: ctl(`
        font-bold
        text-center
        sm:text-xl
    `),
};
</script>
