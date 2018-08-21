import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  item: Observable<any>;
  private itemDoc: AngularFirestoreDocument;

  account: { correo: string, password: string } = {
    correo: 'gabrielsalazar@outlook.com',
    password: '123456'
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public usuarioprovider: UsuarioProvider,
    public alertCtrl: AlertController,
    public afa: AngularFireAuth, public db: AngularFirestore
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    this.afa.auth.signInWithEmailAndPassword(this.account.correo, this.account.password)
      .then((usuario: any) => {
        this.itemDoc = this.db.doc('usuario/' + this.afa.auth.currentUser.uid);
        this.item = this.itemDoc.snapshotChanges();
        this.item.subscribe(usuario => {
          loader.dismiss();
         
          this.navCtrl.push(HomePage);

          console.log(usuario)
          

          localStorage.setItem('usuario', usuario.nombre);
          localStorage.setItem('empresa', usuario.empresa.path);
          localStorage.setItem('isLoggedin', 'true');

          loader.dismiss();

        }, err => {

          console.log(err)
          // this.navCtrl.push(MainPage);
          // Unable to log in
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Algo salió mal!',
            subTitle: 'Por favor revisa la información de la cuenta e inténtalo de nuevo',
            buttons: ['OK']
          });
          alert.present();

        })

      })

      loader.dismiss();
  }

}
