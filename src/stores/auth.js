import { defineStore } from "pinia";
import { APIService, USERS,LOGIN } from "../service/APIService";

const TOKEN_KEY = 'myapp-token';

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: null,
    isLoggedIn: false,
  }),
  getters: {
    isAuthenticated() {
      return this.token!==null&&this.user!=null;
    },
  },
  actions: {
    async signUp(newUser){

        const reponse = await APIService.post(USERS, newUser);
        this.user = reponse;

        //Login
        await this.login(newUser.email, newUser.password);
        return;
    

    },
    async login(email, password) {
      const token = await APIService.post(LOGIN, {email, password});
      this.setToken(token);
      this.isLoggedIn=true;
    },
    logout() {
      this.token = null;
      this.user = null;
      this.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    setToken(token){
      localStorage.setItem(TOKEN_KEY, token.token);
      this.token = token;
    },
    checkIfLogged(){
      const token = localStorage.getItem(TOKEN_KEY);
      console.log(token);
      if(token){
        console.log('hola');
        this.token = token;
        this.isLoggedIn = true;
      }
    }
  },
});
