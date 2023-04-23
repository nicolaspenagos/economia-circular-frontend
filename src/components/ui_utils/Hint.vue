<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <article class="hidden sm:flex">
    <div
      :class="localStyles.hintIcon"
      v-on:mouseover="isHovering = true"
      v-on:mouseout="isHovering = false"
    >
      <div><p :class="localStyles.hintIconText">?</p></div>
    </div>
    <div class="relative">
      <div :class="localStyles.hintContaner" v-if="isHovering">
        <p>
          {{ hintText }}
        </p>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  props: {
    hintText: String,
    default: "",
  },
  data() {
    return {
      isHovering: false,
    };
  },
};
const localStyles = {
  hintIcon: ctl(`
        font-bold
        custom_bg_purple
        rounded-full
        w-4
        h-4
        flex
        itmes-center
        justify-center
        text-white
        text-[12px]
        cursor-default
    `),
  hintIconText: ctl(`
    text-white 
    font-bold 
    mb-1 
    cursor-default
    `),
  hintContaner: ctl(`
        absolute
        bg-white
        custom-shadow
        z-30
        sm:w-96
        sm:p-4
        custom-border-radius
    `),
};
</script>
