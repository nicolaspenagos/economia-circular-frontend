import { defineStore } from "pinia";
import { APIService, USERS,LOGIN } from "../service/APIService";

const TOKEN_KEY = 'myapp-token';

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
  actions: {
    async signUp(newUser){

        const reponse = await APIService.post(USERS, newUser);
        this.user = reponse;
        console.log(this.user);

        //Login
        const password = newUser.password;
        const email = newUser.email;
        const token = await APIService.post(LOGIN, {email, password});
        this.login(token.token)

       // const questions = await APIService.get('questions');
       // console.log(questions)

    },
    login(token) {
      console.log(token)
      console.log(localStorage)
      localStorage.setItem(TOKEN_KEY, token)
      this.token = token
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
