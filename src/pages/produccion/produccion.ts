import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { TareaProvider } from '../../providers/tarea/tarea';
import { PausaPage } from '../pausa/pausa';
import { AngularFirestore } from 'angularfire2/firestore';


/**
 * Generated class for the ProduccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produccion',
  templateUrl: 'produccion.html',
})
export class ProduccionPage {

  ordenes: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ordenService: TareaProvider,
    public modalCtrl: ModalController,
    public db: AngularFirestore
  ) {
    this.obtenerOrdenes()
  }

  ionViewDidLoad() {

  }

  obtenerOrdenes() {
    this.ordenes = this.ordenService.obtenerOrdenes();
    this.ordenes.forEach(element => {
     
    });
  }

  finalizarServicio(orden, tarea, indice) {
    orden.data.servicios[indice].estado = 'POR FACTURAR'
    orden.data.servicios[indice].horaFin = new Date();
    this.ordenService.modificarOrden(orden.id, { servicios: orden.data.servicios })
  }

  pausarServicio(orden, tarea, indice) {
    orden.data.servicios[indice].estado = 'EN PRODUCCIÓN - PAUSADO'
    if (!orden.data.servicios[indice].pausas) {
      orden.data.servicios[indice].pausas = []
    }
    orden.data.servicios[indice].pausas.push({ horaInicio: new Date() })


    this.ordenService.modificarOrden(orden.id, { servicios: orden.data.servicios })
  }

  pausar(orden, tarea, indice) {
    const id = this.db.createId()

    let modalPausa = this.modalCtrl.create(PausaPage)

    modalPausa.onDidDismiss(motivo => {
      if (motivo) {
        if (!orden.data.servicios[indice].pausas) {
          orden.data.servicios[indice].pausas = []
        }
        orden.data.servicios[indice].estado = 'EN PRODUCCIÓN - PAUSADO'
        orden.data.servicios[indice].pausaActual = id
        orden.data.servicios[indice].pausas.push({ horaInicio: new Date(), motivo: motivo, id: id })
        this.ordenService.modificarOrden(orden.id, { servicios: orden.data.servicios })
      }
    })
    modalPausa.present();
  }


}
