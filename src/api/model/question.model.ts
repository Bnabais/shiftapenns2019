import { AnswerModel } from '@/api/model/answer.model';

export interface QuestionModel {
  question: string;
  answers: AnswerModel[];
}

export const emptyQuestionModel: () => QuestionModel = (): QuestionModel => {
  return <QuestionModel>{
    question: '',
    answers: []
  };
};
