<script setup>
import ctl from '@netlify/classnames-template-literals';
import BaseInput from './ui_utils/BaseInput.vue';
import BaseButton from './ui_utils/BaseButton.vue';
import { ref } from "vue";
</script>
<template>
<form :class="styles.article" v-on:submit.prevent="onSubmit">
    <h1 :class="styles.title">¡Bienvenido(a) de nuevo!</h1>
    <BaseInput v-model="email" placeHolder="Correo electrónico" type="text"/>
    <BaseInput v-model="name"  placeHolder="Contraseña" type="password" />
    <BaseButton text="Iniciar Sesión"/> 
    <div :class="styles.sep"></div>
    <p :class="styles.text">¿Tu empresa no se encuentra registrada?</p>
    <BaseButton text="Regístrate" altBtn="true"/> 
</form>
</template>

<script>
export default {
    data() {
        return {
            email: ref(""),
            name: ref("")
        }
    }
}
const styles = {
    article: ctl(`
          bg-white
          custom-shadow
          w-fit
          h-fit
          px-12
          py-14
          custom-border-radius
          min-w-[60%]
          flex
          flex-col
          gap-10
        `),
    title:ctl(`
          cutom-text-color
          text-xl
          font-bold
          ml-auto
          mr-auto
    `),
    text:ctl(`
          ml-auto
          mr-auto
    `),
    sep:ctl(`
          h-0.5
          bg-slate-200
          w-full
          mt-2
    `)
}
</script>
