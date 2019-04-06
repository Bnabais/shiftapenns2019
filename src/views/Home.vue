<template>
  <div class="col-lg-12 home">
    <Game />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Game from '@/components/Game.vue'; // @ is an alias to /src
  import 'bootstrap/dist/css/bootstrap.min.css';

  @Component({
    components: {
      Game
    }
  })
  export default class Home extends Vue {
  }
</script>
