<script setup>
import { mapStores } from "pinia";
import { useAuthStore } from "../stores/auth";
import ctl from "@netlify/classnames-template-literals";
import Gradient from "../components/ui_utils/Gradient.vue";
import BaseButton from "../components/ui_utils/BaseButton.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <header :class="localStyles.header">
    <Gradient />
    <img
      src="/home-vectors-right.svg"
      :class="[localStyles.vectors, 'right-0']"
      draggable="false"
    />
    <img
      src="/home-vectors-left.svg"
      :class="[localStyles.vectors, 'left-0']"
      draggable="false"
    />
    <article :class="localStyles.headerContent">
      <h1 :class="localStyles.title">¡Queremos ayudar a tu</h1>
      <h1 :class="localStyles.title">empresa a evolucionar hacia</h1>
      <h1 :class="localStyles.title">
        la
        <span :class="[localStyles.title, '!text-[#38f0a2]']"
          >Economía Circular!</span
        >
      </h1>
      <BaseButton text="¡Comienza Ahora!" class="my-8 sm:mb-0 sm:mt-6" />
    </article>
    <img
      src="/home-intersect.svg"
      :class="localStyles.ellipse"
      draggable="false"
    />
  </header>
  <main :class="localStyles.main">
    <section>
      <article :class="localStyles.firstArticle">
        <img
          src="/home-mockup.png"
          draggable="false"
          :class="localStyles.imgMockup"
          data-aos="fade-up"
          data-aos-duration="1000"
        />
        <p
          :class="localStyles.pWidth"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          Con <strong>Economía Circular en Icesi</strong> podrás
          <strong>autoevaluar </strong> el estado actual de tu empresa con
          respecto
          <strong>a los principios de la economía circular.</strong> Asimismo,
          tu empresa podrá:
        </p>
        <div
          :class="localStyles.cardsContainer"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <article :class="localStyles.card">
            <img
              src="/home-mag-glass.svg"
              :class="localStyles.cardImg"
              draggable="false"
            />
            <p>
              Autoevaluarse en tres niveles:
              <strong>Cadena de suministro, empresa y producto.</strong>
            </p>
          </article>
          <article :class="localStyles.card">
            <img
              src="/home-download.svg"
              :class="localStyles.cardImg"
              draggable="false"
            />
            <p>
              Obtener los <strong>resultados</strong> y descargar
              <strong>la hoja de ruta</strong> para mejorar
              <strong>la circularidad.</strong>
            </p>
          </article>
          <article :class="localStyles.card">
            <img
              src="/home-file.svg"
              :class="localStyles.cardImg"
              draggable="false"
            />
            <p>
              Utilizar la <strong>hoja de ruta</strong> para
              <strong>evolucionar</strong> hacia un
              <strong>modelo de negocio circular.</strong>
            </p>
          </article>
        </div>
      </article>
    </section>
    <section :class="localStyles.desktopInfo">
      <img
        src="/home-left-img.png"
        :class="localStyles.leftImg"
        draggable="false"
      />
      <article
        :class="localStyles.bodyTexContainer"
        data-aos="fade-left"
        data-aos-duration="500"
      >
        <h1 :class="localStyles.bodyTitle">
          Evalúa a tu empresa a través de un cuestionario
        </h1>
        <p>
          Con preguntas abiertas que requieren de justificación y de selección
          múltiple, enfocadas en los
          <strong>12 principios de la Economía Circular.</strong>
        </p>
      </article>
    </section>
    <section class="sm:hidden flex px-6 py-12 w-full">
      <article :class="localStyles.mobileInfo">
        <div :class="localStyles.mobileInfoImg">
          <Gradient class="rounded-t-[10px]" />
        </div>
        <div class="p-8 custom-border-radius">
          <h1 :class="localStyles.bodyTitle">
            Evalúa a tu empresa a través de un cuestionario
          </h1>
          <p class="mt-4">
            Con preguntas abiertas que requieren de justificación y de selección
            múltiple, enfocadas en los
            <strong>12 principios de la Economía Circular.</strong>
          </p>
        </div>
      </article>
    </section>
    <section :class="localStyles.mobileInfo1">
      <div class="relative">
        <img
          src="/final-mockup-mobile.png"
          class="mb-1 w-11/12 mx-auto sm:mx-0 sm:mb-0 sm:h-[422px] sm:w-[694px] z-30"
          draggable="false"
        />
        <img
          src="/mockup-circle.png"
          class="absolute top-[-50px] right-[-10px] hidden sm:block h-40"
          draggable="false"
        />
      </div>
      <div
        :class="localStyles.bodyTexContainer + 'text-center'"
        data-aos="fade-right"
        data-aos-duration="500"
      >
        <h1 :class="localStyles.bodyTitle + ' mt-6'">
          Podrás conocer el reporte con los resultados de tu evaluación
        </h1>
        <p class="mt-4 mx-8 sm:mx-0">
          Y encontrarás recomendaciones que ayudarán a tu empresa a
          <strong>evolucionar</strong> hacía un modelo económico
          <strong>más circular.</strong>
        </p>
      </div>
    </section>
    <section :class="localStyles.lastSection">
      <Gradient />
      <img
        src="/end-vectors-right.svg"
        class="absolute right-0 h-full hidden sm:flex"
        draggable="false"
      />
      <img
        src="/end-vectors-left.svg"
        class="absolute left-0 h-full hidden sm:flex"
        draggable="false"
      />
      <div class="w-[500px] flex flex-col items-center justify-center">
        <h1
          :class="
            localStyles.bodyTitle + ' !text-white text-center mb-4 sm:m-0'
          "
        >
          ¡Déjanos acompañarte en este camino y separa una cita con nosotros!
        </h1>
        <BaseButton text="Contáctanos" @click="sendEmail" />
      </div>
    </section>
  </main>
  <Footer />
