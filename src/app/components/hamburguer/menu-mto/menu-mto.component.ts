import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { BebidasService } from 'src/app/servicios/bebidas.service';
import { GuarnicionesService } from 'src/app/servicios/guarniciones.service';
import { HamburguesasService } from 'src/app/servicios/hamburguesas.service';

@Component({
  selector: 'app-menu-mto',
  templateUrl: './menu-mto.component.html',
  styleUrls: ['./menu-mto.component.css']
})
export class MenuMtoComponent {


public hamburguesas:Producto[];
public guarniciones:Producto[];
public bebidas:Producto[];
public hamburguesa:Producto;
public guarnicion:Producto;
public bebida:Producto;


constructor(private servicioHamburguesas:HamburguesasService, private servicioGuarniciones:GuarnicionesService, private servicioBebidas:BebidasService){

  this.hamburguesas=this.servicioHamburguesas.getHamburguesas();
  this.guarniciones=this.servicioGuarniciones.getGuarniciones();
  this.bebidas=this.servicioBebidas.getBebidas();

  this.hamburguesa={
    id:0,
    nombre:"",
    precio:0
  }
  this.guarnicion={
    id:0,
    nombre:"",
    precio:0
  }
  this.bebida={
    id:0,
    nombre:"",
    precio:0
  }

}

private getNextId(arrayProducto:Producto[]): number {
  const maxId = Math.max(...arrayProducto.map(hamb => hamb.id), 0);
  return maxId + 1;
}


public nuevaHamburguesa(formulario:NgForm){

   const nuevaHamburguesa: Producto = {
     id: this.getNextId(this.hamburguesas),
     nombre: this.hamburguesa.nombre,
     precio: this.hamburguesa.precio
   };

  this.servicioHamburguesas.postHamburguesa(nuevaHamburguesa)
  alert("Hamburguesa agregada")
  formulario.reset()
}

public nuevaGuarnicion(formulario:NgForm){

  const nuevaGuarnicion: Producto = {
    id: this.getNextId(this.guarniciones),
    nombre: this.guarnicion.nombre,
    precio: this.guarnicion.precio
  };

  this.servicioGuarniciones.postGuarnicion(nuevaGuarnicion)
  console.log(nuevaGuarnicion)
  alert("Guarnición agregada")
  formulario.reset()
}

public nuevaBebida(formulario:NgForm){

  const nuevaBebida: Producto = {
    id: this.getNextId(this.bebidas),
    nombre: this.bebida.nombre,
    precio: this.bebida.precio
  };

  this.servicioBebidas.postBebida(nuevaBebida)
  console.log(nuevaBebida)
      alert("Bebida agregada")
      formulario.reset()

}




public borrarHamburguesa(id:number){

  if(confirm("Estas seguro de querer eliminar esta hamburguesa?")){
    this.servicioHamburguesas.deleteHamburguesa(id)
        alert("Hamburguesa eliminada");
}
}

public borrarGuarncion(id:number){

  if(confirm("Estas seguro de querer eliminar esta guarnición?")){
    this.servicioGuarniciones.deleteGuarnicion(id)
        alert("Guarnición eliminada")
}
}

public borrarBebida(id:number){

  if(confirm("Estas seguro de querer eliminar esta bebida?")){
    this.servicioBebidas.deleteBebida(id)
        alert("Bebida eliminada")
    }
  }


ngOnInit(){

  this.servicioHamburguesas.getHamburguesas()

  this.servicioGuarniciones.getGuarniciones()

  this.servicioBebidas.getBebidas()
}

}
