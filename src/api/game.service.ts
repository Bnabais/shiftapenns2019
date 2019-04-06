import { GameModel, newGameModel } from '@/api/model/game.model';
import { emptyQuestionModel, QuestionModel } from '@/api/model/question.model';
import * as data from '../assets/jogo.json';

export class GameService {
  private game: GameModel;
  private actualQuestion: QuestionModel;
  private questionIndex: number;

  constructor() {
    this.game = newGameModel();
    this.actualQuestion = emptyQuestionModel();
    this.questionIndex = 0;
    this.game.questions = <QuestionModel[]>Array.from(data.game);
  }

  public getNextQuestion(): QuestionModel {
    return this.questionIndex <= this.game.questions.length ? this.game.questions[this.questionIndex++] :
      emptyQuestionModel();
  }

  public hasMoreQuestions(): boolean {
    return this.questionIndex >= this.game.questions.length;
  }
}
