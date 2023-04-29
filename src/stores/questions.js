import { defineStore } from "pinia";
import { APIService, QUESTIONS } from "../service/APIService";
export const MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
export const INCREMENTAL_SINGLE_CHOICE = "INCREMENTAL_SINGLE_CHOICE";
export const SINGLE_CHOICE = "SINGLE_CHOICE";
export const SINGLE_CHOICE_DEPENDENT = "SINGLE_CHOICE_DEPENDENT";

export const useQuestionsStore = defineStore({
  id: "questions",
  state: () => ({
    questions: [],
    questionsByActivity: new Map(),
    questionsById: new Map(),
  }),
  getters: {
    getQuestions() {
      return this.questions;
    },
    getQuestionsByActivity() {
      return this.questionsByActivity;
    },
    getQuestionsById() {
      return this.questionsById;
    },
  },
  actions: {
    async loadQuestions(activities) {
      this.questions = await APIService.get(QUESTIONS);
      this.filterQuestionsByActivity(this.questions, activities);
      this.mapQuestionById(this.questions);
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
    mapQuestionById(questionsArray) {
      questionsArray.forEach((question) => {
        this.questionsById.set(question.id, question);
      });
    },
    sortFilteredQuestions() {
      for (const [key, value] of this.questionsByActivity) {
        this.sortQuestionOpts(value);
        const sortedQuestions = value.sort(function (a, b) {
          return a.questionOrder - b.questionOrder;
        });
        this.questionsByActivity.set(key, sortedQuestions);
      }
    },
    sortQuestionOpts(questions) {
      for (let i = 0; i < questions.length; i++) {
        questions[i].questionOptions = questions[i].questionOptions.sort(
          function (a, b) {
            return a.optionOrder - b.optionOrder;
          }
        );
      }
    },
    isSingleChoice(questionType) {
      return (
        questionType === SINGLE_CHOICE ||
        questionType === INCREMENTAL_SINGLE_CHOICE ||
        questionType === SINGLE_CHOICE_DEPENDENT
      );
    },
    resetStore(){
      this.questions = [];
      this.questionsByActivity = new Map();
      this.questionsById = new Map();
    }
  },
});
