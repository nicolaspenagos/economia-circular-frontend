<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <article :class="localStyles.popUpContainer">
    <button :class="localStyles.closeBtn" @click="handleCloseBtn">
            <img src="/x.svg" draggable="false" class="!cursor-pointer"/>
    </button>
    <p>Las respuestas de la <strong>Actividad {{ activityNo }}</strong> han sido
    guardadas exitosamente</p>
  </article>
</template>
<script>
export default {
  emits: ["closePopUpBtn"],
  props: {
    activityNo: {
      type: String,
      default: "0",
    },
  },
  methods:{
    handleCloseBtn(){
        this.$emit("closePopUpBtn");
    }
  }
};
const localStyles = {
  popUpContainer: ctl(`
        fixed
        right-10
        top-10
        z-50
        bg-[#DCFCEE]
        w-[390px]
        custom-border-radius
        custom-shadow
        p-6
    `),
    closeBtn:ctl(`
        bg-[#34ce8b] 
        hover:bg-[#25C380]
        w-6 
        h-6 
        rounded-full 
        flex 
        items-center 
        justify-center 
        absolute 
        top-3 
        right-3
        !cursor-pointer
    `)
};
</script>
