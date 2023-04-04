<script setup>
import ctl from "@netlify/classnames-template-literals";
import BaseInput from "./ui_utils/BaseInput.vue";
import BaseButton from "./ui_utils/BaseButton.vue";
import { styles as authStyles } from "../views/AuthView.vue";
import { ref } from "vue";
import Autocomplete from "./ui_utils/Autocomplete.vue";
import macrosectors from "../constants/macrosector";
import sectors from "../constants/sector";
import incomes from "../constants/income";
</script>
<template>
  <form
    :class="authStyles.form + ' ' + localStyles.form"
    v-on:submit.prevent="onSubmit"
  >
    <h1 :class="authStyles.title + ' !ml-0'">Crea una cuenta</h1>

    <section :class="localStyles.section">
      <article :class="localStyles.formCol + ' sm:mr-4 hidden sm:flex'">
        <BaseInput
          v-model="name"
          placeholder="Nombre y apellidos"
          type="text"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="emailValidation"
          placeholder="Verificar correo electrónico"
          type="text"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Macrosector"
          :options="Object.values(macrosectors)"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Sector"
          :options="Object.values(sectors)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="password"
          placeholder="Contraseña"
          type="password"
          :classMod="getPasswordClassMod()"
        />
      </article>
      <article
        :class="localStyles.formCol + ' mt-8 sm:mt-0 sm:ml-4 hidden sm:flex'"
      >
        <BaseInput
          v-model="email"
          placeholder="Correo electrónico"
          type="text"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput v-model="company" placeholder="Empresa" type="text" />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Rango de ingresos"
          :options="Object.values(incomes)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput v-model="role" placeholder="Cargo" type="text" />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="passwordValidation"
          placeholder="Verificar contraseña"
          type="password"
          :classMod="getPasswordValClassMod()"
        />
      </article>

      <article :class="localStyles.formCol + ' sm:mr-4 sm:hidden'">
        <BaseInput
          v-model="name"
          placeholder="Nombre y apellidos"
          type="text"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="email"
          placeholder="Correo electrónico"
          type="text"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="emailValidation"
          placeholder="Verificar correo electrónico"
          type="text"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Macrosector"
          :options="Object.values(macrosectors)"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Sector"
          :options="Object.values(sectors)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput v-model="company" placeholder="Empresa" type="text" />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Rango de ingresos"
          :options="Object.values(incomes)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput v-model="role" placeholder="Cargo" type="text" />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="passwordValidation"
          placeholder="Verificar contraseña"
          type="password"
          :classMod="getPasswordValClassMod()"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="password"
          placeholder="Contraseña"
          type="password"
          :classMod="getPasswordClassMod()"
        />
      </article>
    </section>
    <section :class="localStyles.textContainer">
      <p>
        Autorizo el tratamiento de mis datos personales a la Universidad Icesi y
        acepto <a :class="authStyles.link">Términos de Uso</a> de la plataforma.
      </p>
      <div class="flex mt-3">
        <div :class="localStyles.checkbox + ' ml-auto'">
          <input type="checkbox" v-model="checkYes" />
          <label class="ml-1"> Si</label>
        </div>
        <div :class="localStyles.checkbox + ' ml-2 mr-auto'">
          <input type="checkbox" v-model="checkNo" />
          <label class="ml-1"> No</label>
        </div>
      </div>
    </section>
    <BaseButton text="Registrarse" class="w-3/4 max-w-[355px]" />
    <section :class="localStyles.textContainer">
      <p>
        ¿Tu empresa ya está registrada?
        <a :class="authStyles.link" @click="handleChangeAuthMode"
          >Iniciar sesión
        </a>
      </p>
    </section>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: ref(""),
      email: ref(""),
      emailValidation: ref(""),
      company: ref(""),
      password: ref(""),
      passwordValidation: ref(""),
      role: ref(""),
      checkYes: false,
      checkNo: false,
    };
  },
  methods: {
    handleChangeAuthMode() {
      this.$emit("handleChangeAuthMode");
    },
    getPasswordClassMod() {
      if (this.password === "") return "";
      return this.passwordClassMod();
    },
    getPasswordValClassMod() {
      if (this.passwordValidation === "") return "";
      return this.passwordClassMod();
    },
    passwordClassMod() {
      if (this.password === this.passwordValidation) return "!border-green-300";
      else return "!border-rose-300";
    },
  },
  watch: {
    checkYes() {
      if (this.checkNo && this.checkYes) {
        this.checkNo = false;
      }
    },
    checkNo() {
      if (this.checkNo && this.checkYes) {
        this.checkYes = false;
      }
    },
  },
  components: { Autocomplete },
};
const localStyles = {
  form: ctl(`
    sm:max-w-[80%]
    sm:mt-0
    sm:mb-0
    w-11/12
    mt-6
    mb-6
    mb-6
    flex
    flex-col
    items-center
    !gap-6
    sm:px-8
    sm:py-12
    px-4
    py-8
  `),
  section: ctl(`
    flex
    flex-col
    sm:flex-row
    w-full
  `),
  formCol: ctl(`
    w-full
    sm:w-1/2
    flex
    flex-col
  `),
  sep: ctl(`
    h-8
  `),
  textContainer: ctl(`
    sm:w-9/12
    w-full
    text-center
  `),
  checkbox: ctl(`
    flex 
    flex-row 
    items-center 
    content-center
  `),
};
</script>
