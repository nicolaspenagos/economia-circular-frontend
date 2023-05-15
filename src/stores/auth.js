import { defineStore } from "pinia";
import { APIService, USERS, LOGIN } from "../service/APIService";
import { isTokenExpired, parseJwt } from "../utils/jwtUtils";
import { useReponsesStore } from "./responses";
import { useQuestionsStore } from "./questions";
import {useActivitiesStore} from "./activities";
import { useReportStore } from "./report";
const TOKEN_KEY = "myapp-token";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    isLoggedIn: false,
    user: null,
  }),
  getters: {
    isAuthenticated() {
      return this.isLoggedIn;
    },
  },
  actions: {
    async signUp(newUser) {
      this.user = await APIService.post(USERS, newUser);
      await this.login(newUser.email, newUser.password);
    },
    async login(email, password) {
      this.logout();
      const token = await APIService.post(LOGIN, { email, password });
      localStorage.setItem(TOKEN_KEY, token.token);
      await this.setLoggedUserData(token.token);
    },
    async fetchLoggedUser() {

      const fetchedUser = await APIService.get(
        USERS + "/" + parseJwt(this.token).userId
      );
      this.user=fetchedUser;
      const activities = await useActivitiesStore().loadActivities();
      await useQuestionsStore().loadQuestions(activities);
      await useReponsesStore().loadUserActiveResponse(this.user.id);
     
    },
    async setLoggedUserData(token) {
      this.token = token;
      this.isLoggedIn = true;
      await this.fetchLoggedUser();

    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      this.user = null;
      useReponsesStore().resetStore();
      useQuestionsStore().resetStore();
      useActivitiesStore().resetStore();
      useReportStore().resetStore();

      
      localStorage.removeItem(TOKEN_KEY);
    },
    async checkIfLogged() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
     
        if (isTokenExpired(parseJwt(token).exp)) {
          this.logout();
        } else {
          await this.setLoggedUserData(token);
        }
      }
    },
  },
});
