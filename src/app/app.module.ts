import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule,Routes } from '@angular/router';
// para conectar con el backend
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './clientes/form.component'; 
import { FormsModule } from '@angular/forms';


const routes: Routes =[
  {path:'', redirectTo: '/clientes',pathMatch: 'full'},
  {path:'directivas', component: DirectivaComponent},
  {path:'clientes', component: ClientesComponent},
  {path:'clientes/form', component: FormComponent},
  {path:'clientes/form/:id', component: FormComponent}

]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    //aca llamamos la bariable
    HttpClientModule,
    FormsModule,
    //para trabajar con formularios
    RouterModule.forRoot(routes)
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }