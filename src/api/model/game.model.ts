import { emptyLevelModel, LevelModel } from '@/api/model/level.model';

export interface GameModel {
  easy: LevelModel;
  medium: LevelModel
  hard: LevelModel;

  [propName: string]: any;
}

export const newGameModel: () => GameModel = (): GameModel => {
  return <GameModel>{
    easy: emptyLevelModel(),
    medium: emptyLevelModel(),
    hard: emptyLevelModel()
  };
};