</template>
<script>
export default {
  mounted() {
    this.$emit("toggleHeader", true);
  },
  computed: {
    ...mapStores(useAuthStore),
    isLoggedIn() {
      return this.authStore.isLoggedIn;
    },
    userName() {
      if (this.authStore.user && this.authStore.user.name)
        return this.authStore.user.name;
      else return "";
    },
  },
  methods: {
    sendEmail() {
      console.log("HOLA");
      const email = "economiacircularenicesi@gmail.com";
      const mailtoUrl = `mailto:${email}`;
      window.location.href = mailtoUrl;
    },
  },
};
const localStyles = {
  header: ctl(`
      relative
      h-fit
      w-full
      bg-amber-200
      pt-[160px]
      pb-[60px]
      sm:pt-[50px]
      sm:pb-[120px]
      sm:h-[800px]
      bg-[url('/home-hands.jpg')]
      bg-cover
      bg-center
      bg-no-repeat
      bg-gradient
      flex
      justify-center
    `),
  ellipse: ctl(`
      absolute
      bottom-0
    `),
  title: ctl(`
      text-white
      font-bold
      text-center
      text-2xl
      sm:text-4xl
      sm:my-1 
    `),
  headerContent: ctl(`
      w-fit
      flex
      flex-col
      items-center
      justify-center
     
    `),
  vectors: ctl(`
      absolute
      top-0
      hidden
      sm:flex
    `),
  main: ctl(`
    flex 
    flex-col 
    items-center 
    justify-center
    bg-[#FBFBFB]
    `),
  imgMockup: ctl(`
      h-[240px]
      w-[284px]
      sm:h-[450px]
      sm:w-[533.57px]
    
    `),
  firstArticle: ctl(`
    flex
    flex-col
    items-center
    mt-[-50px]
    sm:mt-[-220px]
    `),
  pWidth: ctl(`
    sm:w-[450px]
    text-center
    sm:mt-16
    mt-8
    px-6
    `),
  card: ctl(`
    h-24
    w-full
    sm:w-72
    sm:h-72
    border-[2px]
    sm:border-[3px]
    border-solid
    border-[#756EF2]
    rounded-[10px]
    sm:rounded-[45px]
    flex
    sm:flex-col
    items-center
    sm:pt-[60px]
    p-6
    sm:text-center
    `),
  cardImg: ctl(`
      h-10
      sm:h-20
      sm:mb-4
      mr-4
      sm:mr-0
    `),
  cardsContainer: ctl(`
    flex 
    flex-col 
    sm:flex-row
    gap-5
    sm:gap-8 
    mt-8
    sm:mt-16
    px-6
    `),
  leftImg: ctl(`
      h-72
    `),
  bodyTitle: ctl(`   
        text-lg
        font-bold
        sm:text-2xl
        text-[#756ef2]
        sm:mb-5
        
        `),
  bodyTexContainer: ctl(`
    w-96
    text-right
  `),
  desktopInfo: ctl(`
  flex-col 
  sm:flex-row 
  justify-between 
  w-full 
  items-center 
  sm:pr-20 
  sm:my-36
  hidden 
  sm:flex`),
  mobileInfo: ctl(`
    bg-white
    custom-shadow
    w-full
    h-fit
    custom-border-radius
    text-center
  `),
  mobileInfoImg: ctl(`
          h-36
          bg-[url('/home-info-mobile.jpg')]
          bg-cover
          bg-center
          bg-no-repeat
          rounded-t-[10px]
  `),
  mobileInfo1: ctl(`
    sm:pb-21
    px-6
    pt-1 
    pb-12 
    text-center 
    flex 
    flex-col
    sm:flex-row-reverse
    sm:items-center
    justify-center
    sm:justify-between
    sm:w-full
    sm:px-20 
    sm:text-left
    sm:mb-24
  `),
  lastSection: ctl(`
  flex 
  items-center
  justify-center
  sm:sm:mb-44
  w-full
  h-fit
  px-4
  py-8
  mb-12
  sm:h-80
  sm:p-0
  bg-[url('/end-home-img.jpg')]
  bg-cover
  bg-center
  bg-no-repeat
  `),
};
</script>
