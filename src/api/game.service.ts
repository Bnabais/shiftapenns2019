import { GameModel, newGameModel } from '@/api/model/game.model';
import { QuestionModel } from '@/api/model/question.model';
import * as data from '../assets/jogo.json';

export class GameService {
  private game: GameModel;

  constructor() {
    this.game = newGameModel();
    //this.questionIndex = 0;
    this.game.questions = <QuestionModel[]>Array.from(data.game);
  }

  public getNextQuestion(): QuestionModel {
    const index: number = this.getRandomQuestionIndex();
    const question: QuestionModel = this.game.questions[index];
    question.answers.sort(() => Math.random() - 0.5);
    this.game.questions.splice(index, 1);
    return question;
  }

  public hasMoreQuestions(): boolean {
    return this.game.questions.length > 0;
  }

  private getRandomQuestionIndex(): number {
    return Math.floor(Math.random() * Math.floor(this.game.questions.length));
  }
}
