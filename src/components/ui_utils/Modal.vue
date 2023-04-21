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
      <p :class="localStyles.p" v-html="msg "></p>
      <div :class="localStyles.btnsContainer">
        <BaseButton text="Volver" class="w-3/4 max-w-[100px]" :altBtn="true" @click="closeModal" v-if="!onlyAccept"/>
        <BaseButton text="Aceptar" class="w-3/4 max-w-[100px] ml-2" @click="accept"/>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  emits: ['close', 'accept'],
  props: {
    msg: {
      type: String,
      default: "",
    },
    imgPath: {
      type: String,
      default: "",
    },
    onlyAccept:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    closeModal(){
        this.$emit('close')
    },
    accept(){
      this.$emit('accept')
    }
  },
  components: { BaseButton },
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
        w-5/6
        bg-white
        z-50
        sm:w-fit
        sm:max-w-3xl
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
