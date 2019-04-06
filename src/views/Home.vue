<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
  import * as data from '../assets/jogo.json';
  import { Component, Vue } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  import { GameModel } from '@/game.model';
  import { QuestionModel } from '@/question.model';

  @Component({
    components: {
      HelloWorld
    }
  })
  export default class Home extends Vue {
    private game: GameModel = {
      questions: []
    };
    private questionIndex: number = 0;

    created(): void {
      this.loadGame();
      console.log('Question?', this.getQuestion().question);
      console.log('Question?', this.getQuestion().question);
      console.log('Question?', this.getQuestion());
    }

    constructor() {
      super();

    }

    public getQuestion(): QuestionModel {
      let question: QuestionModel = {
        question: '',
        answers: []
      };

      if (this.questionIndex <= this.game.questions.length) {
        question = this.game.questions[this.questionIndex];
        this.questionIndex++;
      }
      return question;
    }

    private loadGame(): void {
      this.game.questions = <QuestionModel[]>Array.from(data.game);
    }
  }
</script>
