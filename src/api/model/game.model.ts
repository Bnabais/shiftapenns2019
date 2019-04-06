import { QuestionModel } from '@/api/model/question.model';

export interface GameModel {
  questions: QuestionModel[];
}

export const newGameModel: () => GameModel = (): GameModel => {
  return <GameModel>{
    questions: []
  };
};
