import { QuestionModel } from '@/api/model/question.model';

export interface LevelModel {
  points: number;
  questions: QuestionModel[];
}

export const emptyLevelModel: () => LevelModel = (): LevelModel => {
  return <LevelModel>{
    points: 0,
    questions: []
  };
};
