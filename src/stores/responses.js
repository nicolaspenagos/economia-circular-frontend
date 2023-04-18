import { defineStore } from "pinia";
import { APIService, GET_ACTIVE_RESPONSES_PLUS_ID } from "../service/APIService";
export const useReponsesStore = defineStore({
    id:"responses",
    state:()=>({
        activeResponse:null
    }),
    getters:{
        getActiveResponse(){
            return  this.activeResponse;
        }
    },
    actions:{
        async loadUserActiveResponse(loggedUserId){

            // Array length is either zero or one element
            const activeReponsesArray = await APIService.get(GET_ACTIVE_RESPONSES_PLUS_ID+loggedUserId);
            if(activeReponsesArray.length>0){
                this.activeResponse=activeReponsesArray[0];
            }

        },
        markAnswer(){
            
        }
    }



});