<template>
  <div class="container">
    <div class="row">
      <div class="content col-md-12">
        <div class="question-div col-md-12">
          <h1 class="question">{{ actualQuestion.question }}</h1>
        </div>
        <div v-for="answer in actualQuestion.answers" class="answers col-md-6">
          <button v-on:click="handleAnswer(answer.id)" class="btn btn-default answer col-md-6 col-md-offset-3"
            type="submit">{{ answer.answer }}
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

  @Component
  export default class HelloWorld extends Vue {
    private gameService: GameService;
    actualQuestion: QuestionModel = emptyQuestionModel();

    constructor() {
      super();
      this.gameService = new GameService();
    }

    created(): void {
      this.actualQuestion = this.gameService.getNextQuestion();
    }

    handleAnswer(id: number): void {
      console.log(id);
      if (id === 1) {
        if (this.gameService.hasMoreQuestions()) {
          this.actualQuestion = this.gameService.getNextQuestion();
        }
      }
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

  .content {
    text-align: center;
    padding: 15px;
    height: 400px;

    .question-div {
      .question {
        color: white;
      }
    }

    .answers {
      .answer {
        margin-top: 50px;
        outline: none;
      }
    }
  }

</style>
