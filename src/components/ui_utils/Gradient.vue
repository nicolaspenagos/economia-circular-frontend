<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
  <div :class="styles.div">
  </div>
</template>
<script>
const styles = {
  div: ctl(`
          absolute
          custom-bg-gradient
          h-full
          w-full
        `),
}
</script>