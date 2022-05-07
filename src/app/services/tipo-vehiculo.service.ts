import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { mdlTipoVehiculo } from '../models/mdlTipoVehiculo';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {
  private uri: string = environment.uri+"/tipo_vehiculo"
  constructor(private http:HttpClient) { }

  public getLista = () => {
    return this.http.get(this.uri+"/lista")
  }

  public getPorClave = (cveTipoVehi: number) => {
    return this.http.get(this.uri+"/porClave/"+cveTipoVehi)
  }

  public nuevoTipoVehiculo = (nvoTipoVehiculo: mdlTipoVehiculo) => {
    return this.http.post(this.uri+"/nuevo",nvoTipoVehiculo)
  }

  public eliminaTipoVehiculo = (cveTipoVehiculo: number) => {
    return this.http.delete(this.uri+"/elimina/"+cveTipoVehiculo)
  }

}
