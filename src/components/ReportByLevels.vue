<script setup>
import ctl from "@netlify/classnames-template-literals";
import { useReportStore } from "../stores/report";
import { mapStores } from "pinia";
import ProgressBar from "./ui_utils/ProgressBar.vue";
import { getPieChartConfig, getColorsMapClasses } from "../utils/chartUtils.js";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "vue-chartjs";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
</script>
<template>
  <article v-if="loaded">
    <h1 :class="localStyles.title + ' !text-2xl'">{{ selectedTab }}</h1>
    <p class="text-center mt-4">
      Esta gráfica muestra el puntaje obtenido en una escala de<strong>
        0 a 1000</strong
      >
      en cada uno de los principios que se evalúan en el nivel
      <strong>{{ selectedTab }}</strong>
    </p>
    <section class="flex flex-col sm:flex-row sm:justify-between">
      <div :class="localStyles.chartContainer + ' sm:mr-10'">
        <h1 :class="localStyles.title">Distribución puntaje por principios</h1>
        <div :class="localStyles.legend" v-if="loaded">
          <div
            v-for="(val, index) in reportData.labels"
            :key="index"
            class="text-xs flex w-fit"
          >
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
        <div class="text-center mt-4 mb-12">
          <strong>
            Puntaje total nivel {{ selectedTab.toLowerCase() }}:
          </strong>
          {{ reportData.totalObtained.toFixed(1) }}
        </div>
        <ProgressBar :reportData="reportData" />
      </div>
      <div :class="localStyles.chartContainer + ' h-32'"></div>
    </section>
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

  watch: {
    selectedTab() {
      this.loadChart();
    },
  },
  data() {
    return {
      progressBarWidth: 0,
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
  mounted(){
    this.loadChart();
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
        mb-6
    `),
  chartContainer: ctl(`
        w-full
         sm:w-1/2
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
  legend: ctl(`
  flex 
  flex-wrap 
  w-full 
  justify-center 
  mb-6`),
};
</script>
