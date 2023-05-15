<script setup>
import ctl from "@netlify/classnames-template-literals";
import Gradient from "../components/ui_utils/Gradient.vue";
import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import { useRoute } from "vue-router";
</script>
<template>
  <main :class="styles.main + getClassProgressMod()">
    <aside
      :class="[
        authMode === IS_LOGGIN_IN ? 'sm:w-2/5' : 'sm:w-4/12',
        styles.aside,
      ]"
    >
      <Gradient />
      <img
        alt="logo"
        :class="styles.logo"
        src="/logo.svg"
        draggable="false"
      />
    </aside>
    <section
      :class="[
        authMode === IS_LOGGIN_IN ? 'sm:w-3/5' : 'sm:w-8/12',
        styles.section,
      ]"
    >
      <Login
        v-if="authMode === IS_LOGGIN_IN"
        @handleChangeAuthMode="changeAuthMode"
      />
      <SignUp
        v-else
        @handleChangeAuthMode="changeAuthMode"
        @updateInProgress="setProgress"
      />
    </section>
  </main>
</template>
<script>
export const IS_LOGGIN_IN = "loggingIn";
export const IS_SIGNING_UP = "signingUp";
export default {
  emits: ["toggleHeader", "toggleFooter"],
  data() {
    return {
      authMode: IS_LOGGIN_IN,
      inProgress: false,
    };
  },
  methods: {
    changeAuthMode() {
      this.authMode =
        this.authMode === IS_LOGGIN_IN ? IS_SIGNING_UP : IS_LOGGIN_IN;
    },
    getClassProgressMod() {
      if (this.inProgress) {
        return " !cursor-progress";
      } else {
        return "";
      }
    },
    setProgress(newVal) {
      this.inProgress = newVal;
    },
  },
  components: { SignUp },
  mounted() {
    this.$emit("toggleHeader", false);
    this.$emit("toggleFooter", false);
    this.authMode = useRoute().params.isLoggingIn;
  },
};
export const styles = {
  main: ctl(`
          min-h-screen
          min-w-full
          flex
          overflow-hidden
        `),
  aside: ctl(`
          relative
          bg-[url('/sowing-hands.png')]
          bg-cover
          bg-center
          bg-no-repeat
          bg-gradient
          justify-center
          hidden
          sm:flex
        `),
  logo: ctl(`
          w-3/5
          mb-10
        `),
  section: ctl(`
          w-full
          custom-bg-gray
          flex
          justify-center
          sm:items-center
        `),
  form: ctl(`
          bg-white
          custom-shadow
          custom-border-radius
          px-8
          py-12
          mx-6
          my-auto
          flex
          flex-col
          !gap-10
          sm:gap-10
          sm:px-12
          sm:py-14
          sm:min-w-[60%]
          sm:mt-0
          sm:mb-0
          sm:w-fit
          sm:h-fit
        `),
  title: ctl(`
          custom-text-color
          text-xl
          font-bold
          ml-auto
          mr-auto
    `),
  text: ctl(`
          ml-auto
          mr-auto
          text-center
    `),
  sep: ctl(`
          h-0.5
          bg-slate-200
          w-full
          mt-2
    `),
  link: ctl(`
          underline
          decoration-solid
          custom-text-color-purple
          cursor-pointer
          ml-auto
          mr-auto
    `),
};
</script>
