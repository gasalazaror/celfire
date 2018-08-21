import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { TareaProvider } from '../../providers/tarea/tarea';
import moment from 'moment';

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
  usuarioid: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ordenService: TareaProvider,
    public alertCtrl: AlertController,
  ) {

  

    // var fecha1 = moment("2018-08-20 07:00:00", "YYYY-MM-DD HH:mm:ss");
    // var fecha2 = moment("2018-08-20 07:04:00", "YYYY-MM-DD HH:mm:ss");

    // var diff = fecha2.diff(fecha1, 'd'); // Diff in days
    // console.log(diff);

    // var diff = fecha2.diff(fecha1, 's'); // Diff in hours
    // console.log(diff)


    // const formatted = moment.utc(diff * 1000).format('HH:mm:ss');

    // console.log(formatted)

    this.usuarioid = localStorage.getItem('usuarioid')

  



    this.obtenerOrdenes()
  }


  obtenerOrdenes() {
    if(localStorage.getItem('empresa')!=null){
      this.ordenes = this.ordenService.obtenerOrdenes();

      this.ordenes.subscribe(res=>{
        console.log(res)
      })
    }
  
   
  }

  iniciarServicio(tarea, orden, id) {

    const confirm = this.alertCtrl.create({
      title: 'Iniciar tarea',
      message: '¿Está seguro que desea iniciar la tarea seleccionada?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            orden.data.servicios[id].estado = 'EN PRODUCCIÓN'
            orden.data.servicios[id].horaInicio = new Date()
            this.ordenService.modificarOrden(orden.id, { servicios: orden.data.servicios })
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

  iniciarServisdcio(servicio) {

  }




}
