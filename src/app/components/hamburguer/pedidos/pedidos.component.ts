import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { BebidasService } from 'src/app/servicios/bebidas.service';
import { interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit, OnDestroy {

  public pedidos: Pedido[];
  public hamburguesas:Producto[];
  public guarniciones:Producto[];
  public bebidas:Producto[];
  private subscription!: Subscription;

  constructor(private servicioPedidos: PedidosService, private servicioHamburguesas:HamburguesasService,private servicioGuarniciones:GuarnicionesService,private servicioBebidas:BebidasService) {

    this.servicioPedidos.getPedidos();

    this.pedidos=this.servicioPedidos.getPedidos()
    this.hamburguesas= this.servicioHamburguesas.getHamburguesas();
    this.guarniciones=this.servicioGuarniciones.getGuarniciones();
    this.bebidas=this.servicioBebidas.getBebidas();
  }

public borrarPedido(id:number){

  if(confirm("Estas seguro de querer eliminar este pedido?")){
    this.servicioPedidos.deletePedido(this.pedidos[id-1].id)
    alert("Pedido eliminado")
  }
  }

  getProductById(products: Producto[], id: number): Producto | undefined {
    return products.find(producto => producto.id === id);
  }

  ngOnInit() {
    this.obtenerPedidos();

    this.subscription = interval(5000).subscribe(() => {
      this.obtenerPedidos();
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  obtenerPedidos() {

    this.servicioPedidos.getPedidos()

    this.servicioHamburguesas.getHamburguesas()

    this.servicioGuarniciones.getGuarniciones()

    this.servicioBebidas.getBebidas()

    this.pedidos.forEach(pedido => {

      pedido.hamburguesa = this.getProductById(this.hamburguesas, pedido.idhamburguesa)?.nombre || null;
      pedido.guarnicion = this.getProductById(this.guarniciones, pedido.idguarnicion)?.nombre || null;
      pedido.bebida = this.getProductById(this.bebidas, pedido.idbebida)?.nombre || null;

          const horaPedido = new Date(pedido.hora_pedido);
          const horaActual = new Date();
          const diferenciaMs = horaActual.getTime() - horaPedido.getTime();
          const minutosTranscurridos = Math.floor(diferenciaMs / 60000);
          const segundosTranscurridos = Math.floor((diferenciaMs % 60000) / 1000);
          const segundosFormateados = segundosTranscurridos.toString().padStart(2, '0');
          pedido.tiempo_transcurrido = `${minutosTranscurridos}m:${segundosFormateados}s`;



    });

  }
}
