import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { API_HAMBURGUESAS } from '../entorno/rutas';
import { hamburguesasArray } from '../datos/hamburguesas'

@Injectable({
  providedIn: 'root'
})
export class HamburguesasService {

  private hamburguesas:Producto[];

  constructor(private http:HttpClient) {

    this.hamburguesas=hamburguesasArray;

   }

  public getHamburguesas():Producto[]{
    return this.hamburguesas
 }

 public postHamburguesa(hamburguesa:Producto):any{
  return this.hamburguesas.push(hamburguesa);
 }


 public deleteHamburguesa(id:number):void{
  const indice = this.hamburguesas.findIndex((hamb) => hamb.id === id);
  if (indice >= 0) {
      this.hamburguesas.splice(indice, 1);
  }
 }


}
