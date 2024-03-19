import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { BebidasService } from 'src/app/servicios/bebidas.service';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent {

  public pedido:Pedido;
  public hamburguesas:Producto[];
  public guarniciones:Producto[];
  public bebidas:Producto[];

  constructor(private servicioPedido:PedidosService, private servicioHamburguesas:HamburguesasService, private servicioGuarniciones:GuarnicionesService, private servicioBebidas:BebidasService){

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


   public nuevoPedido(formulario:NgForm){

    this.servicioPedido.postPedido(this.pedido)
    alert("Pedido realizado")
   }


   ngOnInit(){


    this.servicioHamburguesas.getHamburguesas()

    this.servicioGuarniciones.getGuarniciones()

    this.servicioBebidas.getBebidas()

   }
  }


