import axios from "axios";
import { isTokenExpired, parseJwt } from "../utils/jwtUtils";

import { SESSION_EXPIRED } from "../constants/error";
import { showError } from "../utils/errorUtils";

export const USERS = "users";
export const LOGIN = "login";
export const ACTIVITIES = "activities";
export const QUESTIONS = "questions";
export const GET_ACTIVE_RESPONSES_PLUS_ID = "response/users/active/";
export const RESPONSE = "response";
export const REPORT = "report";
const API_URL = "http://18.204.195.161:8080/";

export class APIService {
  static async post(endpoint, data) {
    const config = this.getHeaderConfig();
    const response = await axios.post(API_URL + endpoint, data, config);
    return response.data;
  }

  static async get(endpoint) {
   
    try {
      const config = this.getHeaderConfig();
      const response = await axios.get(API_URL + endpoint, config);
      return response.data;
    } catch (error) {
      showError(error);
    }
  }

  static async patch(endpoint,newData){
    try {
      const config = this.getHeaderConfig();
      const response = await axios.patch(API_URL+endpoint, newData, config);
      return response.data;
    } catch (error) {
      showError(error);
    }
  }

  static getHeaderConfig() {
    const webToken = localStorage.getItem("myapp-token")
      ? localStorage.getItem("myapp-token")
      : "";

    if (webToken != "") {
      const tokenExpDate = parseJwt(webToken).exp;
  
      if (isTokenExpired(tokenExpDate)) {
        throw new Error(SESSION_EXPIRED);
      }
    }

    const config = {
      headers: { Authorization: "Bearer " + webToken },
    };

    return config;
  }
}
