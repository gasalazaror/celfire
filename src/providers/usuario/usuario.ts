import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  item: Observable<any>;
  private itemDoc: AngularFirestoreDocument;

  constructor(public afa: AngularFireAuth, public db: AngularFirestore) {
  
  }

  login(account){
   return this.afa.auth.signInAndRetrieveDataWithEmailAndPassword(account.correo, account.password)
  }

  onLoggedin(account) {
    this.afa.auth.signInWithEmailAndPassword(account.correo, account.password)
        .then((usuario: any) => {
            this.itemDoc = this.db.doc('usuario/'+this.afa.auth.currentUser.uid);
            this.item = this.itemDoc.valueChanges();
            this.item.subscribe(usuario=>{
     
                localStorage.setItem('usuario', usuario.nombre);
                localStorage.setItem('empresa', usuario.empresa.path);
                localStorage.setItem('isLoggedin', 'true');
              
            })
        
        }) 
}

}
