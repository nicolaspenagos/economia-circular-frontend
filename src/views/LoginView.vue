<script setup>
import ctl from '@netlify/classnames-template-literals';
import Gradient from '../components/ui_utils/Gradient.vue';
import Login from '../components/Login.vue';
</script>
<template>
<main :class="styles.main"  @wheel.prevent @touchmove.prevent @scroll.prevent>
    <aside :class='styles.aside'>
        <Gradient />
        <img alt="EC logo" :class="styles.logo" src="/logo.svg" draggable="false" />
    </aside>
    <section :class="styles.section">
        <Login />
    </section>
</main>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
const styles = {
  main: ctl(`
          min-h-screen 
          min-w-full 
          flex
          
        `),
  aside: ctl(`
          w-2/5 
          relative
          bg-[url('/sowing-hands.png')]
          bg-cover
          bg-center
          bg-no-repeat
          bg-gradient
          flex
          justify-center
        `),
  logo: ctl(`
          w-3/5
          mb-10
        `),
  section: ctl(`
          w-3/5
          custom-bg-gray
          flex
          items-center
          justify-center
        `),
}
</script>
