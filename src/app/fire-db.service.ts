import { Injectable } from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FireDBService {
  acceso = false;
  lista: any[6];
  nuevalista = true;

  constructor(private db: AngularFireDatabase) {
  }

  /**
   * Crea entrada según la uid del usuario
   * @param usuarioNuevoCorreo correo del usuario, dato para la entrada uid
   * @param usuarioNuevoUID entrada nueva
   */
  altausuario(usuarioNuevoCorreo: string, usuarioNuevoUID: string) {
    this.db.object('users/userUID/' + usuarioNuevoUID.toString()).update({identificacion: usuarioNuevoCorreo});
    this.acceso = true;
    this.getProductos(usuarioNuevoUID);
    console.log('Insertado uid');
  }

  altaproducto(nombre: string, ProductoI: {}) {
    this.db.object('productos/' + nombre).update({Producto: ProductoI});
    this.acceso = true;
    console.log('Insertado producto');
  }

  agregarlista(usuarioUID: string, listaProductos: []) {
    this.db.object('users/userUID/' + usuarioUID.toString()).update({Lista_productos: listaProductos});
    console.log('Insertada lista');
  }

  getDatosUsers() {
    return this.db.list('users/userUID/').snapshotChanges();
  }

  getIngredientes() {
    return this.db.list('productos').snapshotChanges();
  }

  getProductos(uid: string) {
    this.nuevalista = true;
    this.db.list('users/userUID/' + uid + '/Lista_productos/').snapshotChanges().subscribe( result => {
      this.lista = [];
      result.forEach( l => {
        this.nuevalista = false;
        const listap: any = l.payload.val();

        this.lista.push(listap);
        console.log(l);
      });
      console.log(this.lista);
    });
    return this.lista;
  }

  /**
   * Borra la entrada segun el UID del usuario
   * @param uidBorrar uid del usuario logueado
   */
  bajausuario(uidBorrar: string) {
    // borra entrada
    this.acceso = false;
    this.db.object('users/userUID/' + uidBorrar).remove();
  }
}
