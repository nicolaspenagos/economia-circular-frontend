<script setup>
import ctl from "@netlify/classnames-template-literals";
import { useReportStore } from "../stores/report";
import { mapStores } from "pinia";

import { getPieChartConfig,getColorsMapClasses } from "../utils/chartUtils.js";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { PolarArea } from 'vue-chartjs'


ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)
</script>
<template>
  <article>
    <h1 :class="localStyles.title">{{ selectedTab }}</h1>
    <p class="text-center mt-4">
      Esta gráfica muestra el puntaje obtenido en una escala de<strong>
        0 a 1000</strong
      >
      en cada uno de los principios que se evalúan en el nivel
      <strong>{{ selectedTab }}</strong>
    </p>
    <div :class="localStyles.chartContainer">
      <div class="flex flex-wrap w-full justify-center mb-6" v-if="loaded">
        <div v-for="(val, index) in reportData.labels" :key="index" class="text-xs flex w-fit">
          <div :class="[localStyles.dot, getColor(val)]"></div>
          <p class="mr-2">{{ val }}</p>
        </div>
      </div>
      <PolarArea
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
        v-if="loaded"
      />
    </div>
  </article>
</template>
<script>
export default {
  props: {
    selectedTab: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapStores(useReportStore),
  },
  mounted() {
    this.loadChart();
  },
  data() {
    return {
      loaded: false,
      reportData: null,
      chartData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };
  },
  methods: {
    loadChart() {
      this.reportData = getPieChartConfig(
        this.reportStore.getLevelData(this.selectedTab)
      );

      this.chartData = {
        labels: this.reportData.labels,
        datasets: [
          {
            backgroundColor: this.reportData.backgroundColor,
            data: this.reportData.data,
            pointStyle: "circle",
          },
        ],
      };
      this.loaded = true;
    },
    getColor(principle) {
      return getColorsMapClasses().get(principle);
    },
  },
};
const localStyles = {
  title: ctl(`
        font-bold
        text-center
        sm:text-xl
    `),
  chartContainer: ctl(`
         w-5/12
         custom-shadow
         custom-border-radius
         p-12
         mt-12
         
  `),
  dot: ctl(`
    h-4
    w-4
    rounded-full
    mr-2
  `),
};
</script>
