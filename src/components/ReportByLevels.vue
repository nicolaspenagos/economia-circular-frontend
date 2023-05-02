<script setup>
import ctl from "@netlify/classnames-template-literals";
import { useReportStore } from "../stores/report";
import { mapStores } from "pinia";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);
</script>
<template>
  <article>
    <h1 :class="localStyles.title">Gráfica de desempeño</h1>
    <p class="text-center mt-4">
      Esta gráfica muestra el puntaje obtenido en una escala de<strong>
        0 a 1000</strong
      >
      en cada uno de los principios que se evalúan en el nivel
      <strong>{{ selectedTab }}</strong>
    </p>
    <div :class="localStyles.chartContainer">
      <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
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
    console.log(this.reportStore.getLevelData(this.selectedTab));
  },
  data() {
    return {
      chartData: {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
            pointStyle: "circle",
          },
        ],
      },
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
};
</script>
