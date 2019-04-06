<template>
  <div class="col-md-12 main-view">
    <NavBar />
    <div class="col-md-12 home">
      <Game />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import NavBar from '@/components/NavBar.vue'; // @ is an alias to /src
  import Game from '@/components/Game.vue'; // @ is an alias to /src
  import 'bootstrap/dist/css/bootstrap.min.css';

  @Component({
    components: {
      NavBar,
      Game
    }
  })
  export default class Home extends Vue {
  }
</script>
