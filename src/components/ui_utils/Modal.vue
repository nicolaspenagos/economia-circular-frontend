<script setup>
import ctl from "@netlify/classnames-template-literals";
</script>
<template>
    <div :class="localStyles.backdrop">
        <article :class="localStyles.modalContainer">
            MODAL
        </article>

    </div>
</template>
<script>
const localStyles = {
    backdrop:ctl(`
    flex
    items-center
    content-center
    fixed
    h-screen
    w-screen
    top-0
    bottom-0
    left-0
    z-40
    bg-black/25
    backdrop-blur-md
    `),
    modalContainer:ctl(`
        w-[100px]
        bg-white
        z-50
        mx-auto
    `)
}
</script>