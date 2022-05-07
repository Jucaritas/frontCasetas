import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TipoClienteComponent } from './pages/tipo-cliente/tipo-cliente.component';
import { TipoVehiculoComponent } from './pages/tipo-vehiculo/tipo-vehiculo.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent },
  { path: 'tipoCliente', component: TipoClienteComponent },
  { path: 'tipoVehiculo', component: TipoVehiculoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
