<template>
  <div class="container">
    <div class="row">
      <div class="content col-md-12">
        <div class="question-div col-md-12">
          <h1 class="question">{{ question }}</h1>
        </div>
        <div class="answers col-md-6">
          <button v-on:click="answer()" class="btn btn-default answer col-md-6 col-md-offset-3" type="submit">{{ answer_1 }}</button>
          <button v-on:click="answer()" class="btn btn-default answer col-md-6 col-md-offset-3" type="submit">{{ answer_1 }}</button>
        </div>
        <div class="answers col-md-6">
          <button v-on:click="answer()" class="btn btn-default answer col-md-6 col-md-offset-3" type="submit">{{ answer_1 }}</button>
          <button v-on:click="answer()" class="btn btn-default answer col-md-6 col-md-offset-3" type="submit">{{ answer_1 }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
    question: string = 'Pergunta?';
    answer_1: string = 'Resposta 1';

    constructor() {
      super();
      this.test();

    }

    public test(): void {

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
