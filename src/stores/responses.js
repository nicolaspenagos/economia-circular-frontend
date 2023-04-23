import { defineStore } from "pinia";
import {
  APIService,
  GET_ACTIVE_RESPONSES_PLUS_ID,
} from "../service/APIService";
import {
  mapFromStringToMarkedInfo,
  mapMarkedInfoToSring,
} from "../utils/markOptionUtils";
import { useQuestionsStore } from "./questions";

export const useReponsesStore = defineStore({
  id: "responses",
  state: () => ({
    activeResponse: null,
    lastActivityCompleted: -1,
  }),
  getters: {
    getActiveResponse() {
      return this.activeResponse;
    },
  },
  actions: {
    async loadUserActiveResponse(loggedUserId) {
      // Array length is either zero or one element
      const activeReponsesArray = await APIService.get(
        GET_ACTIVE_RESPONSES_PLUS_ID + loggedUserId
      );
      if (activeReponsesArray.length > 0) {
        this.activeResponse = activeReponsesArray[0];
      }
    },
    handleMarkSingleAnswer(oldPicked, newPicked) {
      const newMarkedInfo = mapFromStringToMarkedInfo(newPicked);

      if (this.activeResponse == null) {
        this.activeResponse = new Map();
      }

      let currentSet = new Set();

      if (this.activeResponse.has(newMarkedInfo.questionId)) {
        currentSet = this.activeResponse.get(newMarkedInfo.questionId);
        if (oldPicked) {
          const oldPickedInfo = mapFromStringToMarkedInfo(oldPicked);
          currentSet.delete(
            JSON.stringify({
              questionOptionId: oldPickedInfo.questionOptionId,
              dependentQuestionId: oldPickedInfo.dependentQuestionId,
              exclusive:oldPickedInfo.exclusive,
            })
          );
          this.activeResponse.delete(oldPickedInfo.dependentQuestionId);
        }
      }

      currentSet.add(
        JSON.stringify({
          questionOptionId: newMarkedInfo.questionOptionId,
          dependentQuestionId: newMarkedInfo.dependentQuestionId,
          exclusive:newMarkedInfo.exclusive
        })
      );
      this.activeResponse.set(newMarkedInfo.questionId, currentSet);
    },
    handleMarkMultipleAnswers(newMultiplePicked, oldMultiplePicked) {
      if (this.activeResponse == null) {
        this.activeResponse = new Map();
      }

      const currentSet = new Set();
      let isExclusive = false;
      let tempElement;
      newMultiplePicked.forEach((selectionStr) => {
        tempElement = mapFromStringToMarkedInfo(selectionStr);
        if(tempElement.exclusive){
          isExclusive = true;
        }
        currentSet.add(
          JSON.stringify({
            questionOptionId: tempElement.questionOptionId,
            dependentQuestionId: tempElement.dependentQuestionId,
            exclusive:tempElement.exclusive
          })
        );
      });

      if(oldMultiplePicked && isExclusive){
        this.deleteMultipleDependent(oldMultiplePicked);
      }

      if (newMultiplePicked.length > 0) {
        this.activeResponse.set(tempElement.questionId, currentSet);
      } else {
        if (oldMultiplePicked.length > 0) {
          this.activeResponse.delete(
            mapFromStringToMarkedInfo(oldMultiplePicked[0]).questionId
          );
        }
      }
    },
    /*
    checkIfExclusive(questionId, questionOptionId) {
      const questionsById = useQuestionsStore().questionsById;
      const questionOptions = questionsById.get(questionId).questionOptions;

      for (let i = 0; i < questionOptions.length; i++) {
        if (
          questionOptions[i].id === questionOptionId &&
          questionOptions[i].exclusive
        ) {
          return true;
        }
      }
      return false;
    },*/
    deleteMultipleDependent(oldMultiplePicked){
      console.log(oldMultiplePicked);
      for(let i=0; i<oldMultiplePicked.length; i++){
          const currentSelection = mapFromStringToMarkedInfo(oldMultiplePicked[i]);
          if(currentSelection.dependentQuestionId){
            this.activeResponse.delete(currentSelection.dependentQuestionId);
            i = Infinity;
          }
      }
    },

    searchSelectedDependentQuestionId(dependentQuestionId) {
      if (!this.activeResponse) {
        return false;
      }

      const questionsById = useQuestionsStore().questionsById;

      for (const [questionId, selectedOptionIds] of this.activeResponse) {
        const question = questionsById.get(questionId);

        for (const optionId of selectedOptionIds) {
          const option = question.questionOptions.find(
            (option) => option.id === JSON.parse(optionId).questionOptionId
          );

          if (option && option.dependentQuestionId === dependentQuestionId) {
            return true;
          }
        }
      }

      return false;
    },
    getQuestionResponse(questionId, questionType, dependentQuestionId) {
      const isSingleChoice = useQuestionsStore().isSingleChoice(questionType);
      let questionResponse = isSingleChoice ? null : [];

      if (this.activeResponse && this.activeResponse.get(questionId)) {
        const selectionArray = Array.from(this.activeResponse.get(questionId));

        if (isSingleChoice) {
          const selection = JSON.parse(selectionArray[0]);
          questionResponse = mapMarkedInfoToSring(
            questionId,
            selection.questionOptionId,
            questionType,
            selection.dependentQuestionId,
            selection.exclusive
          );
        } else {
          selectionArray.forEach((selectedOpt) => {
            const selection = JSON.parse(selectedOpt);
            questionResponse.push(
              mapMarkedInfoToSring(
                questionId,
                selection.questionOptionId,
                questionType,
                selection.dependentQuestionId,
                selection.exclusive
              )
            );
          });
        }
      }
      return questionResponse;
    },

    getCounterByActivity(activity) {
      let counter = 0;
      if (this.activeResponse) {
        let keys = Array.from(this.activeResponse.keys());
        keys.forEach((id) => {
          if (
            useQuestionsStore()
              .questionsByActivity.get(activity)
              .findIndex((x) => x.id == id) !== -1
          )
            counter++;
        });
      }

      return counter;
    },
  },
});

