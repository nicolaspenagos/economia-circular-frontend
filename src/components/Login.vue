<script setup>
import ctl from '@netlify/classnames-template-literals';
import BaseInput from './ui_utils/BaseInput.vue';
import BaseButton from './ui_utils/BaseButton.vue';
import {
    ref
} from "vue";
import {styles as authStyles} from '../views/AuthView.vue';

</script>
<template>
<form :class="authStyles.form" v-on:submit.prevent="onSubmit">
    <h1 :class="authStyles.title">¡Bienvenido(a) de nuevo!</h1>
    <BaseInput v-model="email" placeholder="Correo electrónico" type="text" />
    <BaseInput v-model="password" placeholder="Contraseña" type="password" />
    <BaseButton text="Iniciar Sesión" />
    <p :class="authStyles.link">¿Olvidaste tu contraseña?</p>
    <div :class="authStyles.sep"></div>
    <p :class="authStyles.text">¿Tu empresa no se encuentra registrada?</p>
    <BaseButton text="Regístrate" :altBtn="true" @click="handleChangeAuthMode"/>
</form>
</template>

<script>
export default {
    data() {
        return {
            email: ref(""),
            password: ref("")
        }
    },
    methods:{
        handleChangeAuthMode(){
            this.$emit('handleChangeAuthMode');
        }
    }
}
</script>
