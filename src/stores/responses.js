import { defineStore } from "pinia";
import {
  APIService,
  GET_ACTIVE_RESPONSES_PLUS_ID,
  RESPONSE,
} from "../service/APIService";
import {
  mapFromStringToMarkedInfo,
  mapMarkedInfoToSring,
} from "../utils/markOptionUtils";
import { useQuestionsStore } from "./questions";
import { useAuthStore } from "./auth";
import { useActivitiesStore } from "./activities";
export const useReponsesStore = defineStore({
  id: "responses",
  state: () => ({
    activeResponse: null,
    lastActivityCompleted: -1,
    activeJustify: null,
    backendActiveResponse: null,
    activeReponseLoadedFromBack: false,
  }),
  getters: {
    getActiveResponse() {
      return this.activeResponse;
    },
  },
  actions: {
    handleUpdateJustify(questionId, newJustifyText) {
      if (!this.activeJustify) {
        this.activeJustify = new Map();
      }
      this.activeJustify.set(questionId, newJustifyText);
    },
    async loadUserActiveResponse(loggedUserId) {
      // Array length is either zero or one element
      const activeReponsesArray = await APIService.get(
        GET_ACTIVE_RESPONSES_PLUS_ID + loggedUserId
      );
      if (activeReponsesArray.length > 0) {
        this.activeReponseLoadedFromBack = true;
        this.backendActiveResponse = activeReponsesArray[0];
        this.mapToActiveResponse(activeReponsesArray[0].selectedOptions);
        this.mapToJustifyList(activeReponsesArray[0].justifyList);
      }
    },
    mapToJustifyList(justifyList) {
      this.activeJustify = new Map();
      justifyList.forEach((j) => {
        this.activeJustify.set(j.questionIdReference, j.justify);
      });
    },
    mapToActiveResponse(selectedOptionsArray) {
      this.activeResponse = new Map();
      this.activeJustify = new Map();
      const activitiesMap = useActivitiesStore().activitiesById;
      let lastActivityIndex = -1;
      selectedOptionsArray.forEach((selection) => {
        const question = useQuestionsStore().questionsById.get(
          selection.questionIdReference
        );
        const activityIndex = parseInt(
          activitiesMap.get(question.activityId).name.split(" ")[1]
        );
        if (activityIndex - 1 > lastActivityIndex) {
          lastActivityIndex = activityIndex - 1;
        }
        const questionOption = question.questionOptions.find(
          (x) => x.id === selection.optionIdReference
        );
        let currentSet = new Set();
        if (this.activeResponse.has(question.id)) {
          currentSet = this.activeResponse.get(question.id);
        }
        currentSet.add(
          JSON.stringify({
            questionOptionId: questionOption.id,
            dependentQuestionId: questionOption.dependentQuestionId,
            exclusive: questionOption.exclusive,
          })
        );
        this.activeResponse.set(question.id, currentSet);
      });
      this.lastActivityCompleted = lastActivityIndex;
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
              exclusive: oldPickedInfo.exclusive,
            })
          );
          this.activeResponse.delete(oldPickedInfo.dependentQuestionId);
        }
      }

      currentSet.add(
        JSON.stringify({
          questionOptionId: newMarkedInfo.questionOptionId,
          dependentQuestionId: newMarkedInfo.dependentQuestionId,
          exclusive: newMarkedInfo.exclusive,
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
        if (tempElement.exclusive) {
          isExclusive = true;
        }
        currentSet.add(
          JSON.stringify({
            questionOptionId: tempElement.questionOptionId,
            dependentQuestionId: tempElement.dependentQuestionId,
            exclusive: tempElement.exclusive,
          })
        );
      });

      if (oldMultiplePicked && isExclusive) {
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
    deleteMultipleDependent(oldMultiplePicked) {
      for (let i = 0; i < oldMultiplePicked.length; i++) {
        const currentSelection = mapFromStringToMarkedInfo(
          oldMultiplePicked[i]
        );
        if (currentSelection.dependentQuestionId) {
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
    getJustifyAnswer(questionId) {
      if (this.activeJustify && this.activeJustify.has(questionId)) {
        return this.activeJustify.get(questionId);
      } else {
        return "";
      }
    },
    async saveResponse() {
      this.setupBackendActiveResponse();
      this.backendActiveResponse = {
        ...this.backendActiveResponse,
        justifyList: this.getJustifyList(),
        selectedOptions: this.getResponseOptionsArray(),
      };

      if (!this.activeReponseLoadedFromBack) {
        APIService.post(RESPONSE, this.backendActiveResponse);
      } else {
        APIService.patch(
          RESPONSE + "/" + this.backendActiveResponse.id,
          this.backendActiveResponse
        );
      }
    },
    setupBackendActiveResponse() {
      if (!this.backendActiveResponse) {
        const date = new Date();
        const currentDate = date.toISOString().slice(0, -2);

        this.getResponseOptionsArray();
        this.backendActiveResponse = {
          id: null,
          responseDate: currentDate,
          userId: useAuthStore().user.id,
          complete: false,
          selectedOptions: this.getResponseOptionsArray(),
          justifyList: this.getJustifyList(),
        };
      }
    },
    getResponseOptionsArray() {
      let selectedOptions = [];
      if (this.activeResponse) {
        for (const [key, value] of this.activeResponse) {
          let selectedOpts = Array.from(value);
          selectedOpts.forEach((opt) => {
            selectedOptions.push({
              questionIdReference: key,
              optionIdReference: JSON.parse(opt).questionOptionId,
            });
          });
        }
      }
      return selectedOptions;
    },
    getJustifyList() {
      let justifyList = [];
      if (this.activeJustify) {
        for (const [key, value] of this.activeJustify) {
          justifyList.push({
            questionIdReference: key,
            justify: value,
          });
        }
      }
      return justifyList;
    },
  },
});
