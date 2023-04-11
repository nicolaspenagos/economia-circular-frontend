import { defineStore } from "pinia";
import { APIService, USERS, LOGIN } from "../service/APIService";
import { isTokenExpired, parseJwt } from "../utils/jwtUtils";

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
      return;
    },
    async login(email, password) {
      this.logout();
      const token = await APIService.post(LOGIN, { email, password });
      localStorage.setItem(TOKEN_KEY, token.token);
      this.setLoggedUserData(token.token);
    },
    async fetchLoggedUser() {

      const fetchedUser = await APIService.get(
        USERS + "/" + parseJwt(this.token).userId
      );
      this.user=fetchedUser;
    },
    setLoggedUserData(token) {
      this.token = token;
      this.isLoggedIn = true;
      this.fetchLoggedUser();
    },
    logout() {
      this.token = null;
      this.isLoggedIn = false;
      this.user = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    checkIfLogged() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        if (!isTokenExpired(parseJwt(token).exp)) {
          this.setLoggedUserData(token);
        } else {
          this.logout();
        }
      }
    },
  },
});
