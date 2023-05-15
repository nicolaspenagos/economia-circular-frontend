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
    <article :class="[localStyles.modalContainer, fromReport?'h-fit':'']">
      <div :class="localStyles.left">
        <div>
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
        </div>
        <div :class="['flex flex-col h-[440px] sm:h-[250px]',fromReport?'h-fit m':'']">
          <h1 :class="localStyles.title" v-html="data[currentIndex].title"></h1>
          <img
            :src="'/' + data[currentIndex].imgMobile"
            :class="[localStyles.mobileImg, fromReport?'!h-48 ':'']"
            draggable="false"
            alt="Onboarding img"
          />
          <p
            v-html="this.data[currentIndex].text"
            :class="localStyles.text"
          ></p>
        </div>
        <div :class="[localStyles.btnsContainer, fromReport?'mt-2':'']">
          <BaseButton
            v-if="data[currentIndex].backBtn !== ''"
            :text="data[currentIndex].backBtn"
            class="min-w-[120px] sw-fit sm:min-w-[150px] mr-3"
            :altBtn="true"
            @click="back"
          />
          <BaseButton
            v-if="data[currentIndex].nextBtn !== ''"
            :text="data[currentIndex].nextBtn"
            class="min-w-[120px] w-fit sm:min-w-[150px]"
            @click="next"
          />
        </div>
      </div>
    

      <img src="/onboarding-vector.svg" :class="[localStyles.vector]"  draggable="false" v-if="!fromReport" alt="decoration"/>
      <div :class="localStyles.right">
        <img
          :src="'/' + data[currentIndex].imgDesktop"
          :class="[localStyles.desktopImg, fromReport?'sm:mr-20':'']"
          draggable="false"
          alt="Oboarding img"
        />
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
    fromReport:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    next() {
      if(this.currentIndex===this.data.length-1)
        this.closeModal();
      else if(this.currentIndex + 1 < this.data.length) this.currentIndex++;
    },
    back() {
      if (this.currentIndex == 0) {
        this.closeModal();
      } else if (this.currentIndex - 1 >= 0) this.currentIndex--;
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
    cursor-pointer
    `),
  modalContainer: ctl(`
        bg-white
        z-50
        w-11/12
        py-14
        custom-border-radius
        flex
        px-6
        h-fit
        sm:w-3/4
        sm:py-6
        sm:pl-20
        sm:pr-0
        relative
        cursor-auto
    `),
  progressBar: ctl(`
      flex
      items-center
      gap-2.5
      sm:gap-4
      sm:mt-28
    `),
  pagCounter: ctl(`
      text-center
      sm:text-left
      mt-4
    `),
  title: ctl(`
      font-bold
      text-center
      text-xl
      custom-text-violet
      mt-8
      sm:text-left
      sm:text-2xl
      sm:mt-auto
  `),
  mobileImg: ctl(`
      sm:hidden
      mt-6
  `),
  desktopImg: ctl(`
    hidden
    sm:flex
    h-[400px]
    ml-auto
  `),
  text: ctl(`
      text-center
      mt-6
      sm:text-left
      sm:mb-auto
  `),
  btnsContainer: ctl(`
    flex
    sm:mb-28
  `),
  left: ctl(`
    flex
    flex-col
    items-center
    sm:items-start
    sm:w-1/2
    justify-between

  `),
  right: ctl(`
    w-1/2 
    hidden 
    sm:flex
    h-full
    justify-center
    items-center
    sm:h-full
    sm:mt-auto
    sm:mb-auto

    `),
  vector: ctl(`
    absolute
    top-0
    right-0
    h-full
    hidden
    sm:flex

  `),
};
</script>
