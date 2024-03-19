import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { BebidasService } from 'src/app/servicios/bebidas.service';

@Component({
  selector: 'app-pedidos-mto',
  templateUrl: './pedidos-mto.component.html',
  styleUrls: ['./pedidos-mto.component.css']
})
export class PedidosMtoComponent {

  public pedido:Pedido;
  public hamburguesas:Producto[];
  public guarniciones:Producto[];
  public bebidas:Producto[];

  constructor(private servicioPedidos:PedidosService, private servicioHamburguesas:HamburguesasService, private servicioGuarniciones:GuarnicionesService,private servicioBebidas:BebidasService,private ruta:ActivatedRoute, private router:Router){

    this.pedido={
      id:0,
      nombre_cliente:"",
      comentario:"",
      hora_pedido:new Date,
      idhamburguesa:0,
      hamburguesa:"",
      hamburguesaCoste:0,
      idguarnicion:0,
      guarnicion:"",
      guarnicionCoste:0,
      idbebida:0,
      bebida:"",
      bebidaCoste:0,
      tiempo_transcurrido: "",
      precioTotal:0
    }

    this.hamburguesas=this.servicioHamburguesas.getHamburguesas();
    this.guarniciones=this.servicioGuarniciones.getGuarniciones();
    this.bebidas=this.servicioBebidas.getBebidas();
}

public modificarPedido(){

  console.log(this.pedido)
    this.servicioPedidos.putPedido(this.pedido,this.pedido.id)
    alert("Pedido modificado")

}

public borrarPedido(){

  if(confirm("Estas seguro de querer eliminar este pedido?")){
    this.servicioPedidos.deletePedido(this.pedido.id)
    alert("Pedido eliminado")
    this.router.navigate(['/gestion_pedidos'])
  }
}

ngOnInit(){

  this.servicioHamburguesas.getHamburguesas()

   this.servicioGuarniciones.getGuarniciones()

   this.servicioBebidas.getBebidas()


   this.ruta.params.subscribe(params=>{
    this.pedido = this.servicioPedidos.getPedido(params['id'])
 })

}

}
