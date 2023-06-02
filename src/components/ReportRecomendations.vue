<script setup>
import ctl from "@netlify/classnames-template-literals";
import { mapStores } from "pinia";
import { useReportStore } from "../stores/report";
import { useActivitiesStore } from "../stores/activities";
import { getColorClassMapByActivity } from "../utils/chartUtils";
</script>
<template>
  <h1 :class="localStyles.title" v-if="lowerActivities.length > 0">
    De acuerdo con los resultados obtenidos se recomienda desarrollar las
    siguientes actividades para fortalecer la circularidad:
  </h1>
  <h1 :class="localStyles.title + ' !mb-0'" v-else>
    ¡Felicitaciones por los excelentes resultados obtenidos! Se ha logrado un
    alto nivel de circularidad. Sigue adelante y mantén el enfoque en la
    sostenibilidad.
  </h1>
  <article v-for="(val, index) in lowerActivities" :key="index" class="mb-6">
    <div class="flex items-center">
      <div class="flex items-center sm:flex-row flex-col justify-center">
        <p class="w-6 mr-2">{{ "A" + val.shortname.split(" ")[1] }}</p>
        <div
          :class="
            'h-3.5 w-3.5 rounded-full mr-3 ' +
            getColorClassMapByActivity().get(val.shortname)
          "
        ></div>
      </div>

      <h1 class="font-bold">{{ val.title }}</h1>
    </div>
    <p class="sm:ml-[57px] mt-2">
      {{ activitiesStore.activitiesById.get(val.id).description }}
    </p>
  </article>
</template>
<script>
export default {
  computed: {
    ...mapStores(useReportStore, useActivitiesStore),
  },
  data() {
    return {
      lowerActivities: [],
    };
  },
  mounted() {
    this.reportStore.currentReport.reportByActivities.forEach((activity) => {
      if (activity.obtainedScore < activity.possibleScore * 0.5) {
        this.lowerActivities.push(activity);
      }
    });
  },
};
const localStyles = {
  title: ctl(`
    font-bold
    mb-8
    `),
};
</script>
