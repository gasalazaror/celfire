import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TareaProvider } from '../../providers/tarea/tarea';
import { Observable } from 'rxjs';

/**
 * Generated class for the FinalizadasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finalizadas',
  templateUrl: 'finalizadas.html',
})
export class FinalizadasPage {

  ordenes: Observable<any[]>;
  usuarioid:any

  constructor(public navCtrl: NavController, public navParams: NavParams,  private ordenService: TareaProvider,) {
    this.usuarioid = localStorage.getItem('usuarioid')
    this.obtenerOrdenes()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalizadasPage');
  }

  obtenerOrdenes() {
    if(localStorage.getItem('empresa')!=null){
      this.ordenes = this.ordenService.obtenerOrdenes();
    }
  
   
  }

}
