<script setup>
import ctl from "@netlify/classnames-template-literals";
import BaseButton from "../components/ui_utils/BaseButton.vue";
import router from "../router";
</script>
<template>
  <main
    :class="localStyles.main"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
  >
    <img
      src="/not-found-vector1.svg"
      :class="localStyles.vectorOne"
      draggable="false"
    />
    <img
      src="/not-found-vector2.svg"
      :class="localStyles.vectorTwo"
      draggable="false"
    />

    <article :class="localStyles.article">
      <h1 :class="localStyles.title">404</h1>
      <h2 :class="localStyles.subtitle">¡Oh no!</h2>
      <p :class="localStyles.text">
        Parece que estás intentando acceder a <br />una página que no existe :(
      </p>
      <BaseButton
        text="Volver a la página principal"
        class="w-3/4 max-w-[355px] mt-4"
        classMod="sm:h-12"
        @click="goToHome"
      />
    </article>
  </main>
</template>
<script>
export default {
  emits: ["toggleHeader", "toggleFooter"],
  methods:{
    goToHome(){
      router.push('/');
    }
  },
  mounted() {
    this.$emit("toggleHeader", false);
    this.$emit("toggleFooter", false);
  },
};
const localStyles = {
  main: ctl(`
        bg-[#F8F7F7]
        h-screen
        w-screen
        flex
        items-center
        justify-center
        `),
  vectorOne: ctl(`
        absolute 
        top-0 
        left-0
        `),
  vectorTwo: ctl(`
        absolute
        right-0
        bottom-0
  `),
  article: ctl(`
        flex 
        flex-col
        items-center 
        justify-center
  `),
  title: ctl(`
        text-9xl
        sm:text-[180px]
        font-bold
        text-[#756EF2]
        drop-shadow-xl
  `),
  subtitle: ctl(`
        font-bold
        text-lg
        sm:text-3xl
        mt-4

  `),
  text: ctl(`
        text-center
        mt-4
  `),
};
</script>
