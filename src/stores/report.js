import { defineStore } from "pinia";
import { APIService, RESPONSE, REPORT } from "../service/APIService";
import { useAuthStore } from "./auth";
import {REPORT_BY_LEVELS} from "../constants/report.js";
export const useReportStore = defineStore({
  id: "report",
  state: () => ({
    completedResponses: [],
    selectedResponse:null,
    currentResponseIndex:-1,
    currentReport:null,
  }),
  getters: {
    getCompletedResponses() {
      return this.completedResponses;
    },
    getSelectedResponse(){
      return this.selectedResponse;
    }
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
    async getReport(index){
      this.currentResponseIndex = index;
      this.selectedResponse = this.completedResponses[index];
      this.currentReport = await APIService.get(REPORT+'/'+useAuthStore().user.id+'/'+this.selectedResponse.id);
      return this.currentReport;
    },
    resetStore(){
      this.completedResponses = [];
      this.selectedResponse = null;
      this.currentResponseIndex = -1;
      this.currentReport = null;
    },
    getLevelData(level){
      const principlesArray = REPORT_BY_LEVELS.get(level);
      const levelData = [];
      this.currentReport.reportByPrinciples.forEach(principleResult=>{
          if(principlesArray.includes(principleResult.shortname)){
            levelData.push(principleResult);
          }
      });
      
      //Sort by title order 
      return levelData.sort(function(a,b){
     
        return parseInt(a.title.split(' ')[1])-parseInt(b.title.split(' ')[1]);
      });
    }
  },
});
