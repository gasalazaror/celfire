import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EsperaPage } from '../espera/espera';
import { ProduccionPage } from '../produccion/produccion';
import { FinalizadasPage } from '../finalizadas/finalizadas';
import { EnPausaPage } from '../en-pausa/en-pausa';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario: any

  tab1Root: any = EsperaPage;
  tab2Root: any = ProduccionPage;
  tab3Root: any = FinalizadasPage;
  tab4Root: any = EnPausaPage;

  tab1Title = "En espera";
  tab2Title = "En producción";
  tab3Title = "Finalizadas";
  tab4Title = "En pausa"

  constructor(public navCtrl: NavController) {
    console.log(localStorage.getItem('empresa'))
    if (localStorage.getItem('empresa')==null) {
      this.navCtrl.push(LoginPage);
     }
  }

}
