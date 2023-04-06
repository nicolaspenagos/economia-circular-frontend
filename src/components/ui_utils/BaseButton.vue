<template>
<button :class="altBtn?styles.button+' '+styles.alt:styles.button+' '+styles.default" type="button">
    {{text}}
</button>
</template>

<script setup>
import ctl from "@netlify/classnames-template-literals";
defineProps({
    text: {
        type: String,
        default: ""
    },
    altBtn: {
        type: Boolean,
        default: false
    },
});
const styles = {
    button: ctl(`
        h-12
        rounded-full
    `),
    default: ctl(`
        custom-bg-green
    `),
    alt: ctl(`
        custom-border-green
        border-2
    `)
}
</script>
