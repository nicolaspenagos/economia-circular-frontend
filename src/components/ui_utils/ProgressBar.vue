<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <div class="relative">
    <div class="absolute top-[-24px] w-full justify-between flex">
      <div>Porcentaje obtenido:</div>
      <div class="flex items-center" ref="progressPercentage">
        <span class="text-xs opacity-50">%</span
        >{{
          ((reportData.totalObtained / reportData.totalPossible) * 100).toFixed(
            1
          )
        }}
      </div>
    </div>
    <div
      class="w-full h-5 mt-4 rounded-xl bg-[#D9D9D9]"
      ref="progressBarContainer"
    ></div>
    <div
      class="h-5 rounded-xl absolute top-0 left-0 bg-[#756ef2] ease-out duration-300"
      ref="progressBar"
    ></div>
    <div class="flex justify-between">
      <div class="flex items-center">
        <div>0</div>
        <p class="text-xs opacity-50 ml-1">Mín</p>
      </div>
      <div class="flex items-center">
        <p class="text-xs opacity-50 mr-1">Máx</p>
        <div>
          {{ reportData.totalPossible }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  setup() {
    const progressBarContainer = ref(null);
    const progressBar = ref(null);

    return {
      progressBarContainer,
      progressBar,
    };
  },
  props: {
    reportData: {
      type: Object,
      defualt: null,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.resizeObserver = new ResizeObserver(this.onResize);
      this.resizeObserver.observe(this.$refs.progressBarContainer);
      this.onResize();
    });
  },
  beforeUnmount() {
    this.resizeObserver.unobserve(this.$refs.progressBarContainer);
  },
  methods: {
    onResize() {
      const totalObtained = this.reportData.totalObtained;
      const totalPossible = this.reportData.totalPossible;
      this.progressBarWidth = this.$refs.progressBarContainer.offsetWidth;
      const width =
        (this.$refs.progressBarContainer.offsetWidth * totalObtained) /
        totalPossible;
      this.$refs.progressBar.style.width = width + "px";
    },
  },
};
</script>
