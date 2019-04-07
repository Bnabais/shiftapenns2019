import { GameModel, newGameModel } from '@/api/model/game.model';
import { QuestionModel } from '@/api/model/question.model';
import * as data from '../assets/jogo.json';

export type LevelType =
  'easy'
  | 'medium'
  | 'hard';

export class GameService {
  private game: GameModel;
  private points: number;
  private actualQuestionType: LevelType;

  constructor() {
    this.game = newGameModel();
    this.points = 0;
    this.actualQuestionType = 'easy';
    this.loadQuestionsFromJson();
  }

  public getNextQuestion(): QuestionModel {
    const level: LevelType = this.game.easy.questions.length ? 'easy' :
      this.game.medium.questions.length ? 'medium' : 'hard';
    this.actualQuestionType = level;
    return this.getQuestion(level);
  }

  public hasMoreQuestions(): boolean {
    return this.game.easy.questions.length > 0 || this.game.medium.questions.length > 0 ||
      this.game.hard.questions.length > 0;
  }

  public restartGame(): void {
    this.points = 0;
    this.loadQuestionsFromJson();
  }

  public getPoints(): number {
    return this.points;
  }

  public isCorrectAnswer(id: number) {
    if (id === 1) {
      this.points += this.getLevelPoints();
      return true;
    } else {
      return false;
    }
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

  private getQuestion(level: LevelType): QuestionModel {
    const index = this.getRandomQuestionIndex(level);
    const question: QuestionModel = this.game[level].questions[index];
    question.answers.sort(() => Math.random() - 0.5);
    this.game[level].questions.splice(index, 1);
    this.actualQuestionType = level;
    return question;
  }

  private getLevelPoints(): number {
    switch (this.actualQuestionType) {
      case 'easy':
        return this.game.easy.points;
      case 'medium':
        return this.game.medium.points;
      case 'hard':
        return this.game.hard.points;
      default:
        return 0;
    }
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
