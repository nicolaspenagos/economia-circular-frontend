<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <div :class="[localStyles.dot, getClassMod()]"></div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    getClassMod() {
      if (this.currentIndex < this.index) {
        return "bg-[#D9D9D9]";
      } else {
        return "bg-[#38f0a2]";
      }
    },
  },
};
const localStyles = {
  dot: ctl(`
        h-2
        w-8
        rounded
        sm:h-2.5
        sm:w-10
        sm:rounded-md
    `),
};
</script>
