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
import Modal from "./ui_utils/Modal.vue";
import modalMsgs from "../constants/modal";
import {
  isValidInput,
  EMAIL,
  PASSWORD,
  isValidUser,
} from "../utils/inputChecker.js";
import { useAuthStore } from "../stores/auth";
import { mapStores } from "pinia";
import router from "../router";
import { showError } from "../utils/errorUtils";
</script>
<template>
  <Modal
    v-if="showModal"
    :msg="modalMsgs.AUTHORIZATION_STATEMENT"
    imgPath="/alert.svg"
    @close="closeModal"
    @accept="signUp"
    :xxl="true"
  />
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
          :classMod="getValClassMod(name)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="email"
          placeholder="Correo electrónico"
          type="text"
          :classMod="getValClassMod(email, emailValidation, EMAIL)"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Macrosector"
          :options="Object.values(macrosectors)"
          :validData="validData"
          @update="updateMacrosector"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Sector"
          :options="Object.values(sectors)"
          :validData="validData"
          @update="updateSector"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="password"
          placeholder="Contraseña"
          type="password"
          :classMod="getValClassMod(password, passwordValidation, PASSWORD)"
        />
        <p class="text-xs text-slate-400 mt-2">
          * Incluir al menos 8 dígitos entre números y letras
        </p>
      </article>
      <article
        :class="localStyles.formCol + ' mt-8 sm:mt-0 sm:ml-4 hidden sm:flex'"
      >
        <BaseInput
          v-model="organization"
          placeholder="Empresa"
          type="text"
          :classMod="getValClassMod(organization)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="emailValidation"
          placeholder="Verificar correo electrónico"
          type="text"
          :classMod="getValClassMod(emailValidation, email, EMAIL)"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Rango de ingresos"
          :options="Object.values(incomes)"
          :validData="validData"
          @update="updateIncome"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="position"
          placeholder="Cargo"
          type="text"
          :classMod="getValClassMod(position)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="passwordValidation"
          placeholder="Verificar contraseña"
          type="password"
          :classMod="getValClassMod(passwordValidation, password, PASSWORD)"
        />
      </article>
      <!-- Responsive version of form (shown only on small screens in replace of thw bi-column one) -->
      <article :class="localStyles.formCol + ' sm:mr-4 sm:hidden'">
        <BaseInput
          v-model="name"
          placeholder="Nombre y apellidos"
          type="text"
          :classMod="getValClassMod(name)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="email"
          placeholder="Correo electrónico"
          type="text"
          :classMod="getValClassMod(email, emailValidation, EMAIL)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="emailValidation"
          placeholder="Verificar correo electrónico"
          type="text"
          :classMod="getValClassMod(emailValidation, email, EMAIL)"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Macrosector"
          :options="Object.values(macrosectors)"
          :validData="validData"
          @update="updateMacrosector"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Sector"
          :options="Object.values(sectors)"
          :validData="validData"
          @update="updateSector"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="organization"
          placeholder="Empresa"
          type="text"
          :classMod="getValClassMod(organization)"
        />
        <div :class="localStyles.sep"></div>
        <Autocomplete
          placeholderMsg="Rango de ingresos"
          :options="Object.values(incomes)"
          :validData="validData"
          @update="updateIncome"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="position"
          placeholder="Cargo"
          type="text"
          :classMod="getValClassMod(position)"
        />

        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="password"
          placeholder="Contraseña"
          type="password"
          :classMod="getValClassMod(password, passwordValidation, PASSWORD)"
        />
        <div :class="localStyles.sep"></div>
        <BaseInput
          v-model="passwordValidation"
          placeholder="Verificar contraseña"
          type="password"
          :classMod="getValClassMod(passwordValidation, password, PASSWORD)"
        />
        <p class="text-xs text-slate-400 mt-2">
          * Incluir al menos 8 dígitos entre números y letras
        </p>
      </article>
      <!-- End of responsive form -->
    </section>
    <section :class="localStyles.textContainer">
      <p>
        Autorizo el tratamiento de mis datos personales a la Universidad Icesi y
        acepto
        <a target="_blank" :class="authStyles.link" href="/terms-and-conditions"
          >Términos de Uso
        </a>
        de la plataforma.
      </p>
      <div
        :class="'flex mt-3 w-fit mr-auto ml-auto ' + getCheckClassMod(checkYes)"
      >
        <div :class="localStyles.checkbox + ' ml-auto '">
          <input type="checkbox" v-model="checkYes" />
          <label class="ml-1"> Si</label>
        </div>
        <div :class="localStyles.checkbox + ' ml-2 mr-auto'">
          <input type="checkbox" v-model="checkNo" />
          <label class="ml-1"> No</label>
        </div>
      </div>
    </section>
    <BaseButton
      text="Registrarse"
      class="w-3/4 max-w-[355px]"
      classMod="sm:h-12"
      @click="checkData"
    />
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
const TERMS_AND_CONDS_LINK = "./terms-and-conditions";
export default {
  emits: ["handleChangeAuthMode", "updateInProgress"],
  data() {
    return {
      name: ref(""),
      email: ref(""),
      emailValidation: ref(""),
      organization: ref(""),
      password: ref(""),
      passwordValidation: ref(""),
      position: ref(""),
      checkYes: false,
      checkNo: false,
      showModal: false,
      validData: false,
      sector: "",
      macrosector: "",
      income: "",
      actionInProgress: false,
    };
  },
  methods: {
    goToTermsAndConds() {
      router.push("/terms-and-conditions");
    },
    getCursorClassMod() {
      return this.actionInProgress ? " !cursor-progress " : "";
    },
    async signUp() {
      try {
        this.closeModal();
        this.$emit("updateInProgress", true);
        this.actionInProgress = true;
        await this.authStore.signUp(this.getNewUser());
        this.$emit("updateInProgress", false);
        this.actionInProgress = false;
        router.push("/");
      } catch (error) {
        showError(error);
      }
    },
    checkData() {
      this.validData = true;

      if (
        isValidUser(
          this.getNewUser(),
          this.passwordValidation,
          this.emailValidation,
          this.checkYes
        )
      )
        this.openModal();
    },
    updateSector(newVal) {
      this.sector = newVal;
    },
    updateMacrosector(newVal) {
      this.macrosector = newVal;
    },
    updateIncome(newVal) {
      this.income = newVal;
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    handleChangeAuthMode() {
      this.$emit("handleChangeAuthMode");
    },
    getValClassMod(a, b, type) {
      if (!b && !type) {
        if (this.validData && a === "") {
          return " !border-rose-300 ";
        }
        return "";
      }

      if (a === "") {
        if (this.validData) return " !border-rose-300 ";
        return "";
      }
      return this.valClassMod(a, b, type);
    },
    valClassMod(a, b, type) {
      let validType = isValidInput(a, type);
      if (a === b && validType) return "!border-green-300";
      else return "!border-rose-300";
    },
    getCheckClassMod(a) {
      if (!a && this.validData)
        return "!border-rose-300 border-x-0 border-t-0 border-solid border-b-2";
    },
    getNewUser() {
      const date = new Date();
      const currentDate = date.toISOString().slice(0, -2);

      return {
        email: this.email,
        password: this.password,
        name: this.name,
        position: this.position,
        sector: this.sector,
        macrosector: this.macrosector,
        organization: this.organization,
        registrationDate: currentDate,
        termsAndConditionsHistory: [
          {
            acceptanceDate: currentDate,
            link: TERMS_AND_CONDS_LINK,
          },
        ],
      };
    },
  },
  computed: {
    ...mapStores(useAuthStore),
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
    !gap-8
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
    h-6
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
