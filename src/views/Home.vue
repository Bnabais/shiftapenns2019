<template>
  <div class="col-lg-12 home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
