import { Component } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { BebidasService } from 'src/app/servicios/bebidas.service';

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent {

  public pedidos: Pedido[];
  public hamburguesas:Producto[];
  public guarniciones:Producto[];
  public bebidas:Producto[];


  constructor(private servicioPedidos: PedidosService, private servicioHamburguesas:HamburguesasService,private servicioGuarniciones:GuarnicionesService,private servicioBebidas:BebidasService) {

    this.pedidos=this.servicioPedidos.getPedidos();
    this.hamburguesas=this.servicioHamburguesas.getHamburguesas();
    this.guarniciones=this.servicioGuarniciones.getGuarniciones();
    this.bebidas= this.servicioBebidas.getBebidas();
  }

  getProductById(products: Producto[], id: number): Producto | undefined {
    return products.find(producto => producto.id === id);
  }

  ngOnInit() {

    this.servicioPedidos.getPedidos();

    this.pedidos.forEach(pedido => {

      pedido.hamburguesa = this.getProductById(this.hamburguesas, pedido.idhamburguesa)?.nombre || null;
      pedido.guarnicion = this.getProductById(this.guarniciones, pedido.idguarnicion)?.nombre || null;
      pedido.bebida = this.getProductById(this.bebidas, pedido.idbebida)?.nombre || null;

    });

     this.servicioHamburguesas.getHamburguesas()

     this.servicioGuarniciones.getGuarniciones()

     this.servicioBebidas.getBebidas()

   }
  }



