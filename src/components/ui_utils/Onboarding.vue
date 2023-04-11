<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <div
    :class="localStyles.backdrop"
    @click.self="closeModal"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <article :class="localStyles.modalContainer">HOLA</article>
  </div>
</template>
<script>
export default {
  emits: ["close"],
  props: {
    data: {
      type: Array,
      default: ()=>[],
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  mounted(){
    console.log(this.data);
  }
};
const localStyles = {
  backdrop: ctl(`
    flex
    items-center
    content-center
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
        w-5/6
        bg-white
        z-50
        mx-auto
        sm:w-fit
        sm:max-w-3xl
        p-6
        custom-border-radius

    `),
};
</script>
