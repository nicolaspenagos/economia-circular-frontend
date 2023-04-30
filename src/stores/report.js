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
        completedResponses: []
    }),
    getters: {
        getCompletedResponses(){
            return this.completedResponses;
        }
    },
    actions: {
        async loadCompletedResponses(){
            const response = await APIService.get(RESPONSE+'/users/'+useAuthStore().user.id);
        }
    },
  });
  