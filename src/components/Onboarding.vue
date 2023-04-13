<script setup>
import ctl from "@netlify/classnames-template-literals";
import ProgressDot from "./ui_utils/ProgressDot.vue";
import BaseButton from "./ui_utils/BaseButton.vue";
</script>
<template>
  <div
    :class="localStyles.backdrop"
    @click.self="closeModal"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <article :class="localStyles.modalContainer">
      <div :class="localStyles.left">
        <div :class="localStyles.progressBar" class="text-black">
          <ProgressDot
            v-for="(val, index) in data"
            :key="index"
            :index="index"
            :currentIndex="currentIndex"
          />
        </div>
        <p :class="localStyles.pagCounter">
          {{ currentIndex + 1 + " de " + data.length }}
        </p>
        <h1 :class="localStyles.title" v-html="data[currentIndex].title"></h1>

        <img
          :src="'/' + data[currentIndex].imgMobile"
          :class="localStyles.mobileImg"
        />
        <p v-html="this.data[currentIndex].text" :class="localStyles.text"></p>
        <div :class="localStyles.btnsContainer">
          <BaseButton
            :text="data[currentIndex].backBtn"
            class="w-[120px] sm:w-[160px] mr-3"
            :altBtn="true"
          />
          <BaseButton :text="data[currentIndex].nextBtn" class="w-[120px] sm:w-[160px]" />
        </div>
      </div>
      <img src="/onboarding-vector.svg" :class="localStyles.vector">
      <div>
       
      </div>
    </article>
  </div>
</template>
<script>
export default {
  emits: ["close"],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  mounted() {},
};
const localStyles = {
  backdrop: ctl(`
    flex
    items-center
    justify-center
    fixed
    h-screen
    w-screen
    top-0
    bottom-0
    left-0
    z-40
    bg-black/25
    backdrop-blur
    `),
  modalContainer: ctl(`
        bg-white
        z-50
        w-11/12
        py-14
        custom-border-radius
        flex
        flex-col
        items-center
        px-6
        sm:w-3/4
        sm:p-6
        sm:pl-20
        sm:items-start
        sm:h-3/4
        relative
    `),
  progressBar: ctl(`
      flex
      items-center
      gap-2.5
      sm:gap-4
      sm:mt-36
    `),
  pagCounter: ctl(`
      text-center
      mt-4
    `),
  title: ctl(`
      font-bold
      text-center
      text-xl
      custom-text-violet
      mt-10
      sm:text-left
      sm:text-2xl
  `),
  mobileImg: ctl(`
      sm:hidden
      mt-6
  `),
  text: ctl(`
      text-center
      mt-6
      sm:text-left
  `),
  btnsContainer: ctl(`
    flex
    mt-6
    mb-6
  `),
  left:ctl(`
    flex
    flex-col
    items-center
    sm:items-start
    sm:w-1/2
  `),
  vector:ctl(`
    absolute
    top-0
    right-0
    h-full
    hidden
    sm:flex

  `)
};
</script>
