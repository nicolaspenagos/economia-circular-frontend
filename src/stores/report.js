import { defineStore } from "pinia";
import { APIService, RESPONSE, REPORT } from "../service/APIService";
import { useAuthStore } from "./auth";
export const useReportStore = defineStore({
  id: "report",
  state: () => ({
    completedResponses: [],
  }),
  getters: {
    getCompletedResponses() {
      return this.completedResponses;
    },
  },
  actions: {
    async loadCompletedResponses() {
      this.completedResponses = [];
      const response = await APIService.get(
        RESPONSE + "/users/" + useAuthStore().user.id
      );
      response.forEach((element) => {
        if (element.complete) this.completedResponses.push(element);
      });
      this.completedResponses.sort(function (a, b) {
        return new Date(a.responseDate) - new Date(b.responseDate);
      });
    },
    async getReport(response){
      const report = await APIService.get(REPORT+'/'+useAuthStore().user.id+'/'+response.id);
      console.log(report);
    }
  },
});
