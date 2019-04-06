import { AnswerModel } from '@/api/model/answer.model';
import { emptyMediaModel, MediaModel } from '@/api/model/media.model';

export interface QuestionModel {
  question: string;
  answers: AnswerModel[];
  media: MediaModel;
}

export const emptyQuestionModel: () => QuestionModel = (): QuestionModel => {
  return <QuestionModel>{
    question: '',
    answers: [],
    media: emptyMediaModel()
  };
};
