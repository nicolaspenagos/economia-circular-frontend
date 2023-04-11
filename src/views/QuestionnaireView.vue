<script setup>
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
import Onboarding from "../components/ui_utils/Onboarding.vue";
</script>
<template>
  <Onboarding v-if="showModal" :data="dataArray"/>
  <div></div>
</template>
<script>
export default {
emits: ["toggleHeader"],
  data() {
    return {
        showModal:false,
        dataArray:[{name:"Name", lastname:"Last"}, {name:"Name", lastname:"Last"}]
    }
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    closeModal(){
        this.showModal = false;
    },
    openModal() {
        this.showModal = true;
    },
    handleOnboarding() {
      const userId = this.authStore.user.id;
      const currentUserOnboardingPath =
        "questionnaireOnboardingCompleted" + userId;
      if (!localStorage.getItem(currentUserOnboardingPath)) {
        localStorage.setItem(currentUserOnboardingPath, "true");
        this.openModal();
      }
    },
  },
  mounted() {
    this.$emit("toggleHeader", true);
    this.handleOnboarding();
  },
};
</script>
