import { defineStore } from "pinia";
import {
  APIService,
  GET_ACTIVE_RESPONSES_PLUS_ID,
} from "../service/APIService";
import {
  mapFromStringToMarkedInfo,
  mapMarkedInfoToSring,
} from "../utils/markOptionUtils";
import {
  INCREMENTAL_SINGLE_CHOICE,
  SINGLE_CHOICE,
  SINGLE_CHOICE_DEPENDENT,
  useQuestionsStore,
} from "./questions";

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
          currentSet.delete(
            mapFromStringToMarkedInfo(oldPicked).questionOptionId
          );
        }
      }

      currentSet.add(newMarkedInfo.questionOptionId);
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
        currentSet.add(tempElement.questionOptionId);
      });

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

    searchSelectedDependentQuestionId(dependentQuestionId) {
      if (!this.activeResponse) {
        return false;
      }

      const questionsById = useQuestionsStore().questionsById;

      for (const [questionId, selectedOptionIds] of this.activeResponse) {
        const question = questionsById.get(questionId);

        for (const optionId of selectedOptionIds) {
          const option = question.questionOptions.find(
            (option) => option.id === optionId
          );

          if (option && option.dependentQuestionId === dependentQuestionId) {
            return true;
          }
        }
      }

      return false;
    },
    getQuestionResponse(questionId, questionType) {
      const isSingleChoice = useQuestionsStore().isSingleChoice(questionType);
      let questionResponse = isSingleChoice ? null : [];

      if (this.activeResponse && this.activeResponse.get(questionId)) {
        const selectionArray = Array.from(this.activeResponse.get(questionId));

        if (isSingleChoice) {
          questionResponse = mapMarkedInfoToSring(
            questionId,
            selectionArray[0],
            questionType
          );
        } else {
          selectionArray.forEach((selectedOpt) => {
            questionResponse.push(
              mapMarkedInfoToSring(questionId, selectedOpt, questionType)
            );
          });
        }
      }
      return questionResponse;
    },
  },
});
//questionId, questionOptionId, questionTyp
