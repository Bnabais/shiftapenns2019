import { AnswerModel } from '@/api/model/answer.model';

export interface QuestionModel {
  id: number;
  question: string;
  answers: AnswerModel[];
}

export const emptyQuestionModel: () => QuestionModel = (): QuestionModel => {
  return <QuestionModel>{
    id: -1,
    question: '',
    answers: []
  };
};
