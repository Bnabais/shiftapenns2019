<template>
  <div class="col-lg-12 home">
    <HelloWorld />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
  import 'bootstrap/dist/css/bootstrap.min.css';

  @Component({
    components: {
      HelloWorld
    }
  })
  export default class Home extends Vue {

    created(): void {
      console.log('Question?', this.getQuestion().question);
      console.log('Question?', this.getQuestion().question);
      console.log('Question?', this.getQuestion());
    }

    constructor() {
      super();
    }
  }
</script>
