import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { TareaProvider } from '../../providers/tarea/tarea';

/**
 * Generated class for the EsperaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-espera',
  templateUrl: 'espera.html',
})
export class EsperaPage {

  ordenes: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ordenService: TareaProvider) {

  }


  obtenerOrdenes() {
    this.ordenes = this.ordenService.obtenerOrdenes();
    this.ordenes.forEach(element => {
    
    });
  }

  iniciarServicio(tarea, orden, id){
    orden.data.servicios[id].estado = 'EN PRODUCCIÓN'
    orden.data.servicios[id].horaInicio = new Date()

    this.ordenService.modificarOrden(orden.id, {servicios: orden.data.servicios})
  }

}
