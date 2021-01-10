interface IndividualQuestions {
  questionId: string;
  questionName: string;
  wasUserCorrect: boolean;
}

export interface NewResults {
  id: string;
  subjectName: string;
  category: string;
  groupName: string;
  individualQuestions: Array<IndividualQuestions>;
  areaName: string;
}

export default interface Results {
  groupName: string;
  categories: Array<string>;
  correct: number;
  totalQuestions: number;
  percentage: string;
  individualQuestions: Array<IndividualQuestions>;
  subjectName: string;
  id: string;
  areaName: string;
}
