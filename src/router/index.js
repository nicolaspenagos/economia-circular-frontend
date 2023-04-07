import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import TermsAndConditionsView from '../views/TermsAndConditionsView.vue';
import NotFoundView from '../views/NotFoundView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/auth/:isLoggingIn',
      name:'auth',
      component:AuthView,
      props:true
    },
    {
      path:'/terms-and-conditions',
      name:'terms-and-conditions',
      component:TermsAndConditionsView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
