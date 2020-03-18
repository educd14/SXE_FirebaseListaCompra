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
  ingredientes: any[];

  constructor(public authApp: AuthAppService,
              public dbApp: FireDBService) {

    const Carne = {
      nombre: 'Carne',
      img: 'assets/image/meat.png',
      encarro: false
    };
    const Huevos = {
      nombre: 'Huevos',
      img: 'assets/image/egg.png',
      encarro: false
    };

    const Queso = {
      nombre: 'Queso',
      img: 'assets/image/cheese.png',
      encarro: false
    };

    const Cerveza = {
      nombre: 'Cerveza',
      img: 'assets/image/beer.png',
      encarro: false
    };

    const Pescado = {
      nombre: 'Pescado',
      img: 'assets/image/fish.png',
      encarro: false
    };

    const Leche = {
      nombre: 'Leche',
      img: 'assets/image/milk.png',
      encarro: false
    };

    this.productos = [];
    this.productos.push(Carne);
    this.productos.push(Huevos);
    this.productos.push(Queso);
    this.productos.push(Cerveza);
    this.productos.push(Pescado);
    this.productos.push(Leche);

    dbApp.altaproducto('Carne', Carne);
    dbApp.altaproducto('Huevos', Huevos);
    dbApp.altaproducto('Leche', Leche);
    dbApp.altaproducto('Pescado', Pescado);
    dbApp.altaproducto('Queso', Queso);
    dbApp.altaproducto('Lechuga', Cerveza);
  }
  onClickNoCarro(int, uid: string) {
    this.productos[int].encarro = false;
    this.dbApp.agregarlista(uid, this.productos);
  }
  onClickEnCarro(int, uid: string) {
    this.productos[int].encarro = true;
    this.dbApp.agregarlista(uid, this.productos);
  }
  onClickNoCarro2(int, uid: string) {
    this.dbApp.lista[int].encarro = false;
    this.dbApp.agregarlista(uid, this.dbApp.lista);
  }
  onClickEnCarro2(int, uid: string) {
    this.dbApp.lista[int].encarro = true;
    this.dbApp.agregarlista(uid, this.dbApp.lista);
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

    this.dbApp.getIngredientes().subscribe( result => {
      this.ingredientes = [];
      result.forEach( i => {
        const ingrediente: any = i.payload.val();

        this.productos.push(ingrediente);
        console.log(i);
      });
      console.log(this.ingredientes);
    });

  }

}
