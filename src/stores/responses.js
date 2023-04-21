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
    handleMarkAnswer(oldPicked, newPicked) {
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
      let questionResponse = null;

      if (this.activeResponse && this.activeResponse.get(questionId)) {
        const selectionArray = Array.from(this.activeResponse.get(questionId));
        const selectedOption = useQuestionsStore().isSingleChoice(questionType)
          ? selectionArray[0]
          : selectionArray.join();

        questionResponse = mapMarkedInfoToSring(
          questionId,
          selectedOption,
          questionType
        );
      }
      return questionResponse;
    },
  },
});
//questionId, questionOptionId, questionTyp
