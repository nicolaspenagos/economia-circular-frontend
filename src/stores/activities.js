import { defineStore } from "pinia";
import { APIService, ACTIVITIES } from "../service/APIService";

export const useActivitiesStore = defineStore({
    id:"activities",
    state:()=>({
        activities: [],
    }),
    getter:{
        getActivities(){
            return this.activities;
        }
    },
    actions:{
        async loadActivities(){
            this.activities = await APIService.get(ACTIVITIES);
            return this.activities;
        }
    }
});