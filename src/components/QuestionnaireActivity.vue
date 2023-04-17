<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <section :class="[localStyles.card, getPadding()]">
    <img
      src="/polygon.svg"
      :class="localStyles.cardTriangle"
      draggable="false"
    />
    <h1 :class="localStyles.cardTitle">{{ activity.name }}</h1>
    <h2 :class="localStyles.subtitle">{{ activity.title }}</h2>
    <p :class="[localStyles.description, displayClassMod()]">
      {{ activity.description }}
    </p>
    <img
      src="/purple-v.svg"
      :class="[localStyles.showBtn, getAbleClassMod()]"
      draggable="false"
      @click="toggleDisplay"
    />
  </section>
</template>
<script>
export default {
  props: {
    activity: {
      type: Object,
      default: null,
    },
    lastActivityCompleted: {
      type: Number,
      default: -1,
    },
    index: {
      type: Number,
      default: Infinity,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    displayClassMod() {
      if (this.show) return "!flex";
      else return "!hidden";
    },
    toggleDisplay() {
      if (this.isAble()) this.show = !this.show;
    },
    getPadding() {
      if (this.show) return "sm:py-12";
      else return "";
    },
    isAble() {
        console.log(this.lastActivityCompleted, this.index);
      if (this.index === 0) {
        return true;
      }

      if (this.index <= this.lastActivityCompleted) {
        return true;
      }
      return false;
    },
    getAbleClassMod() {
      if(this.isAble()){
        return this.show?" rotate-180":"";
      }
      return " !opacity-50";
    },
  },
};
const localStyles = {
  card: ctl(`
        bg-white
        mb-10
        sm:mb-16
        custom-border-radius
        custom-shadow
        relative
        p-4
        sm:px-12
        w-full
        ml-3
        sm:mt-[-10px]
    `),
  cardTriangle: ctl(`
        absolute
        h-6
        left-[-18.5px]
        mt-4
        left-drop-shadow
        top-[1px]
        hidden
        sm:flex
    `),
  cardTitle: ctl(`
        text-md
        font-bold
        sm:text-xl
        text-[#756ef2]
    `),
  subtitle: ctl(`
        text-[#756ef2]
        italic
        mt-1
        mb-1
    `),
  description: ctl(`
 
    `),
  showBtn: ctl(`
        absolute
        top-6
        right-6
        cursor-pointer
        h-3
        ease-out 
        duration-300
    `),
};
</script>
