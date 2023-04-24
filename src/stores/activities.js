import { defineStore } from "pinia";
import { APIService, ACTIVITIES } from "../service/APIService";

export const useActivitiesStore = defineStore({
    id:"activities",
    state:()=>({
        activities: [],
        activitiesById:new Map()
    }),
    getter:{
        getActivities(){
            return this.activities;
        }
    },
    actions:{
        async loadActivities(){
            this.activities = await APIService.get(ACTIVITIES);
            this.activities.forEach(a=>{
                this.activitiesById.set(a.id, a);
            });
            return this.activities;
        }
    }
});