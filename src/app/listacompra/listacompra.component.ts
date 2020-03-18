import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthAppService} from '../auth-app.service';
import {FireDBService} from '../fire-db.service';

@Component({
  selector: 'app-listacompra',
  templateUrl: './listacompra.component.html',
  styleUrls: ['./listacompra.component.css']
})
export class ListacompraComponent implements OnInit {

  productos: any[6];
  listausers: any[];

  constructor(public authApp: AuthAppService,
              public dbApp: FireDBService) {
    dbApp.altaproducto('Carne', 'Carne');
    dbApp.altaproducto('Huevos', 'Huevos');
    dbApp.altaproducto('Leche', 'Leche');
    dbApp.altaproducto('Agua', 'Agua');
    dbApp.altaproducto('Queso', 'Queso');
    dbApp.altaproducto('Lechuga', 'Lechuga');

    const producto1 = {
      nombre: 'Carne',
      comprado: false
    };
    const producto2 = {
      nombre: 'Huevos',
      comprado: false
    };

    const producto3 = {
      nombre: 'Leche',
      comprado: false
    };

    const producto4 = {
      nombre: 'Agua',
      comprado: false
    };

    const producto5 = {
      nombre: 'Queso',
      comprado: false
    };

    const producto6 = {
      nombre: 'Lechuga',
      comprado: false
    };

    this.productos = [];
    this.productos.push(producto1);
    this.productos.push(producto2);
    this.productos.push(producto3);
    this.productos.push(producto4);
    this.productos.push(producto5);
    this.productos.push(producto6);
  }
  onClickComprar(int, uid: string) {
    this.productos[int].comprado = false;
    this.dbApp.agregarlista(uid, this.productos);
  }
  onClickComprado(int, uid: string) {
    this.productos[int].comprado = true;
    this.dbApp.agregarlista(uid, this.productos);
  }
  ngOnInit() {

    this.dbApp.getDatosUsers().subscribe( result => {
      this.listausers = [];
      result.forEach(u => {
        const user: any = u.payload.val();
        user.key = u.key;
        console.log(user.key);
        this.listausers.push(user);
        console.log(u);

        console.log(this.listausers);
      });
    });

  }

}
