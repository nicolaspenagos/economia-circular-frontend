<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <div class="relative">
    <div :class="localStyles.container">
      <div class="ml-2 font-semibold  text-[#756ef2]">Porcentaje obtenido:</div>
      <div :class="localStyles.percentage" ref="progressPercentage">
        {{
          ((reportData.totalObtained / reportData.totalPossible) * 100).toFixed(
            1
          )
        }}
        %
      </div>
    </div>
    <div
      class="w-full h-4 sm:h-5 mt-4 rounded-xl bg-[#D9D9D9]"
      ref="progressBarContainer"
    ></div>
    <div
      :class="localStyles.progressBar"
      ref="progressBar"
    ></div>
    <div class="flex justify-between">
      <div class="flex items-center ml-2">
        <div>0</div>
     
      </div>
      <div class="flex items-center mr-2">

        <div>
          {{ reportData.totalPossible }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

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
  watch:{
    reportData(){
      this.onResize();
    }
  }
};
const localStyles={
  progressBar:ctl(`
      h-4 
      sm:h-5 
      rounded-xl 
      absolute 
      top-0 
      left-0 
      bg-[#756ef2] 
      ease-out 
      duration-300
  `),
  container:ctl(`
      absolute 
      top-[-24px] 
      w-full 
      justify-between 
      flex
  `),
  percentage:ctl(`
      flex 
      sm:items-center 
      items-start 
      mr-2 
      text-[#756ef2]
  `)
}
</script>
