import { VueComponent } from 'vue-typescript'

@VueComponent({
    template: require('./home.html'),
    style: require('./home.scss')
})
export class HomeComponent extends Vue {

    package:string = 'O Jogo';
    bruno:string = 'Nábais Boubalhão';
    daniel:string = 'Regino Coeli';
    antonio:string = 'Topê';

}
