
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

/*
  Generated class for the TareaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TareaProvider {

  private empresa: AngularFirestoreDocument;
  private orden: AngularFirestoreDocument;

  constructor(private readonly afs: AngularFirestore) {
    this.empresa = this.afs.doc(localStorage.getItem('empresa'));
  }

  obtenerOrdenes() {
    
    this.empresa = this.afs.doc(localStorage.getItem('empresa'));
    return this.empresa.collection('ordenes').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, data };
      }))
    );
  }

  modificarOrden(id,orden){
    this.empresa = this.afs.doc(localStorage.getItem('empresa'));
    return this.empresa.collection('ordenes').doc(id).update(orden)
  }

}
