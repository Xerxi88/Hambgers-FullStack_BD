import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { API_BEBIDAS } from '../entorno/rutas';
import { bebidasArray } from '../datos/bebidas';

@Injectable({
  providedIn: 'root'
})
export class BebidasService {

  private bebidas:Producto[]

  constructor(private http:HttpClient) {

    this.bebidas=bebidasArray

   }

  public getBebidas():Producto[]{
    return this.bebidas
}

public postBebida(bebida:Producto):any{
  return this.bebidas.push(bebida)
 }


 public deleteBebida(id:number):any{
  const indice = this.bebidas.findIndex((beb) => beb.id === id);
    if (indice >= 0) {
        this.bebidas.splice(indice, 1);
    }
 }

}
