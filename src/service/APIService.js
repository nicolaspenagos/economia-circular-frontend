import axios from "axios";

export const USERS = "users";
export const LOGIN = 'login';
const API_URL = "http://localhost:8080/";


export class APIService {
  static async post(endpoint, data) {

  
    const config = this.getHeaderConfig();
    try {
        const response = await axios.post(API_URL + endpoint, data, config);
        return response.data;
    } catch (error) {
      const errorData = error.response.data;
     alert(errorData.code+"\n"+errorData.message);
      throw error.response.data;
    }
  }

  static async get(endpoint) {

 
    const config = this.getHeaderConfig();
    try {
        const response = await axios.get(API_URL + endpoint, config);
        return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }



  static getHeaderConfig(){

    const webToken = localStorage.getItem("myapp-token")?localStorage.getItem("myapp-token"):'';

    console.log(webToken);
    const config = {
        headers: { 'Authorization': 'Bearer '+ webToken}
    };

    return config;

}
}
