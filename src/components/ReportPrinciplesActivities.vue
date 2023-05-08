<script setup>
import ctl from "@netlify/classnames-template-literals";
import { useReportStore } from "../stores/report";
import { mapStores } from "pinia";
import { REPORT_BY_PRINCIPLES_VS_ACTIVITIES } from "../constants/report.js";
import {
  getStackedBarCharConfig,
  getColorClassMapByActivity,
} from "../utils/chartUtils.js";
import { TABLE_HEADERS_ACTIVITY } from "../constants/report.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import Table from "./ui_utils/Table.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
</script>
<template>
  <main
    :class="localStyles.main"
    v-if="selectedTab === 'Principios vs Actividades'"
  >
    <section>
      <h1 :class="localStyles.title + ' text-xl sm:!text-2xl'">
        Gráfica de desempeño
      </h1>
      <p class="text-center mt-4 w-3/4 ml-auto mr-auto">
        Esta gráfica muestra la relación que existe entre los principios y las
        actividades. Cada principio se compone de diferentes actividades, las
        cuales están representadas por colores diferentes, como se muestra a
        continuación
      </p>
      <article class="custom-shadow custom-border-radius p-8 mt-12">
        <h1 class="font-bold text-center sm:text-lg mb-6">
          Principios vs actividades
        </h1>
        <div class="flex flex-wrap w-full justify-center mb-6">
          <div
            v-for="(val, index) in reportStore.currentReport.reportByActivities"
            :key="index"
            class="text-xs flex w-fit sm:mt-0 mt-1"
          >
            <div
              :class="[
                'h-4 w-4 rounded-full mr-2',
                getColorClassMapByActivity().get(val.shortname),
              ]"
            ></div>
            <p class="mr-2">{{ "A" + (index + 1) }}</p>
          </div>
        </div>
        <div class="h-[475px]" v-if="loaded">
          <Bar :data="data" :options="options" />
        </div>
      </article>
    </section>
    <section class="flex flex-col sm:flex-row">
      <article
        class="custom-shadow w-full sm:w-[390px] p-8 custom-border-radius mt-10"
      >
        <h3 class="font-bold">Actividades de la Economía Circular</h3>
        <ul class="mt-4">
          <li
            v-for="(val, index) in reportStore.currentReport.reportByPrinciples"
            :key="index"
            class="list-disc mt-2 ml-8 text-sm"
          >
            {{ "P" + (index + 1) + " " + val.shortname }}
          </li>
        </ul>
      </article>
      <article
        class="custom-shadow w-full sm:w-3/4 p-8 custom-border-radius mt-10 sm:ml-10"
      >
        <h3 class="font-bold">Principios de la Economía Circular</h3>
        <ul class="mt-4">
          <li
            v-for="(val, index) in reportStore.currentReport.reportByActivities"
            class="mt-3 list-disc sm:list-none"
          >
            <div class="flex text-sm">
              <div
                :class="
                  'hidden sm:flex h-3 w-3 mt-[3.2px] mr-2 rounded-full ' +
                  getColorClassMapByActivity().get(val.shortname)
                "
              ></div>
              {{ "A" + (index + 1) + " " + val.title }}
            </div>
          </li>
        </ul>
      </article>
    </section>
    <div :class="localStyles.button">
      <p class="text-white py-2">Ver explicación</p>
      <img src="/eye.svg" class="h-4 ml-2" />
    </div>
  </main>
  <main :class="localStyles.main" v-else>
    <section class="mb-6 sm:mb-12">
      <h1 :class="localStyles.title + ' text-xl sm:!text-2xl'">
        Tabla de Puntajes:<span> Actividades de la Economía Circular</span>
      </h1>
      <p class="text-center mt-4 ml-auto mr-auto">
        En la siguiente tabla podrás <strong>comparar el puntaje</strong> de
        cada una de las Actividades <br class="sm:inline hidden" />
        de la EC que se evaluaron en el reporte
        <strong>principios VS Actividades.</strong>
      </p>
    </section>
    <Table :tableData="tableData" :tableHeader="TABLE_HEADERS_ACTIVITY" />
  </main>
</template>
<script>
export default {
  props: {
    selectedTab: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.loadPlotData();
    this.loadTableData();
  },
  computed: {
    ...mapStores(useReportStore),
  },
  data() {
    return {
      tableData: [],
      loaded: false,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      data: null,
    };
  },
  methods: {
    loadPlotData() {
      this.data = getStackedBarCharConfig(
        this.reportStore.currentReport.reportByPrinciples,
        this.reportStore.currentReport.reportByActivities,
        REPORT_BY_PRINCIPLES_VS_ACTIVITIES.get("Principios vs Actividades")
      );
      this.loaded = true;
    },
    loadTableData() {
      const tableHeader = [
        "",
        "Actividad",
        "Puntaje posible",
        "Puntaje obtenido",
        "Porcentaje",
      ];

      let tableData = [];
      let totalObtained = 0;
      let totalPossible = 0;

      let bestScore = Number.NEGATIVE_INFINITY;
      let worstScore = Number.POSITIVE_INFINITY;

      this.reportStore.currentReport.reportByActivities.forEach((activity) => {

        totalObtained += activity.obtainedScore;
        totalPossible += activity.possibleScore;
  
        const row = [];
        row.push(this.getIconHTML(activity.shortname));
        row.push(activity.title);
        row.push(activity.possibleScore.toFixed(1));
        row.push(activity.obtainedScore.toFixed(1));
        row.push(activity.obtainedPercentage.toFixed(1));
       
        tableData.push(row);

      });

      const lastRow = [];
      lastRow.push('');
      lastRow.push('Total');
      lastRow.push(totalPossible.toFixed(0));
      lastRow.push(totalObtained.toFixed(1));
      lastRow.push((totalObtained/totalPossible*100).toFixed(1));
      tableData.push(lastRow);

      this.tableData = tableData;
    },
    getIconHTML(shortname) {
      return (
        '<div class="h-4 w-4 rounded-full mr-2 ' +
        getColorClassMapByActivity().get(shortname) +
        ' "></div>'
      );
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
  main: ctl(`
        p-4
        sm:p-6
        sm:pb-20
    `),
  button: ctl(`
  z-20
  !cursor-pointer
  flex
  items-center
  justify-between
  px-4
  hover:bg-[#6B63F9]
  bg-[#756ef2]
  rounded-3xl
  sm:absolute
  bottom-0
  right-0
  w-fit
  mx-auto
  m-6
  sm:m-0
  sm:mr-6
  `),
};
</script>
