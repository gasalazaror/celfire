import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { TareaProvider } from '../../providers/tarea/tarea';

/**
 * Generated class for the EnPausaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-en-pausa',
  templateUrl: 'en-pausa.html',
})
export class EnPausaPage {

  ordenes: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ordenService: TareaProvider) {
    this.obtenerOrdenes()
  }


  obtenerOrdenes() {
    this.ordenes = this.ordenService.obtenerOrdenes();
    this.ordenes.forEach(element => {
   
    });
  }

  reanudarServicio(tarea, orden, indice){
  
   orden.data.servicios[indice].estado = 'EN PRODUCCIÓN'
  

    orden.data.servicios[indice].pausas.forEach(pausa => {
    
      if (pausa.id==orden.data.servicios[indice].pausaActual) {
        pausa.horaFin = new Date()
      }
    });

  this.ordenService.modificarOrden(orden.id, {servicios :orden.data.servicios})
    
  }





  ionViewDidLoad() {

  }

}
