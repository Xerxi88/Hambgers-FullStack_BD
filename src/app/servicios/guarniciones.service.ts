import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { API_GUARNICIONES } from '../entorno/rutas';
import { guarnicionesArray } from '../datos/guraniciones';

@Injectable({
  providedIn: 'root'
})
export class GuarnicionesService {

  private guarniciones:Producto[];

  constructor(private http:HttpClient) {

    this.guarniciones=guarnicionesArray;

  }

  public getGuarniciones():Producto[]{
    return this.guarniciones
  }

public postGuarnicion(guarnicion:Producto):any{
  return this.guarniciones.push(guarnicion)
 }
 

 public deleteGuarnicion(id:number):any{
  const indice = this.guarniciones.findIndex((guarn) => guarn.id === id);
  if (indice >= 0) {
      this.guarniciones.splice(indice, 1);
  }
 }

}
