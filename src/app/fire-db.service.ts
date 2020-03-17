import { Injectable } from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from '@angular/fire/database';
import {ListacompraComponent} from './listacompra/listacompra.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireDBService {
  acceso = false;
  lele: object

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
    console.log('Insertado uid');
  }

  altaproducto(nombre: string, nombreProducto: string) {
    this.db.object('productos/' + nombre).update({Producto: nombreProducto});
    this.acceso = true;
    console.log('Insertado producto');
  }

  agregarlista(usuarioUID: string, listaProductos: []) {
    this.db.object('users/userUID/' + usuarioUID.toString()).update({Lista_productos: listaProductos});
    console.log('Insertada lista');
  }

  /**
   * Borra la entrada segun el UID del usuario
   * @param uidBorrar uid del usuario logueado
   */
  bajausuario(uidBorrar: string) {
    // borra entrada
    this.db.object('users/userUID/' + uidBorrar).remove();
  }
}
