import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})

export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  public titulo: String ="Crear Cliente"

  public errores: string[];

  constructor (private clienteService:ClienteService,
    private router: Router,
    private activated: ActivatedRoute) {}

  ngOnInit() {
    this.cargarcliente();
  }

  cargarcliente():void{
    this.activated.params.subscribe(params => {
      let id= params['id']//obtenemos el id del arreglo
      if(id){
        //buscamos el cliente
        this.clienteService.getCliente(id).subscribe( 
          (cliente) => this.cliente = cliente)
      }
    })
  }
 
  create(): void{
    this.clienteService.create(this.cliente).subscribe(
      /* aca va la respuesta
      1 forma del tomar del backend el mensaje poner 'resp1'
      resp1 =>{ 
        this.router.navigate(['/clientes'])//re dirige a clientes
        swal('Nuevo Cliente', `${resp1.mensaje}: ${resp1.cliente.nombre}`, 'success')
   */
      //2 forma del tomar del backend el mensaje poner 'resp1'
      cliente =>{ 
        this.router.navigate(['/clientes'])//re dirige a clientes
        swal('Nuevo Cliente', `El cliente ${cliente.nombre} ha sido creado con éxito!`, 'success')
      }
      , err => { this.errores = err.error.errors as string[];
        console.error('codigo del error desde el backend: ' + err.status);
        console.error(err.error.errores)
    });
    
  }

  update(): void{
    this.clienteService.update(this.cliente).subscribe(
      resp2 => {
        this.router.navigate(['/clientes'])
        swal('Cliente Actualizado', `${resp2.mensaje}:  ${resp2.cliente.nombre}`, 'success')
      }
      , err => { this.errores = err.error.errors as string[];
        console.error('codigo del error desde el backend: ' + err.status);
        console.error(err.error.errores)
      }
    )
  }

}
