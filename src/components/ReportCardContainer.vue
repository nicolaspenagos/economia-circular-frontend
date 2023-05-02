<script setup>
import ReportCard from "../components/ReportCard.vue";
import ctl from "@netlify/classnames-template-literals";
import { useReportStore } from "../stores/report";
import { mapStores } from "pinia";
</script>
<template>
  <section
    v-for="(val, index) in reportStore.completedResponses"
    :class="localStyles.gridSection"
  >
    <ReportCard
      :report="val"
      :index="index"
    />
  </section>
</template>
<script>
export default {
  computed: {
    ...mapStores(useReportStore),
  },
};
const localStyles = {
  gridSection: ctl(`
    w-full 
    h-full 
    flex 
    justify-center 
    mb-14
    `),
};
</script>
