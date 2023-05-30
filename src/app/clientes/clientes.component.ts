
import { Component,OnInit  } from '@angular/core';
import swal from 'sweetalert2';
import { Cliente } from './cliente';
import {ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {}
 

  //ESTE EVENTO INICIA CUANDO SE INICIA EL COMPONENTE
  ngOnInit() { 
    this.clienteService.getClientes().subscribe(

      clientes =>  this.clientes = clientes //los mismo de abajo
     /*  function (clientes) {
        this.clientes = clientes;
      } */
     );
   }

   delete(cliente: Cliente): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.clienteService.delete(cliente.id).subscribe(
          response => {
            //filter metodo de array nos permite filtrar solo los elementos q deseamos (segun ciertos criterios) y devolver en un array
            this.clientes = this.clientes.filter(cli => cli !== cliente) //no muestra al cliente eliminado en la lista
            swal(
              'Cliente Eliminado!',
              `Cliente ${cliente.nombre} eliminado con éxito.`,
              'success'
            )
          }
        )
       
      }
     
    })
  }
}
