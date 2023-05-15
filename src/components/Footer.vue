<script setup>
import ctl from "@netlify/classnames-template-literals";
import Gradient from "./ui_utils/Gradient.vue";
</script>
<template>
    <footer :class="localStyles.footer +' sm:p-10'">
        <Gradient/>
        <section :class="localStyles.section + ' pt-10 sm:pt-0'">
            <img src="/logo-icesi.svg" :class="localStyles.logo" draggable="false" alt="Logo"/>
            
        </section>
        <section :class="localStyles.section">
            <h1 class="text-center sm:text-left"><strong :class="localStyles.text">Contacto</strong></h1> 
            <a :class="localStyles.text + ' underline '" href="https://www.icesi.edu.co/es/" target="_blank">Universidad Icesi</a>
            <p :class="localStyles.text">Calle 18 No. 122-135 Pance, Cali - Colombia</p>
            <p :class="localStyles.text">Teléfono: +57 (602) 555 2334</p>
        </section>
        <section :class="localStyles.section +' pb-10 sm:pb-0 '">
            <h1 class="text-center sm:text-left"><strong :class="localStyles.text">Creado por</strong></h1> 
            <p :class="localStyles.text">Katherine Ortegon Mosquera PhD</p>
            <p :class="localStyles.text">kortegon@icesi.edu.co</p>
            <p :class="localStyles.text">Maria Del Pilar Acosta Collazos PhD</p>
            <p :class="localStyles.text">mdacosta@icesi.edu.co</p>
        </section>
    </footer>
</template>
<script>
const localStyles={
    footer:ctl(`
        flex
        flex-col
        items-center
        justify-around
        sm:flex-row
    `),
    section:ctl(`
        flex
        flex-col
        py-5
        sm:py-0
    `),
    text:ctl(`
        text-white
        text-center
        sm:text-left
    `),
    logo:ctl(`
        h-[60px]
    `)
}
</script>

=