<script setup>
import BaseInput from "./ui_utils/BaseInput.vue";
import BaseButton from "./ui_utils/BaseButton.vue";
import { ref } from "vue";
import { styles as authStyles } from "../views/AuthView.vue";
import { useAuthStore } from "../stores/auth";
import { mapStores } from "pinia";
import router from "../router";
import { showError } from "../utils/errorUtils";
</script>
<template>
  <form :class="authStyles.form" v-on:submit.prevent="onSubmit">
    <h1 :class="authStyles.title">¡Bienvenido(a) de nuevo!</h1>
    <BaseInput
      v-model="email"
      placeholder="Correo electrónico"
      type="text"
      :class="getClassMod(email)"
    />
    <BaseInput
      v-model="password"
      placeholder="Contraseña"
      type="password"
      :class="getClassMod(password)"
    />
    <BaseButton text="Iniciar Sesión" @click="logIn" classMod="sm:h-12" />
    <p :class="authStyles.link">¿Olvidaste tu contraseña?</p>
    <div :class="authStyles.sep"></div>
    <p :class="authStyles.text">¿Tu empresa no se encuentra registrada?</p>
    <BaseButton
      text="Regístrate"
      :altBtn="true"
      @click="handleChangeAuthMode"
      classMod="sm:h-12"
    />
  </form>
</template>

<script>
export default {
  emits: ["handleChangeAuthMode"],
  data() {
    return {
      email: ref(""),
      password: ref(""),
      validData: false,
      actionInProgress: false,
    };
  },
  methods: {
    handleChangeAuthMode() {
      this.$emit("handleChangeAuthMode");
    },
    async logIn() {
      this.validData = true;
      if (this.email !== "" && this.password !== "") {
        try{
          await this.authStore.login(this.email, this.password);
          router.push('/')
        }catch(error){
          showError(error);
        }
      }
    },
    getClassMod(input) {
      if (this.validData && input === "") return "!border-rose-300";
    },
  },
  computed: {
    ...mapStores(useAuthStore),
  },
};
</script>
