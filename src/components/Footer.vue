<script setup>
import ctl from "@netlify/classnames-template-literals";
import Gradient from "./ui_utils/Gradient.vue";
</script>
<template>
  <footer class="pb-3">
    <Gradient />
    <div :class="localStyles.footer + '  sm:p-10 sm:px-32'">
      <section :class="localStyles.section + ' pt-10 sm:pt-0'">
        <img
          src="/logo-icesi.svg"
          :class="localStyles.logo"
          draggable="false"
          alt="logo"
        />
      </section>
      <section :class="localStyles.section">
        <h1 class="text-center sm:text-left">
          <strong :class="localStyles.text">Contacto</strong>
        </h1>
        <a
          :class="localStyles.text + ' underline '"
          href="https://www.icesi.edu.co/es/"
          target="_blank"
          >Universidad Icesi</a
        >
        <p :class="localStyles.text">
          Calle 18 No. 122-135 Pance, Cali - Colombia
        </p>
        <p :class="localStyles.text">Teléfono: +57 (602) 555 2334</p>
      </section>
      <section :class="localStyles.section + ' pb-10 sm:pb-0 '">
        <h1 class="text-center sm:text-left">
          <strong :class="localStyles.text">Creado por</strong>
        </h1>
        <p :class="localStyles.text">Katherine Ortegon Mosquera PhD</p>
        <p :class="localStyles.text">kortegon@icesi.edu.co</p>
        <p :class="localStyles.text">Maria Del Pilar Acosta Collazos PhD</p>
        <p :class="localStyles.text">mdacosta@icesi.edu.co</p>
      </section>
    </div>
    <div class="sm:px-32 ">
      <div :class="localStyles.sepLine"></div>
      <p class="text-white text-center mt-3 text-sm">
        Developed and designed by
        <a href="https://www.behance.net/nicolaspenagosm"><strong :class="localStyles.link"> Nicolás Penagos </strong></a> &
        <a href="https://www.behance.net/valzapataz17b4"><strong :class="localStyles.link">Valentina Zapata</strong></a>
      </p>
    </div>
  </footer>
</template>
<script>
const localStyles = {
  footer: ctl(`
        flex
        flex-col
        items-center
        justify-between
        sm:flex-row
    `),
  section: ctl(`
        flex
        flex-col
        py-5
        sm:py-0
    `),
  text: ctl(`
        text-white
        text-center
        sm:text-left
    `),
  logo: ctl(`
        h-[60px]
    `),
  sepLine: ctl(`
        w-full
        h-[1px]
        h-1
        bg-white
        rounded-md
        opacity-30
   `),
   link:ctl(`
        text-white
        cursor-pointer
   `)
};
</script>

=
