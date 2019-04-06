<template>
  <div class="container">
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
      if (id === 1) {
        if (this.gameService.hasMoreQuestions()) {
          this.actualQuestion = this.gameService.getNextQuestion();
        }
      } else {
        this.screenLevel = ScreenLevel.GAMEOVER_SCREEN;
      }
    }

    handleStartAgain(): void {
      this.screenLevel = ScreenLevel.QUESTIONS_SCREEN;
      this.gameService.restartGame();
      this.actualQuestion = this.gameService.getNextQuestion();
    }

    getPlayersPoints(): number {
      return this.gameService.getPoints();
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
          color: white;
          background-color: blue;
          border-color: white;
        }

        @media (max-width: 992px) {
          left: 0;
        }
      }
    }

  }
</style>
