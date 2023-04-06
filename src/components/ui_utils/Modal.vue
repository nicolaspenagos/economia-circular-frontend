<script setup>
import ctl from "@netlify/classnames-template-literals";
import BaseButton from "./BaseButton.vue";
</script>
<template>
  <div
    :class="localStyles.backdrop"
    @click.self = "closeModal"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <article :class="localStyles.modalContainer">
      <img :src="imgPath" class="h-16 mb-6 mt-3 mx-auto" draggable="false" />
      <p :class="localStyles.p">{{ msg }}</p>
      <div :class="localStyles.btnsContainer">
        <BaseButton text="Volver" class="w-3/4 max-w-[100px]" :altBtn="true" @click="closeModal"/>
        <BaseButton text="Aceptar" class="w-3/4 max-w-[100px] ml-2" />
      </div>
    </article>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      default: "",
    },
    imgPath: {
      type: String,
      default: "",
    },
  },
  methods:{
    closeModal(){
        this.$emit('close')
    }
  },
  components: { BaseButton },
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
        sm:w-5/12
        p-6
        custom-border-radius

    `),
  p: ctl(`
        text-left
        text-center
    `),
  img: ctl(`
    h-16 
    mb-6 
    mt-3 
    mx-auto
    `),
  btnsContainer: ctl(`
        flex
        justify-center
        mt-6
        mb-3
    `),
};
</script>
