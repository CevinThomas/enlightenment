export interface Options {
  choice: string;
  correct: boolean;
  explanation: string;
  id: number;
}

export interface QuestionsData {
  _id?: number;
  id: number;
  name: string;
  category: string;
  groupName: string;
  areaName: string;
  subjectName: string;
  groupId: number;
  answered: number;
  answeredCorrectly: number;
  options: Array<Options>;
}
