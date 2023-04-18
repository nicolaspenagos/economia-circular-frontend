import { defineStore } from "pinia";
import { APIService, QUESTIONS } from "../service/APIService";
export const MULTIPLE_CHOICE = 'MULTIPLE_CHOICE';
export const INCREMENTAL_SINGLE_CHOICE = 'INCREMENTAL_SINGLE_CHOICE';
export const SINGLE_CHOICE = 'SINGLE_CHOICE';
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
      this.sortFilteredQuestions();
      return this.questionsByActivity;
    },
    filterQuestionsByActivity(questionsArray, activities) {
      questionsArray.forEach((question) => {
        const activity = activities.find(
          (activity) => activity.id == question.activityId
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
    sortFilteredQuestions() {
      for (const [key, value] of this.questionsByActivity) {
        this.sortQuestionOpts(value);
        const sortedQuestions = value.sort(function(a,b){return a.questionOrder-b.questionOrder});
        this.questionsByActivity.set(key, sortedQuestions);
      }
    },
    sortQuestionOpts(questions){
        for(let i=0; i<questions.length; i++){
            questions[i].questionOptions = questions[i].questionOptions.sort(function(a,b){return a.optionOrder-b.optionOrder});
        }
    }
  },
});
