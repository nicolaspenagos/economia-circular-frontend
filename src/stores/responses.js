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
            })
          );
          this.activeResponse.delete(oldPickedInfo.dependentQuestionId);
        }
      }

      currentSet.add(
        JSON.stringify({
          questionOptionId: newMarkedInfo.questionOptionId,
          dependentQuestionId: newMarkedInfo.dependentQuestionId,
        })
      );
      this.activeResponse.set(newMarkedInfo.questionId, currentSet);
    },
    handleMarkMultipleAnswers(newMultiplePicked, oldMultiplePicked) {
      if (this.activeResponse == null) {
        this.activeResponse = new Map();
      }

      const currentSet = new Set();

      let tempElement;
      newMultiplePicked.forEach((selectionStr) => {
        tempElement = mapFromStringToMarkedInfo(selectionStr);
        currentSet.add(
          JSON.stringify({
            questionOptionId: tempElement.questionOptionId,
            dependentQuestionId: tempElement.dependentQuestionId,
          })
        );
      });

      if (newMultiplePicked.length > 0) {
        this.activeResponse.set(tempElement.questionId, currentSet);
      } else {
        if (oldMultiplePicked.length > 0) {
          console.log(oldMultiplePicked);
          this.activeResponse.delete(
            mapFromStringToMarkedInfo(oldMultiplePicked[0]).questionId
          );
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
            selection.dependentQuestionId
          );
        } else {
          selectionArray.forEach((selectedOpt) => {
            const selection = JSON.parse(selectedOpt);
            questionResponse.push(
              mapMarkedInfoToSring(
                questionId,
                selection.questionOptionId,
                questionType,
                selection.dependentQuestionId
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
     
          if (useQuestionsStore().questionsByActivity.get(activity).findIndex(x=>x.id==id)!==-1)
            counter++;
        });
      }

      console.log(counter);
      return counter;
    },
  },
});
//questionId, questionOptionId, questionTyp
