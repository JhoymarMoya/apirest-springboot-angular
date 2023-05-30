import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders= new HttpHeaders({'content-Type':'application/json'})
  constructor( private http: HttpClient, private router: Router) { }
    


  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map( Response => Response as Cliente[])
      //es un tipo de cast
    ) ;
  }


/*   create(cliente: Cliente) : Observable<any> {
    //1 forma de tomar del backen el mensaje del usuario creado
    //poner any en obser y post
    //form.compone  
    return this.http.post<any>(this.urlEndPoint, cliente, {headers: this.httpHeaders} ).pipe(
      //pipe methodo para manejo de errores en el front
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
    
  } */

  create(cliente: Cliente) : Observable<Cliente> {
    //2 forma de tomar del backen el mensaje del usuario creado
    //form.compone  
    //pipe methodo para manejo de errores en el front
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders} ).pipe(
      //convertir de a tipo de dato cliente
      map( (resp2: any) => resp2.cliente as Cliente),
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
    
  }

  getCliente(id): Observable<Cliente>{
    //agregamos la url + elid y eltipo de retorno'Cliente'
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])//redirigir a la pagina clientes
        console.error(e.error.mensaje);
        //detectar el codigo de error 404,500
        swal('Error al editar', e.error.mensaje, 'error');//manejo de error front en el front
        return throwError(e);
      }))
    //luegoir a forComponete:para obtenerel id preguntar si existe, cargar el objeto cliente con los datos
  }

  update(cliente: Cliente): Observable<any>{
    //http Put se usa para actualizar datos en el servidor REST. A diferencia de POST q es para crear
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders} ).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    )
    //el delete se implementa en clientes.component.ts
  }
}

