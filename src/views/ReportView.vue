<script setup>
import { useReportStore } from '../stores/report';
import ctl from "@netlify/classnames-template-literals";
import { mapStores } from "pinia";
</script>
<template></template>
<script>
export default {
  mounted() {
    this.reportStore.loadCompletedResponses();
  },
  computed:{
    ...mapStores(useReportStore),

  }
};
</script>
