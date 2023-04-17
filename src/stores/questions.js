import { defineStore } from "pinia";
import { APIService, QUESTIONS } from "../service/APIService";

export const useQuestionsStore = defineStore({
  id: "questions",
  state: () => ({
    questions: [],
    questionsByActivity: new Map(),
  }),
  getters: {
    getQuestions() {
      return this.questions;
    },
    getQuestionsByActivity() {
      return this.questionsByActivity;
    },
  },
  actions: {
    async loadQuestions(activities) {
      this.questions = await APIService.get(QUESTIONS);
      this.filterQuestionsByActivity(this.questions, activities);
      return this.questionsByActivity;
    },
    filterQuestionsByActivity(questionsArray, activities) {
      questionsArray.forEach((question) => {
        const activity = activities.find(
          (activity) => (activity.id == question.activityId)
        );
        if (this.questionsByActivity.has(activity.name)) {
          const temp = this.questionsByActivity.get(activity.name);
          temp.push(question);
          this.questionsByActivity.set(activity.name, temp);
        } else {
          this.questionsByActivity.set(activity.name, [question]);
        }
      });
    },
  },
});
