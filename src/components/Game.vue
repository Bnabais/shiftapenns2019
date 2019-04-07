<template>
  <div class="container">
    <div v-if="isToShowAnimation === true" class="animation">
      <img class="img-responsive gif" alt="Responsive image" :src=gif />
    </div>
    <div class="row">
      <div v-if="screenLevel === 'questionsScreen'" class="content col-md-12">
        <div class="question-div col-md-12">
          <h1 class="points-wrapper">Score: <span class="points">{{ getPlayersPoints() }}</span></h1>
          <h1 class="question">{{ actualQuestion.question }}</h1>
        </div>
        <div class="answers-wrapper col-xs-12">
          <div v-for="answer in actualQuestion.answers" class="answers col-md-6 col-xs-12">
            <button
              v-on:click="handleAnswer(answer.id)"
              v-bind:class="{ disabled: answer.disabled }"
              class="btn btn-warning answer col-md-6"
              type="submit">
              {{ answer.answer }}
            </button>
          </div>
        </div>
      </div>
      <div v-else-if="screenLevel === 'gameOverScreen'" class="content col-md-12">
        <div class="gameover-div col-md-12">
          <h1 class="text-uppercase gameover">{{ gameOver }}</h1>
          <button v-on:click="handleStartAgain()" class="btn btn-warning start-again col-xs-6 col-xs-offset-3"
            type="submit">Start again!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { GameService } from '@/api/game.service';
  import { emptyQuestionModel, QuestionModel } from '@/api/model/question.model';
  import { ScreenLevel } from '@/api/model/screen.model';

  @Component
  export default class Game extends Vue {
    private gameService: GameService;
    actualQuestion: QuestionModel = emptyQuestionModel();
    screenLevel: ScreenLevel;
    gameOver: string = 'game over';
    gif: string = '';
    isToShowAnimation: boolean = false;
    timeOut: any = undefined;

    constructor() {
      super();
      this.gameService = new GameService();
      this.screenLevel = ScreenLevel.QUESTIONS_SCREEN;
    }

    created(): void {
      this.actualQuestion = this.gameService.getNextQuestion();
      this.screenLevel = ScreenLevel.QUESTIONS_SCREEN;
    }

    handleAnswer(id: number): void {
      if (this.gameService.isCorrectAnswer(id)) {
        this.animationForCorrectAnswer();
        this.timeOut = setTimeout(() => {
          this.isToShowAnimation = false;
          this.gif = '';

          if (this.gameService.hasMoreQuestions()) {
            this.actualQuestion = this.gameService.getNextQuestion();
          }
        }, 3000);
      } else {
        this.screenLevel = ScreenLevel.GAMEOVER_SCREEN;
      }
    }

    animationForCorrectAnswer(): void {
      let audio = new Audio(require(`../assets/${this.actualQuestion.media.audio}`));
      this.gif = this.actualQuestion.media.gif;
      this.isToShowAnimation = true;
      audio.play();
    }

    handleStartAgain(): void {
      this.screenLevel = ScreenLevel.QUESTIONS_SCREEN;
      this.gameService.restartGame();
      this.actualQuestion = this.gameService.getNextQuestion();
    }

    getPlayersPoints(): number {
      return this.gameService.getPoints();
    }

    teste(): void {
      this.gameService.disableRandomAnswer(this.actualQuestion);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .animation {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .gif {
      padding-right: 50px;
      width: 500px;
    }
  }

  .points-wrapper {
    margin-bottom: 40px;
  }

  .points {
    color: red;
  }

  .container {
    width: 100%;
    margin-top: 50px;

    .content {
      text-align: center;
      padding: 15px;
      height: 400px;

      .question-div {
        .question {
          color: white;
        }
      }

      .gameover-div {
        .gameover {
          color: orange;
        }

        .start-again {
          height: 50px;
          margin-top: 50px;
          outline: none;
        }
      }

      .answers-wrapper {
        display: flex;
        flex-wrap: wrap;
      }

      .answers {
        text-align: center;
      }

      .answer {
        width: 80%;
        height: 70px;
        left: 10%;
        margin-top: 50px;
        outline: none;
        font-size: 20px;
        color: black;
        word-wrap: break-word;
        white-space: normal;

        &:hover {
          &:not(.disabled) {
            color: white;
            background-color: blue;
            border-color: white;
          }
        }

        @media (max-width: 992px) {
          left: 0;
        }
      }
    }

  }
</style>
