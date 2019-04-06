import { GameModel, newGameModel } from '@/api/model/game.model';
import { emptyQuestionModel, QuestionModel } from '@/api/model/question.model';
import * as data from '../assets/jogo.json';

export type LevelType =
  'easy'
  | 'medium'
  | 'hard';

export class GameService {
  private game: GameModel;
  private points: number;
  private isFirstQuestion: boolean;

  constructor() {
    this.game = newGameModel();
    this.points = 0;
    this.isFirstQuestion = true;
    this.loadQuestionsFromJson();
  }

  public getNextQuestion(): QuestionModel {
    let question: QuestionModel = emptyQuestionModel();

    if (this.game.easy.questions.length) {
      this.points += this.isFirstQuestion ? 0 : this.game.easy.points;
      question = this.getEasyQuestion();
    } else if (this.game.medium.questions.length) {
      this.points += this.isFirstQuestion ? 0 : this.game.medium.points;
      question = this.getMediumQuestion();
    } else if (this.game.hard.questions.length) {
      this.points += this.isFirstQuestion ? 0 : this.game.hard.points;
      question = this.getHardQuestion();
    }

    //ALTERAR PONTOS
    this.isFirstQuestion = false;
    return question;
  }

  public hasMoreQuestions(): boolean {
    return this.game.easy.questions.length > 0 || this.game.medium.questions.length > 0 ||
      this.game.hard.questions.length > 0;
  }

  public restartGame(): void {
    this.points = 0;
    this.isFirstQuestion = true;
    this.loadQuestionsFromJson();
  }

  public getPoints(): number {
    return this.points;
  }

  private getRandomQuestionIndex(level: LevelType): number {
    if (level === 'easy') {
      return Math.floor(Math.random() * Math.floor(this.game.easy.questions.length));
    } else if (level === 'medium') {
      return Math.floor(Math.random() * Math.floor(this.game.medium.questions.length));
    } else if (level === 'hard') {
      return Math.floor(Math.random() * Math.floor(this.game.hard.questions.length));
    }

    return 0;
  }

  private getEasyQuestion(): QuestionModel {
    const index = this.getRandomQuestionIndex('easy');
    const question: QuestionModel = this.game.easy.questions[index];
    question.answers.sort(() => Math.random() - 0.5);
    this.game.easy.questions.splice(index, 1);
    return question;
  }

  private getMediumQuestion(): QuestionModel {
    const index = this.getRandomQuestionIndex('medium');
    const question: QuestionModel = this.game.medium.questions[index];
    question.answers.sort(() => Math.random() - 0.5);
    this.game.medium.questions.splice(index, 1);
    return question;
  }

  private getHardQuestion(): QuestionModel {
    const index = this.getRandomQuestionIndex('hard');
    const question: QuestionModel = this.game.hard.questions[index];
    question.answers.sort(() => Math.random() - 0.5);
    this.game.hard.questions.splice(index, 1);
    return question;
  }

  private loadQuestionsFromJson(): void {
    this.game.easy.points = data.game.easy.points;
    this.game.easy.questions = <QuestionModel[]>Array.from(data.game.easy.questions);
    this.game.medium.points = data.game.medium.points;
    this.game.medium.questions = <QuestionModel[]>Array.from(data.game.medium.questions);
    this.game.hard.points = data.game.hard.points;
    this.game.hard.questions = <QuestionModel[]>Array.from(data.game.hard.questions);
  }
}
