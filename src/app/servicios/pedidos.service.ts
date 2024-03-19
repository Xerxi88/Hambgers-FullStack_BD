import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';
import { pedidosArray }  from '../datos/pedidos';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private pedidos:any[];

  constructor() {

    this.pedidos=pedidosArray;

  }

   public getPedidos():any[]{
    console.log(this.pedidos)
      return this.pedidos
   }

   public getPedido(id:number):Pedido{
    return this.pedidos.filter(pedido=>pedido.id==id)[0] 
   }

   private getNextId(): number {
    const maxId = Math.max(...this.pedidos.map(pedido => pedido.id), 0);
    return maxId + 1;
  }

   public postPedido(pedido:Pedido):any{
    pedido.id = this.getNextId();
    return this.pedidos.push(pedido)
   }


   public putPedido(pedido:Pedido,id:number):any{
    const indice = this.pedidos.findIndex((pedido) => pedido.id === id);
    if (indice >= 0) {
        this.pedidos[indice]=pedido;
    }
   }

   public deletePedido(id:number):void{
    const indice = this.pedidos.findIndex((pedido) => pedido.id === id);
    if (indice >= 0) {
        this.pedidos.splice(indice, 1);
    }
   }
}
