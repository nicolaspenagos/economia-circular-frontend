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
import { TABLE_HEADERS } from "../constants/report.js";
import Table from "./ui_utils/Table.vue";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
</script>
<template>
  <div :class="localStyles.grade">
    <h3 class="text-white">Obtuviste</h3>
    <div class="flex items-end" v-if="loaded">
      <h1 class="font-bold text-white text-2xl">
        {{
          reportData.totalObtained >= reportData.totalPossible
            ? reportData.totalPossible
            : reportData.totalObtained.toFixed(0)
        }}
      </h1>
      <p class="text-white mb-0.5 font-semibold opacity-50">
        /{{ reportData.totalPossible }}
      </p>
    </div>
  </div>

  <article v-if="loaded" :class="relative">
    <div :class="localStyles.button">
      <p class="text-white py-2">Ver explicación</p>
      <img src="/eye.svg" class="h-4 ml-2" />
    </div>
    <h1 :class="localStyles.title + ' text-xl sm:!text-2xl !mt-[-4px]'">
      Nivel {{ selectedTab.toLowerCase() }}
    </h1>
    <p class="text-center mt-4 w-3/4 ml-auto mr-auto">
      Los siguientes resultados corresponden a los principios asociados al nivel
      {{ selectedTab }}. Cada principio se mide en una escala de 0 a 1000 y la
      suma de todos estos da como resultado el puntaje total del nivel
    </p>
    <section class="flex flex-col sm:flex-row sm:justify-between">
      <div :class="localStyles.chartContainer + ' sm:mr-10'">
        <h1 :class="localStyles.title">
          Distribución de puntaje por principios
        </h1>
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
        <div class="text-center mt-4 mb-12 font-semibold">
          Puntaje total nivel:
          <span class="font-regular">
            {{ reportData.totalObtained.toFixed(1) }}</span
          >
        </div>
        <ProgressBar :reportData="reportData" />
      </div>
      <div :class="localStyles.chartContainer">
        <h1 :class="localStyles.title">Tabla de puntajes por principios</h1>
        <Table :tableData="tableData" :tableHeader="TABLE_HEADERS" />
        <div class="flex mt-4">
          <article :class="localStyles.card +' '+getColorsMapClasses().get(best)+ ' mr-4'">
            <h1 class="font-bold text-white">Principio más destacado</h1>
            <p class="text-white">{{ best }}</p>
          </article>
          <article :class="localStyles.card+' '+getColorsMapClasses().get(worst)">
            <h1 :class="['font-bold text-white']">Principio por mejorar</h1>
            <p class="text-white"> {{ worst }}</p>
          </article>
        </div>
      </div>
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
      this.loadTableData();
    },
  },
  data() {
    return {
      best: "",
      worst: "",
      tableData: [],
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
  mounted() {
    this.loadChart();
    this.loadTableData();
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
    loadTableData() {
      let tableData = [];
      let totalObtained = 0;
      let totalPossible = 0;
      let bestScore = Number.NEGATIVE_INFINITY;
      let worstScore = Number.POSITIVE_INFINITY;
      this.reportStore.getLevelData(this.selectedTab).forEach((element) => {
        let row = [];
        row.push(element.shortname);
        row.push(element.possibleScore);
        row.push(element.obtainedScore);
        row.push(element.obtainedPercentage);
        tableData.push(row);
        if (element.obtainedScore > bestScore) {
          bestScore = element.obtainedScore;
          this.best = element.shortname;
        }
        if (element.obtainedScore < worstScore) {
          worstScore = element.obtainedScore;
          this.worst = element.shortname;
        }

        totalObtained += element.obtainedScore;
        totalPossible += element.possibleScore;
      });
      const lastRow = [
        "Total",
        totalPossible,
        totalObtained,
        (totalObtained / totalPossible) * 100,
      ];
      tableData.push(lastRow);
      this.tableData = tableData;
    },
  },
};
const localStyles = {
  title: ctl(`
        font-bold
        text-center
        sm:text-lg
        mb-6
    `),
  chartContainer: ctl(`
        h-fit

        w-full
         sm:w-1/2
         custom-shadow
         custom-border-radius
         p-6
         sm:p-12
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
  grade: ctl(`
    absolute
    w-44
    h-24
    bg-[#9995FF]
    top-0
    right-0
    custom-border-radius
    !rounded-br-none
    !rounded-tl-none
    custom-shadow
    flex
    justify-center
    items-center
    flex-col
    
  `),
  button: ctl(`
  flex
  items-center
  justify-between
  px-4
  text-white
  bg-[#756ef2]
  rounded-3xl
  absolute
  bottom-0
  right-0
  `),
  card: ctl(`
    flex 
    flex-col
    p-6
    custom-shadow
    custom-border-radius
    text-sm
  `),
};
</script>
