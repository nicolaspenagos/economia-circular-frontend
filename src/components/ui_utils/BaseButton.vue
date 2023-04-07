<template>
<button :class="altBtn?styles.button+' '+styles.alt+' '+classMod:styles.button+' '+styles.default+' '+classMod" type="button">
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
    classMod:{
        type: String,
        default: ""
    }
});
const styles = {
    button: ctl(`
        h-10
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
