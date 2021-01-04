import { Options } from "../../interfaces/options";
const { ObjectID } = require("mongodb");

class Questions {
  questionsData: any | undefined;

  constructor(questions: any) {
    this.questionsData = questions;
  }

  generateObjectIdForGroupId() {
    const idToUse = new ObjectID();
    this.questionsData.forEach((question: { groupId: any }) => {
      question.groupId = idToUse;
    });
  }

  generateLowerCaseProperties() {
    this.questionsData.forEach(
      (question: {
        category: string;
        groupName: string;
        areaName: string;
        subjectName: string;
      }) => {
        question.category = question.category.toLowerCase();
        question.groupName = question.groupName.toLowerCase();
        question.areaName = question.areaName.toLowerCase();
        question.subjectName = question.subjectName.toLowerCase();
      }
    );
  }

  generateOptionsIds() {
    this.iterateOverQuestions(0, this.getLengthOfQuestionsArray());
  }

  getLengthOfQuestionsArray(): number {
    return this.questionsData.length;
  }

  iterateOverQuestions(count: number, length: number): void {
    this.questionsData[count].options.forEach((option: Options) => {
      const newOptionId = new ObjectID();
      option.id = newOptionId;
    });

    if (count === length - 1) {
      return;
    }

    count++;

    this.iterateOverQuestions(count, length);
  }
}

export = Questions;
