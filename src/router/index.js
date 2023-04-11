import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import TermsAndConditionsView from '../views/TermsAndConditionsView.vue';
import NotFoundView from '../views/NotFoundView.vue';
import QuestionnaireView from '../views/QuestionnaireView.vue';
import ReportView from '../views/ReportView.vue';

export const HOME = "/";
export const QUESTIONNAIRE = "/questionnaire";
export const TERMS_AND_CONDS = "/terms-and-conditions";
export const AUTH = "/auth";
export const REPORT = "/report";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: HOME,
      name: 'home',
      component: HomeView
    },
    {
      path:AUTH+'/:isLoggingIn',
      name:'auth',
      component:AuthView,
      props:true
    },
    {
      path: TERMS_AND_CONDS,
      name:'terms-and-conditions',
      component:TermsAndConditionsView
    },  
    {
      path:QUESTIONNAIRE,
      name:'questionnaire',
      component:QuestionnaireView
    },
    {
      path:REPORT,
      name:'report',
      component:ReportView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
  ]
})

export default router
