import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  usuarioid:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private ordenService: TareaProvider,
    public alertCtrl: AlertController) {
      this.usuarioid = localStorage.getItem('usuarioid')
    this.obtenerOrdenes()
  }


  obtenerOrdenes() {
    this.ordenes = this.ordenService.obtenerOrdenes();
    this.ordenes.subscribe(res=>{
      res.forEach(element => {
        element.data.servicios.forEach(servicio => {
     
          if(servicio.pausas){
            servicio.pausas.forEach(pausa => {
              if (servicio.pausaActual == pausa.id) {
                servicio.motivo = pausa.motivo.motivo
              }
            });
          }
        });
      });

    })


  }

  reanudarServicio(tarea, orden, indice){

    const confirm = this.alertCtrl.create({
      title: 'Reanudar tarea',
      message: '¿Está seguro que desea reanudar la tarea seleccionada?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {

            orden.data.servicios[indice].estado = 'EN PRODUCCIÓN'
            orden.data.servicios[indice].pausas.forEach(pausa => {
              if (pausa.id==orden.data.servicios[indice].pausaActual) {
                pausa.horaFin = new Date()
              }
            });
          this.ordenService.modificarOrden(orden.id, {servicios :orden.data.servicios})
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
  
  }





  ionViewDidLoad() {

  }

}
