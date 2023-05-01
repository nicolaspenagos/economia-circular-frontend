import { defineStore } from "pinia";
import {
  APIService,
  GET_ACTIVE_RESPONSES_PLUS_ID,
  RESPONSE,
} from "../service/APIService";
import { useAuthStore } from "./auth";
export const useReportStore = defineStore({
  id: "report",
  state: () => ({
    completedResponses: [],
    test:["01/01/2022", "14/02/2022","01/01/2022", "14/02/2022","01/01/2022", "14/02/2022","01/01/2022", "14/02/2022"]
  }),
  getters: {
    getCompletedResponses() {
      return this.completedResponses;
    },
  },
  actions: {
    async loadCompletedResponses() {
      const response = await APIService.get(
        RESPONSE + "/users/" + useAuthStore().user.id
      );
      response.forEach((element) => {
        if (element.complete) this.completedResponses.push(element);
      });
      console.log(response);
      console.log(this.completedResponses);
    },
  },
});
