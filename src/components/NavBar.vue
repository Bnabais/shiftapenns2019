<template>
  <div class="container">
    <div class="row">
      <div v-for="tech in technolas" class="text-right technolas-div">
        <button class="technolas-button">
          <img :id=tech.id class="img-responsive technolas" alt="Technolas" src="./../assets/technolas.png" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {GameService} from "@/api/game.service";

  @Component
  export default class NavBar extends Vue {
    private gameService: GameService;
    technolas: Array = [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 4
      },
      {
        id: 5
      },
      {
        id: 6
      }
    ];
    constructor() {
      super();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .technolas-div {
    float: right;
    margin-top: 20px;

    .technolas-button {
      border: none;
      background-color: transparent;
      outline: none;

      .technolas {
        width: 30px;
      }
    }
  }

</style>
